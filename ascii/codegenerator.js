/*
 * This file generates the fonts dropdown based on all the files in the 'font' directory.
 */

const fs = require("fs");

let fonts = fs.readdirSync("./fonts/");
const file = "./fonts.html";

fs.writeFileSync(
    file,
    '<label for="font">Font: </label>\n<select id="font">\n'
);
fonts.forEach((item, i) => {
    fontFile = item.replace(".flf", "");
    fs.appendFileSync(
        file,
        `    <option value="${fontFile}"${
            fontFile == "Standard" ? " selected" : ""
        }>${fontFile}</option>\n`
    );
});
fs.appendFileSync(file, "</select>\n");
console.log("done");
