// controller

const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListings = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();

  req.flash("success", "New listing Created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }

  let orignalImgUrl = listing.image.url;
  orignalImgUrl = orignalImgUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit", { listing, orignalImgUrl });
};

module.exports.updateListings = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListings = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.searchPlace = async (req, res) => {
  const searchQuery = req.query.search;
  const searchRegex = new RegExp(searchQuery, "i");

  console.log(searchQuery);
  const filteredListings = await Listing.find({
    $or: [
      { title: searchRegex },
      { location: searchRegex },
      { category: searchRegex },
    ],
  });
  if (filteredListings.length === 0) {
    req.flash("error", `No place found for search query: ${searchQuery}`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { allListings: filteredListings });
};
