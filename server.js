const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const qouteObj = {};
    qouteObj.quote = getRandomElement(quotes)
    res.status(200).send(qouteObj);
})

app.get('/api/quotes', (req, res, next) => {
    let quoteObj = {};
    //console.log(req.query.person);
    if(req.query.person){
        const person = req.query.person;
        const personQuotes = quotes.filter((quoteObj) => {
            return quoteObj.person === person;
        })

        quoteObj.quotes = personQuotes
    } else {
        quoteObj.quotes = quotes;
    }

    res.send(quoteObj);
})

app.post('/api/quotes', (req, res, next) => {
    const quoteObj = {};
    if(req.query.quote && req.query.person){
        const quote = {};
        const quoteText = req.query.quote;
        const quoteAuthor = req.query.person;
        quote.quote = quoteText;
        quote.person = quoteAuthor;
        console.log(quote);
        quoteObj.quote = quote;
        quotes.push(quote);
        res.status(200).send(quoteObj);
    }else{
        res.status(400).send();
    }
})

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
})

