require("dotenv").config()
const express = require("express")
const { blogs } = require("./model/index.js")
const app = express()
require("./model/index.js")
app.use(express.urlencoded({ extended: true })) //when both frontend and backend is in monolitic format else express.json
app.set("view engine", "ejs")

app.get("/create", (req, res) => {
  res.render("create.ejs")
})

app.post("/create", async (req, res) => {
  const { title, subtitle, description } = req.body
  await blogs.create({
    title: title,
    subtitle: subtitle,
    description: description,
  })
  res.send("Blog added successfully")
})
app.use(express.static("public/css/"))

app.listen(3000, () => {
  console.log("listening in port hoii tw")
})
