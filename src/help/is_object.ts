export const isObject = (input: unknown): input is Object => {
  return typeof input === 'object' && !!input && input.constructor === Object
}
