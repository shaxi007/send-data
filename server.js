const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(2000, () => console.log("Server started on port 2000"));
