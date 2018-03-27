// const { spawn } = require('child_process');
// const ps = spawn('cmd.exe',['\s', '\c', 'dir']);

// ps.stderr.on('data', (data) => {
//     console.log(`ps stderr: ${data}`);
// });

// ps.stderr.on('data', (data) => {
//     console.log(`grep stderr: ${data}`);
// });
// ps.on('close', (code) => {
//     if (code !== 0) {
//       console.log(`ps 进程退出码：${code}`);
//     }
//     console.log('完成')
// });

// ps.on('close', (code) => {
//     console.log(`子进程退出码：${code}`);
// })
const path = require('path')
const { join, basename } = path
const spawn = require('cross-spawn');
 
// Spawn NPM asynchronously
const child = spawn('mkdir', ['aaaa' ], { stdio: 'inherit', cwd: process.cwd() });
console.log(child)