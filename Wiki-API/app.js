const express = require('express');
const app = express()
const mongoose = require('mongoose');
const _ = require("lodash");
const { Schema } = mongoose
app.use(express.urlencoded({extended: true}));
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/wikiDB');
}

const articleSchema = new Schema({
  title: String,
  content: String
})

const Article = mongoose.model('articles', articleSchema)

app.route("/articles")
.get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if(!err) {
        res.send(foundArticles);
      }else {
        res.send(err);
      }
    });
   }
)
.post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
  
    newArticle.save(function(err) {
      if(!err) {
        res.send("Sucessfully added a new article.");
      }else {
        res.send("err");
      }
    });
  }
).delete(function(req, res) {
    Article.deleteMany(function(err) {
      if(!err) {
        res.send("Succesfully deleted all articles.");
      }else {
      res.send(err);
      }
    });
  }
)

app.route("/articles/:article")
.get(function(req, res) {
  let article = req.params.article
  // article = _.capitalize(article)

  Article.findOne({title: article}, function(err, foundArticle) {
    if(foundArticle) {
      res.send(foundArticle);
      console.log(foundArticle);
    }else {
      res.send("No articles matching that title was found.");
    }
  });
})
.put(function(req, res) {
  Article.updateOne(
    {title: req.params.article},
    {title: req.body.title, content: req.body.content},
    {ovewrite: true},
    function(err) {
      if(!err) {
        res.send("Successfully updated article.");
      }
    }
  );
})
.patch(function(req, res) {
  Article.updateOne({title: req.params.article},
  {$set: req.body},
    function(err) {
      if(!err) {
        res.send("Successfully updated information")
      }
    }
  )
})
.delete(function(req, res) {
  Article.deleteOne({title: req.params.article},
    {$set: req.body}, 
    function(err) {
      if(!err) {
        res.send("Successfully deleted information")
      }
    })
})

// let teste = new Article({
//   title: "teste teste",
//   content: "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
// });

// teste.save();


app.listen(3000, function() {
  console.log("App is running on port 3000");
})
