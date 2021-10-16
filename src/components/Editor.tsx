import MonacoEditor, { OnMount, useMonaco } from '@monaco-editor/react'
import { useEffect, useState } from 'react'

const fetchQratchTypes = async () => {
  const res = await fetch('https://unpkg.com/qratch@latest/dist/umd/index.d.ts')
  const text = await res.text()

  return text
}

/**
 * Editor props.
 */
export type EditorProps = {
  value?: string
  onChange?(value: string): void
  onRun?(): void
}

/**
 * Editor component.
 */
export const Editor: React.VFC<EditorProps> = (props) => {
  const monaco = useMonaco()
  const [loading, setLoading] = useState(true)

  const initMonaco = async () => {
    setLoading(true)

    const types = await fetchQratchTypes()
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      types.split('\n').slice(0, -2).join('\n')
    )
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
interface Playground {
  canvas: HTMLCanvasElement
}

declare const playground: Playground
`.trim()
    )

    setLoading(false)
  }

  const initEditor: OnMount = (editor) => {
    editor.addAction({
      id: 'qratch-playground-run',
      label: 'Run',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run() {
        props?.onRun()

        return null
      },
    })
  }

  useEffect(() => {
    if (monaco) {
      initMonaco()
    }
  }, [monaco])

  return (
    <>
      {!loading && (
        <MonacoEditor
          height="calc(100vh - 64px)"
          defaultLanguage="typescript"
          theme="vs-dark"
          options={{
            tabSize: 2,
            fontSize: 18,
          }}
          onMount={initEditor}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </>
  )
}
