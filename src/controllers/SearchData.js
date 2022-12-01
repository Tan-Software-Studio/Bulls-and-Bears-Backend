const Nft = require("../model/nft1&2");
const Nft2 = require("../model/nft3");
const PassiveIncome = require("../model/passiveincom");
const collection_12 = require("../utils/collection1&2.json");
const collection_3 = require("../utils/collection3.json");
const nftScore = require("../model/nftscore");
const nftScore2 = require("../model/nftscore2");
const contact = require("../model/contact");
const {sendEmail, sendWelcomeEmail} = require("../utils/email");

(async function defaultData(req, res) {
  for (const data of collection_12) {
    // const check = await Nft.find({ name: data.name });
    // if (!check) continue;

    const name = data.name;
    const description = data.description;
    const external_url = data.external_url;
    const image = data.image;
    // let trait_type, value;
    const attributes = [];

    data.attributes.forEach((nft) => {
      attributes.push({ trait_type: nft.trait_type, value: nft.value });
    });

    let files = [];

    data.properties.files.forEach((p) => {
      files.push({ uri: p.uri, type: p.type });
      // console.log(p.uri);
    });

    const compiler = data.compiler;
    const check = await Nft.findOneAndRemove({ name });

    const saveData = await new Nft({
      name,
      description,
      external_url,
      image,
      attributes,
      properties: { files, creators: data.properties.creators },
      compiler,
    }).save();
  }

  for (const data of collection_3) {
    // const check = await Nft2.find({ name: data.name });
    // if (!check) continue;

    const name = data.name;
    // console.log(name);
    const description = data.description;
    const external_url = data.external_url;
    const image = data.image;
    // let trait_type, value;
    const attributes = [];

    data.attributes.forEach((Nft) => {
      attributes.push({ trait_type: Nft.trait_type, value: Nft.value });
    });

    let files = [];

    data.properties.files.forEach((p) => {
      files.push({ uri: p.uri, type: p.type });
      // console.log(p.uri);
    });

    const compiler = data.compiler;

    const check = await Nft2.findOneAndRemove({ name });

    const saveData = await Nft2({
      name,
      description,
      external_url,
      image,
      attributes,
      properties: { files, creators: data.properties.creators },
      compiler,
    }).save();
  }
})();

(async function defaultscore(req, res) {
  for (const data of collection_12) {
    const img = data.properties.files[0].uri;
    // console.log(img);
    // console.log(data.name)
    const check = await nftScore.findOne({ nft_name: data.name });
    if (check) continue;

    const name = data.name;
    // console.log(name);
    const nftkey = data.attributes;

    const attributes = [];
    let percentage = [];
    let sum = 0;
    let P = [];
    for (const keyVal of nftkey) {
      const trait_type = keyVal.trait_type;
      // console.log(trait_type);
      const value = keyVal.value;
      // Check Rarity equation
      const nftData = await Nft.find({
        attributes: { $elemMatch: { trait_type, value } },
      }).count();
      const totalNft = 611;
      const traitTotal = nftData;

      percentage.push(((traitTotal / totalNft) * 100).toFixed(2) + " %");
      const per = percentage;
      //       // console.log(per);
      sum = parseFloat(per) + sum;
      // console.log(sum);
    }

    P = Math.max(sum); // score ka value
    let l = percentage.length;
    let calcu = P / l;
    let score = 1 / calcu;

    let i = 0;
    data.attributes.forEach((nft) => {
      attributes.push({
        trait_type: nft.trait_type,
        value: nft.value,
        percentage: percentage[i],
      });
      i++;
    });

    // await nftScore.findOneAndRemove({ nft_name: name });

    const Data = await new nftScore({
      nft_name: name,
      attributes,
      score: score.toFixed(4),
      img,
    }).save();

    const nftdata = await nftScore.find({}).sort({ score: 1 });
    // console.log(nftdata)
    let j = 1;
    for (const data of nftdata) {
      const update = await nftScore.findOneAndUpdate(
        { _id: data._id },
        { rank: j },
        { new: true }
      );
      j++;
      // console.log(update);
    }
  }
})();

