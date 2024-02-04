const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then((result) => {
    console.log(result.connection.host);
  })
  .catch((err) => {
    console.log(err);
  });
