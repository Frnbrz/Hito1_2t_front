import { TypeWithKey } from 'models'

export const getValidationsError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_BAD_REQUEST: 'La solicitud no es válida',
    required: 'Este campo es requerido',
    min: 'El valor es muy pequeño',
    max: 'El valor es muy grande',
    minLength: 'El valor es muy corto',
    maxLength: 'El valor es muy largo',
    pattern: 'El valor no es válido',
    email: 'El valor no es un email válido',
    alreadyExists: 'El valor ya existe'
  }
  return codeMatcher[errorCode] || 'Error desconocido'
}
