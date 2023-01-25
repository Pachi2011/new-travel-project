const router = require("express").Router();

const Experience = require("../models/Experience.model.js");

router.get("/review/create", (req, res) => {
  res.render("reviews/review-create");
});

router.post("/review/create", (req, res, next) => {
  const {typeOfExperience, placeName, picture} = req.body;
  Experience.create({typeOfExperience, placeName, picture})
    .then((newReview) => {
      console.log(newReview);
      res.redirect("/review-list");
    })
    .catch((error) => next(error));
});

router.get("/review-list", (req, res, next) => {
  Experience.find()
    .then((allReviews) => {
      res.render("reviews/review-list", {allReviews});
    })
    .catch((err) => next(err));
});

module.exports = router;
