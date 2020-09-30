/*
 * ColourOrganizer
 * By: Pongles
 * Organizes a list of hex colour codes by RGB,
 * creating a "ramp" per colour where it is the highest of the three, 
 * and then sorting by the value of the other two.
 * 
 * I don't know if this will create anything usable, but let's see!
 */

var JIMP = require('jimp');
var Colour = require('./classes/colour')


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
    colours.forEach(colour => {
        console.log(colour.hex);
    })
});