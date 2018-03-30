import warning from 'warning';

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min, max) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of, 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
export function convertColorToString(color) {
    const { type, values } = color;

    if (type.indexOf('rgb') > -1) {
        // Only convert the first 3 values to int (i.e. not alpha)
        for (let ii = 0; ii < 3; ii++) {
            values[ii] = parseInt(values[ii]);
        }
    }

    let colorString;

    if (type.indexOf('hsl') > -1) {
        colorString = `${color.type}(${values[0]}, ${values[1]}%, ${values[2]}%`;
    } else {
        colorString = `${color.type}(${values[0]}, ${values[1]}, ${values[2]}`;
    }

    if (values.length === 4) {
        colorString += `, ${color.values[3]})`;
    } else {
        colorString += ')';
    }

    return colorString;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @returns {string} A CSS rgb color string
 */
export function convertHexToRGB(color) {
    if (color.length === 4) {
        let extendedColor = '#';

        for (let ii = 1; ii < color.length; ii++) {
            extendedColor += color.charAt(ii) + color.charAt(ii);
        }

        color = extendedColor;
    }

    const values = {
        r: parseInt(color.substr(1, 2), 16),
        g: parseInt(color.substr(3, 2), 16),
        b: parseInt(color.substr(5, 2), 16)
    };

    return `rgb(${values.r}, ${values.g}, ${values.b})`;
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values and color names.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {{type: string, values: number[]}} A MUI color object
 */
export function decomposeColor(color) {
    if (color.charAt(0) === '#') {
        return decomposeColor(convertHexToRGB(color));
    }

    const marker = color.indexOf('(');

    warning(marker !== -1, `Material-UI: The ${color} color was not parsed correctly,
  because it has an unsupported format (color name or RGB %). This may cause issues in component rendering.`);

    const type = color.substring(0, marker);
    let values = color.substring(marker + 1, color.length - 1)
        .split(',');
    values = values.map((value) => parseFloat(value));

    return {
        type,
        values
    };
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function fade(color, value) {
    color = decomposeColor(color);
    value = clamp(value, 0, 1);

    if (color.type === 'rgb' || color.type === 'hsl') {
        color.type += 'a';
    }

    color.values[3] = value;

    return convertColorToString(color);
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color, coefficient) {
    color = decomposeColor(color);
    coefficient = clamp(coefficient, 0, 1);

    if (color.type.indexOf('hsl') > -1) {
        color.values[2] *= 1 - coefficient;
    } else if (color.type.indexOf('rgb') > -1) {
        for (let ii = 0; ii < 3; ii++) {
            color.values[ii] *= 1 - coefficient;
        }
    }
    return convertColorToString(color);
}
