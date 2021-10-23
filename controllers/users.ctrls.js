const db = require('../models')
const bcrypt = require('bcrypt')

const signup = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  db.User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({error: error.message})
    } else {
      res.status(201).json(createdUser)
    }
  })
}

const signin = (req, res) => {
  db.User.findOne({username: req.body.username}, (error, foundUser) => {
    if (error) {
      res.send(error)
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser
          res.status(200).json(foundUser)
        } else {
          res.status(404).json({error: 'Incorrect Password or Username...'})
        }
      } else {
        res.status(400).json({error: error})
      }
    }
  })
}

const signout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({msg: 'User signed out'})
  })
}

module.exports = {
  signup,
  signin,
  signout,
}
