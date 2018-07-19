const express = require('express');

const User = require('./modules');

const router = express.Router();

router.get('/user', (req, res) => {
    User.find({}).then(data => {
        //console.log(data);
        res.json(data);
    });
});

router.post('/user', (req, res) => {
    User.create(req.body).then(
        data => {
            res.send(data);
        });
});

router.put('/user/:id', (req, res) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
                 User.findOne({_id: req.params.id}).then(function(){
                     res.send(ninja);
                });
           }).catch(next);
})
    

router.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove({_id: id}).then(user => {
        res.send(user);
    });
});

router.get('/userID/:id', (req, res) => {
    const id = req.params.id;
    User.find({_id: id}).then(data => {
        res.json(data);
    })
 });

 module.exports = router;




