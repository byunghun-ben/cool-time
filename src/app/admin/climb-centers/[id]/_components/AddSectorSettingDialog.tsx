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
import { cn } from "@/lib/utils";
import { ClimbCenterSector } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSectorSetting } from "../_actions";

const formSchema = z.object({
  settingDate: z.date({
    message: "방문일을 입력해주세요.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  sector: ClimbCenterSector;
};

const AddSectorSettingDialog = ({ sector }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(
    async (formValues: FormValues) => {
      const settingDate = format(formValues.settingDate, "yyyy-MM-dd");
      try {
        await createSectorSetting(sector.id, settingDate);
        form.reset();
        setOpen(false);
        router.refresh();
      } catch (error) {
        form.setError("root", {
          type: "server",
          message: "세팅 기록 추가에 실패했습니다.",
        });
      }
    },
    [form, sector.id, router]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">세팅 기록 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>세팅 기록 추가하기</DialogTitle>
          <DialogDescription>
            {`${sector.name}의 세팅 기록을 추가합니다.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="settingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>세팅 날짜</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>세팅 날짜를 선택해주세요.</span>
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

export default AddSectorSettingDialog;