(async function defaultrank2(req, res) {
  for (const data of collection_3) {
    const img = data.properties.files[0].uri;
    // console.log(data.name)
    const check = await nftScore2.findOne({ nft_name: data.name });
    if (check) continue;

    const name = data.name;
    // console.log(name);
    const nftkey = data.attributes;

    const attributes = [];
    let percentage = [];
    let sum = 0;
    let P = [];
    for (const keyVal of nftkey) {
      const trait_type = keyVal.trait_type;
      // console.log(trait_type);
      const value = keyVal.value;
      // Check Rarity equation
      const nftData = await Nft2.find({
        attributes: { $elemMatch: { trait_type, value } },
      }).count();
      const totalNft = 500;
      const traitTotal = nftData;

      percentage.push(((traitTotal / totalNft) * 100).toFixed(2) + " %");
      const per = percentage;
      //       // console.log(per);
      sum = parseFloat(per) + sum;
      // console.log(sum);
    }

    P = Math.max(sum); // score ka value
    let l = percentage.length;
    let calcu = P / l;
    let score = 1 / calcu;

    let i = 0;
    data.attributes.forEach((nft) => {
      attributes.push({
        trait_type: nft.trait_type,
        value: nft.value,
        percentage: percentage[i],
      });
      i++;
    });

    // await nftScore.findOneAndRemove({ nft_name: name });

    const Data = await new nftScore2({
      nft_name: name,
      attributes,
      score: score.toFixed(4),
      img,
    }).save();

    const nftdata = await nftScore2.find({}).sort({ score: 1 });
    // console.log(nftdata)
    let j = 1;
    for (const data of nftdata) {
      const update = await nftScore2.findOneAndUpdate(
        { _id: data._id },
        { rank: j },
        { new: true }
      );
      j++;
      // console.log(update);
    }
  }
})();

