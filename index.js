const express = require("express");
const cors = require("cors");
const path = require('path')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db");
// const authRouter = require("./routers/authRouter.js");
// const postRouter = require("./routers/postRouter.js");
const apiRouter = require("./api");
dotenv.config();

const app = express();
const buildPath = path.join(__dirname, 'build')
app.use(express.static(buildPath));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use("/", authRouter);
// app.use("/", postRouter);
app.use("/api", apiRouter)
// gets the static files from the build folder
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})

db();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running", PORT);
});


