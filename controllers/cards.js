const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener tarjetas" });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id; // accedemos al ID del usuario

  try {
    const card = await Card.create({ name, link, owner });
    res.status(201).send(card);
  } catch (err) {
    res.status(500).send({ message: "Error al crear tarjeta" });
  }
};

const deleteCard = async (req, res) => {
  const cardId = req.params.cardId;

  try {
    const card = await Card.findByIdandRemove(cardId);
    if (!card) {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    res.send(card);
  } catch (err) {
    res.status(500).send({ message: "Error al eliminar tarjeta" });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
