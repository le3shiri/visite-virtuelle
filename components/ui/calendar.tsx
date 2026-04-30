"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month: externalMonth,
  onMonthChange: externalOnMonthChange,
  ...props
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState<Date>(props.defaultMonth || new Date());
  
  const month = externalMonth || internalMonth;
  const onMonthChange = (newMonth: Date) => {
    setInternalMonth(newMonth);
    externalOnMonthChange?.(newMonth);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={fr}
      month={month}
      onMonthChange={onMonthChange}
      className={cn("p-4 sm:p-8 bg-white rounded-[2rem]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-8 w-full",
        month_caption: "flex justify-center items-center mb-8 gap-4 relative",
        caption_label: "text-xl font-bold text-slate-900 tracking-tight capitalize",
        nav: "flex items-center gap-2",
        button_previous: "hidden", // We use custom buttons
        button_next: "hidden", // We use custom buttons
        month_grid: "w-full border-collapse",
        weekdays: "flex mb-4",
        weekday: "text-slate-400 w-full font-bold text-[11px] uppercase tracking-[0.2em] text-center",
        weeks: "space-y-2",
        week: "flex w-full mt-1",
        day: "h-12 w-full text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-11 w-11 p-0 font-semibold aria-selected:opacity-100 hover:bg-primary/10 hover:text-primary transition-all rounded-xl text-sm flex items-center justify-center mx-auto"
        ),
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground font-bold shadow-xl shadow-primary/25 scale-105",
        today: "bg-accent/10 text-accent font-bold relative after:content-[''] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-accent after:rounded-full",
        outside:
          "day-outside text-slate-300 opacity-40 aria-selected:bg-accent/20 aria-selected:text-slate-400",
        disabled: "text-slate-200 opacity-30 cursor-not-allowed",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Nav: () => null,
        Chevron: ({ orientation }) => orientation === 'left' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />,
        MonthCaption: ({ calendarMonth }) => {
          const { goToMonth, previousMonth, nextMonth } = useNavigation();
          
          return (
            <div className="flex justify-center items-center mb-8 gap-6">
              <button
                type="button"
                disabled={!previousMonth}
                onClick={() => previousMonth && goToMonth(previousMonth)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 w-12 bg-white p-0 opacity-100 hover:bg-primary hover:text-white border-slate-200 rounded-2xl transition-all shadow-sm flex items-center justify-center disabled:opacity-20"
                )}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="text-2xl font-black text-slate-900 tracking-tight capitalize min-w-[160px] text-center">
                {format(calendarMonth.date, "MMMM yyyy", { locale: fr })}
              </div>

              <button
                type="button"
                disabled={!nextMonth}
                onClick={() => nextMonth && goToMonth(nextMonth)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 w-12 bg-white p-0 opacity-100 hover:bg-primary hover:text-white border-slate-200 rounded-2xl transition-all shadow-sm flex items-center justify-center disabled:opacity-20"
                )}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          );
        }
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }








