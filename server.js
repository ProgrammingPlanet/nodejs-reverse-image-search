const express = require('express')

const app = express()

require('./routes')(app)

app.use(express.static('public'))


const HOST = '0.0.0.0'
const PORT = process.env.PORT || 3000





const listener = app.listen(PORT, HOST, () => {
  console.log(`APP is listing on port ${PORT}`)
})
