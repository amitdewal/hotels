const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const Person = require('./models/person')
const Menuitem = require('./models/menuItem');
const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get("/", (req, res) => {
    res.send("Welcome to our hotel!");
})

const personRouter = require("./routes/person.routes");
app.use('/person', personRouter);

const menuItemRoutes = require("./routes/menuItem.routes");
app.use("/menu", menuItemRoutes);


app.listen(PORT, () => {
    console.log("server start at port 3000");
})