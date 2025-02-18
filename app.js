const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "67b423a2be796c6f0c6c85cc", // _id del usuario de prueba
  };

  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
