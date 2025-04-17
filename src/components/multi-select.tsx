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
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {value.includes(value) && <CheckIcon />}
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
