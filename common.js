const fs = require('fs')
const resemble = require('resemblejs')

function fileOpenErr(err, fd) {
  if( err ) {
    console.error("Open error: ", err, fd);
  }
}