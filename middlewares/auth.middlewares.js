const jwt = require("jsonwebtoken")

function tokenValidation(req, res, next) {
  try {
    const tokenArr = req.headers.authorization.split(" ")
    const token = tokenArr[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)

    req.payload = payload

    next() 
  } catch (error) {
    res.status(401).json({errorMessage: "Token no existe o no es valido"})
  }
}

function adminValidation(req, res, next) {

  if (req.payload.role === "admin") {
    next() 
  } else {
    res.status(401).json({ errorMessage: "No puedes acceder porque no eres admin" })
  }

}

module.exports = { tokenValidation, adminValidation }