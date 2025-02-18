const User = require("../models/card");

const getCards = (req, res) => {
  User.find({})
    .then((cards) => res.send(cards))
    .catch(() =>
      res.status(500).send({ message: "Error al obtener tarjetas" })
    );
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // accedemos al ID del usuario

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(() => res.status(500).send({ message: "Error al crear tarjeta" }));
};

const deleteCard = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
    })
    .catch(() =>
      res.status(500).send({ message: "Error al eliminar tarjeta" })
    );
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
