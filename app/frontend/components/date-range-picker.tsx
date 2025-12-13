import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangePickerProps {
  value?: { from?: string; to?: string }
  onChange: (range?: { from?: string; to?: string }) => void
  placeholder?: string
}

export function DateRangePicker({ value, onChange, placeholder = 'Pick a date range' }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)

  // Convert string dates to Date objects for the calendar
  const dateRange: DateRange | undefined = value?.from || value?.to
    ? {
        from: value.from ? new Date(value.from) : undefined,
        to: value.to ? new Date(value.to) : undefined,
      }
    : undefined

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from || range?.to) {
      onChange({
        from: range.from ? format(range.from, 'yyyy-MM-dd') : undefined,
        to: range.to ? format(range.to, 'yyyy-MM-dd') : undefined,
      })
    } else {
      onChange(undefined)
    }
  }

  const handleClear = () => {
    onChange(undefined)
    setOpen(false)
  }

  const formatDisplayValue = () => {
    if (!dateRange?.from) return placeholder

    if (!dateRange.to) {
      return format(dateRange.from, 'MMM d, yyyy')
    }

    return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-range"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !dateRange && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{formatDisplayValue()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 max-w-[min(calc(100vw-2rem),800px)]" align="start">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          className="rounded-md"
        />
        {dateRange && (
          <div className="flex justify-end border-t p-3">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
