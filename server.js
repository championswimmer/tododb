/**
 * Created by championswimmer on 22/07/16.
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path =require('path');

const db = require('./dbhandler');
const app = express();

const todos = require('./routes/todos');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/todos', todos);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hbs');


app.use('/', express.static(__dirname + '/public_html'));

app.post('/addtodo', function (req, res) {
    console.log(req.body);
    db.addTodo({
        id: req.body.id,
        task: req.body.task,
        done: req.body.done
    }, function(result) {
        res.send(result)
    })
});

app.get('/fetchtodos', function(req, res) {
    db.fetchTodos(function (todos) {
        res.send(todos);
    })
});

app.post('/update' , function (req , res) {

    db.updateTodo(req.body.id , req.body.status , function (result) {
        res.send(result);
    });
});

app.post('/delete' , function (req , res) {
    db.deleteTodo(function (result) {
       res.send(result);
    });
});

app.listen(app.get('port'), function () {
    console.log("App running on \n" +
        "http://localhost:"+ app.get('port') +"/")
});

