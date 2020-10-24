
const express = require('express')
const app = express()
const port = 3000

//app.get('/', (req, res) => res.send('Hello World!'))

const router = require('../app/biz/router/home/HomeRouter');
app.use('/index',router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
