const express = require('express');
const router = express.Router();
module.exports = router;

const notifications_Mid = require("../Middlewares/notifications_Mid");

router.get("/List", [notifications_Mid.GetAllItems], (req, res) => {
    if(res.ok) {
        res.status(200).json(req.ItemsData);
    }
    else
        return res.status(500).json({message: res.err});
});


router.post("/Add", [notifications_Mid.AddItem], (req, res) => {
    if(res.ok)
        res.status(200).json({message:"OK", Last_Id:res.insertId});
    else
        return res.status(500).json({message: res.err});
});