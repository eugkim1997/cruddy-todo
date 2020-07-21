const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};
// reads the counter File, if file is not found, return null and 0
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => { // 1
  var counterString = zeroPaddedNumber(count); // 1     00001
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////



exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
  readCounter((error, count) => {
    writeCounter(count + 1, (error, fiveDigitCount) => {
      callback(error, fiveDigitCount)
    })
  })
};


/*
exports.getNextUniqueId = (callback) => {

  readCounter( function (error, count) => count


  {
    writeCounter( count , (error, count) => count

    error   you get an error
    success (null,  count)
  })



  readCounter((error, count) => {
    writeCounter(count + 1, (error, count) => {
      callback(error, count)
    }
  })
}
*/

/*
let example = function (anotherFunction) {
  let A = 'A'
  anotherFunction(A) {
    let B = 'B'
    A = A + B
  }

  return A
}
*/
https://us04web.zoom.us/j/76644069323?pwd=cDFmQ3BJTGVvSDZTM1NiUG5XSTNEUT09



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
