const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
var morgan = require("morgan");
require("dotenv").config();
require("./db/connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(morgan("tiny"));
app.use("/auth", require("./routes/auth"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("listen in port 5000");
});
