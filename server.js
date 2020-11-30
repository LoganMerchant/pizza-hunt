const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// Use heroku uri, or the localhost
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    // Make update and remove methods use native findOneAndUpdate()
    useFindAndModify: false,
    // Used as a fallback to the old MongoDB driver if necessary
    useNewUrlParser: true,
    // Opt in to the new MongoDB driver
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
