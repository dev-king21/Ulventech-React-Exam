import React from 'react'
import { SelectChangeEvent } from '@mui/material/Select'

export enum InputType {
  text = "text",
  select = "select",
  email = "email",
  number = "number",
  multiline = "multiline",
}

export interface Field {
  fieldName: string
  type: InputType
  value: string | number
  options?: string[]
}

export interface InputFieldProps {
  field: Field
  onChange: any
}