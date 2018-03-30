const fs = require('fs')

fs.readdir('./output', (err, data) => {
    console.log(err, data)
})