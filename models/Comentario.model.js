const {Schema, model} = require("mongoose")


const comentarioSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref:'User'
},
  publicacion : {
    type: Schema.Types.ObjectId,
    ref:'Publicacion'
  }
})



const Comentario = model( "Comentario", comentarioSchema )

module.exports = Comentario