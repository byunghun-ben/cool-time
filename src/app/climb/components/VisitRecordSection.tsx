"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ClimbCenter, VisitRecord } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  climbCenters: ClimbCenter[];
  visitRecords: VisitRecord[];
};

const VisitRecordSection = ({ climbCenters, visitRecords }: Props) => {
  return (
    <section className="flex flex-col gap-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">암장 방문 기록</h2>
        <AddVisitRecordDialog climbCenters={climbCenters} />
      </div>

      <ul className="flex flex-col gap-2">
        {visitRecords.map((visitRecord) => (
          <li key={visitRecord.id}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">
                {visitRecord.climbCenter.name}
              </span>
              <span className="text-sm text-slate-500">
                {format(visitRecord.visitDate, "yyyy-MM-dd")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const AddVisitRecordDialog = ({
  climbCenters,
}: {
  climbCenters: ClimbCenter[];
}) => {
  const formSchema = z.object({
    climbCenterId: z.string({
      message: "암장을 선택해주세요.",
    }),
    visitDate: z.date(),
    userId: z.string(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visitDate: new Date(),
      userId: "9105f83f-9164-48f4-9033-8ec1f3e97107",
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(async (values: FormValues) => {
    const supabase = createClient();

    const { data, error } = await supabase.from("climb_center_visit").insert([
      {
        climb_center_id: values.climbCenterId,
        user_id: values.userId,
        visit_date: values.visitDate.toLocaleDateString("sv-SE"), // YYYY-MM-DD
      },
    ]);

    if (error) {
      console.error("supabase Error", error);
      return;
    }

    console.log("data", data);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle>방문 기록</DialogTitle>
          <DialogDescription>
            방문 기록은 기기에 저장되며, 다른 사람에게 공유되지 않아요.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="visitDate"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>방문일</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "text-left font-normal w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>날짜를 선택해주세요.</span>
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
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="climbCenterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>암장</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="어떤 암장을 방문했었나요?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {climbCenters.map((climbCenter) => (
                        <SelectItem
                          key={climbCenter.id}
                          value={climbCenter.id.toString()}
                        >
                          {climbCenter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-4">
              <Button type="submit" variant="default">
                저장하기
              </Button>
              <DialogClose asChild>
                <Button variant="outline">취소</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VisitRecordSection;
