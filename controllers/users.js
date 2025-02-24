const User = require("../models/user"); // se declara el modelo User
const { NotFoundError, InvalidDataError } = require("../utils/errorHandler"); // se importa el manejador de errores

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
    const users = await User.findById(userId).orFail(new NotFoundError()); // Busca un usuario por ID
    res.send(users); //envia la respuesta
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message }); //envia el error
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body; // Desestructuración de req.body

  try {
    const user = await User.create({ name, about, avatar }); // Crea un usuario
    res.status(201).send(user); //envia la respuesta
  } catch (err) {
    throw new InvalidDataError(); //lanza un error
  }
};

const updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError());
    res.send(user);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError());
    res.send(user);
  } catch (err) {
    res.status(err.statusCode || 500).send({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
