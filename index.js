var fs = require('fs');
var JIMP = require('jimp');
var Colour = require('./classes/colour')

function removeDuplicates(accumulator, current) {
    if (accumulator.some(element => element.hex == current.hex)) return accumulator;
    accumulator.push(current);
    return accumulator;
}

// accumulator starts out as [[], [], []]
function seperateStrengths(accumulator, current) {
    accumulator[current.highest].push(current)

    return accumulator;
}

function colourSort(a, b) {
    return a.coloursInt[a.highest] > b.coloursInt[b.highest];
}

JIMP.read('./target/target.png', (err, image) => {
    if (err) return console.log(err);
    let colours = [];
    try {
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            let colour = new Colour(x, y, {
                red: image.bitmap.data[idx],
                green: image.bitmap.data[idx + 1],
                blue: image.bitmap.data[idx + 2]
            })
            colours.push(colour)
        });
    } catch (er) {
        console.error(er);
    }

    console.log("Initial Array:")
    //listColours(colours);
    colours = colours.reduce(removeDuplicates, []);
    
    console.log("First Reduced Array:")
    //listColours(colours);

    colours = colours.reduce(seperateStrengths, [[], [], []]);
    colours = colours.map(type => {
        return type.sort(colourSort);
    })

    let newImage = new JIMP(Math.max(colours[0].length, colours[1].length, colours[2].length) + 1, 3, 0xFFFFFF00, (err, newImage) => {
        colours.forEach((type, typeIndex, array) => {
            type.forEach((colour, colourIndex, array) => {
                newImage.setPixelColour(JIMP.rgbaToInt(colour.redInt, colour.greenInt, colour.blueInt, 255), colourIndex, typeIndex)
            })
        })

        newImage.write('./result/result.png')
        newImage.scale(32, JIMP.RESIZE_NEAREST_NEIGHBOR, (err, newImage) => {
            newImage.write('./result/result32x.png')
        })
        
    })
});
