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
    const encoded = encodeURIComponent(code)
    const url = `/play-frame.html?${encoded}`

    if (playWindow && !playWindow.closed) {
      playWindow.location.href = url

      playWindow.addEventListener('close', () => {
        setPlayWindow(null)
      })
    } else {
      const w = window.open(url)

      if (!w) {
        enqueueSnackbar('Please allow pop-ups.', {
          variant: 'error',
        })

        return
      }

      setPlayWindow(w)
    }
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
