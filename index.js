import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const port = 3000;

const app = express();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book",
  password: "pakistan",
  port: 5432,
});
db.connect();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log("Running");
});
app.get("/", async (req, res) => {
  const data = await getDataFromDatabase();
  res.render("index", {
    bookData: data,
  });
});

app.post("/navigation", (req, res) => {
  if (req.body.action === "viewbooks") {
    res.redirect("/");
  } else if (req.body.action === "addbooks") {
    res.render("add");
  }
});

app.post("/add", async (req, res) => {
  let bookName = req.body.bookName;
  let bookISBN = req.body.bookISBN;
  let dateRead = req.body.dateRead;
  let bookRemarks = req.body.bookRemarks;
  let bookOverview = req.body.bookOverview;

  try {
    await db.query(
      "INSERT INTO BOOKREVIEW (BOOKNAME, ISBN, DATEREAD, REMARKS, OVERVIEW) VALUES ($1, $2, $3, $4, $5)",
      [bookName, bookISBN, dateRead, bookRemarks, bookOverview]
    );
    console.log("Data inserted successfully");

    res.redirect("/");
  } catch (error) {
    console.log("Error inserting data!");

    res.redirect("/");
  }
});

async function getDataFromDatabase() {
  const result = await db.query("Select * from bookReview");
  let bookNames = [];
  let bookISBNs = [];
  let dateRead = [];
  let bookRemarks = [];
  let bookOverview = [];

  result.rows.forEach((book) => {
    bookNames.push(book.bookname),
      bookISBNs.push(book.isbn),
      dateRead.push(book.dateread),
      bookRemarks.push(book.remarks),
      bookOverview.push(book.overview);
  });

  return {
    bookNames,
    bookISBNs,
    dateRead,
    bookRemarks,
    bookOverview,
  };
}
