const express = require("express");
const router = express.Router();
const { User, Property } = require("../../models");

router.post("/api/1.0/property/addProperty/:userId", async (req, res) => {
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

router.get("/api/1.0/property/addProperty/getAll", async (req, res) => {
  try {
    const properties = await Property.findAll();
    return res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
