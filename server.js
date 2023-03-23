const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connect");

const port = process.env.PORT || 5000;
const app = express();

connectDB(process.env.MONGO_URI);
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.use("/", (req, res) => {
  res.status(200).json({
    message: "welcome to my API🚀",
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
