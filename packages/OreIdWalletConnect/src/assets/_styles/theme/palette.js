import { white, black } from './colors'

// https://material-ui.com/customization/palette/

const primary = '#08B6E7'
const secondary = 'rgb(255,255,255)'
const error = '#DF4A32'

export default {
  common: {
    black,
    white,
    neutral: '#E4E7EB',
    muted: '#9EA0A4',
  },
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  error: {
    main: error,
  },
  // primary: {
  //   contrastText: white,
  //   main: '#0767DB',
  //   light: '#F6F9FD',
  //   dark: '#0B48A0'
  // },
  // secondary: {
  //   contrastText: white,
  //   main: '#7d58ff',
  //   light: '',
  //   dark: '#37248F'
  // },
  success: {
    contrastText: white,
    main: '#45B880',
    light: '#F1FAF5',
    dark: '#00783E',
  },
  info: {
    contrastText: white,
    main: '#1070CA',
    light: '#F1FBFC',
    dark: '#007489',
  },
  warning: {
    contrastText: white,
    main: '#FFB822',
    light: '#FDF8F3',
    dark: '#95591E',
  },
  danger: {
    contrastText: white,
    main: '#ED4740',
    light: '#FEF6F6',
    dark: '#BF0E08',
  },
  text: {
    header: '#333',
    prose: '#777',
    primary: '#555',
    secondary: '#66788A',
    disabled: '#A6B1BB',
    label: '#A4A5AC',
  },
  background: {
    default: '#FFF',
    dark: '#0B1022',
    paper: white,
  },
  border: '#f0f0f0',
  divider: '#f0f0f0',
}
