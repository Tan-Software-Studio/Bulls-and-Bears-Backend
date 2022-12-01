const express = require("express");
require("./db/conn");
const cors = require("cors");
const routes = require("./router/Nft");
const bodyParser = require('body-parser');
require("dotenv").config();
const port = process.env.PORT;

const app = express()
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));;
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/", routes);



app.all("*", (req, res) => {
  return res.status(200).send("URL not found. Rarity");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
