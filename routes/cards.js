const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const getCardsFile = () => {
  return fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'), { encoding: 'utf8' })
    .then(JSON.parse)
    .catch(() => {
      console.error('Error al leer el archivo cards.json');
      return [];
    });
};

router.get('/', (req, res) => {
  getCardsFile()
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: 'Error al obtener tarjetas' }));
});

module.exports = router;