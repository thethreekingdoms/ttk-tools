const request = require('request')
request('https://thethreekingdoms.github.io/demo.json', (error, response, body)=>{
    console.log(JSON.parse(body))
})