const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(require("path").join(__dirname, "..", "public", "uploads")));

mongoose
  .connect("mongodb+srv://egr008:311219774674%40Ktc@bakery.tze5hvo.mongodb.net/bakeryDB?retryWrites=true&w=majority&appName=Bakery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/admin", adminRoutes);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
