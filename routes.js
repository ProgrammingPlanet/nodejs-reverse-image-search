module.exports = function(app){

  app.get("/", (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
  })
  
  app.get("/img", (req,res) => {
    res.sendFile(__dirname + '/public/img.html')
  })
    
}