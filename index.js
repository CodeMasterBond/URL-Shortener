//I use Express to listen for the short string leading to their URL.
const express = require('express');
//Access the POST body.
const parser = require('body-parser');
//Initialize Express.
const app = express();
app.use(parser.urlencoded({ extended: true }));
//Listen for main home url and send Form.
app.get('/', (req,res) => {
  res.sendFile(`${__dirname}/index.html`)
})
//Get results from form post and shorten URL.
app.post('/shortenurl', (req, res) => {
  //Test if provided url is valid
  if (req.body && req.body.url.match('http')) {
    //Try to generate short, unique string and convert to Base 36 for even shorter string.
    let shortenedurl = (Date.now() + ~~(Math.random()*1000)).toString(36);
    //Listen for the string matching the URL.
    listen(shortenedurl, req.body.url);
    //Let them know it succeeded and give them the shortened URL.
    res.send(`Success! Go To: https://URL-Shortener.codemaster007.repl.co//${shortenedurl}`)
    //If the provided URL was invalid or wasn't provided
  } else if (!req.body || !req.body.url || !req.body.url.match('http')) {
    //Tell them the bad news, and end.
    res.send(`Invalid body or url.`);
    res.end()
  }
});
//The code for the Listen Function
const listen = (s, u) => {
  //Listen for the short string
  app.get(`/${s}`, (req, res) => {
    //Redirect them to their URL that was Shortened
    res.redirect(302, u)
  })
};
//Starts the server to handle Requests.
app.listen(3000, () => {console.log('ready')});