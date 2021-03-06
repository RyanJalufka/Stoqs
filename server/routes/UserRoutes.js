var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController.js");

router.get("/", UserController.list);
router.get("/:id", UserController.show);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);

// Login / Registration Routes for users
//-------------------------------------------

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
