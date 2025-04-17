'use client'

import { CheckIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  label,
}: {
  options: { label: string; value: string }[]
  value: string[]
  onChange: (value: string) => void
  placeholder: string
  label: (count: number) => string
}) {
  return (
    <Select value={value.join(',')} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder}>{label(value.length)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map(o => (
          <SelectItem key={o.value} value={o.value}>
            {value.includes(o.value) ? <CheckIcon /> : <div className="size-4" />}
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
