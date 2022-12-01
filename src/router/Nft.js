const express = require("express");
const router = express.Router();
const searchData = require("../controllers/SearchData");
const imageData = require("../controllers/imageData");
const cors = require("cors");

// router.post("/bullandbear/nft-rarity1", cors(), searchData.searchNft);

// Nft rarity list API
router.post("/bullandbear/collection1&2", cors(), searchData.individualNft);
router.post("/bullandbear/collection3", cors(), searchData.doubleNft);

// Search Collection nft API
router.post("/bullandbear/newCollection1", cors(), searchData.collection1);
router.post("/bullandbear/newCollection3", cors(), searchData.collection3);

// PassiveIncome store API
router.post("/bullandbear/passiveincome", cors(), searchData.passiveIncome);

// Rank set of collections
router.post("/bullandbear/setRank", cors(), searchData.rankSet);
router.post("/bullandbear/setRank2", cors(), searchData.rankSet2);

// accending and desending collection 1&2
router.post("/bullandbear/accRank", cors(), searchData.accRank1);
router.post("/bullandbear/decRank", cors(), searchData.decRank1);

// accending and desending collection 3
router.post("/bullandbear/accRank2", cors(), searchData.accRank2);
router.post("/bullandbear/decRank2", cors(), searchData.decRank2);

// Contact form APi
router.post("/bullandbear/sendmail", cors(), searchData.contactForm);

// singel api for rarity checker show a score,rank
router.post("/bullandbear/Rank1", cors(), searchData.rankRarity);
router.post("/bullandbear/Rank2", cors(), searchData.rankRarity2);

// Image api
router.post("/image/about", cors(), imageData.aboutImage);
router.post("/image/roadmap", cors(), imageData.roadmapImage);
router.post("/image/contact", cors(), imageData.contactImage);
router.post("/image/team", cors(), imageData.teamImage);
router.post("/image/story", cors(), imageData.storyImage);
router.post("/image/passiveincome", cors(), imageData.passiveincomeImage);
router.post("/image/collection", cors(), imageData.collectionImage);

module.exports = router;
