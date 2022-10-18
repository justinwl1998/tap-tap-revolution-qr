const router = require("express").Router();
const { Score } = require("../../models");
const withAuth = require("../../utils/auth");

// used to get the user's current highest score
router.get('/', withAuth, async (req, res) => {
    console.log("GET route called");
    console.log("Attempting to find user ID: " + req.session.user_id);
    try {
        const scoreData = await Score.findOne({
            where: { user_id: req.session.user_id }
        });
        const score = scoreData.get({ plain: true });
        console.log(scoreData)

        console.log(score);

        if (scoreData) {
            return res.status(200).json(score);
        }
        else {
            return res.status(404).json(score);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// used to put a new score entry with the logged in user's ID
router.post('/:score', withAuth, async (req, res) => {
    console.log("POST route called");
    try {
        const newScore = await Score.create({
            score: req.params.score,
            user_id: req.session.user_id,
        });

        res.status(200).json(newScore);

    }
    catch (err) {
        res.status(500).json(err);
    }

});

// used to update a user's high score
router.put('/:score', withAuth, async (req, res) => {
    console.log('PUT route called');
    try {
        const updatedScore = await Score.update({
            score: req.params.score,
        },
        { where: { user_id: req.session.user_id}});

        res.status(200).json(updatedScore);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
