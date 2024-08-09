const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.']
    },
    tlf: { 
      type: Number, 
      required: [true, 'El telefono es obligatorio.']
    },
    nombreCompleto:{
      type: String,
      required: [true, 'El nombre es obligatorio.']
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" }
  },
  {    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
