const express = require('express');
const router = express.Router();
const Knex = require('../data/dbConfig.js')

router.use(express.json());

router.get('/', (req, res) => {
    Knex.select('*').from('accounts')
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        console.log(err, 'from GET all accounts')
        res.status(500).json({
            error: 'Can not get the accounts'
        })
    })
})

router.get('/:id', (req, res) => {
    Knex.select('*').from('accounts').where('id', '=', req.params.id).first()
    .then(accountID => {
        res.status(200).json(accountID)
    })
    .catch(err => {
        console.log(err, 'from GET to get account by id')
        res.status(500).json({
            error: 'can not get the account by id'
        })
    })
})

router.post('/', (req, res) => {
    const body = req.body;

    if(!body.name || !body.budget){
        res.status(400).json({
            error: 'need name and budget for the account'
        })
    }else{
        Knex('accounts').insert(body, 'id')
        .then(ids => {
            const id = ids[0]

            return Knex('accounts').select('*').where({ id }).first()
                    .then(postedAccount => {
                        res.status(201).json({
                            mess: `Your post number ${ids} was added`,
                            postedAccount
                        })
                    })
        })
        .catch( err => {
            console.log(err, 'from POST to add new data')
            res.status(500).json({
                error: 'Can not add new data to the databass'
            })
        })
    }
})

router.delete('/:id', (req, res) => {

    Knex('accounts').where({ id : req.params.id }).del()
    .then(removed => {
        res.status(200).json({
            message: `${removed} id was removed from the accounts`
        })

    })
    .catch(err => {
        console.log(err, 'from DELETE to delete a account')
        res.status(500).json({
            erroe: 'Can not delete that info'
        })
    })
})

router.put('/:id', (req, res) => {
    const body = req.body;

    if(!body.name || !body.budget){
        res.status(400).json({
            error: ' need name and budget to update'
        })
    }else{
    
        Knex('accounts').where({ id: req.params.id }).update(body)
        .then(change => {
            res.status(200).json(change)
        })
        .catch(err => {
            console.log(err, 'from PUT to change a accounts')
            res.status(500).json({
                error: 'Can not make the change to the data'
            })
        })
    }
})

module.exports = router;