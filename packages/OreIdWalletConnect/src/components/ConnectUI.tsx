import React from 'react'

type ConnectUIProps = {
  onWalletConnectURIPaste: Function
  setActivePage: Function
}

const ConnectUI = (props: ConnectUIProps) => {
  const handleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const uri = e.currentTarget.value
    props.onWalletConnectURIPaste(uri)
    props.setActivePage('loading')
  }

  return (
    <div>
      <h2>Please paste your wallet connect connection string here!</h2>
      <input
        style={{
          border: '1px solid #999',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: '100%',
          cursor: 'pointer',
        }}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default ConnectUI
