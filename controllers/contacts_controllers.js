const asyncHandler = require('express-async-handler')
const Contact = require('../models/contacts_model')

// @desc GET all contact
// @route GET - /contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find()
    res.status(200).json(contact)
})

// @desc GET specific contact
// @route GET - /contacts/:id
// @access public
const getSpecificContact = async (req, res) => {
    const findContact = await Contact.findById(req.params.id)

    if (!findContact) {
        res.status(404)
        throw new Error('ID tidak ditemukan')
    }

    res.status(200).json(findContact);
}

// @desc Post contact
// @route POST - /contacts
// @access public
const postContact = asyncHandler(async (req, res) => {
    const requestBody = req.body
    const { name, address, gender } = requestBody

    if (!name || !address || !gender) {
        res.status(400)
        throw new Error("Semua field harus di isi!")
    }

    const postContact = await Contact.create(
        {
            name,
            address,
            gender,
        }
    )

    res.status(201).json(postContact)
})

// @desc PUT contact
// @route PUT - /contacts/:id
// @access public
const putContact = asyncHandler(async (req, res) => {
    const findContact = await Contact.findById(req.params.id)

    if (!findContact) {
        res.status(404)
        throw new Error('ID tidak ditemukan!')
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updateContact)
})

// @desc Delete contact
// @route DELETE - /contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const findContact = await Contact.findById(req.params.id)

    if (!findContact) {
        res.status(404)
        throw new Error('ID tidak ditemukan!')
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.status(200).json(findContact)
})

module.exports = { getContacts, getSpecificContact, postContact, putContact, deleteContact }