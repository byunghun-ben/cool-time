"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSector } from "../_actions";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
});

type FormValues = z.infer<typeof formSchema>;

const resolver = zodResolver(formSchema);

type Props = {
  climbCenterId: number;
};

const AddSectorForm = ({ climbCenterId }: Props) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await createSector(climbCenterId, values.name);

        form.reset();
        setShowForm(false);
        router.refresh();
      } catch (error) {
        form.setError("root", {
          type: "server",
          message: "Failed to add sector",
        });
      }
    },
    [climbCenterId, form, router]
  );

  return (
    <div className="flex flex-col gap-2">
      {showForm && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>섹터 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="섹터 이름 입력" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">추가</Button>
          </form>
        </Form>
      )}
      <Button variant="outline" onClick={() => setShowForm((prev) => !prev)}>
        <span>{showForm ? "닫기" : "섹터 추가"}</span>
      </Button>
    </div>
  );
};

export default AddSectorForm;
