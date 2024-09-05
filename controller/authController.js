exports.registerUser = async (req, res) => {
  const { username, email, password, age } = req.body
  await users.create({
    Username: username,
    Email: email,
    Password: bcrypt.hashSync(password, 8),
    Age: age,
  })
  res.redirect("/login")
}

exports.loginUser = async (req, res) => {
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
}

exports.renderRegister = (req, res) => {
  res.render("register.ejs")
}

exports.renderLogin = (req, res) => {
  res.render("login.ejs")
}
