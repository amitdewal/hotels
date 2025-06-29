const express = require("express");
const app = express();
const db = require("./db")
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

app.listen(3000, () => {
    console.log("server start at port 3000");
})