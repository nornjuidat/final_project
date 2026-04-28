const express = require('express');
const router = express.Router();
module.exports = router;

const user_Mid = require("../Middlewares/users_Mid");

router.get("/List", [user_Mid.GetAllItems], (req, res) => {
    if(res.ok) {
        res.status(200).json(req.ItemsData);
    }
    else
        return res.status(500).json({message: res.err});
});


router.post("/Add", [user_Mid.AddItem], (req, res) => {
    if(res.ok)
        res.status(200).json({message:"OK", Last_Id:res.insertId});
    else
        return res.status(500).json({message: res.err});
});


router.delete("/Delete", [user_Mid.DeleteItem], (req, res) => {
    if(res.ok)
        res.status(200).json({message:"OK"});
    else
        return res.status(500).json({message: res.err});
});


router.put("/Update/:user_id", [user_Mid.UpdateItem], (req, res) => {
    if(res.ok)
        res.status(200).json({message:"OK"});
    else
        return res.status(500).json({message: res.err});
});


router.post("/Login", [user_Mid.LoginUser], (req, res) => {
    if(res.ok) {
        res.status(200).json(req.ItemsData);
    }
    else
        return res.status(401).json({message: res.err});
});
