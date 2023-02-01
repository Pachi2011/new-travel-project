const router = require("express").Router();
const Experience = require("../models/Experience.model.js");
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require("../models/User.model.js");


router.get("/review/create", isLoggedIn, (req, res) => {
  res.render("reviews/review-create");
});


router.post("/review/create", (req, res, next) => {
  let review = {}
  const {typeOfExperience, placeName, picture, city, contry, price, reviewText, headline, rating, user_id} = req.body;
  Experience.create({typeOfExperience, placeName, picture, city, contry, price, reviewText, headline, rating, user_id: req.session.currentUser._id}) //show user id in experince collection in DB
    .then((newReview) => {
      review = newReview
      console.log(newReview);
    })

    .then (()=>User.findById(review.user_id))
    .then((user)=>{
      user.review_id.push(review._id)  // pushing reviews of one user and putting them in one place
      User.create(user) // ?
    })
    .then(() => res.redirect("/review-list")
    )
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




  //comment route

   router.post("review/:reviewID/comments", (req,res)=>{
    let comment = {}
    const {username, date, text, review_id } = req.body;
    Comment.create({username,date,text, review_id: req.session.currentUser._id}) //show user id in experince collection in DB
      .then((newComment) => {
        comment = newComment
        console.log(newComment);
      })
  
    //  .then(() => res.redirect("/review")
    //   )

      .catch((error) => next(error));
  });
      

      






    

  //   // INSTANTIATE INSTANCE OF MODEL
  //   const comment = new Comment(req.body);

  //  // SAVE INSTANCE OF Comment MODEL TO DB
  //  comment
  //   .save()
  //   .then(() => Experience.findById(req.params.reviewId))
  //   .then((createComment) => {
  //     createComment.comments.push(comment);
  //     return post.save();
  //   })
  //   .then(() => res.redirect('/review/:reviewID'))
  //   .catch((err) => {
  //     console.log(err);
  //   });







module.exports = router;
