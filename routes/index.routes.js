const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes.js")
router.use("/users", userRouter)

const comentarioRouter = require("./comentario.routes.js")
router.use("/comentarios", comentarioRouter)

const horarioRouter = require("./horario.routes.js")
router.use("/horarios", horarioRouter)

const publicacionRouter = require("./publicacion.routes.js")
router.use("/publicaciones", publicacionRouter)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)


module.exports = router;
