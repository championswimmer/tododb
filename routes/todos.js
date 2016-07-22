/**
 * Created by championswimmer on 22/07/16.
 */
const express = require('express');
const db = require('../dbhandler');

const route = express.Router();
let newTodo = 0;

route.get('/', function(req, res) {
    db.fetchTodos(function(todos) {
        newTodo = todos[0].id + 1;
        res.render('todolist', {
            todos: todos,
            newid: newTodo
        });

    })
});

route.post('/addtodo', function (req, res) {
    let newTodo = {
        id: req.body.id,
        task: req.body.task,
        done: req.body.done
    };
    db.addTodo(newTodo, function (result) {
        res.redirect('/todos');
    })
});

module.exports = route;