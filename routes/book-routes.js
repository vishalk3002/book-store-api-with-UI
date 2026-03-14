const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateSingleBook,
  deleteBook,
} = require("../controllers/book-controller");

//create express router
const router = express.Router();

//home

//that are related to books only
router.get("/getAll", getAllBooks);
router.get("/get/:id", getSingleBookById);
router.post("/add", addNewBook);
router.put("/update/:id", updateSingleBook); //use put for this
router.delete("/delete/:id", deleteBook);

module.exports = router;
