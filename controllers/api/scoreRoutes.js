const router = require("express").Router();
const { Score } = require("../../models");

router.get('/', async (req, res) => {
    console.log("GET route called");
    console.log("Attempting to find user ID: " + req.session.user_id);
    try {
        const scoreData = await Score.findByPk(req.session.user_id);
        const score = scoreData.get({ plain: true });
        console.log(scoreData)

        console.log(score);

        if (scoreData) {
            return res.status(400).json(scoreData);
        }
        else {
            return res.status(404).json(scoreData);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
