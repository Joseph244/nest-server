// const args = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');
let name = process.argv[2];
if (name) {
  shell.exec(`nest g co ${name}`);
  shell.exec(`nest g mo ${name}`);
  shell.exec(`nest g s ${name}`);
} else {
  console.error('未输入模块名');
}
