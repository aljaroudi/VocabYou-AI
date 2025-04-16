'use client'

import { CheckSquare2, Square } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[]
  value: string[]
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <Select value={value.join(',')} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder}>{value.length} selected</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {value.includes(option) ? <CheckSquare2 /> : <Square />}
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
