const express = require('express');
const path= require('path');
const app = express();
const fs  = require('fs');
app.set("view engine",'ejs');
app.set('views','views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.get("/", (req,res)=>{
     fs.readdir('./files',(err,files)=>{
       
        res.render("index", {files:files}); //sended file
     })
});
app.post('/submit' , (req,res)=>{
   fs.writeFile(`./files/${req.body.title.split(" ").join("")}`,req.body.description,(err)=>{

   });
   res.redirect('/');
})
app.get("/files/:filename" , (req,res)=>{
   fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
      res.render("details",{data:data,title:req.params.filename})
   })
   
})
app.get("/edit/:filename",(req,res)=>{
   res.render("edit",{title:req.params.filename});

})
app.post("/edit",(req,res)=>{
fs.rename(`files/${req.body.previous_name}`,`files/${req.body.new_name}`,(err)=>{
})
res.redirect("/")
})
app.get("/remove/:filename",(req,res)=>{
   fs.unlink(`files/${req.params.filename}`,(err)=>{

   })
   res.redirect("/");
 
})
app.listen(3000,()=>{
    console.log("http://localhost:3000");
})