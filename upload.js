
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const pinataApiKey = process.env.APIKEY;
const pinataSecretApiKey = process.env.APISECRET;

const pinFileToIPFS = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", fs.createReadStream("./data/001/preview.mp4"));
  const res = await axios.post(url, data, {
    maxContentLength: "Infinity", 
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey, 
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });
  console.log(res.data);
};

const pinJsonToIPFS = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", fs.createReadStream("./metadata/0002/metadata.json"));
  try {
    const res = await axios.post(url, data, {
      headers: {
        maxContentLength: "Infinity", 
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey, 
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
    console.log(res.data);
  } catch(err) {
    console.error(err);
  }
};
pinJsonToIPFS();

