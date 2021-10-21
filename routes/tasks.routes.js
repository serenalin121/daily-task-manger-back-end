const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.get("/", ctrls.tasks.index);
router.post("/", ctrls.tasks.create);
router.put("/:id", ctrls.tasks.update);
router.delete("/:id", ctrls.tasks.destroy);

module.exports = router;
