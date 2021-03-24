const express = require("express");
const router = express.Router();
const { User, Property } = require("../../models");

//  add a property
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

//  get all properties
router.get("/api/1.0/property/getAll", async (req, res) => {
  try {
    const properties = await Property.findAll();
    return res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get single property
router.get("/api/1.0/property/getProperty/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const properties = await Property.findOne({ where: { id: propertyId } });
    return res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get properties of particular user
router.get("/api/1.0/property/getProperties/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Property.findAll({ where: { userId: userId } });
    console.log("-------->>>>", properties);
    return res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// delete a property
router.delete("/api/1.0/property/delete/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    await Property.destroy({ where: { id: propertyId } });
    return res.json("property destroyed 🙈");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update property
router.patch(
  "/api/1.0/property/updateProperty/:propertyId",
  async (req, res) => {
    const { propertyId } = req.params;
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
      const property = await Property.findOne({ where: { id: propertyId } });
      const userId = property.userId;
      const updatedProperty = await Property.update(
        {
          address,
          price,
          rooms,
          builtYear,
          ownership,
          groundArea,
          energyMark,
          phone,
          userId: userId,
        },
        { where: { id: propertyId } },
      );
      console.log("-------->>>>", updatedProperty);
      return res.json(updatedProperty);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
);

module.exports = router;
