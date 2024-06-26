const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews");


const categoryEnum = [
  "trending",
  "rooms",
  "iconic_cities",
  "mountains",
  "arctic",
  "castles",
  "beaches",
  "camping",
  "farms",
];

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    min: 0, // Ensure price is non-negative
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, 
      enum: ["Point"], 
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
    enum: categoryEnum, 
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
