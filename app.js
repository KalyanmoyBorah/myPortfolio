//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("assets"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-kalyan:kalyanmoy.borah1@cluster0-jasiy.mongodb.net/myBlogDB",{useNewUrlParser:true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title: String,
  date: Date,
  content: String
});

const Post = mongoose.model("Post", postSchema);

const reviewSchema = new mongoose.Schema({
  name: String,
  review: String
});

const Review = mongoose.model("Review", reviewSchema);





app.get("/", function(req, res){
  res.render("home");
});

app.get("/blog", function(req, res){

  Post.find({}, function(err, posts){
   res.render("blog", {
     posts: posts
     });

 });
});

app.get("/createpost", function(req, res){
  res.render("createpost");
});

app.get("/reviews", function(req, res){

  Review.find({}, function(err, reviews){
   res.render("reviews", {
     reviews: reviews
     });
});
});

app.post ("/createpost", function(req, res){
  const title = req.body.title;
  const date = req.body.date;
  const content = req.body.content;

  const post =new Post({
    title: title,
    date: date,
    content: content
  });

  post.save(function(err){
    if(!err){
      res.redirect("/blog");
    }
  });



});

app.get("/:postid", function(req, res){
  const requestedPostId = req.params.postid;

  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title: post.title,
     date: post.date,
     content: post.content

   });

 });


});

app.post("/reviews", function(req, res){
  const name = req.body.name;
  const content = req.body.review;

  const review = new Review({
    name: name,
    review: content
  });

  review.save(function(err){
    if(!err){
      res.redirect("/reviews");
    }
  });
});









let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("Server has started successfully.");
});
