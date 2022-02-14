import { useEffect, useState } from 'react'

export enum ScriptStatus {
  Idle = 'idle',
  Loading = 'loading',
  Ready = 'ready',
  ErrorDownloading = 'errorDownloading',
  ErrorExecution = 'errorExecution',
}

/** Downloads a 'application/javascript' script from a url and attaches to window object
 *  Returns 'ready' or 'errorDownloading'
 */
export const useExternalScript = (url: string) => {
  const [status, setStatus] = useState(url ? ScriptStatus.Loading : ScriptStatus.Idle)

  useEffect(() => {
    if (!url) {
      setStatus(ScriptStatus.Idle)
    }
    let script: HTMLScriptElement | null = null

    const handleScriptEvent = (e: Event) => {
      setStatus(e.type === 'load' ? ScriptStatus.Ready : ScriptStatus.ErrorDownloading)
    }

    if (!script) {
      script = document.createElement('script')
      script.type = 'application/javascript'
      script.src = url
      script.async = true
      script.addEventListener('load', handleScriptEvent)
      script.addEventListener('error', handleScriptEvent)
      document.body.appendChild(script)
    }

    return () => {
      script?.removeEventListener('load', handleScriptEvent)
      script?.removeEventListener('error', handleScriptEvent)
    }
  }, [url])

  return status
}
