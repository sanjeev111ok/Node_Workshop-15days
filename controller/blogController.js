exports.homePage = async (req, res) => {
  const datas = await blogs.findAll()
  res.render("home.ejs", { blogs: datas })
}

exports.singleBlog = async (req, res) => {
  const id = req.params.id
  const blog = await blogs.findByPk(id)
  res.render("singleBlog.ejs", { blog: blog })
}

exports.deleteBlog = async (req, res) => {
  const id = req.params.id
  await blogs.destroy({
    where: {
      id: id,
    },
  })
  res.redirect("/")
}

exports.createForm = (req, res) => {
  res.render("create.ejs")
}

exports.createBlog = async (req, res) => {
  const filename = req.file.filename
  const { title, subtitle, description } = req.body
  await blogs.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  })
  res.send("Blog added successfully")
}
