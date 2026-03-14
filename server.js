require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/book-routes");

connectToDB();

//express.json() is middleware that parses JSON request bodies. ->
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// API routes
app.use("/api/books", bookRoutes);

// pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Home.html"));
});

app.get("/books", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "all-books.html"));
});

app.get("/book", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "single-book.html"));
});

app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "add-book.html"));
});

app.get("/update", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "update-book.html"));
});

app.get("/delete", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "delete-book.html"));
});

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});

/*
`express.json()` is **middleware that parses JSON request bodies**.

Without it:

```js
req.body === undefined
```

So when you did:

```js
const newBookFormData = req.body;
await Book.create(newBookFormData);
```

Mongoose received **no data**, so fields like `year` were **missing**, triggering:

```
Book validation failed: year: Publication year is required
```

### In one line

`express.json()` **converts incoming JSON → JavaScript object and puts it in `req.body`.**

*/
