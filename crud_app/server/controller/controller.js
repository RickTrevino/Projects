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
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occured while saving the new user to the database"});
        });
}

// retrieve and return all users or retrieve and return a single user.
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:"User id " + id + " was not found."});
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:"Error retrieving user " + id + "."});
        })
    }
    else{
   Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message:err.message || "An error occured while retrieving user information"});
        });
    }
}

// update a user by user id
exports.update = (req, res) => {
    // validate body
    if(!req.body){
        return res.status(400)    
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message:`Cannot update user with the : ${id}. User not found.`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:"Error updating user information."});
        });
}

// delete a user by user id
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(400).send({message:`Cannot delete the user with id: ${id}. Please double check the user id and try again.`});
            }
            else{
                res.send({message:"User was deleted successfully."});
            }
        })
        .catch(err => {
            res.status(500).send({message:"Could not delete user with id: " + id});
        });
}