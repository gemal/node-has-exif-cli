# has-exif-cli
Node command line interface to check if an image file has EXIF data. It can be used in CI automation.

## Install

`npm install -g has-exif-cli`

## Execute

`has-exif-cli /path/to/FILE.JPG`

## How to use in continuous integration automation like Scrutinizer, travis etc
To make sure your checked in jpg files dont have EXIF data included in them:

`find ./ -name '*.jpg' | xargs --verbose has-exif-cli`
