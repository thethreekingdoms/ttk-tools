const fs = require('fs')


fs.stat('./demo.js', (err, stats)=>{
    console.log(err)
    console.log(stats)
})