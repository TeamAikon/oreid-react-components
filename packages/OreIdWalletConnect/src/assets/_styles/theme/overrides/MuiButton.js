// Palette
import palette from '../palette'

// override points
// https://material-ui.com/api/button/#css
// https://material-ui.com/api/button-base/

export default {
  root: {
    borderRadius: '100px',
    padding: '12px 24px',
    textDecoration: 'none !important',
  },
  label: {
    textTransform: 'initial',
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '1px',
    fontWeight: '700',
    boxShadow: 'none',
    padding: '0',
  },
  outlined: {},
  contained: {
    backgroundColor: palette.common.white,
    '&:hover': {
      backgroundColor: palette.common.neutral,
    },
  },
  sizeLarge: { padding: '17px 24px' },
  sizeSmall: {
    padding: '8px 12px',
    label: {
      fontSize: '14px',
      lineHeight: '14px',
    },
  },
}
