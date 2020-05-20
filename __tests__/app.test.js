const request = require('supertest');
const { app } = require('./../app');
const { Task } = require('./../models/task');

describe('Todo CRUD API', () => {
    test('No test yet', async () => {
        expect(true).toBe(true);
    });
    test('Read Todos', async () => {
        const response = await request(app).get('/todo/all');
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(Array.isArray(response.body)).toBe(true);
        expect(typeof response.body[0]).toBe('object');
        return;
    });
    test('Get One Todo', async () => {
        const todo = await Task.findOne();
        if (!todo) {
            return
        }
        const response = await request(app).get(`/todo/one?id=${todo.id}`);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(todo.name).toStrictEqual(response.body.name);
        expect(String(todo._id)).toStrictEqual(response.body._id);
    });

    test('Get Non Existing Todo', async () => {
        let id = '5ebd2a01ca392c2a00ccfdb3';
        const response = await request(app).get(`/todo/one?id=${id}`);
        expect(response.status).toBe(404);
    });

    test('Post Todo', async () => {
        const now = Date.now();
        const data = {
            name: `My Test Todo Create ${now}`
        };
        const response = await request(app).post('/todo/create').send(data);
        const todo = await Task.findOne({ name: data.name });
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(todo.name).toStrictEqual(response.body.name);
        expect(todo.name).toStrictEqual(data.name);
        await todo.remove();
    });

    //Todo for student
    /*
    1. Add test for update todo
    2. Add test for delete todo
    */
})