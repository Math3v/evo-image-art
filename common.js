const fs = require('fs')
const resemble = require('resemblejs')
const Genetic = require('genetic-js')
const _ = require('underscore')

function fileOpenErr(err, fd) {
  if( err ) {
    console.error("Open error: ", err, fd);
  }
}