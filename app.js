require("dotenv").config()
const express = require("express")
const { blogs, users } = require("./model/index.js")
// const multer = require("./middleware/multerConfig.js").multer
// const storage = require("./middleware/multerConfig.js").storage
const { multer, storage, storage1 } = require("./middleware/multerConfig.js")
const upload = multer({ storage: storage })
const bcrypt = require("bcrypt")
const { where } = require("sequelize")
const {
  homePage,
  singleBlog,
  deleteBlog,
  createForm,
} = require("./controller/blogController.js")
const { registerUser, loginUser, createBlog, renderRegister, renderLogin } = require("./controller/authController.js")

const app = express()
require("./model/index.js")
app.use(express.urlencoded({ extended: true })) //when both frontend and backend is in monolitic format else express.json
app.set("view engine", "ejs")

app.get("/", homePage)

app.get("/blog/:id", singleBlog)

app.get("/create", createForm)

app.get("/delete/:id", deleteBlog)

app.post("/create", upload.single("image"),createBlog)

app.get("/register", renderRegister)

app.post("/register", registerUser)

app.get("/login",renderLogin)

app.post("/login", loginUser)

app.use(express.static("public/css/"))
app.use(express.static("public/css/blog.css/"))
app.use(express.static("./storage/"))

app.listen(3000, () => {
  console.log("listening in port hoii tw")
})
