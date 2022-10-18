const router = require("express").Router();
const { Score, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    console.log(req.session.user_id);
    // Pass serialized data and session flag into template
    const userData = await User.findByPk(req.session.user_id);
    console.log(userData);

    if (userData === null) {
      res.render("homePage", {
        loggedIn: req.session.logged_in
      });
    }
    else {
      const user = userData.get({ plain: true });
      res.render("homePage", {
        loggedIn: req.session.logged_in,
        user
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", withAuth, async (req, res) => {
  // todo: add more queries and entries to go off of?
  try {
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ],      
      where: {
        user_id: req.session.user_id,
      }
    });

    const scores = scoreData.map((score) => score.get({ plain: true }));

    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true }); 
    

    res.render("personalStats", {
      loggedIn: req.session.logged_in,
      user,
      highscore: Math.max(Math.max(...scores.map(o => o.score)), 0),
      runs: scores.length
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/scores", withAuth, async (req, res) => {
  try {
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ],
      limit: 10,
      order: [
        ['score', 'DESC']
      ]
    });


    // This is how to get user data to show when a user is logged in
    // its not good but it works
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });

    const scores = scoreData.map((score) => score.get({ plain: true }));

    res.render("highScores", {
      loggedIn: req.session.logged_in,
      scores,
      user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signupPage", {
      doNotShowButtons: true,
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("loginPage", {
      doNotShowButtons: true,
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
