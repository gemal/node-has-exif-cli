# has-exif-cli
Node command line interface to check if an image file has EXIF data. It can be used in CI automation.

## Install

`npm install -g has-exif-cli`

## Execute

`has-exif-cli /path/to/FILE.JPG`

## How to use in continuous integration automation like Scrutinizer, travis etc
To make sure your checked in jpg files dont have EXIF data included in them:

`find ./ -name '*.jpg' | xargs --verbose has-exif-cli`

## Badges

[![CircleCI](https://circleci.com/gh/gemal/node-has-exif-cli.svg?style=svg)](https://circleci.com/gh/gemal/node-has-exif-cli)

[![codecov](https://codecov.io/gh/gemal/node-has-exif-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/gemal/node-has-exif-cli)

[![StyleCI](https://github.styleci.io/repos/62882041/shield?branch=master)](https://github.styleci.io/repos/62882041)

[![Known Vulnerabilities](https://snyk.io/test/github/gemal/node-has-exif-cli/badge.svg)](https://snyk.io/test/github/gemal/node-has-exif-cli)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/gemal/node-has-exif-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/gemal/node-has-exif-cli/alerts/)
