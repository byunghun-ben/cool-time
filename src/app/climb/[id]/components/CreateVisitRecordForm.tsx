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
import { cn, getRandomNumber } from "@/lib/utils";
import { ClimbCenter } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useVisitRecordContext from "../../hooks/useVisitRecordContext";

const formSchema = z.object({
  visitDate: z.date(),
});

type FormValues = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

type Props = {
  climbCenter: ClimbCenter;
};

const CreateVisitRecordForm = ({ climbCenter }: Props) => {
  const { createVisitRecord } = useVisitRecordContext();

  const form = useForm<FormValues>({
    resolver,
  });

  const onSubmitValid = useCallback(
    (values: FormValues) => {
      const id = getRandomNumber();

      createVisitRecord({
        id,
        climbCenterId: climbCenter.id,
        climbCenter: {
          id: climbCenter.id,
          name: climbCenter.name,
        },
        visitDate: format(values.visitDate, "yyyy-MM-dd"),
      });
    },
    [createVisitRecord, climbCenter]
  );

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 items-start"
        onSubmit={form.handleSubmit(onSubmitValid)}
      >
        <FormField
          control={form.control}
          name="visitDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>방문일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
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
        <Button type="submit" variant="secondary">
          저장하기
        </Button>
      </form>
    </Form>
  );
};

export default CreateVisitRecordForm;
