const express = require('express');
const router = express.Router();

var maxRecordPerQueryHardLimit = 100;


/** DOMAIN/games/  
 *      Does not do anything at all, give information on where to achieve some of the possible results
 */
router.get('/',(req, res, next) =>{
    res.status(200).json({message : "Get a list of all games from a specific user at /listGames/\:userID"});
});

/** Get a list of all games from a specific user from a defined page and a defined amount per page. */
router.get('/listGames/:UserId&:AmountPerPage&:PageCount',(req, res, next) =>{
    var amountPerPage = req.params.AmountPerPage;
    var pageCount = req.params.PageCount;
    if (amountPerPage>maxRecordPerQueryHardLimit) amountPerPage = maxRecordPerQueryHardLimit;
    if (amountPerPage<1) amountPerPage = 1;
    if (pageCount<0) pageCount = 0;
    res.status(200).json({message : "Get a list of all games from a specific user from a defined page and a defined amount per page."});
});

/** Lists all games from a specific user */
router.get('/listGames/:userID',(req, res, next) =>{
     res.redirect('/listGames/' + req.params.userID + '&20&0');
});

/** Register the player move by feeding the player that owns the current turn session and the coordinates
 *      The moveID is to guarantee that the player is not attempting to play turns ahead of the current one, so
 *      in case he plays 2 moves in a row, the sequence will be broken and will save the move untill the other player 
 *      makes his move.
 */
router.post('/:gameID', (req, res, next) =>{
    res.status(200).json({
        gameID : req.params.gameID,
        sessionID : req.body.sessionID,
        moveID : req.body.moveID,
        coordinates : req.body.moveCoordinates
    });
})

/** Retrieve a list of all the movements that were made after the move that gets fed. */
router.get('/:gameID&:moveID', (req, res, next) =>{
    res.status(200).json({
        gameID : req.params.gameID,
        moveID : req.params.moveID
    });
})

/** Retrieve a list of all movements that were made on a given game. */
router.get('/:gameID', (req, res, next) =>{
    res.status(200).json({
        gameID : req.params.gameID,
        moveID : req.params.moveID
    });
})

module.exports = router;