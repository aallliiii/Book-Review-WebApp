import express from "express";
import bodyParser from "body-parser";
const port = 3000;

const app = express ();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port, ()=>{
    console.log("Running");
})
app.get("/", (req, res) =>
{
    res.render("index");
})

app.post("/navigation", (req, res) =>
{
    if (req.body.action === "viewbooks")
        {
            res.redirect("/");
        }
        else if (req.body.action === "addbooks")
            {
                res.render("add");
            }
});

app.post("/add", (req, res)=>
{
    console.log(req.body.bookName);
})