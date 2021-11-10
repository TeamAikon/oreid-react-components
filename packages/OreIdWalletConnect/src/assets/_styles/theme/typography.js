import palette from './palette'

// https://material-ui.com/customization/typography/

export default {
  useNextVariants: true,
  h1: {
    color: palette.text.header,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '36px',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  h2: {
    color: palette.text.header,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '32px',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  h3: {
    color: palette.text.header,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '24px',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  h4: {
    color: palette.text.header,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '18px',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  h5: {
    color: palette.text.header,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '16px',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  h6: {
    color: palette.text.header,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '700',
    fontSize: '14px',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '25px',
  },
  subtitle2: {
    color: palette.text.primary,
    fontSize: '14px',
    letterSpacing: 0,
    lineHeight: '16px',
  },
  primary1: {
    color: palette.text.primary,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    letterSpacing: '0.25px',
    lineHeight: '1.7',
  },
  primary2: {
    color: palette.text.prose,
    fontSize: '12px',
    letterSpacing: '-0.04px',
    lineHeight: '14px',
  },
  button: {
    color: palette.text.primary,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '12px',
    letterSpacing: '0.3px',
    lineHeight: '16px',
  },
}
