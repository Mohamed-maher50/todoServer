const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
var morgan = require("morgan");
const { ValidationError } = require("./constants/ErrorsType");
require("dotenv").config();
require("./db/connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(helmet());
app.use(morgan("tiny"));
app.use("/auth/v1", require("./routes/auth"));
app.use("/api/v1/tasks", require("./routes/TasksRoute"));
app.use("/api/v1/projects", require("./routes/ProjectsRoute"));
app.use("/api", require("./routes/TasksRoute"));
app.all("*", (_, res) => {
  res.status(404).json({ msg: "can't find this Route" });
});
app.use((err, req, res, next) => {
  // console.log(err.errors);
  if (err.name === ValidationError)
    return res.status(err.cause || 400).json({
      [err.name || "errors"]: err.errors,
    });

  return res
    .status(err.status)
    .json({ msg: err.message, name: err.name, status: err.status });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("listen in port 5000");
});
process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
