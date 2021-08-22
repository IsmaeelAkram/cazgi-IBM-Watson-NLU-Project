const express = require('express');
const NLUv1 = require('ibm-watson/natural-language-understanding/v1');
const {IamAuthenticator} = require('ibm-watson/auth')
require('dotenv').config();

function getNLUInstance(){
    const API_KEY = process.env.API_KEY;
    const API_URL = process.env.API_URL;
    
    const nlu = new NLUv1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({apikey: API_KEY}),
        serviceUrl: API_URL
    });
    return nlu;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

