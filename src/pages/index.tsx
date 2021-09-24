import { NextPage } from 'next'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Editor } from '../components/Editor'
import { NavBar } from '../components/NavBar'
import { initialCode } from '../constants/initialCode'

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [code, setCode] = useState(initialCode)
  const [playWindow, setPlayWindow] = useState<Window>()
  const { enqueueSnackbar } = useSnackbar()

  const run = () => {
    if (playWindow) {
      playWindow.close()
    }

    const w = window.open('/play-frame.html')

    if (!w) {
      enqueueSnackbar('Please allow pop-ups.', {
        variant: 'error',
      })

      return
    }

    w.addEventListener('load', () => {
      w.postMessage(
        {
          type: 'run',
          code,
        },
        '*'
      )
    })

    setPlayWindow(w)
  }

  return (
    <>
      <Head>
        <title>home - playground</title>
      </Head>

      <div>
        <NavBar onRunClicked={run} />
        <div style={{ height: '64px' }}></div>
        <Editor value={code} onChange={setCode} />
      </div>
    </>
  )
}

export default HomePage
