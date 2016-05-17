class FileSaver {
  constructor( filePath ) {
    this.openFile( filePath )
    this.filePath = filePath
  }

  openFile( filePath ) {
    this.fd = fs.openSync(filePath, 'a', fileOpenErr)
  }

  writeFile( contents ) {
    fs.writeSync(this.fd, contents)
  }

  closeFile() {
    fs.close( this.fd )
  }

  deleteFile() {
    fs.unlinkSync( this.filePath )
  }

  static deleteFileStatic( filePath ) {
    fs.unlinkSync( filePath )
  }
}