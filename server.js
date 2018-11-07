const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const itemsRoutes = require("./routes/api/items");

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("error connecting to db", err));

//Use Routes
app.use("/api/items", itemsRoutes);

//Serve Static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Listening
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
