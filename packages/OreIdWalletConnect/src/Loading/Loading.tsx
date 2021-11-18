import React from 'react'
import { LogoIcon } from './LogoIcon'

import './Loading.scss'

export const Loading: React.FC = () => {
  return (
    <div className="oreIdWalletConnect-loading">
      <LogoIcon />
    </div>
  )
}
