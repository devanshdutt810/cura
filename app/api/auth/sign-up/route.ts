import { validateSignUpSchema } from "@/app/validation/auth-validation";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const result = validateSignUpSchema.safeParse(reqBody);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.issues[0].message,
        },
        {
          status: 400,
        },
      );
    }

    const duplicateEmail = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (duplicateEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        {
          status: 409,
        },
      );
    }

    const passwordHash = await hash(
      result.data.password,
      Number(process.env.PASSWORD_HASH_SALTROUNDS),
    );

    await prisma.user.create({
      data: {
        email: result.data.email,
        passwordHash: passwordHash,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `user ${result.data.email} created successfully.`,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: e instanceof Error ? e.message : "Something Went Wrong!",
      },
      {
        status: 500,
      },
    );
  }
}
