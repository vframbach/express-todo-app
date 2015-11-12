// wait for DOM to load before running JS
$(document).ready(function() {

	// check to make sure JS is loaded
	console.log('JS is loaded!');

	var source = $("#todos-template").html();
	var template = Handlebars.compile(source);

	var todosCollection = [];
	// GET all todos
	function refreshList() {
		$.get('/api/todos', function(data) {
			var todoHtml = template({
				todos: data
			});
			$('#todos-list').html(todoHtml);
			console.log(data);
			todosCollection = data;

		});
	}
	refreshList();

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
				refreshList();
			}
		});

	});
	// create form that allows edit todo
	$('#todos-list').on('click', '.edit', function() {
		var todoId = $(this).data('todo-id');
		var todo = todosCollection.find(function(todo) {
  			return todo.id == todoId;
		});
		todo.task = prompt('New todo task:', todo.task);
		todo.description = prompt('New description:', todo.description);
		var todoHtml = template({
			todos: todosCollection
		});
		$('#todos-list').html(todoHtml);
		console.log(todoHtml);
		$.ajax({
			type: 'PUT',
			url: '/api/todos/' + todoId,
			data: todo,
			success: function(data) {
				console.log('Todo has been edited!');
			}
		});
		//console.log(todoId);
	});


	$('#todos-list').on('click', '.done', function() {
		var todoId = $(this).data('todo-id');
		var todo = todosCollection.find(function(todo) {
  			return todo.id == todoId;
		});
		todo.done = !todo.done;
		var todoHtml = template({
			todos: todosCollection
		});
		$('#todos-list').html(todoHtml);
		console.log(todoHtml);
		$.ajax({
			type: 'PUT',
			url: '/api/todos/' + todoId,
			data: todo,
			success: function(data) {
				console.log('Todo has been completed!');
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
				console.log('Todo has been deleted!');
				refreshList();
			}
		});
		console.log(todoId);
	});



	// 1. form to enter data (in html)
	// 2. collect data from form in JS
	// 3. AJAX POST request to server to create new todo
	// 4. handle response from API (render new todo)
});