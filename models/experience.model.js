const { Schema, model } = require("mongoose");


const experienceSchema = new Schema({
     
    typeOfExperience: {
      type: String,
      enum: ["restaurant","hotel","festival","concert","resort","other"]
    },
    placeName: String,
    picture: [String],
    city: String,
    contry: String,
    price: Number,
    reviewText: String,
    headline: String,
    rating: {
        type: Number,
        enum: [1,2,3,4,5]
     },

    user_id: { type: Schema.Types.ObjectId, ref: 'User' },

},
{
    timestamps: true
 }
);

  


exports.module = model ('Experience', experienceSchema)
