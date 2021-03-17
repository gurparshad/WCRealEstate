const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { User, Property } = require("../models");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/1.0/users/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.post("/api/1.0/property/addProperty/:userId", async (req, res) => {
  const { userId } = req.params;
  const {
    address,
    price,
    rooms,
    builtYear,
    ownership,
    groundArea,
    energyMark,
    phone,
  } = req.body;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const property = await Property.create({
      address,
      price,
      rooms,
      builtYear,
      ownership,
      groundArea,
      energyMark,
      phone,
      userId: user.id,
    });
    return res.json(property);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

async function main() {}
main();

app.use("/", (req, res) => {
  console.log("hello world");
  return res.send({ message: "API working" });
});

module.exports = app;
