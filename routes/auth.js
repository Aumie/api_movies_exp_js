const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    //.compare will get salt form user.password then rehash the fillid one
    if (!validPassword) return res.status(400).send('Invalid email or password.');


    const token = user.generateAuthToken();
    //const token = jwt.sign({ _id: user._id },config.get('jwtPrivateKey')); move to user model
    res.send(token);
    //if wanna log out just delete x-auth-token in req.header

});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(req, schema);
}


module.exports = router;