const express = require('express');

const router = express.Router();

const Person = require('../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved", response);
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }

})

// get the data from the db
router.get('/', async (req, res) => {
    try {
        const dbPerson = await Person.find();
        console.log("data fetched");
        res.status(200).json(dbPerson);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });

    }
})

// get request to get person by profeesion
router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const data = await Person.find({ work: workType });
            console.log("data fetched");
            res.status(200).json(data);

        } else {
            res.status(404).json({ error: "invalid work type" });
        }
    } catch (error) {
        console.log("error", error);

        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
})

// put request
router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;//extract id from url
        const updatedDatafromClient = req.body;
        const responseFromDb = await Person.findByIdAndUpdate(personId, updatedDatafromClient, {
            new: true, // return the updated document
            runValidators: true, // run mongosse validation

        });

        if (!responseFromDb) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log("data fetched");
        res.status(200).json(responseFromDb);



    } catch (error) {
        console.log("error", error);

        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }

})

// delete 

router.delete("/:id", async (req, res) => {
    try {
        const personid = req.params.id;
        const response = await Person.findByIdAndDelete(personid);

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("delete successfully");
        res.status(200).json({ message: "person delete Successfully!" });
    } catch (error) {
        console.log("error", error);

        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
})


















module.exports = router;