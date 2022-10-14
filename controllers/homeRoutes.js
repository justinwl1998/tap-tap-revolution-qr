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

router.get("/stats", async (req, res) => {
  try {
    res.render("personalStats", {
      doNotShowButtons: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/scores", async (req, res) => {
  try {
    res.render("highScores", {
      doNotShowButtons: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signupPage", {
      doNotShowButtons: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("loginPage", {
      doNotShowButtons: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
