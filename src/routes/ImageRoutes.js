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

module.exports = router;
