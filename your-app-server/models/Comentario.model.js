const {Schema, model} = require("mongoose")

const comentarioSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref:'User'
}
})



const Comentario = model( "Comentario", comentarioSchema )

module.exports = Comentario