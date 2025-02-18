const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(500).send({ message: "Error al obtener usuarios" })
    );
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
  const { userId } = req.params; // Extrae 'userId' de req.params

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "ID de usuario no encontrado" });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Error al obtener usuario" }));
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch(() => res.status(500).send({ message: "Error al crear usuario" }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
