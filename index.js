var JIMP = require('jimp');
var Colour = require('./classes/colour')

function removeDuplicates(accumulator, current) {
    if (accumulator.some(element => element.hex == current.hex)) return accumulator;
    accumulator.push(current);
    return accumulator;
}

function seperateStrengths(accumulator, current) {
    accumulator[current.highest].push(current)
    return accumulator;
}

function colourSort(a, b) {
    let aVal = ((a.hue / 360)) + (10 - (a.saturation * 10)) + (a.lightness * 100);
    let bVal = ((b.hue / 360)) + (10 - (b.saturation * 10)) + (b.lightness * 100);
    if (aVal > bVal) {
        return -1;
    } else if (aVal < bVal) {
        return 1;
    } else {
        return 0;
    }
}

JIMP.read('./target/target.png', (error, image) => {
    if (error) return console.log(error);
    let colours = [];
    try {
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            let colour = new Colour({
                red: image.bitmap.data[idx],
                green: image.bitmap.data[idx + 1],
                blue: image.bitmap.data[idx + 2]
            })
            colours.push(colour)
        });
    } catch (error) {
        console.error(error);
    }

    colours = colours.reduce(removeDuplicates, [])//.reduce(seperateStrengths, [[], [], []]).map(type => {
    //    return type.sort(colourSort);
    //})

    colours = colours.sort(colourSort);

    new JIMP(colours.length, 1, 0xFFFFFF00, (error, newImage) => {
        if (error) return console.error(error);
        colours.forEach((colour, colourIndex) => {
            console.log(colour);
            try {
                newImage.setPixelColor(JIMP.rgbaToInt(colour.redInt, colour.greenInt, colour.blueInt, 255), colourIndex, 0);
            } catch (error) {
                console.log(error);
            }
        })
    /*new JIMP(Math.max(colours[0].length, colours[1].length, colours[2].length), 3, 0xFFFFFF00, (error, newImage) => {
        if (error) return console.log(error);
        colours.forEach((type, typeIndex) => {
            type.forEach((colour, colourIndex) => {
                newImage.setPixelColour(JIMP.rgbaToInt(colour.redInt, colour.greenInt, colour.blueInt, 255), colourIndex, typeIndex)
            })
        })
    */
        newImage.write('./result/result.png')
        newImage.scale(32, JIMP.RESIZE_NEAREST_NEIGHBOR, (error, newImage) => {
            if (error) return console.log(error);
            newImage.write('./result/result32x.png')
        })
        
    })
});
