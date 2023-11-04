var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir("./uploads",{withFileTypes:true}, function(err, files){
    res.render('index',{files:files});
  })
});

router.get('/createfile', function(req, res, next) {
  fs.writeFile(`./uploads/${req.query.filename}`,'',function(err){
    if(err) res.send(err);
    else res.redirect("back");
  })
});

router.get('/createfolder', function(req, res, next) {
  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){
    if(err) res.send(err);
    else res.redirect("back");
  })
});

router.get('/file/:filename', function(req, res){
  fs.readdir("./uploads",{withFileTypes:true}, function(err, files){
    fs.readFile(`./uploads/${req.params.filename}`,"utf8",function(err, data){
      res.render("opened", {files:files, filename: req.params.filename, filedata: data});
    })
  })
})

router.post("/filechange/:filename",function(req, res){
  fs.writeFile(`./uploads/${req.params.filename}`, req.body.filedata, function(err){
    res.redirect("back");
  })
})

router.get("/deletefile",function(req, res){
  fs.unlink(`./uploads/${req.query.deletedfilename}`,function(err){
    res.redirect("/");
  })
})

router.get("/renamefile",function(req, res){
  fs.readdir("./uploads",{withFileTypes:true}, function(err, files){
    fs.renameSync(`./uploads/${req.query.enterfilenameagainforrename}`,`./uploads/${req.query.newfilename}`)
    res.redirect("/")
  })
})








module.exports = router;