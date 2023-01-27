const router = require("express").Router();
const Experience = require("../models/Experience.model.js");
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');


router.get("/review/create", isLoggedIn, (req, res) => {
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


router.get("/review/:reviewID", isLoggedIn, (req, res, next) => {
    Experience.findById(req.params.reviewID)
    .populate("user_id")
      .then((review) => {
        console.log(review);
        res.render("reviews/review-details", review);
      })
      .catch((err) => next(err));
  });


  router.post("/review/:reviewID/delete", (req, res) => {
    Experience.findByIdAndDelete(req.params.reviewID)
      .then(() => {
        res.redirect("/review-list");
      })
      .catch((error) => {
        console.log("EVEN BIGGER ERROR", error);
      });
  });



  router.get("/review/:reviewID/edit", (req, res) => {
    let reviewArray = []
    Experience.find()
    .then(reviewEdit =>{
      reviewArray= reviewEdit
    })
  
    Experience.findById(req.params.reviewID)
      // .populate("cast_id")
      .then((editReview) => {
        console.log("some words", editReview);
        res.render("reviews/review-edit", {editReview, reviewArray});
      })
      .catch((error) => {
        console.log("biiig error", error);
      });
  });
  
  router.post("/review/:reviewID/edit", (req, res) => {
    const {typeOfExperience, placeName, picture, city, contry, price, reviewText, headline, rating, user_id} = req.body;
    Experience.findByIdAndUpdate(req.params.reviewID, {

      typeOfExperience: typeOfExperience,
       placeName: placeName,
       picture: picture,
       city: city,
       contry: contry,
        price: price,
        reviewText: reviewText,
        headline: headline,
         rating: rating,
         user_id: user_id,
    
    })
  
      .then((editResult) => {
        console.log("Review edited", editResult);
        res.redirect("/review-list");
      })
      .catch((error) => {
        console.log("error edit failed", error);
      });
  });

module.exports = router;
