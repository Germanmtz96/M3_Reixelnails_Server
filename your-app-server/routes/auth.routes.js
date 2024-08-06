const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const User = require("../models/User.model");

const router = require("express").Router();

const {tokenValidation} = require("../middlewares/auth.middlewares")

// POST "/api/auth/signup" => registrar el usuario 
router.post("/signup", async (req, res, next) => {

  console.log(req.body)
  const { email, username, password ,tlf} = req.body

  // validaciones de backend
  if (!email || !password || !tlf || !username) {
    res.status(400).json({errorMessage: "Todos los campos son obligatorios"})
    return 
  }

  // verificar que la contraseña sea lo suficiente fuerte
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (passwordRegex.test(password) === false) {
    res.status(400).json({errorMessage: "La contraseña debe tener min 8 caracteres, una minuscula, una mayuscula y algun otro caracter"})
    return 
  }

  // validacion de email
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  if (emailRegex.test(email) === false){
    res.status(400).json({errorMessage: "Este correo no es valido"})
    return
  }
  // validation que el username
  const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/igm
  if (usernameRegex.test(username) === false){
    res.status(400).json({errorMessage: "El nombre de usuario no puede tener más de 16 caracteres y debe contener únicamente letras (a-z, A-Z), números y el guion bajo (_)"})
    return
  }
  
  try {

    // Verificar que no existe un usuario con el mismo correo
    const foundUser = await User.findOne( { email: email } )
    if (foundUser !== null) {
      res.status(400).json({errorMessage: "Usuario ya registrado con ese correo electronico"})
      return 
    }

    // Verificar que no existe un usuario con el mismo username
    const usernameFound = await User.findOne( { username: username } )
    if (usernameFound !== null) {
      res.status(400).json({errorMessage: "Usuario ya registrado con este nombre de usuario"})
      return 
    }


    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    
    await User.create({
      email,
      username,
      password: hashPassword
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

// POST "/api/auth/login" => autenticar al usuario (validar las credenciales) y enviar el token
router.post("/login", async (req, res, next) => {

  const {email, password} = req.body

  if (!email || !password) {
    res.status(400).json({errorMessage: "Correo y contraseña son obligatorios"})
    return
  }

  try {
    
    const foundUser = await User.findOne({email: email})
    console.log(foundUser)
    if (foundUser === null) {
      res.status(400).json({errorMessage: "Usuario no registrado con ese correo electronico"})
      return 
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (isPasswordCorrect === false) {
      res.status(400).json({errorMessage: "Contraseña incorrecta"})
      return 
    }

    // si la ruta llega a este punto ya hemos autenticado al usuario. Es el usuario es quien dice ser.

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role
    }

    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "7d" }
    )

    res.status(200).json({ authToken })

  } catch (error) {
    next(error)
  }

})


// GET "/api/auth/verify" => validar el token (existencia, autenticidad y validez)
router.get("/verify", tokenValidation, (req, res, next) => {

  console.log(req.payload) // ! para que el backend sepa quien es el usuario dueño del token. QUIEN ESTA HACIENDO LAS LLAMADAS.

  res.status(200).json(req.payload) // ! esto es para que el frontend sepa quien es el usuario dueño de ese token. QUIEN ESTA NAVEGANDO POR LA PAGINA.

})

module.exports = router