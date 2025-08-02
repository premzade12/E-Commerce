import express from "express";

let port = 8000;

let app = express();

app.get('/',(req,res)=>{
    res.send("Hello From world")
})

app.listen(port, ()=>{
    console.log("Hello From Server");
})

