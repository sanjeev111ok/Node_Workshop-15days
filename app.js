require("dotenv").config()
const express = require("express")
const { blogs } = require("./model/index.js")
// const multer = require("./middleware/multerConfig.js").multer
// const storage = require("./middleware/multerConfig.js").storage
const { multer, storage, storage1 } = require("./middleware/multerConfig.js")
const upload = multer({ storage: storage })

const app = express()
require("./model/index.js")
app.use(express.urlencoded({ extended: true })) //when both frontend and backend is in monolitic format else express.json
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
  const datas = await blogs.findAll()
  res.render("home.ejs", { blogs: datas })
})

app.get("/create", (req, res) => {
  res.render("create.ejs")
})

app.post("/create", upload.single("image"), async (req, res) => {
  const filename = req.file.filename
  const { title, subtitle, description } = req.body
  await blogs.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  })
  res.send("Blog added successfully")
})
app.use(express.static("public/css/"))
app.use(express.static("./storage/"))

app.listen(3000, () => {
  console.log("listening in port hoii tw")
})
