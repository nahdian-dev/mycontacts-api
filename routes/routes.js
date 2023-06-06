const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateTokenHandler')

const { getContacts, getSpecificContact, postContact, putContact, deleteContact } = require('../controllers/contacts_controllers')
const { register, login, current, all_users } = require('../controllers/users_controller')

// contact routes
router.get('/contacts', getContacts)
router.get('/contacts/:id', getSpecificContact)
router.post('/contacts', postContact)
router.put('/contacts/:id', putContact)
router.delete('/contacts/:id', deleteContact)

// users routes
router.post('/users/register', register)
router.post('/users/login', login)
router.get('/users/current', validateToken, current)
router.get('/users/all-users', all_users)

module.exports = router