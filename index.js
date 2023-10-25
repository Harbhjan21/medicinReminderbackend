const app = require("express")();
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const MONGO_URL =
  "mongodb+srv://Harbhjan:Harbhjan@cluster0.tztiudx.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URL)
  .then((err) => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("error", err);
  });
app.use("/auth", require("./routes/Authentication"));
app.use("/medicin", require("./routes/MedicinCrud"));

app.get("/", (req, res) => {
  res.send("welcome to medicin reminder");
});

app.listen(5000, () => {
  console.log("server is listening at 5000");
});
