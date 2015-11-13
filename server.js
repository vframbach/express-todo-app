// server.js
// SERVER SIDE JAVASCRIPT
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// mongo
//connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app');

//require todo model
var Todo = require('./models/todo');


app.use(bodyParser.urlencoded({
    extended: true
}));

// set view engine to hbs (handlebars)

app.set('view engine', 'hbs');

//server static files from public folder

app.use(express.static(__dirname + '/public'));

// or 
// app.use(express.static('public'));

// HOMEPAGE ROUTE

// app.get('/', function(req, res) {
//     res.render('index');
// });

// API ROUTES

// just todo route
app.get('/api/todos/', function(req, res) {

    // find all todos in db

    Todo.find(function(err, allTodos) {
        res.json({
            todos: allTodos
        });
    });

});

// get one todo
app.get('/api/todos/:id', function(req, res) {

    // MONGO
    // get todo id from url params ('req.params')
    var todoId = req.params.id;

    // find todo in db by id

    Todo.findOne({
        _id: todoId
    }, function(err, foundTodo) {
        res.json(foundTodo);
    });

});

// create new todo
app.post('/api/todos', function(req, res) {

    var newTodo = new Todo(req.body);
    newTodo.done = false;

    newTodo.save(function(err, savedTodo) {
        res.json(savedTodo);
    });
});


// delete
app.delete('/api/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id);

    Todo.findOneAndRemove({
        _id: todoId
    }, function(err, deletedTodo) {
        res.json(deletedTodo);
    });
});


// update
app.put('/api/todos/:id', function(req, res) {
    // get todo id from url params ('req.params')
    var todoId = req.params.id;
    console.log(req.body);

    // find todo in db by id

    Todo.findOne({
        _id: todoId
    }, function(err, todoToUpdate) {
    	console.log(err, todoToUpdate);

	    todoToUpdate.task = req.body.task;
	    todoToUpdate.description = req.body.description;
	    todoToUpdate.done = req.body.done;

	    //saves to db
	    todoToUpdate.save(function(err, savedTodo) {
	        res.json(savedTodo);
	    });
	});
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at http://localhost:3000/');
});