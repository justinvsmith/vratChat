const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vratChat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Established a connection to the database"))
    .catch(() => console.log("There was a problem connecting to the database"))