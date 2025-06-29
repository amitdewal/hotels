const express = require('express');

const router = express.Router();

const Menuitem = require('../models/menuItem');




//post request to save the data to the server and db
router.post("/", async (req, res) => {

    try {
        const data = req.body;
        const newMenu = new Menuitem(data);
        const response = await newMenu.save();
        console.log("data saved", response);
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });

    }
}

)


// get request for menu
router.get('/', async (req, res) => {
    try {
        const dbMenu = await Menuitem.find();
        console.log("data fetched of menu");
        res.status(200).json(dbMenu);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });

    }
})
// get for taste

router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste;

        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const data = await Menuitem.find({ taste: taste })
            console.log("data fected", data);
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "invalid taste type" });
        }
    } catch (error) {
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
})

module.exports = router;