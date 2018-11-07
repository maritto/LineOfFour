const express = require('express');
const router = express.Router();

/** List all players currently in the waiting list. */
router.get('/',(req, res, next) =>{
    res.status(200).json({message : "List of all Players in the waiting list."});
});

/** Register the player in a waiting list. */
router.post('/',(req, res, next) =>{
    res.status(200).json({message : "Register player in the waiting list."});
});

/** Creates a new waiting list with the key sent, once another player joins a game is started.
 *      The new game id is stored in this waiting list, and when the other player gets notified of the new game room 
 *      id this waiting list entry is deleted.
 */
router.post('/:gameKey', (req, res, next) =>{
    res.status(200).json({
        gameID : req.params.gameKey,
        sessionID : req.body.sessionID
    });
})

module.exports = router;