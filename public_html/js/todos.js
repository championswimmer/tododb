/**
 * Created by championswimmer on 22/07/16.
 */
console.log('todos included');

let largestTodo = 0;
function addTodo(newTodo) {
    $.post('/addtodo', 
        newTodo,
        function (data, status) {
            console.log('status = ' + status);
            console.log('result = ' + data);
            showTodos();
        }
    )
}

function showTodos() {
    console.log('showTodos is run');
    $.get('/fetchtodos', 
        function(data, status) {
            $('#todolist').html('');
            console.log(data);
            if(typeof data != 'undefined')
            largestTodo = data[0].id;
            
            for (let todo of data) {
                if(todo.done==0) {
                    $('#todolist').append(
                        '<li id="' + todo.id + '">' +
                        '<input type="checkbox" id="c' + todo.id + '" onclick="strike(' + todo.id + ')">'
                        + todo.task
                        + '</li>'
                    )
                }
                else
                {
                    console.log("Else Inside")
                    $('#todolist').append(
                        '<li id="' + todo.id + '" style="text-decoration: line-through">' +
                        '<input type="checkbox" checked="" id="c' + todo.id + '" onclick="strike(' + todo.id + '">'
                        + todo.task
                        + '</li>'
                    )
                }
            }
        }
    )
}

$(function () {
    console.log('Document is ready');
    showTodos();
    
    $('#addtodo').click(function () {
        let newTodo = {
            id: largestTodo + 1,
            task: $('#newtodo').val(),
            done: false
        };
        addTodo(newTodo);
    })
    $('#delete').click(function () {
        var obj = {};
        $.post('/deletetodos',obj,function (data,status) {

        });
        showTodos();
    })
});

function strike(todo_id) {
    console.log(todo_id);
    var obj = {todo_id : todo_id};
    console.log("Strike Called");
    $.post('/updateTodo',obj,function (data, status) {
        console.log('status = ' + status);
        console.log('result = ' + data);
        showTodos();
    });

}