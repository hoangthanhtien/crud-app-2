const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mybrary", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to the database!"));
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT}`);
});
