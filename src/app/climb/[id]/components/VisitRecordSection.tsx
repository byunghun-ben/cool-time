"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import useVisitRecordContext from "../../hooks/useVisitRecordContext";
import CreateVisitRecordForm from "./CreateVisitRecordForm";

const VisitRecordSection = () => {
  const params = useParams<{ id: string }>();
  const climbCenterId = Number(params.id);
  const { visitRecords, removeVisitRecord } = useVisitRecordContext();

  const thisCenterVisitRecords = useMemo(() => {
    return visitRecords
      .filter((visitRecord) => visitRecord.climbCenterId === climbCenterId)
      .sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime());
  }, [visitRecords, climbCenterId]);

  const handleRemoveVisitRecord = useCallback(
    (recordId: string) => () => {
      removeVisitRecord(recordId);
    },
    [removeVisitRecord]
  );

  return (
    <section className="flex flex-col gap-4 px-6 py-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">내 방문 기록</h2>
        <p className="text-sm text-slate-500">
          내 방문 기록을 입력하면, 어떤 벽이 새로 세팅되었는지 확인할 수 있어요
          <br />
          방문 기록은 내 기기에 저장되며, 다른 사람에게 공유되지 않아요.
        </p>
      </div>

      <CreateVisitRecordForm />
      {/* <Form {...form}>
        <form
          className="flex flex-col gap-4 items-start"
          onSubmit={form.handleSubmit(onSubmit)}
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
      </Form> */}

      <ul className="grid grid-cols-1 gap-2">
        {thisCenterVisitRecords.map((visitRecord) => (
          <li
            key={visitRecord.id}
            className="flex items-center justify-between bg-white rounded-lg p-3"
          >
            <span>{visitRecord.visitDate.toLocaleDateString()}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveVisitRecord(visitRecord.id)}
            >
              <span>삭제</span>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VisitRecordSection;
