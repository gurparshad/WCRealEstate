const express = require("express");
const router = express.Router();
const { Picture } = require("../../models");
const imageUploader = require("../helpers/image-uploader");

// add an image to database
router.post(
  "/api/1.0/property/addPicture/:propertyId",
  imageUploader.upload.single("image"),
  async (req, res) => {
    const { propertyId } = req.params;
    if (req.file.filename) {
      const photourl = req.file.filename;
      await Picture.create({
        photourl,
        propertyId: propertyId,
      });
      res.status(201).json({
        message: "image upload successfully",
        url: photourl,
      });
    } else {
      res.status(500).json({
        message: "something went wrong!",
        url: req.file.filename,
      });
    }
  },
);

// get all pictures of a property
router.get("/api/1.0/property/getAllPictures/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const pictures = await Picture.findAll({
      where: { propertyId: propertyId },
    });
    return res.json(pictures);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// delete a picture
router.delete("/api/1.0/property/deletePicture/:photoId", async (req, res) => {
  const { photoId } = req.params;
  try {
    await Picture.destroy({ where: { id: photoId } });
    return res.json("image deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// delete picture with photourl
router.delete(
  "/api/1.0/property/deletePictureByUrl/:photoUrl",
  async (req, res) => {
    const { photoUrl } = req.params;
    console.log("+++++++==", photoUrl);
    try {
      await Picture.destroy({ where: { photourl: photoUrl } });
      return res.json("image deleted");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
);

module.exports = router;
