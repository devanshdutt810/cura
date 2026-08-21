import { NextResponse } from "next/server";

enum statusCodes {
  OK = 200,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

export default function parseResponse(
  success: boolean,
  message: string,
  data: object,
  status: statusCodes,
) {
  return NextResponse.json(
    {
      success: success,
      message: message,
      data: data,
    },
    {
      status: status,
    },
  );
}
