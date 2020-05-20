const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
},
    {
        timestamps: true
    }
);

const Task = mongoose.model('todos', TaskSchema, 'tasks');

// const task = new Task({
//     name: 'Friday Lesson'
// });

// task.save().then((doc) => {
//     console.log(doc);
// });


module.exports = {
    Task
}