var JIMP = require('jimp');
var Colour = require('./classes/colour')

function removeDuplicates(accumulator, current) {
    // If element with the same hex already exists in the accumulator, if it does then don't add it to the accumulator
    if (accumulator.some(element => element.hex == current.hex)) return accumulator;
    // Otherwise, add it to the accumulator
    accumulator.push(current);
    return accumulator;
}

function colourSort(a, b) {
    // TODO: this
}

function listColours(colours) {
    colours.forEach(color => {
        console.log(`#${color.hex}`)
    })
}

JIMP.read('./target/target.png', (err, image) => {
    if (err) return console.log(err);
    let colours = [];
    try {
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            let colour = new Colour(x, y, {
                red: image.bitmap.data[idx].toString(16).padStart(2, '0'),
                green: image.bitmap.data[idx + 1].toString(16).padStart(2, '0'),
                blue: image.bitmap.data[idx + 2].toString(16).padStart(2, '0')
            })
            colours.push(colour)
        });
    } catch (er) {
        console.error(er);
    }

    console.log("Initial Array:")
    listColours(colours);
    colours = colours.reduce(removeDuplicates, []);
    
    console.log("Reduced Array:")
    listColours(colours);
});