const searchNft = async (req, res) => {
  try {
    // Nft trait value check and count
    const { trait_type, value } = req.body;
    const nftData = await Nft.find({
      attributes: { $elemMatch: { trait_type, value } },
    });
    // const name = nftData[0].attributes;
    if (!nftData) {
      return res.status(200).send({
        status: false,
        message: "Record not found",
        data: {},
      });
    }
    // const nftKeyVal = nftData.attributes
    console.log(nftData);

    // Check Rarity equation
    // const totalNft = 611;
    // const traitTotal = nftData;
    // const result = ((traitTotal / totalNft) * 100).toFixed(2);
    return res
      .status(200)
      .json({ status: true, message: `Filter Categories`, data: nftData });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const individualNft = async (req, res) => {
  try {
    const { name } = req.body;
    var nameData = [];
    const fullName = "#" + name;
    // console.log(fullName);
    nameData = await Nft.findOne({ name: fullName });

    if (!nameData) {
      return res.status(200).send({
        status: false,
        message: "Record not found",
        data: {},
      });
    }
    const nftKeyVal = nameData.attributes;
    const Url = nameData.properties.files[0].uri;
    // console.log(nameData);
    // console.log(nftKeyVal);
    // const img = nameData.image;
    const nftName = nameData.name;
    const Properties = [];
    for (const keyVal of nftKeyVal) {
      const trait_type = keyVal.trait_type;
      const value = keyVal.value;

      const nftData = await Nft.find({
        attributes: { $elemMatch: { trait_type, value } },
      }).count();
      const totalNft = 611;
      const traitTotal = nftData;
      const Percentage = ((traitTotal / totalNft) * 100).toFixed(2) + " %";

      Properties.push({
        trait_type: trait_type,
        value: value,
        Percentage: Percentage,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Collection 1&2",
      data: {
        nftName,
        Url,
        Properties,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      status: true,
      message: "This Nft doesn't exist.",
    });
  }
};

const doubleNft = async (req, res) => {
  try {
    const { name } = req.body;
    var nameData = [];
    const _Name = "#" + name;
    nameData = await Nft2.findOne({ name: _Name });
    if (!nameData) {
      return res.status(200).send({
        status: false,
        message: "Record not found",
        data: {},
      });
    }
    const nftKeyVal = nameData.attributes;
    // console.log(nameData);
    // console.log(nftKeyVal);
    const Url = nameData.properties.files[0].uri;
    // console.log(Url);
    const nftName = nameData.name;
    const Properties = [];
    for (const keyVal of nftKeyVal) {
      const trait_type = keyVal.trait_type;
      const value = keyVal.value;

      const nftData = await Nft2.find({
        attributes: { $elemMatch: { trait_type, value } },
      }).count();
      // Check Rarity equation
      const totalNft = 500;
      const traitTotal = nftData;
      const Percentage = ((traitTotal / totalNft) * 100).toFixed(2) + " %";

      Properties.push({
        trait_type: trait_type,
        value: value,
        Percentage: Percentage,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Collection 3",
      data: {
        nftName,
        Url,
        Properties,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({
      status: true,
      message: "This Nft doesn't exist.",
    });
  }
};

const collection1 = async (req, res) => {
  try {
    const { description } = req.body;
    const newNft = await Nft.find(description);
    if (!newNft) {
      return res.status(200).send({
        status: false,
        message: "Record not found",
        data: {},
      });
    }

    const Properties = [];
    for (let i = 0; i < newNft.length; i++) {
      Properties.push({
        name: newNft[i].name,
        url: newNft[i].properties.files[0].uri,
      });
    }

    res
      .status(200)
      .send({ status: true, message: "Collection 1&2", data: Properties });
  } catch (e) {
    res.status(500).send({ status: false, message: "Collection not found" });
  }
};

const collection3 = async (req, res) => {
  try {
    const newNft = await Nft2.find({
      description: "Bullrun Bulls #3",
    });

    const Properties = [];
    for (let i = 0; i < newNft.length; i++) {
      Properties.push({
        name: newNft[i].name,
        url: newNft[i].properties.files[0].uri,
      });
    }
    res
      .status(200)
      .send({ status: true, message: "Collection 3", data: Properties });
  } catch (e) {
    res.status(500).send({ status: false, message: "Collection not found" });
  }
};

const passiveIncome = async (req, res) => {
  try {
    const { discord_name, sologenic_account_name, xrp_address } = req.body;
    const data = await PassiveIncome({
      discord_name,
      sologenic_account_name,
      xrp_address,
    }).save();

    res.status(200).send({ status: true, data: data });
  } catch (e) {
    res
      .status(500)
      .send({ status: false, message: "passive income not found" });
  }
};

const rankSet = async (req, res) => {
  try {
    const nftdata = await nftScore.find({});
    // console.log(nftdata)
    const Properties = [];
    for (let i = 0; i < nftdata.length; i++) {
      Properties.push({
        name: nftdata[i].nft_name,
        score: nftdata[i].score,
        rank: nftdata[i].rank,
        img: nftdata[i].img,

        // attributes: nftdata[i].attributes
      });
    }
    return res.status(200).json({
      status: true,
      message: `Collection 1&2 rank set`,
      data: { Properties },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ status: false, message: `Rank set not found`, data: {} });
  }
};

const rankSet2 = async (req, res) => {
  try {
    const nftdata = await nftScore2.find({});
    // console.log(nftdata)
    const Properties = [];
    for (let i = 0; i < nftdata.length; i++) {
      Properties.push({
        name: nftdata[i].nft_name,
        score: nftdata[i].score,
        rank: nftdata[i].rank,
        img: nftdata[i].img,

        // attributes: nftdata[i].attributes
      });
    }
    return res.status(200).json({
      status: true,
      message: `Collection 3 rank set`,
      data: { Properties },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ status: false, message: `Rank set not found`, data: {} });
  }
};

const accRank1 = async (req, res) => {
  try {
    const nftdata = await nftScore.find({}).sort({ rank: 1 });
    // console.log(nftdata)
    const Properties = [];
    for (let i = 0; i < nftdata.length; i++) {
      Properties.push({
        name: nftdata[i].nft_name,
        score: nftdata[i].score,
        rank: nftdata[i].rank,
        img: nftdata[i].img,

        // attributes: nftdata[i].attributes
      });
    }
    return res.status(200).json({
      status: true,
      message: `Collection 1&2 rank accending`,
      data: { Properties },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ status: false, message: `Rank set not found`, data: {} });
  }
};

const decRank1 = async (req, res) => {
  try {
    const nftdata = await nftScore.find({}).sort({ rank: -1 });
    // console.log(nftdata)
    const Properties = [];
    for (let i = 0; i < nftdata.length; i++) {
      Properties.push({
        name: nftdata[i].nft_name,
        score: nftdata[i].score,
        rank: nftdata[i].rank,
        img: nftdata[i].img,

        // attributes: nftdata[i].attributes
      });
    }
    return res.status(200).json({
      status: true,
      message: `Collection 1&2 rank dcending`,
      data: { Properties },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ status: false, message: `Rank set not found`, data: {} });
  }
};

const accRank2 = async (req, res) => {
  try {
    const nftdata = await nftScore2.find({}).sort({ rank: 1 });
    // console.log(nftdata)
    const Properties = [];
    for (let i = 0; i < nftdata.length; i++) {
      Properties.push({
        name: nftdata[i].nft_name,
        score: nftdata[i].score,
        rank: nftdata[i].rank,
        img: nftdata[i].img,

        // attributes: nftdata[i].attributes
      });
    }
    return res.status(200).json({
      status: true,
      message: `Collection 3 rank accending`,
      data: { Properties },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ status: false, message: `Rank set not found`, data: {} });
  }
};

const decRank2 = async (req, res) => {
  try {
    const nftdata = await nftScore2.find({}).sort({ rank: -1 });
    // console.log(nftdata)
    const Properties = [];
    for (let i = 0; i < nftdata.length; i++) {
      Properties.push({
        name: nftdata[i].nft_name,
        score: nftdata[i].score,
        rank: nftdata[i].rank,
        img: nftdata[i].img,
        // attributes: nftdata[i].attributes
      });
    }
    // const n = Properties[0].score
    // console.log(n);
    return res.status(200).json({
      status: true,
      message: `Collection 3 rank dcending`,
      data: { Properties },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ status: false, message: `Rank set not found`, data: {} });
  }
};

const contactForm = async (req, res) => {
  try {
    const { name, email, subject, description } = req.body;

    const user = await new contact({
      name,
      email,
      subject,
      description,
    }).save();
    if (!user) {
      return res.status(400).send({ status: false, message: "Data not found" });
    }

    // email template ====================
            
    var sendMailData = {
        "file_template": './public/EmailTemplates/welcome.html',
        "subject": subject,
        // "to": email ? email : null,
        "username": `${ name }`,
        "from": email,
        "description": description
    }

    sendEmail(sendMailData).then((val) => {
        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Please check your email.", 'data': val })
    }).catch((err) => {
        console.log(err);
        return res.status(401).send({ "status": false, 'code': 200, "message": "Unable to send email!", data: {} })
    })


    // without tempalte 
    // send welcome email
            // var subject1 = "Welcome to WIZZ Coin"
            // var html1 = "<h2>Hello , <br>Congratulations! You have successfully signed up for WIZZ Ecosystem </br> We are super excited to welcome you to our WIZZ Ecosystem Community.</br> Now you are all set to buy our WIZZ NFT Smart Node to start earning passive income.</br> Thank You,</br> Team Wizz"

            // var mail = await sendWelcomeEmail(email, subject1, html1)

    return res.status(200).send({ status: true, data: user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: false, message: "Data not found" });
  }
};

const rankRarity = async (req, res) => {
  try {
    const { name } = req.body;
    var nameData = [];
    const fullName = "#" + name;
    // console.log(fullName);

    nameData = await nftScore.findOne({ nft_name: fullName });
    if (!nameData) {
      return res.status(200).send({
        status: false,
        message: "Record not found",
        data: {},
      });
    }

    const Properties = [];
    Properties.push({
      name: nameData.nft_name,
      score: nameData.score,
      rank: nameData.rank,
    });
    // console.log(Properties);
    return res
      .status(200)
      .json({ status: true, message: `Collection 1`, data: { Properties } });
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: false, message: "Data not found" });
  }
};

const rankRarity2 = async (req, res) => {
  try {
    const { name } = req.body;
    var nameData = [];
    const fullName = "#" + name;
    // console.log(fullName);

    nameData = await nftScore2.findOne({ nft_name: fullName });
    if (!nameData) {
      return res.status(200).send({
        status: false,
        message: "Record not found",
        data: {},
      });
    }
    const Properties = [];
    Properties.push({
      name: nameData.nft_name,
      score: nameData.score,
      rank: nameData.rank,
    });
    // console.log(Properties);
    return res
      .status(200)
      .json({ status: true, message: `Collection 3`, data: { Properties } });
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: false, message: "Data not found" });
  }
};
module.exports = {
  decRank2,
  decRank2,
  accRank2,
  accRank1,
  decRank1,
  rankSet,
  rankSet2,
  searchNft,
  individualNft,
  doubleNft,
  collection1,
  collection3,
  passiveIncome,
  contactForm,
  rankRarity,
  rankRarity2,
};
