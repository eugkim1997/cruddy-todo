const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // getNextUniqueId(err, id)
  //  file = (exports.dataDir, ${id}.txt) 00001.txt
  //  fs.writeFile(file, text, (err))
  counter.getNextUniqueId((err, id) => {
    let filepath = path.join(exports.dataDir, `${id}.txt`);
    fs.writeFile(filepath, text, (error) => {
      if (error) {
        callback(error);
      } else {
        callback(null, { id, text });
      }
    });
  });
};

//   var id = counter.getNextUniqueId();
//   items[id] = text;
//   callback(null, { id, text });
// };

exports.readAll = (callback) => {
  var arr = [];
  fs.readdir(exports.dataDir, (error, files) => {
    if (error) {
      callback(error);
    } else {
      for (let i = 0; i < files.length; i++) {
        arr.push({'id': files[i].split('.')[0], 'text': files[i].split('.')[0]});
      }
      callback(null, arr);
    }
  });

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, text) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {'id': id, 'text': String(text)});
    }
  });


  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {

  let filepath = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(filepath, (error) => {
    if (error) {
      callback(error);
      console.log('file id does not exist');
    } else {
      fs.writeFile(filepath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {'id': id, 'text': text});
        }
      });
    }
  });
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
