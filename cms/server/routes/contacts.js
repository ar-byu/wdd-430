var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (res, req, next) => {
    Contact
        .find()
        .populate('group')
        .then((error, data) => {
        console.log(data);
        if (error) {
            return res.status(500).json({
                message: 'An error has occured while fetching contacts: ',
                error: error
            });
        } else {
            res.status(200).json(data);
        };
    });
});

router.post('/', (res, req, next) => {
    const maxContactId = sequenceGenerator.nextId('contacts');
    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    });
    contact
        .save()
        .then(createdContact => {
            res.status(201).json({
                message: "Contact added successfully.",
                contact: createdContact
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occured while adding the contact: ",
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({id: req.params.id})
        .then(contact => {
            contact.name = req.body.name,
            contact.description = req.body.description,
            contact.url = req.body.url

            Contact.updateOne({id: req.params.id}, contact)
                .then(result => {
                    res.status(204).json({
                        message: "Contact updated successfully."
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: "An error occured while updating the contact: ",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Contact not found",
                error: {contact: 'Contact not found'}
            });
        });

});

router.delete('/:id', (req, res, next) => {
    Contact
        .findOne({id: req.params.id})
        .then(contact => {
            Contact.deleteOne({id: req.params.id})
            .then(result => {
                res.status(204).json({
                message: "Contact deleted successfully"
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'An error occured while deleting the contact: ',
                    error: error
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact not found',
                error: {contact: 'Contact not found'}
            });
        });
});

module.exports = router;