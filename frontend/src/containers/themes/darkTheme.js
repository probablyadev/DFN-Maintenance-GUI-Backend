import cyan from 'material-ui/colors/cyan';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';
import spacing from 'material-ui/styles/spacing';

import { fade } from '../../utils/colorManipulator';

export default {
    spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: cyan[700],
        primary2Color: cyan[700],
        primary3Color: grey[600],
        accent1Color: green[600],
        accent2Color: green[400],
        accent3Color: green[200],
        textColor: 'rgba(255,255,255,.7)',
        secondaryTextColor: fade('rgba(255, 255, 255, 1)', 0.54),
        alternateTextColor: '#333C44',
        canvasColor: '#333C44',
        borderColor: fade('rgba(255, 255, 255, 1)', 0.15),
        disabledColor: fade('rgba(255, 255, 255, 1)', 0.3),
        pickerHeaderColor: fade('rgba(255, 255, 255, 1)', 0.12),
        clockCircleColor: fade('rgba(255, 255, 255, 1)', 0.12)
    }
};
