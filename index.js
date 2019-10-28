// implement your API here
const express = require('express');

const users = require('./data/db.js');

const server = express();

server.use(express.json());


// POST
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if ( !name && !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    users
        .insert(req.body)
        .then(user => {
        res.status(201).json(user);
      })
        .catch(() => {
         res.status(500).json({
          errorMessage:
            'There was an error while saving the user to the database',
        });
      });
  }
});

//GET
server.get('/api/users', (req, res) => {
    users
    .find()
        .then(users => {
          res.status(200).json(users);
     })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved.',
      });
    });
});

//GET BY ID
server.get('/api/users/:id', (req, res) => {
    users
    .findById(req.params.id)
        .then(user => {
        if (user) {
          res.status(200).json(user);
         } else {
          res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' });
    });
});

//DELETE
server.delete('/api/users/:id', (req, res) => {
    users
    .remove(req.params.id)
     .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: 'the user was deleted.',
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'The user could not be removed' });
    });
});


//PUT
server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;

  if ( !name && !bio ) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    users
        .update(req.params.id, req.body)
        .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({
              message: 'The user with the specified ID does not exist.',
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The user information could not be modified.',
        });
      });
  }
});

const port = 8000;
server.listen(port, () => console.log(`\n=== API on 8000 port ===\n`));