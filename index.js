// Basic express setup
const express = require('express');
const port = 8000;
const app = express();

// Db and schema setup
const db = require('./config/mongoose');
const Card = require('./models/card');

// Middleware
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'));

app.get('/', function(req, res){
    Card.find({}, function(err, todoList){
        if(err){
            console.log(`Unable to fetch the cards: ${err}`);
            return;
        }

        return res.render('home',{
            title: "ToDo's",
            todos : todoList
        });
    });
});

app.post("/create-card", function(req, res){
    //convert date to required format
    let date = new Date(req.body["due-date"]);
    date = date.toDateString();
    let arr = date.split(" ");
    date = arr[1] + " " + arr[2] + ", " + arr[3];
    
    Card.create({
        title: req.body.description,
        date: date,
        category: req.body.category
    }, function(err, newCard){
        if(err){
            console.log('eroor in creating a card!');
            return;
        }
        console.log("card inserted");
        return res.redirect('back');
    }); 
});

app.post("/delete", function(req, res){
    let ids = req.body.ids;
    ids.forEach(element => {
        Card.findByIdAndDelete(element, function(err){
            if(err){
                console.log(`unable to delete the card: ${err}`)
            }
        });
    });

    res.redirect('back');
});

app.listen(process.env.port || port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server up and running on port: ${port}`);
});