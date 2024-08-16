const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.post("/create", async (req, res) => {
    const userrs = req.body || {};
        try {
            const createUser = await userModel.create(userrs);
            createUser.save();
            res.status(200).send({id: createUser._id})
                
        } catch(e) {
            res.status(400).send(e?.message || "Something went wrong.")
        }
    });

router.delete("/delete-user/:id", async (req, res) => {
    
try {
    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id, req.body);
    if(!deleteUser) return res.status(404).send({message: error.message});
   res.status(200).send("User successfuly deleted..")

} catch (e) {
    res.status(400).send("Something went wrong")
}
});

router.get("/all-users", async (req, res) => {
try {
    
    const listOfUsers = await userModel.find({});
    res.status(200).send(listOfUsers)
} catch (e) {
    res.status(400).send(e?.message || "Something went wrong.")
}
})
router.get("/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const singleUser = await userModel.findById(userId);
        
        res.status(200).send(singleUser)
    } catch (e) {
        res.status(400).send(e?.message || "Something went wrong.")
    }
    })

module.exports = router;