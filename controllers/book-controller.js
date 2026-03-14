const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  //get it from mongoDB
  try {
    const allBooks = await Book.find({});
    if (allBooks) {
      res.status(200).json({
        success: true,
        message: "List of books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "NO BOOKS FOUND IN COLLECTION!!!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const getSingleBookById = async (req, res) => {
  //getting the id
  const getSingleBookById = req.params.id;

  //using the id to find the book
  const bookDetailById = await Book.findById(getSingleBookById);

  //checking if available , false if not found
  if (!bookDetailById) {
    return res.status(404).json({
      success: false,
      message:
        "Book with the current ID is not found! Please try with a different ID",
    });
  }

  //if found , true
  res.status(200).json({
    success: true,
    data: bookDetailById,
  });
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newBookFormData) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateSingleBook = async (req, res) => {
  try {
    //going to update all title, author, year
    const updateData = req.body;
    //getting the id
    const getSingleBookById = req.params.id;

    //validate if there's data to update
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      getSingleBookById,
      updateData,
      {
        //return the updated document after the update ,
        returnDocument: "after", //deprecated -> new: true
        runValidators: true, // Ensures schema rules apply on update
      },
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);
    if (!deletedBook) {
      res.status(404).json({
        successs: false,
        message: "Book is not found with this ID",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedBook,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateSingleBook,
  deleteBook,
};
