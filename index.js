const express = require("express")
var bodyParser = require('body-parser')
const e = express()
const yt = require('ytdl-core');
e.use( bodyParser.json() );      
e.use(bodyParser.urlencoded({    
  extended: true
})); 
//e.use(function(req, res, next) { bug .-.
   // res.status(404).sendFile(__dirname+"/404.html")
  //});
e.get("/",(req,res) =>{
            res.sendFile(__dirname+"/index.html")

    })
e.post("/mp3",(req,res) =>{
    var ytid = `https://www.youtube.com/watch?v=${req.body.id}`
    if(yt.validateURL(ytid) == true){
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');

        yt(ytid, {
            format: 'mp4'
        }).pipe(res);
    }else{
        res.redirect("/")
    }
})
e.get('*', function(req, res){
    res.status(404).sendFile(__dirname+"/404.html");
  });
    


e.listen(3631)