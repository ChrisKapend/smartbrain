//express import and server initialisation
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); //password encrpytion module
const cors = require('cors');
const knex = require('knex')

const saltRounds = 10; //bcrypt slatRounds
const app = express();
//databasse initialisation and connection
const db = knex({
    client: 'pg',
    connection: {
        host:'169.255.207.36',
        user:'smartbrain',
        password:'smartbrain',
        database:'smartbrain'
    },
});
//test

//middleware
app.use(bodyParser.json());
app.use(cors());
//data and functions
//routes

app.get('/', (req, res)=>{
    res.send();
})

//Sign In - POST request with user information responses success/fail
app.post('/signin', (req, res)=>{
    //comparing the bcrypt generated password with the information entered by the user
/*    const hash = "$2b$10$87qa8s44oPpkbanaZZZM9.KkTW.0h.QdrIFaicG6q16D4pQf6AxR2";
    bcrypt.compare("Christ1986", hash, function(err, result) {
        console.log('first guess', result)
    });
    bcrypt.compare("Christ1", hash, function(err, result) {
        console.log('second guess', result)
    });*/
    const {email, password} = req.body;
    console.log(email);
    console.log(password)
    db('login')
        .where({email:email})
        .select('email', 'hash')
        .then(data => {
            bcrypt.compareSync(password, data[0].hash) ?
                db('users')
                    .where({email:email})
                    .then(user => res.json(user))
                    .catch(err => res.status(400).json(err))
                : res.json("0002")//error 0002 wrong password
        })
        .catch(err => res.status(400).json("0001"))//error 0001 user doesn't exist
})
//Register - POST request with user information for creation return the newly created user
app.post('/register', (req, res)=> {
    console.log("into register")
    const {email, name, password} = req.body;
/*    bcrypt.hash(password, saltRounds,  function (err, hash) {
        return hash;
    })*/
    // generating password
    const hashResult = bcrypt.hashSync(password, saltRounds);
    console.log(hashResult);
    //creating a transaction for consistencies
    db.transaction(trx => {
        return trx
            .insert({hash:hashResult, email:email})
            .into('login')
            .returning('email')
            .then(loginEmail =>{
                console.log(loginEmail[0]);
                return trx('users')
                    .returning('*')
                    .insert({email:loginEmail[0], name:name, joined:new Date()})
                    .into('users')
                    .then(response => res.json(response))
            })
    })
        .then(insert => res.json(insert))
        .catch(error => console.log)

});
//Profile - GET profile:userId with GET request
app.get('/profile/:id', (req, res) =>{
    const {id} = req.params;
    db.select('*').from('users').where({id}).then(user=>{
        user.length ? res.json(user[0]): res.status(400).json('the user does not exist');
    }).catch(err=>{
        res.status(400).json(err.detail);
    })
})
//Image - PUT user updated
app.put('/image', (req, res)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries=>{
            entries.length ? res.json(entries) : res.status(400).json('error')
        })
        .catch(err =>{
            res.status(400).res.json("unable to get the enries");
        })
})
//

app.listen(4000, ()=>{
    console.log('app is running on port 4000')
})

