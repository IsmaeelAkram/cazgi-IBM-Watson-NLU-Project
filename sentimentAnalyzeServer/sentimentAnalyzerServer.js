const express = require("express");
const NLUv1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
require("dotenv").config();

function getNLUInstance() {
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;

  const nlu = new NLUv1({
    version: "2021-08-01",
    authenticator: new IamAuthenticator({ apikey: API_KEY }),
    serviceUrl: API_URL,
  });
  return nlu;
}

const app = new express();

app.use(express.static("client"));

const cors_app = require("cors");
app.use(cors_app());

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", async (req, res) => {
  try {
    let nlu = getNLUInstance();
    let url = req.query.url;
    let results = await nlu.analyze({
      url: url,
      features: {
        emotion: {},
      },
    });
    return res.send(results.result.emotion.document.emotion);
  } catch (e) {
    return res.status(500).send(e.toString());
  }
});

app.get("/url/sentiment", async (req, res) => {
  try {
    let nlu = getNLUInstance();
    let url = req.query.url;
    let results = await nlu.analyze({
      url: url,
      features: {
        sentiment: {},
      },
    });
    return res.send(results.result.sentiment.document.label);
  } catch (e) {
    return res.status(500).send(e.toString());
  }
});

app.get("/text/emotion", async (req, res) => {
  try {
    let nlu = getNLUInstance();
    let text = req.query.text;
    let results = await nlu.analyze({
      text: text,
      features: {
        emotion: {},
      },
    });
    return res.send(results.result.emotion.document.emotion);
  } catch (e) {
    return res.status(500).send(e.toString());
  }
});

app.get("/text/sentiment", async (req, res) => {
  try {
    let nlu = getNLUInstance();
    let text = req.query.text;
    let results = await nlu.analyze({
      text: text,
      features: {
        sentiment: {},
      },
    });
    return res.send(results.result.sentiment.document.label);
  } catch (e) {
    return res.status(500).send(e.toString());
  }
});

let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
