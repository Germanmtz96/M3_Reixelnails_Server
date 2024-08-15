const router = require("express").Router();
const {tokenValidation, adminValidation} = require("../middlewares/auth.middlewares");
const Horario = require("../models/Horario.model");
const transporter = require('../db/nodemailer');

// GET "/api/horarios" => el usuario ve los horarios

router.get("/", tokenValidation, async (req, res, next) => {
  
    try {
        
        const response = await Horario.find().populate('cliente')
        res.json(response)

    } catch (error) {
      next(error)
    }
  
  
  })

// POST "/api/horarios" => el admin crea un horario

router.post("/", tokenValidation, adminValidation, async (req, res, next) => {
  
    try {
        const {day,horaStart} = req.body

      await Horario.create({
        day,
        horaStart,
      })
      res.sendStatus(201)

    } catch (error) {
      next(error)
    }
  
  
  })

// PATCH "/api/horarios/:horarioId" => el admin edita un horario

router.patch("/:horarioId", tokenValidation, adminValidation, async (req, res, next) => {
      
        try {
            await Horario.findByIdAndUpdate(req.params.horarioId, {
                horaStart: req.body.horaStart
            }, {new:true})
            
        
          } catch (error) {
            console.log(error)
          }
        
        })

// DELETE "/api/horarios/:horarioId" => el admin borra un horario

router.delete("/:horarioId", tokenValidation, adminValidation, async (req, res, next) => {
    try {
      await Horario.findByIdAndDelete(req.params.horarioId)
      res.sendStatus(202)
    } catch (error) {
      next(error)
    }
  })


  // PATCH "/api/horarios/:horarioId/coger_cita => El usuario se añade a un horario de cita

  router.patch("/:horarioId/coger_cita", tokenValidation, async (req, res, next) => {
    console.log(req.payload)
    console.log(req.params.horarioId)
    try {
      await Horario.findByIdAndUpdate(req.params.horarioId, {

        servicio: req.body.servicio,
        cliente: req.payload._id

      })
      const horarioInfo = await Horario.findById(req.params.horarioId).populate("cliente")
      
      await transporter.sendMail({
        from: `"Registro Reixelnails" <${process.env.EMAIL_USER}>`, 
        to: req.payload.email, 
        subject: "¡Su cita Reixelnails! ✔",
        html: `
        <div style="background-color:rgb(211, 183, 161); text-align:center;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
          <h1 style="color:white;
                 font-size:50px;
                 padding:10px;
                 padding-top:60px;">¡Hola ${req.payload.nombreCompleto}!</h1>
          <p style="padding: 15px;font-size:20px;">¡Gracias por confiar para su ${req.params.horarioId.servicio}! Estamos emocionados de tener la oportunidad de trabajar con usted y hacer todo lo posible para que su experiencia sea excelente.</p>
          <p style="padding: 15px;font-size:20px;">Su cita es el día ${req.params.horarioId.day} a las ${req.params.horarioId.horaStart}. Recuerde ser puntual. ¡Nos vemos pronto!</p>
          <div>
              <p style="padding: 10px;font-size:20px;">Un saludo,</p>
              <p style="padding-bottom: 10px;font-size:20px;">El equipo de Reixelnails</p>
          </div>
      </div>
        `, 
      }, res.status(200).json(horarioInfo)
      );

    } catch (error) {
      next(error)
    }
  })


  //PATCH "/api/horarios/:horarioId/quitar_cita" => El usuario se quita de un horario de cita

  router.patch("/:horarioId/quitar_cita", tokenValidation, async (req, res, next) => {
    
    try {
      const response = await Horario.findById(req.params.horarioId)

       if(response.cliente === req.payload._id || req.payload.role === "admin"){ 

        await Horario.findByIdAndUpdate(req.params.horarioId, {
  
          servicio : null,
          cliente : null
  
        })
        res.status(202).json({ message: "La cancelación de la cita fue exitosa."})
 
      }else {
        res.status(403).json({ message: "No tienes permiso para cancelar esta cita." });
        }
 
    } catch (error) {
      next(error)
    }
  })

  module.exports = router