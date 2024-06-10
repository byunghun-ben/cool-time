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
import { createClient } from "@/utils/supabase/client";
import { TrashIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  sectors: z.array(
    z.object({
      name: z.string().min(1, "섹터 이름을 입력해주세요."),
    })
  ),
});

const resolver = zodResolver(formSchema);

type FormValues = z.infer<typeof formSchema>;

const AddClimbCenterForm = () => {
  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      name: "",
      sectors: [{ name: "" }],
    },
  });

  const sectorFields = useFieldArray({
    control: form.control,
    name: "sectors",
  });

  const onSubmit = async (values: FormValues) => {
    const supabase = createClient();

    const { data, error } = await supabase.rpc(
      "create_climbing_center_with_sectors",
      {
        climb_center_name: values.name,
        sectors: values.sectors,
      }
    );

    console.log(data, error);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>암장 이름</FormLabel>
              <FormControl>
                <Input placeholder="이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">섹터</h2>

          {sectorFields.fields.map((sector, index, array) => (
            <div key={sector.id} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`sectors.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>섹터 이름</FormLabel>
                    <FormControl>
                      <Input placeholder="이름을 입력해주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {array.length > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="self-end"
                  onClick={() => sectorFields.remove(index)}
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="self-end"
            onClick={() => sectorFields.append({ name: "" })}
          >
            섹터 추가
          </Button>
        </div>

        <Button type="submit">등록</Button>
      </form>
    </Form>
  );
};

export default AddClimbCenterForm;
