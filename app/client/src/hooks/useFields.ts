import { useState } from 'react'

const useFields = ({ type = 'text', name = '', label = '' }) => {
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange,
    type,
    name,
    label
  }
}

export default useFields
