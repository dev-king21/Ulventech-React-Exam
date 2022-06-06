import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import startCase from 'lodash.startcase'
import { InputFieldProps } from 'types/form'

export default function FieldElement(props: InputFieldProps) {
  const { field, onChange } = props
  if (field.type === 'text' || field.type === 'email') {
    return <Box>
      <TextField
        sx={{ margin: '1rem' }}
        fullWidth
        id={field.fieldName}
        label={startCase(field.fieldName)}
        onChange={(e) => onChange(e.target.value)}
        value={field.value} />
    </Box>
  }
  if (field.type === 'number') {
    return <Box>
      <TextField
        sx={{ margin: '1rem' }}
        fullWidth
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        id={field.fieldName}
        label={startCase(field.fieldName)}
        onChange={(e) => onChange(e.target.value)}
        value={field.value} />
    </Box>
  }
  if (field.type === 'multiline') {
    return <Box>
      <TextField
        sx={{ margin: '1rem' }}
        fullWidth
        multiline
        rows={6}
        id={field.fieldName}
        label={startCase(field.fieldName)}
        onChange={(e) => onChange(e.target.value)}
        value={field.value} />
    </Box>
  }
  return <FormControl sx={{ margin: '1rem' }} fullWidth>
    <InputLabel id="demo-simple-select-label">{field.fieldName}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id={field.fieldName}
      value={field.value}
      label={startCase(field.fieldName)}
      onChange={(e) => onChange(e.target.value)}
    >
      {
        field.options && field.options.map(option => <MenuItem value={option}>{option}</MenuItem>)
      }
    </Select>
  </FormControl>
}
