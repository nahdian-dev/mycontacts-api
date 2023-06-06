const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateTokenHandler')

const { getContacts, getSpecificContact, postContact, putContact, deleteContact } = require('../controllers/contacts_controllers')
const { register, login, current, all_users } = require('../controllers/users_controller')

// contact routes
router.get('/contacts', getContacts)
router.get('/contacts/:id', validateToken, getSpecificContact)
router.post('/contacts', postContact)
router.put('/contacts/:id', validateToken, putContact)
router.delete('/contacts/:id', validateToken, deleteContact)

// users routes
router.get('/users', all_users)
router.post('/users/register', register)
router.post('/users/login', login)
router.get('/users/current', validateToken, current)

module.exports = router