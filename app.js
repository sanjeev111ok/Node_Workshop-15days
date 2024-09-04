require("dotenv").config()
const express = require("express")
const { blogs, users } = require("./model/index.js")
// const multer = require("./middleware/multerConfig.js").multer
// const storage = require("./middleware/multerConfig.js").storage
const { multer, storage, storage1 } = require("./middleware/multerConfig.js")
const upload = multer({ storage: storage })
const bcrypt = require("bcrypt")
const { where } = require("sequelize")

const app = express()
require("./model/index.js")
app.use(express.urlencoded({ extended: true })) //when both frontend and backend is in monolitic format else express.json
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
  const datas = await blogs.findAll()
  res.render("home.ejs", { blogs: datas })
})

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id
  const blog = await blogs.findByPk(id)
  res.render("singleBlog.ejs", { blog: blog })
})

app.get("/create", (req, res) => {
  res.render("create.ejs")
})

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id
  await blogs.destroy({
    where: {
      id: id,
    },
  })
  res.redirect("/")
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

app.get("/register", (req, res) => {
  res.render("register.ejs")
})

app.post("/register", async (req, res) => {
  const { username, email, password, age } = req.body
  await users.create({
    Username: username,
    Email: email,
    Password: bcrypt.hashSync(password, 8),
    Age: age,
  })
  res.redirect("/login")
})

app.get("/login", (req, res) => {
  res.render("login.ejs")
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const data = await users.findAll({
    where: {
      email: email,
    },
  })

  if (data.length == 0) {
    res.send("no user with that email")
  } else {
    const isMatched = bcrypt.compareSync(password, data[0].Password)

    if (isMatched) {
      res.redirect("/create")
      // res.send("dsdssdf")
    } else {
      res.send("Invalid password")
    }
  }
})

app.use(express.static("public/css/"))
app.use(express.static("public/css/blog.css/"))
app.use(express.static("./storage/"))

app.listen(3000, () => {
  console.log("listening in port hoii tw")
})
