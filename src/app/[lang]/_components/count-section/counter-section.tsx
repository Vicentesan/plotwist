'use client'

import { formatNumber } from '@/utils/number/format-number'
import CountUp from 'react-countup'

type CounterSectionProps = {
  value: number
  label: string
  divider?: boolean
}

export const CounterSection = ({
  value,
  label,
  divider = true,
}: CounterSectionProps) => {
  return (
    <div className="relative flex flex-col items-center space-y-1 text-center">
      {divider && (
        <div className="absolute right-0 top-[25%] hidden h-8 w-full border-r border-dashed md:block" />
      )}

      <CountUp
        className="text-2xl font-bold"
        start={0}
        end={value}
        prefix="+ "
        formattingFn={formatNumber}
      />

      <p className="text-xs text-muted-foreground">{label}</p>

      {divider && (
        <div className="h-[2px] w-1/2 translate-y-4 border-b border-dashed" />
      )}
    </div>
  )
}