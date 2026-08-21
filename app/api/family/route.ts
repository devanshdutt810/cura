import { AuthError } from "@/lib/errorClasses";
import prisma from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await requireUser();

    const family = await prisma.family.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!family) {
      return NextResponse.json(
        {
          success: false,
          message: "Family not found.",
          data: {},
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "family found.",
        data: family,
      },
      { status: 200 },
    );
  } catch (e) {
    if (e instanceof AuthError) {
      return NextResponse.json(
        {
          success: false,
          message: e.message,
          data: {},
        },
        {
          status: 401,
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong",
          data: {},
        },
        {
          status: 500,
        },
      );
    }
  }
}
