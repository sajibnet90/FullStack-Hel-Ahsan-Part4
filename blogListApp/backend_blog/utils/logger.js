const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { // if test environment don't console info
    console.log(...params)
  }
}
  
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { // if test environment don't console error
    console.error(...params)
  }
}
  
  module.exports = {
    info, error
  }