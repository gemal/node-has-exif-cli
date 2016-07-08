'use strict';

const ExifImage = require('exif').ExifImage;

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
            break;
          }
        }
      }
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = {
  parseFile: parseFile
};
