import { errorResponseSchema, successResponseSchema } from "@/lib/apiResponse";

export const createVisitRecord = async ({
  climbCenterId,
  userId,
  visitDate,
}: {
  userId: string;
  climbCenterId: number;
  visitDate: string;
}) => {
  try {
    const res = await fetch("/api/visit-record", {
      method: "POST",
      body: JSON.stringify({
        userId,
        climbCenterId,
        visitDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const deleteVisitRecord = async (recordId: number) => {
  try {
    const res = await fetch(`/api/visit-record/${recordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    if (!res.ok) {
      const errorResponse = errorResponseSchema.parse(body);
      throw new Error(errorResponse.message);
    }

    const data = successResponseSchema.parse(body);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Unknown error");
    }
  }
};
