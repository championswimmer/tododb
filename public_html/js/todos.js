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
            largestTodo = data[0].id;
            
            for (let todo of data) {
                $('#todolist').append(
                    '<li id="'+todo.id+'">' //<li id="12">
                    + todo.task
                    + '</li>'
                )
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
});