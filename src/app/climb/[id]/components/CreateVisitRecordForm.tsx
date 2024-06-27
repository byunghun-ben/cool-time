"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ClimbCenter } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createVisitRecord } from "../../apis/client";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  visitDate: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  climbCenter: ClimbCenter;
  userId: string;
};

const CreateVisitRecordForm = ({ climbCenter, userId }: Props) => {
  const { refresh } = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const { reset } = form;

  const mutation = useMutation({
    mutationFn: createVisitRecord,
    onSuccess: () => {
      refresh();
      reset();
    },
    onError: console.error,
  });

  const onSubmitValid = useCallback(
    async ({ visitDate }: FormValues) => {
      mutation.mutate({
        userId,
        climbCenterId: climbCenter.id,
        visitDate: format(visitDate, "yyyy-MM-dd"),
      });
    },
    [userId, climbCenter.id, mutation]
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmitValid)}
      >
        <FormField
          control={form.control}
          name="visitDate"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col items-start">
              <FormLabel>방문일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>방문일을 입력해주세요.</span>
                      )}
                      <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="secondary"
          className={`${mutation.isPending ? "opacity-50" : ""}`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "저장 중..." : "저장"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateVisitRecordForm;
