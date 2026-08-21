import crypto from "crypto";
import prisma from "./prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthError } from "./errorClasses";

async function createUserSession(userId: string) {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      sessionId: hashedToken,
      userId: userId,
      expiresAt: expiresAt,
    },
  });
  return {
    rawToken,
    expiresAt,
  };
}

export async function startUserSession(response: NextResponse, userId: string) {
  try {
    const session = await createUserSession(userId);

    response.cookies.set("session", session.rawToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      expires: session.expiresAt,
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error:
          e instanceof Error ? e.message : "Error in starting user session.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function requireUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    throw new AuthError("Unauthorized Request");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const session = await prisma.session.findUnique({
    where: {
      sessionId: hashedToken,
    },
  });

  if (!session || session.expiresAt <= new Date()) {
    throw new AuthError("No active sessions");
  }

  return session.userId;
}
