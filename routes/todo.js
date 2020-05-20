const express = require('express');
const { validateRequest } = require('./../Libs/request-validator');
const { TODO } = require('./../Libs/validators');
const { Task } = require('./../models/task');

// require('./../config');

const router = express.Router();

// create
router.post('/create', (req, res) => {
    const task = new Task(req.body);
    console.log(task);

    task.save().then((doc) => {
        res.send(doc);

    })
})


// read
router.get('/all', (req, res) => {
    Task.find().then((docs) => {
        res.send(docs);
    }).catch((error) => {
        res.status(503).send({ message: 'Service unavailable. Try later' })
    })
});

router.get('/one', ...TODO.GetTodo, validateRequest, (req, res) => {
    Task.findById(res.locals.data.id).then((doc) => {
        if (!doc) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.send(doc);
    }).catch((error) => {
        res.status(503).send({ message: 'Service unavailable. Try later' })
    })
})

// update
router.patch('/update/:id', ...TODO.UpdateTodo, validateRequest, (req, res) => {
    Task.findByIdAndUpdate(req.params.id, {
        name: res.locals.data.name
    }, {
        new: true

    }).then((doc) => {
        if (!doc) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.status(201).send(doc);
    }).catch((error) => {
        res.status(503).send({ message: 'Service unavailable. Try later' })
    })
})

// Delete
router.delete('/delete/:id', ...TODO.DeleteTodo, validateRequest, (req, res) => {
    Task.findByIdAndDelete(req.params.id).then((doc) => {
        if (!doc) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        console.log('Document deleted', doc);
        res.send({ message: 'Todo successfully deleted' });
    }).catch((error) => {
        res.status(503).send({ message: 'Service unavailable. Try later' })
    })
})


exports.TodoRouter = router;