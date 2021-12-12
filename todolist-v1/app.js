const express = require("express")
const app = express()
const date = require(__dirname + "/date.js")

const items = ["Buy food", "Cook food", "Eat Food"]
const workItens=[]



app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))



app.get("/", function(req, res) {

    res.render('app.ejs', {listTitle: '', day: date.getDate(), newListItems: items})
}) 

app.post('/', function(req, res) { 

    let item = req.body.newItem
    console.log(req.body.app)
    if(req.body.app == "Work") {
        workItens.push(item)
        res.redirect("/work")
    }else {
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", function(req, res) {

    res.render("app.ejs", {day: date.getDate(), listTitle: "Work List", newListItems: workItens})
})

app.post("/work", function(req, res) {
    let item = req.body.newItem
    workItens.push(item)
    res.redirect("/work")
})

app.get("/about", function(req, res ) {
    res.render("about")
})

app.listen(3000, function() {
    console.log("Server started on port 3000", Date())
})

