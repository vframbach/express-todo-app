// server.js
 // SERVER SIDE JAVASCRIPT
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');

 app.use(bodyParser.urlencoded ({ extended: true}));
 app.use(express.static('public'));

var todos = [
	{ task: "do laundry",
	description: "put in washing machine",
		id: 1},
	{ task: "Vacuum carpet",
	description: "use vacuum",
		id: 2}

];

// just todo route
 app.get('/api/todos/', function (req, res) {
   // send all todos as JSON response
   res.json(todos);
 });

 // get one todo
 app.get('/api/todos/:id', function (req, res) {
   var todoId = parseInt(req.params.id);

   // find todo by its id
   var foundTodo = todos.filter(function(todo) {
   	return todo.id == todoId;
   })[0];

   // send foundTodo as JSON response
   res.json(foundTodo);
 });


 app.post('/api/todos', function(req, res) {
 	var newTodo = req.body;

 	if (todos.length > 0) {
 		newTodo.id = todos[todos.length - 1].id + 1;
 	} else {
 		newTodo.id = 1;
 	}
 // add newTodo to 'todos' array
 	todos.push(newTodo);

// send newTodo as JSON response
 	res.json(newTodo);
 });

 app.delete('/api/todos/:id', function (req, res) {
 	var todoId = parseInt(req.params.id);
 	var todoToDelete = todos.filter(function (todo) {
    return todo.id == todoId;
  	})[0];

  	todos.splice(todos.indexOf(todoToDelete), 1);

  	res.json(todoToDelete);
});

 app.put('/api/todos/:id', function (req, res) {
 	var todoId = parseInt(req.params.id);

 	var todoToUpdate = todos.filter(function (todo) {
 		return todo.id == todoId;
 	})[0];

 	todoToUpdate.task = req.body.task;
 	todoToUpdate.description = req.body.description;

 	res.json(todoToUpdate);
 });

 var server = app.listen(process.env.PORT || 3000, function () {
   console.log('Example app listening at http://localhost:3000/');
 });