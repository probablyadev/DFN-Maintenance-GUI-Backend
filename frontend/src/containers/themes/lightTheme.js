import cyan from 'material-ui/colors/cyan';
import green from 'material-ui/colors/green';
import grey from 'material-ui/colors/grey';
import spacing from 'material-ui/styles/spacing';

import {fade} from '../../utils/colorManipulator';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
    spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: cyan[500],
        primary2Color: cyan[700],
        primary3Color: grey[400],
        accent1Color: green[400],
        accent2Color: grey[100],
        accent3Color: grey[500],
        textColor: 'rgba(0, 0, 0, 0.87)',
        secondaryTextColor: fade('rgba(0, 0, 0, 0.87)', 0.54),
        alternateTextColor: '#ffffff',
        canvasColor: '#ffffff',
        borderColor: grey[300],
        disabledColor: fade('rgba(0, 0, 0, 0.87)', 0.3),
        pickerHeaderColor: cyan[500],
        clockCircleColor: fade('rgba(0, 0, 0, 0.87)', 0.07),
        shadowColor: 'rgba(0, 0, 0, 1)'
    }
};
