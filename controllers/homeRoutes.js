const router = require("express").Router();
const { Score, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render("homePage");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
