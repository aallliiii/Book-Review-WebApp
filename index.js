import express from "express";
const port = 3000;

const app = express ();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.listen(port, ()=>{
    console.log("Running");
})
app.get("/", (req, res) =>
{
    res.render("index");
})