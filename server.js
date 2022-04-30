const http = require("http");

// Require Express.js
const express = require('express');
const app = express();

const args = require('minimist')(process.argv.slice(2));
args['port'];
const port = args.port || process.env.PORT || 5000;

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.get('/app/', (req, res) => {
    res.status(200).end("OK");
    res.type("text/plain");
});

app.get('/app/flip', (req, res) => {
    res.status(200).json({
        "flip": coinFlip()
    });
});

app.get('/app/flips/:number', (req, res) => {
    const raw = coinFlips(req.params.number);
    const summary = countFlips(raw);
    res.status(200).json({
        "raw": raw,
        "summary": summary
    });
});

app.get('/app/flips/:call', (req, res) => {
    res.status(200).json(
        flipACoin(req.params.call)
    )
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

// Coin functions from a02
function coinFlip() {
    let result = Math.random();
    if (result < 0.5) {
      result = "heads";
    } else {
      result = "tails";
    }
    return result;
}

function coinFlips(flips) {
    let array = [];
    for (let i = 0; i < flips; i++) {
      array.push(coinFlip());
    }
    return array;
}

function countFlips(array) {
    const result = {heads: 0, tails: 0};
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        result.heads++;
      } else {
        result.tails++;
      }
    }
    return result;
}

function flipACoin(call) {
    const result = {call: call, flip: "", result: ""};
    result.flip = coinFlip();
    if (result.call == result.flip) {
      result.result = "win";
    } else {
      result.result = "lose";
    }
    return result;
}