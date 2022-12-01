const path = require("path");
const fs = require("fs");
const directory = "./public/img";
const files = require("../model/image");

(async function defaultData(req, res) {
  const directoryPath = path.join(directory);
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, imgFiles) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    // console.log("folders");
    // console.log(directoryPath);
    imgFiles.forEach(async function (file) {
      const check_file = await files.findOne({ file_name: file });
      var file_id = "";
      if (!check_file) {
        const img = "img/" + file;
        const delete_file = await files.deleteMany({ file_name: file });
        const save_file = await new files({ file_name: file, img }).save();
        file_id = save_file._id;
      } else {
        file_id = check_file._id;
      }
    });
  });
})();

const aboutImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "About.png" });
    const mimage = await files.findOne({ file_name: "mabout.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const collectionImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "Collection.png" });
    const mimage = await files.findOne({ file_name: "mcollection.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const passiveincomeImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "passiveincome.png" });
    const mimage = await files.findOne({ file_name: "mpassiveincome.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const storyImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "story.png" });
    const mimage = await files.findOne({ file_name: "mstory.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const teamImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "team.png" });
    const mimage = await files.findOne({ file_name: "mteam.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const contactImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "contact.png" });
    const mimage = await files.findOne({ file_name: "mcontact.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const roadmapImage = async (req, res) => {
  try {
    const file = await files.findOne({ file_name: "Roadmap.png" });
    const mimage = await files.findOne({ file_name: "mroadmap.png" });

    // console.log(file);
    res.status(200).send({
      status: "true",
      data: {
        laptop: file,
        Moblie: mimage,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
module.exports = {
  aboutImage,
  roadmapImage,
  contactImage,
  teamImage,
  storyImage,
  passiveincomeImage,
  collectionImage,
};
