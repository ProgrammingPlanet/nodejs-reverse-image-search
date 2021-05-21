const express = require('express')

const app = express()

require('./routes')(app)

app.use(express.static('public'))


// const HOST = '0.0.0.0'
const PORT = process.env.PORT


// force https 
app.enable('trust proxy')
app.use((req, res, next) => {
  console.log('https://' + req.headers.host + req.url)
  req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})
// end force https

const listener = app.listen(PORT, /*HOST,*/ () => {
  console.log(`APP is listing on port ${PORT}`)
})
