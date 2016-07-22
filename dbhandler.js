/**
 * Created by championswimmer on 22/07/16.
 */
'use strict';

const mysql = require('mysql');


 function add(todo) {
    const conn = createConnection();
    conn.connect();
    const queryString = "INSERT INTO todolist VALUES (" +
        todo.id + ", " +
        "'" + todo.task + "', " +
        todo.done +
        ");";
    conn.query(queryString, function (err, result) {
       // cb(result);
    });
    conn.end();
}


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

            for (var i = 0; i<rows.length; i++) {
                todolist.push({
                    id: rows[i].id,
                    task: rows[i].task,
                    done: (rows[i].done == 0) ? false : true
                })
            }
            cb(todolist);
        });
        
        conn.end();
    },

    UpdateTodo: function (todo_id) {
        console.log("todo id is" +todo_id);
        const conn = createConnection();
        conn.connect();
        let T1 = {};
        conn.query('SELECT * from todolist  WHERE id =' + todo_id ,
                function (err, rows, fields) {

            console.log(rows);
            T1 = {
                id : rows[0].id,
                task : rows[0].task,
                done : (rows[0].done == 0) ? false : true


            };
                });
        const queryString = 'DELETE FROM todolist WHERE id =' + todo_id;
        conn.query(queryString, function (err, result) {
            T1.done = 1 - T1.done;
            add(T1);

        });





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
    
    deleteTodo: function () {
        const conn = createConnection();
        conn.connect();
        const queryString = 'DELETE FROM todolist WHERE done = '+ 1;
        conn.query(queryString, function (err, result) {
           /* T1.done = 1 - T1.done;
            add(T1);*/

        });



        
    },
    
    updateTodo: function ( todoId, done ) {
        
    }

};