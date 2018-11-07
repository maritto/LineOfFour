const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) =>{
    res.status(200).json({message: 'Need username, password and email in a post request to perform the creation of a new user.'});
});

/** Creates a new user with the given authentication details. */
router.post('/', (req, res, next) =>{

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.pwd,
        wins: 0,
        date: new Date()
    });

    user.save().then((result) => {
        console.log(result);
        res.status(200).json({
            Username : req.body.username,
            Password : req.body.pwd
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message : err
        });
    });;

});

/** Retrieves data from a specific user.
 *      Data in the json returned: username, win count, register date.
 */
router.get('/:userID', (req, res, next) =>{
    User.findById(req.params.userID).then((result) =>{
        res.status(200).json({
            username : result.username,
            wins: result.wins,
            registerDate: result.date 
        });
    }).catch((err) =>{
        res.status(500).json({message: err});
    });
});

/** Updates user data.
 *      Possible uses: Win count increase(wins), username(username) change, password(password) update.
 *  TODO:: STILL DOES NOT REQUIRE AUTHENTICATION TO CHANGE ANY DATA -- CRITICAL SECURITY RISK
 */
router.post('/:userID', (req, res, next) =>{

    User.updateOne({_id: req.params.userID},{ $set: req.body })
    .then((result) =>{
        res.status(200).json(result);
    }).catch((err) =>{
        res.status(500).json({message: err});
    });
});

module.exports = router;