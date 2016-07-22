/**
 * Created by championswimmer on 22/07/16.
 */
'use strict';

const mysql = require('mysql');

let connection = {};
const createConnection = function () {
    connection = mysql.createConnection(
        {
            host     : 'localhost',
            user     : 'todouser',
            // password : 'secret',  
            database : 'tododb'
        }
    );
    return connection;
};

module.exports = {
    
    fetchTodos: function (cb) {
        const conn = createConnection();
        conn.connect();
        let todolist = [];
        conn.query('SELECT * from todolist ORDER BY id DESC',
        function (err, rows, fields) {
            for (let row of rows) {
                todolist.push({
                    id: row.id,
                    task: row.task,
                    done: (row.done == 0) ? false : true
                })
            }
            cb(todolist);
        });
        
        conn.end();
    },
    
    addTodo: function ( todo, cb ) {
        const conn = createConnection();
        conn.connect();
        const queryString = "INSERT INTO todolist VALUES (" +
                todo.id + ", " + 
                "'" + todo.task + "', " +
                todo.done +
                ");";
        conn.query(queryString, function (err, result) {
            cb(result);
        });
        conn.end();
    }, 
    
    deleteTodo: function ( todoId ) {
        
    },
    
    updateTodo: function ( todoId, done ) {
        
    }

};