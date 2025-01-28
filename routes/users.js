const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const getUsersFile = () => {
  return fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), { encoding: 'utf8' })
    .then(JSON.parse)
    .catch(() => {
      console.error('Error al leer el archivo users.json');
      return [];
    });
};

router.get('/', (req, res) => {
  getUsersFile()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Error al obtener usuarios' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  getUsersFile()
    .then((users) => {
      const user = users.find((user) => user._id === id);
      if (!user) {
        res.status(404).send({ message: "ID de usuario no encontrado" });
        return;
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: 'Error al obtener usuario' }));
});

module.exports = router;