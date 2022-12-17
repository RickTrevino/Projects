var  Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"});
        return;
    }
    
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });
    
    // save user to database
    user.save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while saving the new user to the database"
            });
        });
}

// retrieve and return all users or retrieve and return a single user.
exports.find = (req, res) => {
    
}

// update a user by user id
exports.update = (req, res) => {
    
}

// delete a user by user id
exports.delete = (req, res) => {
    
}