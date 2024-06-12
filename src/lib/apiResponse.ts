import { NextResponse } from "next/server";
import { z } from "zod";

const baseResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string(),
});

export const successResponseSchema = baseResponseSchema.merge(
  z.object({
    data: z.unknown(),
  })
);

export const errorResponseSchema = baseResponseSchema.merge(
  z.object({
    error: z.string(),
  })
);

type SuccessResponse<T = unknown> = z.infer<typeof successResponseSchema> & {
  data: T;
};
type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const createSuccessResponse = <T>(
  data: T,
  message: string = "요청이 성공적으로 처리되었습니다.",
  status: number = 200
): NextResponse<SuccessResponse<T>> => {
  return NextResponse.json(
    {
      status,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

export const createErrorResponse = (
  error: string,
  message?: string,
  status: number = 500
): NextResponse<ErrorResponse> => {
  return NextResponse.json(
    {
      status,
      error,
      message: message || "요청을 처리하는 중에 문제가 발생했습니다.",
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};
