// OreID
import oreid_logo from './assets/oreid-logo@2x.png'
import oreid_style from './assets/oreid-style.json'
// OAuth
import apple_logo from './assets/apple-logo@2x.png'
import apple_style from './assets/apple-style.json'
import facebook_logo from './assets/facebook-logo@2x.png'
import facebook_style from './assets/facebook-style.json'
import github_logo from './assets/github-logo@2x.png'
import github_style from './assets/github-style.json'
import google_logo from './assets/google-logo@2x.png'
import google_style from './assets/google-style.json'
import kakao_logo from './assets/kakao-logo@2x.png'
import kakao_style from './assets/kakao-style.json'
import line_logo from './assets/line-logo@2x.png'
import line_style from './assets/line-style.json'
import linkedin_logo from './assets/linkedin-logo@2x.png'
import linkedin_style from './assets/linkedin-style.json'
import twitch_logo from './assets/twitch-logo@2x.png'
import twitch_style from './assets/twitch-style.json'
import twitter_logo from './assets/twitter-logo@2x.png'
import twitter_style from './assets/twitter-style.json'
import wechat_logo from './assets/wechat-logo@2x.png'
import wechat_style from './assets/wechat-style.json'
import instagram_style from './assets/instagram-style.json'
import instagram_logo from './assets/instagram-logo.png'
// Passwordless
import email_logo from './assets/email-logo@2x.png'
import email_style from './assets/email-style.json'
import phone_logo from './assets/phone-logo@2x.png'
import phone_style from './assets/phone-style.json'
// Wallets
import algosigner_logo from './assets/algosigner-logo@2x.png'
import algosigner_style from './assets/algosigner-style.json'
import keycat_logo from './assets/keycat-logo@2x.png'
import keycat_style from './assets/keycat-style.json'
import ledger_logo from './assets/ledger-logo@2x.png'
import ledger_style from './assets/ledger-style.json'
import lynx_logo from './assets/lynx-logo@2x.png'
import lynx_style from './assets/lynx-style.json'
import meetone_logo from './assets/meetone-logo@2x.png'
import meetone_style from './assets/meetone-style.json'
import portis_logo from './assets/portis-logo@2x.png'
import portis_style from './assets/portis-style.json'
import scatter_logo from './assets/scatter-logo@2x.png'
import scatter_style from './assets/scatter-style.json'
import simpleos_logo from './assets/simpleos-logo@2x.png'
import simpleos_style from './assets/simpleos-style.json'
import tokenpocket_logo from './assets/tokenpocket-logo@2x.png'
import tokenpocket_style from './assets/tokenpocket-style.json'
import walletconnect_logo from './assets/walletconnect-logo.png'
import walletconnect_style from './assets/walletconnect-style.json'
import web3_logo from './assets/web3-logo@2x.png'
import web3_style from './assets/web3-style.json'
import whalevault_logo from './assets/whalevault-logo@2x.png'
import whalevault_style from './assets/whalevault-style.json'

const providers = [
  {id:'oreid',logo: oreid_logo,style: oreid_style},
  {id:'algosigner',logo: algosigner_logo,style: algosigner_style},
  {id:'apple',logo: apple_logo,style: apple_style},
  {id:'email',logo: email_logo,style: email_style},
  {id:'facebook', logo: facebook_logo, style: facebook_style},
  {id:'github', logo: github_logo, style: github_style},
  {id:'google', logo: google_logo, style: google_style},
  {id:'kakao',logo: kakao_logo,style: kakao_style},
  {id:'line',logo: line_logo,style: line_style},
  {id:'linkedin',logo: linkedin_logo,style: linkedin_style},
  {id:'phone',logo: phone_logo,style: phone_style},
  {id:'twitch',logo: twitch_logo,style: twitch_style},
  {id:'twitter',logo: twitter_logo,style: twitter_style},
  {id:'wechat',logo: wechat_logo,style: wechat_style},
  {id:'instagram',logo: instagram_logo,style: instagram_style},
  {id:'keycat',logo: keycat_logo,style: keycat_style},
  {id:'ledger',logo: ledger_logo,style: ledger_style},
  {id:'lynx',logo: lynx_logo,style: lynx_style},
  {id:'meetone',logo: meetone_logo,style: meetone_style},
  {id:'portis',logo: portis_logo,style: portis_style},
  {id:'scatter',logo: scatter_logo,style: scatter_style},
  {id:'simpleos',logo: simpleos_logo,style: simpleos_style},
  {id:'tokenpocket',logo: tokenpocket_logo,style: tokenpocket_style},
  {id:'walletconnect',logo: walletconnect_logo,style: walletconnect_style},
  {id:'web3',logo: web3_logo,style: web3_style},
  {id:'whalevault',logo: whalevault_logo,style: whalevault_style}
]

/** comma seperated list of all providers */
export const providerList = providers.map(p => p.id).join(', ')

export default providers
