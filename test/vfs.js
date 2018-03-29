const vfs = require('vinyl-fs')
const through = require('through2')


vfs.src(['./output/**','./output/.*','./output/.*/**'])
    .pipe(through.obj(function(file, enc, cb){
        this.push(file)
        cb()
    }))
    .pipe(vfs.dest(`./output2`))
    .on('end', function (err) {
        console.log('完成')
    })
    .resume()
