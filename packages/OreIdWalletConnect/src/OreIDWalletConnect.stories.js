import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import OreIDWalletConnect from '../dist/index'

const containerStyle = {
  maxWidth: 500,
  backgroundColor: '#feffce',
  padding: 20,
  borderRadius: 5,
  margin: '0 auto',
  border: '1px solid #ccc',
  marginTop: 20,
}

function createAndSaveSession(payload, connector, activeSession) {
  const payloadParams = payload.params[0]
  const session = { ...connector.session, uri: activeSession }

  let existingSessions = window.localStorage.getItem('sessions')
  if (existingSessions) {
    const parsedSessions = JSON.parse(existingSessions)
    if (parsedSessions && parsedSessions.length > 0) {
      let allSessions = [...parsedSessions, session]
      const sessionString = JSON.stringify(allSessions)
      window.localStorage.setItem('sessions', sessionString)
    } else {
      const sessionString = JSON.stringify([session])
      window.localStorage.setItem('sessions', sessionString)
    }
  } else {
    const sessionString = JSON.stringify([session])
    window.localStorage.setItem('sessions', sessionString)
  }
}

function getCachedSessions() {
  const local = localStorage ? localStorage.getItem('sessions') : null
  let session = null
  if (local) {
    try {
      session = JSON.parse(local)
    } catch (error) {
      throw error
    }
  }
  return session
}

const walletConnectConfig = {
  chainId: 1,
  accounts: ['0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b'],
  address: '0x7FFBF659A640e181BA2Db633686Af123E9E1eE1b',
}

const OreIDWalletConnectClient = () => {
  const [activePage, setActivePage] = useState('default')
  const [connectUris, setConnectUris] = useState([])
  const [activeSession, setActiveSession] = useState('')

  const onWalletConnectButtonClick = connector => {
    setActivePage('connect')
  }

  /** Callback after the WC connection string in pasted */
  const handleWalletConnectURIPaste = uri => {
    setConnectUris([uri])
    setActiveSession(uri)
  }

  const handleSessionRequest = (connector, payload) => {
    setActivePage('approve_session')
  }

  const handleSessionUpdate = payload => {
    console.log('handleSessionUpdate - payload', payload)
  }

  const handleSessionDisconnect = uri => {
    console.log('handleSessionDisconnect - payload', uri)
    // UPDATE LOCASTORAGE SESSIONS
    let existingSessions = window.localStorage.getItem('sessions')
    if (existingSessions) {
      const parsedSessions = JSON.parse(existingSessions)
      if (parsedSessions && parsedSessions.length > 0) {
        const updatedSessions = parsedSessions.filter(data => data?.uri !== uri)
        const sessionString = JSON.stringify(updatedSessions)
        window.localStorage.setItem('sessions', sessionString)
      }
    }
    setActivePage('default')
  }

  const handleTransaction = payload => {
    console.log('handleTransaction - payload', payload)
  }

  const handlePersonalSign = payload => {
    console.log('handlePersonalSign - payload', payload)
  }

  const handleConnect = (payload, connector) => {
    console.log('handleConnect - payload', payload)
    createAndSaveSession(payload, connector, activeSession)
    setActivePage('default')
  }

  const handleError = payload => {
    console.log('handleError - payload', payload)
  }

  const handleChangeActiveClient = uri => {
    setActiveSession(uri)
  }

  const existingWalletConnectSessions = getCachedSessions()

  return (
    <div style={containerStyle}>
      <OreIDWalletConnect
        config={walletConnectConfig}
        connectUris={connectUris}
        activeSession={activeSession}
        sessions={existingWalletConnectSessions}
        activePage={activePage}
        setActivePage={setActivePage}
        onWalletConnectButtonClick={onWalletConnectButtonClick}
        onWalletConnectURIPaste={handleWalletConnectURIPaste}
        onSessionRequest={handleSessionRequest}
        onChangeActiveClient={handleChangeActiveClient}
        onSessionUpdate={handleSessionUpdate}
        onSessionDisconnect={handleSessionDisconnect}
        onTransaction={handleTransaction}
        onPersonalSign={handlePersonalSign}
        onConnect={handleConnect}
        onError={handleError}
      />
    </div>
  )
}

storiesOf('OreIDWalletConnect', module).add('Default', () => <OreIDWalletConnectClient />)
