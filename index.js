const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");
const path = require("path");
const__dirname = path.resolve();

app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5000",
        "*",
        "https://twitter-clone-mern-sqtg.vercel.app/",
      ],
    })
  );

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://twitter-clone-mern-sqtg.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

require("./models/model");
app.use(express.json());
app.use(require("./routes/auth"));
mongoose.connect(mongoUrl);

require("./models/post");
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));

app.use(express.static(path.join(__dirname, "./client/built")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/built/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

mongoose.connection.on("connected", () => {
  console.log("successfully connected to mongo");
});

mongoose.connection.on("error", () => {
  console.log("not connected to mongodb");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
