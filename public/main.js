// wait for DOM to load before running JS
$(document).ready(function() {

	// check to make sure JS is loaded
	console.log('JS is loaded!');

	var source = $("#todos-template").html();
	var template = Handlebars.compile(source);

	var todosCollection = [];
	// GET all todos
	$.get('/api/todos', function(data) {
			var todoHtml = template({
				todos: data
			});
			$('#todos-list').append(todoHtml);
			console.log(data);
			todosCollection = data;

		});

	// create new todo
	// -form to create todo
	// -submit handler when form is submitted
	// -read form data to create todo
	// -use post to create todo based on form

	$('#create-todo').on('submit', function(event) {
		event.preventDefault();
		console.log('submitting form!');
		console.log($(this).serialize());

		var newtodo = $(this).serialize();

		$.ajax({
			type: 'POST',
			url: '/api/todos',
			data: newtodo,
			success: function(data) {
				$('#title').val();
			}
		});

	});
	// create form that allows edit todo
	$('#todos-list').on('click', '.edit', function() {
		var todoId = $(this).data('todo-id');
		var todo = todosCollection.find(function(todo) {
  			return todo.id == todoId;
		});
		var newTask = prompt('New todo task:', todo.task);
		var newDescription = prompt('New description:', todo.description);
		$.ajax({
			type: 'PUT',
			url: '/api/todos/' + todoId,
			data: {
				task: newTask,
    			description: newDescription,
    		},
			success: function(data) {
				console.log('Todo has been edited!');
			}
		});
		//console.log(todoId);
	});
	$('#todos-list').on('click', '.delete', function() {
		var todoId = $(this).data('todo-id');
		$.ajax({
			type: 'DELETE',
			url: '/api/todos/' + todoId,
			success: function(data) {
				console.log('Todo has been completed!');
			}
		});
		console.log(todoId);
	});



	// 1. form to enter data (in html)
	// 2. collect data from form in JS
	// 3. AJAX POST request to server to create new todo
	// 4. handle response from API (render new todo)
});