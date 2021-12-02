import { useState, useCallback } from 'react'

export const useErrorHandler = (): [string | undefined, (error: string) => void, () => void] => {
  const [state, setState] = useState<string | undefined>()
  const setError = useCallback((error: string) => setState(error), [setState])
  const clearErrors = useCallback(() => setState(undefined), [setState])
  return [state, setError, clearErrors]
}
