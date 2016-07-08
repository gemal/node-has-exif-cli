'use strict';

const ExifImage = require('exif').ExifImage;

var hasexif = false;

const parseFile = (filePath) => {
  try {
    new ExifImage({ image : filePath }, function (error, exifData) {
      if (error) {
        return console.log(`Error: ${error.message}`);
      }
      console.log("Checking:" + filePath);
      for (var key in exifData) {
        if (exifData.hasOwnProperty(key)) {
          if (Object.keys(exifData[key]).length != 0) {
            console.warn(exifData);
            hasexif = true;
            break;
          }
        }
      }
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

if (hasexif) {
  process.exit(1);
}

module.exports = {
  parseFile: parseFile
};
