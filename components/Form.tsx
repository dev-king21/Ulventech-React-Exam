import React, { useState, useEffect, useRef } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { getFields, postFields } from 'apiCall/fields'
import FieldElement from 'components/FieldElement'
import { Field } from 'types/form'

export default function Form() {
  const [fields, setFields] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResponse, setSubmitResponse] = useState<any | undefined>({})
  const [formValues, setFormValues] = useState<any | undefined>({})
  const responseRef = useRef(null)

  const requestFields = async () => {
    setIsLoading(true)
    const data = await getFields()
    setIsLoading(false)
    const values = data.reduce((prevValue: any, currentValue: Field): any => {
      prevValue[currentValue.fieldName] = currentValue.value
      return prevValue
    }, {})
    setFormValues(values)
    setFields(data)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    const response = await postFields(formValues)
    setSubmitResponse(response)
    setIsSubmitting(false)
  }

  const handleChangeField = (fieldName: string) => {
    return (value: any) => {
      setFormValues({
        ...formValues,
        [fieldName]: value,
      })
    }
  }

  useEffect(() => {
    requestFields()
  }, [])

  useEffect(() => {
    if (submitResponse || submitResponse.success) {
      responseRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [submitResponse])

  return (
    <>
      <Box
        onSubmit={handleSubmit}
        component="form"
        noValidate
        autoComplete="off"
        style={{ marginBottom: "10px" }}
      >
        {
          fields.map((field: Field, idx) =>
            <div key={idx}>
              <FieldElement
                field={{
                  ...field,
                  value: formValues[field.fieldName]
                }}
                onChange={handleChangeField(field.fieldName)}
              />
            </div>
          )
        }
        {
          !isLoading && <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <Button disabled={isSubmitting} type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        }
        {
          submitResponse && submitResponse.success &&
          <div>
            <Box sx={{ mx: 2, my: 4 }}>
              <Typography variant="h5" component="h1">
                Response
              </Typography>
            </Box>
            <Box sx={{ mx: 2, my: 4, display: 'flex' }}>
              <Alert onClose={() => {
                setSubmitResponse({})
              }} severity="success" ref={responseRef}>
                <AlertTitle>{submitResponse.message}</AlertTitle>
                {
                  JSON.stringify(submitResponse.data)
                }
              </Alert>
            </Box>
          </div>
        }
      </Box>
    </>
  )
}
