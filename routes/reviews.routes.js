const router = require("express").Router();

const Experience = require("../models/Experience.model.js");

router.get("/review/create", (req, res) => {
  res.render("reviews/review-create");
});


router.post("/review/create", (req, res, next) => {
  const {typeOfExperience, placeName, picture, city, contry, price, reviewText, headline, rating, user_id} = req.body;
  Experience.create({typeOfExperience, placeName, picture, city, contry, price, reviewText, headline, rating, user_id})
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


// router.get("/review/:reviewID", (req, res, next) => {
//     Experience.findById(req.params)
//     .populate("reviews")
//       .then((review) => {
//         console.log(review);
//         res.render("reviews/review-details", review);
//       })
//       .catch((err) => next(err));
//   });

module.exports = router;
