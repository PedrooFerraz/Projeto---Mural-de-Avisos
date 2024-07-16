const express = require("express")
const router = express.Router()
const posts = require("../model/posts")
const bodyParser = require("body-parser")

router.get("/all", (req, res)=>{
    res.json(JSON.stringify(posts.getAll()))
})

router.post("/new",bodyParser.json(), (req, res)=>{

    let title = req.body.title;
    let description = req.body.description;
    
    posts.newPost(title, description)

    res.send("Post criado") 

})

router.delete("/remove",bodyParser.json(), (req, res)=>{

    posts.removePost(req.body.id)

    res.send("Post Removido")

})

module.exports = router