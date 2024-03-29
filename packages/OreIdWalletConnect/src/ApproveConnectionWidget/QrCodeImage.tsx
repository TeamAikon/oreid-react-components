import React from 'react'

interface QrCodeImageProps {
  size: number
}

export const QrCodeImage: React.FC<QrCodeImageProps> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    id="s1"
  >
    <title>QR coder</title>
    <desc>Manually edited diagram of qr code</desc>
    {/* <rect x="0" y="0" width="300" height="422" stroke="none" fill="#CFA" /> */}
    <g transform="scale(.5,.5)" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="butt">
      <path id="A" d="M3,3 h8 v8 h-8 v-8 z M6,7 h2" />
      <use xlinkHref="#A" x="18" y="0" />
      <use xlinkHref="#A" x="0" y="18" />
      <path d="M18,3 h-3 v4 h2 v4 h-2 v3" />
      <path d="M2,15 h2 m2,0 h4 m6,0 h2 m2,0 h4 m4,0 h2" />
      <path d="M4,17 h2 m2,0 h8 m6,0 h2 m2,0 h4" />
      <path d="M14,19 h2 m2,0 h2 m6,0 h2" />
      <path d="M16,21 h2 m2,0 h8" />
      <path d="M14,23 h2 m2,0 h2 m4,0 h2 m2,0 h2" />
      <path d="M14,25 h4 m2,0 h2 m2, 0 h4" />
      <path d="M14,27 h2 m6,0 h2 m4,0 h2" />
      <path d="M16,29 h8 m2,0 h2" />
    </g>
    {/* <!-- vim:nowrap:sw=2:so=2:et:ai: --> */}
  </svg>
)
