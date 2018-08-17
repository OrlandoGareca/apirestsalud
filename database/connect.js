const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/salud',{ useNewUrlParser: true });
module.exports = mongoose;
