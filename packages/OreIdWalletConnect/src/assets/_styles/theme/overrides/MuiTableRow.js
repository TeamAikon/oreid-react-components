// Palette
import palette from '../palette'
import { transparent } from '../colors'

export default {
  root: {
    height: 'auto !important',
    backgroundColor: transparent,
    '&$selected': {
      backgroundColor: palette.background.default,
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.background.default,
      },
    },
  },
}
