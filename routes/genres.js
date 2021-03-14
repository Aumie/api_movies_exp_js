const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
//const asyncMiddleware = require('../middleware/async')

// no longer need next cause its in asyncmiddleware
//asynceMiddleware will be used by package express-async-errors
router.get('/',/*asyncMiddleware(*/async (req, res/*, next*/) => {
    //try { // if put try catch like this it will be  repeated in many files
        const genres = await Genre.find().sort('name');
        res.send(genres);
    //}
    //catch (ex) {
        //500 internal server error
        //log the exception
        //res.status(500).send('Something failed');// move to hendle error modle
        //next(ex);
    //}
})/*)*/;

router.post('/', [auth,admin],async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }/*update where*/, {
    new: true //show new one
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;