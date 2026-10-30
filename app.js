require("dotenv").config();

const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server Running on Port ${process.env.PORT}`
  );
});