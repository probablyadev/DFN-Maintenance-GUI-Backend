import {
  cyan700,
  grey600,
  green600, green200, green400,
  fullWhite,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

// $theme_gray_sidebar_bg_color: grayscale($theme_dark_sidebar_bg_color); // or 3c3c3c
// $theme_dark_text_color:       rgba(255,255,255,.7);

export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: green600,
    accent2Color: green400,
    accent3Color: green200,
    textColor: 'rgba(255,255,255,.7)',
    secondaryTextColor: fade(fullWhite, 0.54),
    alternateTextColor: '#3c3c3c',
    canvasColor: '#3c3c3c',
    borderColor: fade(fullWhite, 0.15),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
};
