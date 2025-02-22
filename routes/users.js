const router = require("express").Router(); // const router = express.Router();

const { getUsers, getUserById, createUser } = require("../controllers/users");

router.get("/", getUsers); // Cuando se solicita /, se invoca getUsers
router.get("/:userId", getUserById);
router.post("/", createUser);

module.exports = router;
