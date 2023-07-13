export function convertColor(rgb) {
    // Remove the 'rgb(' and ')' from the input string
    rgb = rgb.slice(4, -1);

    // Split the string into an array of color values
    var colorValues = rgb.split(",");

    // Parse the color values as integers
    var red = parseInt(colorValues[0]);
    var green = parseInt(colorValues[1]);
    var blue = parseInt(colorValues[2]);

    // Define an object with color name mappings
    var colorNames = {
        black: [0, 0, 0],
        white: [255, 255, 255],
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        // Add more color mappings here...
    };

    // Find the closest color match
    var closestColor = "";
    var closestDistance = Infinity;

    for (var color in colorNames) {
        var colorValue = colorNames[color];
        var distance = Math.sqrt(
            Math.pow(red - colorValue[0], 2) +
            Math.pow(green - colorValue[1], 2) +
            Math.pow(blue - colorValue[2], 2)
        );

        if (distance < closestDistance) {
            closestDistance = distance;
            closestColor = color;
        }
    }

    return closestColor;
}