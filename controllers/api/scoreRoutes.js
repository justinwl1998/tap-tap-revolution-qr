const router = require("express").Router();
const { Score } = require("../../models");
const withAuth = require("../../utils/auth");

// used to get the user's current highest score
router.get('/', withAuth, async (req, res) => {
    console.log("GET route called");
    console.log("Attempting to find user ID: " + req.session.user_id);
    try {
        const scoreData = await Score.findByPk(req.session.user_id);
        const score = scoreData.get({ plain: true });
        console.log(scoreData)

        console.log(score);

        if (scoreData) {
            return res.status(200).json(scoreData);
        }
        else {
            return res.status(404).json(scoreData);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// used to put a new score entry if there is no score entry in the database with the logged in user's ID
router.post('/', withAuth, async (req, res) => {
    console.log("POST route called");
    try {

    }
    catch (err) {
        res.status(500).json(err);
    }

});

// used to update a user's high score
router.put('/', withAuth, async (req, res) => {

})

module.exports = router;
