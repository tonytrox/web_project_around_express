const User = require("../models/user"); // se declara el modelo User

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users); //envia la respuesta
  } catch (err) {
    res.status(500).send({ message: "Error al obtener usuarios" }); //envia el error
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  const { userId } = req.params; // Extrae 'userId' de req.params

  try {
    const users = await User.findById(userId); // Busca un usuario por ID
    if (!users) {
      return res.status(404).send({ message: "ID de usuario no encontrado" });
    }
    res.send(users); //envia la respuesta
  } catch (err) {
    res.status(500).send({ message: "Error al obtener usuario" }); //envia el error
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body; // Desestructuración de req.body

  try {
    const user = await User.create({ name, about, avatar }); // Crea un usuario
    res.status(201).send(user); //envia la respuesta
  } catch (err) {
    res.status(500).send({ message: "Error al crear usuario" }); //envia el error
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
