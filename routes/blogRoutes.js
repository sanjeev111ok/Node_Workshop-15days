const {
  homePage,
  singleBlog,
  createForm,
  deleteBlog,
  createBlog,
} = require("../controller/blogController")

const router = require("express").Router()

router.route("/").get(homePage)
router.route("/blog/:id").get(singleBlog)
router.route("/create").get(createForm).post(createBlog)
router.route("/delete/:id").get(deleteBlog)

module.exports = router
