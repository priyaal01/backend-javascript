const express =require("express");
const path=require("path");
const app=express();
const fs=require("fs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
    fs.readdir("./files",(err,files)=>{
        res.render("index",{files:files});
    })
});

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join(" ")}.txt`,req.body.details,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
        })
});

app.get("/files/:filename",(req,res)=>{
    const filename=req.params.filename;
    fs.readFile(`./files/${filename}`,"utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.render("file",{filename:filename,data:data});
        }
    })
});

app.get("/edit/:filename",(req,res)=>{
    const filename=req.params.filename;
    res.render("edit",{filename:filename});

});

app.post("/edit",(req,res)=>{
    const filename=req.body.previous;
    const newFilename=req.body.new;
    fs.rename(`./files/${filename}`, `./files/${newFilename}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});