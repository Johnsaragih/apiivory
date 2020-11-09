const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Route

app.get("/", (req,res)=> {
    res.json({ message : "Welcome to apisatu"});
});
require("./app/routes/personal.js")(app);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});


/*
// Including the file and initilize
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'node',
    password: 'node123',
    database: 'dbivory'
});


mc.connect();


app.get('/',function (req,res){

	return res.send({error:true, message: "hello"});

});


app.get('/todos', function (req, res) {
    mc.query('SELECT * FROM personal', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
});


app.get('/todo/:id', function (req, res) {
 
    let task_id = req.params.id;
 
    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }
 
    mc.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Todos list.' });
    });
 
});
app.get('/todo2/:id/:kerja', function (req, res) {
 
    const task_id = [req.params.id,req.params.kerja];
  
 
    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }
 
    mc.query('SELECT * FROM personal where agama=? and kerja=?', task_id,function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Todos list.' });
    });
 
});



app.post('/todo', function (req, res) {
 
    let task = req.body.task;
 
    if (!task) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }
 
    mc.query("INSERT INTO tasks SET ? ", { task: task }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});



app.put('/todo', function (req, res) {
 
    let task_id = req.body.task_id;
    let task = req.body.task;
 
    if (!task_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    }
 
    mc.query("UPDATE tasks SET task = ? WHERE id = ?", [task, task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});


app.delete('/todo/:id', function (req, res) {
 
    let task_id = req.params.id;
 
    mc.query('DELETE FROM tasks WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
 
});
 
// All other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('Page not found');
    next();
});
 
//Port must be set to 8080 because incoming http request are routed from 80 to 8080

app.listen(3000, function(){

	console.log('Node app is running on port 3000');

});
*/
//================================================================
