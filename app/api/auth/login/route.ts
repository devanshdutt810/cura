import { NextResponse } from "next/server";
import { validateLoginSchema } from "../../../validation/auth-validation";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { startUserSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const result = validateLoginSchema.safeParse(reqBody);

    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isValidPassword = await compare(
      result.data.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new Error("Incorrect Password");
    }

    const res = NextResponse.json(
      {
        message: "Login Successful",
      },
      {
        status: 200,
      },
    );

    const Response = await startUserSession(res, user.id);

    return Response;
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
