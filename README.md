# has-exif-cli
Node command line interface to check if an image file has EXIF data. It can be used in CI automation. Supports both JPG and WEBP image format

## Install

`npm install -g has-exif-cli`

Requires Node.js 22.12.0 or newer.

## Execute

`has-exif-cli /path/to/FILE.JPG`

### Options

- `--xmp` also fail if XMP metadata is found
- `--iptc` also fail if IPTC metadata is found

### Exit codes

- `0` no metadata found
- `1` EXIF (or, with the flags above, XMP/IPTC) metadata found
- `2` a file could not be checked (unreadable, missing or unsupported format)

## How to use in continuous integration automation like Scrutinizer, travis etc
To make sure your checked in jpg, webp and other image files dont have EXIF data included in them:

`find ./ -name '*.jpg' | xargs --verbose has-exif-cli`

## Badges

[![Release](https://github.com/gemal/node-has-exif-cli/actions/workflows/release.yml/badge.svg)](https://github.com/gemal/node-has-exif-cli/actions/workflows/release.yml)

[![codecov](https://codecov.io/gh/gemal/node-has-exif-cli/graph/badge.svg?token=9F3FDBSVHU)](https://codecov.io/gh/gemal/node-has-exif-cli)

[![StyleCI](https://github.styleci.io/repos/62882041/shield?branch=main)](https://github.styleci.io/repos/62882041?branch=main)

[![Known Vulnerabilities](https://snyk.io/test/github/gemal/node-has-exif-cli/badge.svg)](https://snyk.io/test/github/gemal/node-has-exif-cli)
