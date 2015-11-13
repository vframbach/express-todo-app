var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TodoSchema = new Schema ({
	task: String,
	description: String,
	done: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;