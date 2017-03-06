var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var bodyParser = require('body-parser'); 


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs');



//profile and login info
var users = [{username: "admin", password: "1234"},{username: "Mike", password: "bball"}]; 

var profile = [{ 
	"username": "Jimmy Butler",
	"url": "http://img.bleacherreport.net/img/images/photos/003/579/164/hi-res-9772493752e59c6a54f8c2b2656964d8_crop_north.jpg?1456964123&w=630&h=420",
	"about": "Jimmy Buckets splashes 3's"
}]

app.get('/profile', function(request, response){
	response.render('profile', {userData: dataFromDatabase})
})

app.get('/home', function(request, response){
	response.render("home", {userData: profile}); 
})


app.post('/login', function(request, response){
	console.log(request, response)
	response.render("home"); 
})

//login page
app.get('/login', function(request, response){
	response.render('login');
})

app.post('/login', function(request, response){
	console.log(request.body);
	var loginUsername = request.body.username;
	var loginPassword = request.body.password; 
		for(i = 0; i < users.length; i++){
			if(loginUsername === users[i].username && loginPassword === users[i].password){
				console.log("success")
				response.redirect('/home')
			}
		}
})






app.get('/register', function(request, response){
	response.render('register', {});
})
app.post('/register', function(req, res){
	users.push({username: req.body.username, password: req.body.password});
	console.log(users);
	res.redirect('/login');
})

app.post('/signup', function(request,response){
	console.log(request.body); 
	users.push({username: request.body.username, password: request.body.password})
	console.log(users)
	response.send('success')
})







server.listen(3000, function(){
	console.log('server is listening on port 3000'); 

})