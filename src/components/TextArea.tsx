import { Form } from 'react-bootstrap'
import { type FromLanguage, SectionType } from '../types.d'
import React from 'react'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: FromLanguage) => void
  value: string
}

const commonStyles = {
  height: '100%',
  border: 0,
  resize: 'none'
}

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (loading === true) {
    return 'Loading...'
  }

  return type === SectionType.From
    ? 'Introducir texto'
    : 'Resultado'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value as FromLanguage)
  }

  return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as={'textarea'}
            placeholder={getPlaceHolder({ type, loading })}
            style={styles}
            value={value}
            onChange={handleChange}
        />
  )
}
