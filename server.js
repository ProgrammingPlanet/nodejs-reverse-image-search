const express = require('express')

const app = express()

require('./routes')(app)

app.use(express.static('public'))


const HOST = '0.0.0.0'
const PORT = 6001 || process.env.PORT


const listener = app.listen(PORT, HOST, () => {
  console.log(`APP is listing on port ${PORT}`)
})
