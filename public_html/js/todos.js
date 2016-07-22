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
                let cls="";
                if(todo.done)
                    cls = 'class="checked"';
                $('#todolist').append(
                    '<li '+ cls +' id="'+todo.id+'" >' //<li id="12">
                    + todo.task
                    + '</li>'
                );


            };
        }
    )
}

$(document).ready(function () {

    showTodos();
    
    $('#addtodo').click(function () {
        let newTodo = {
            id: largestTodo + 1,
            task: $('#newtodo').val(),
            done: false
        };
        addTodo(newTodo);
    });

    $('ul').on('click' , 'li' , function () {

        const id = $(this).attr('id');
        const done = (typeof $(this).attr('class') == 'undefined') ? 1 : 0;

        $.post('/update' ,{id : id , status : done} ,  function (data , status) {

            showTodos();
        });

    });

    $('#clear').click(function () {


        $.post('/delete' , function (data , status) {
            showTodos();
        });
    });

});