try {
  require('colors');
} catch (e) {}
var fs = require('fs');
var protoc = require('./protobuf').parse;
var util = require('util');

var file = process.argv[2];
if (file) {
  run(file, file);
} else {
  var testDataFolder = './testData/'
  var list = fs.readdirSync(testDataFolder);
  list.forEach(function(item) {
    if (!/\.proto$/.test(item)) return;
    run(testDataFolder + item, item);
  });
}

function run(file, item) {
  var protoSource = fs.readFileSync(file).toString();
  try {
    var protoTree = protoc(protoSource);
    console.log('%s is passed.'.green, item);
    //console.log(protoTree);
  } catch (e) {
    console.log('%s is not passed. err: %s'.red, item, e.message.red);
  }
}
