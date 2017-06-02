var express = require("express");
var app = express();
var port = 3080; //to define the port on which server runs

var http = require('http').Server(app);
var io = require('socket.io')(http);
var Sandbox = require("sandbox"), 
sandbox = new Sandbox();

var session,user;
//ejs- configuration of view and static files
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("login");
});

app.get('/:session?/:user?',function(req,res){
	session = req.params.session;
	user = req.params.user;
	res.render('codepad', { session : session , user: user});
});


//When someone connects
io.on('connection', function(socket){
  
  //When someone disconnects 
  socket.on('disconnect', function () {
    console.log('A user disconnected!!');
  });
 
 //to manage the session of user
	socket.on('session',function(session){
		console.log("User joined ");
		socket.join(user);
	});
//to execute the code on request
	socket.on('runCode', function(data){
		sandbox.run( data, function( output ) {
			if(output.console.length>0)
		   		io.sockets.in(user).emit('result', output.console.toString());
		   	else
		   		io.sockets.in(user).emit('result', output.result.toString());
		});
  });
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});


