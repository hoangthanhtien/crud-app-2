const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Author = require("../models/author");
// All authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if(req.query.name !== null &&  req.query.name !== ''){
    // RegExp create a regular expression object for matching text with a pattern
    // RegExp(pattern,flags)
    // search for req.query.name, 'i' is ignore case  
    searchOptions.name = new RegExp(req.query.name,'i')
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors , searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

// New author route
router.get("/new", (req, res) => {
  res.render("authors/new");
});

// Create authors route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error Creating Author",
    });
  }
});

module.exports = router;
