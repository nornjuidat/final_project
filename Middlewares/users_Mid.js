let tableName="users";
const jwt = require("jsonwebtoken");



async function GetAllItems(req, res, next) {
    let values = [];
    let Query = `SELECT * FROM ${tableName}`;
    Query += " ORDER BY user_id DESC";

    res.ok = false;
    res.err = "";

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if (rows === false) {
        res.err = "חלה תקלה, נא לנסות שנית";
        return res.status(500).json({
            status: "ERROR",
            Query: Query,
            err: res.err,
            values: values
        });
    }

    let data_by_id = [];
    for (let row of rows) {
        data_by_id[row.user_id] = row.name;
    }

    res.ok = true;
    req.ItemsData = {
        list: rows,
        data_by_id: data_by_id
    };

    next();
}


async function AddItem(req,res,next){
    let name          = req.body.name                  || "";
    let email          = req.body.email                || "";
    let password_hash      = req.body.password_hash    || "";
    let vet_id          = req.body.vet_id              || null;


    res.ok=false;
    res.err="";

    if(name === "" || email === "" || password_hash === ""   ){
        res.err="wrong parameters";
        return next();
    }

    const Query = `INSERT INTO ${tableName} (name,email,password_hash,vet_id) VALUES (?,?,?,?)`;
    let values = [name,email,password_hash,vet_id];
    let rows= await GenObj_Mid.QueryExecSimpleReply(Query,values);

    if(rows === false){
        res.err="חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR",Query: Query,err:res.err,values:values});
    }
    res.ok=true;
    res.insertId = rows.insertId;

    next();
}


async function DeleteItem(req,res,next){
    let user_id      = req.body.user_id  || -1 ;
    let Query = `DELETE FROM ${tableName}  `;
    Query += ` WHERE user_id=? ` ;
    let values = [user_id];

    res.ok=false;
    if(user_id<0){
        return res.status(500).json({status:"ERROR",message: "id is not valid"});
    }
    let rows= await GenObj_Mid.QueryExecSimpleReply(Query,values);
    if(rows === false){
        res.err="חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR",Query: Query,err:res.err,values:values});
    }
    res.ok=true;

    next();
}


async function UpdateItem(req,res,next){
    let user_id          = req.params.user_id          || -1;
    let name          = req.body.name                  || "";
    let email          = req.body.email                || "";
    let password_hash      = req.body.password_hash    || "";
    let vet_id          = req.body.vet_id              || null;


    let Query = `UPDATE ${tableName} SET `;
    Query += `name             = ?,   `;
    Query += `email            = ?,   `;
    Query += `password_hash    = ?,  `;
    Query += `vet_id    = ?   `;
    Query += ` WHERE user_id=?` ;

    let values = [name, email, password_hash, vet_id,user_id];

    res.ok=false;
    res.err="";
    if(user_id<0){
        return res.status(500).json({status:"ERROR",message: "id is not valid"});
    }
    if(name === "" || email === "" || password_hash === "" ){
        res.err="wrong parameters";
        return next();
    }
    let rows= await GenObj_Mid.QueryExecSimpleReply(Query,values);
    if(rows === false){
        res.err="חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR",Query: Query,err:res.err,values:values});
    }
    res.ok=true;

    next();
}


async function LoginUser(req,res,next){

    let email = req.body.email || "";
    let password_hash = req.body.password_hash || "";

    let Query = `SELECT * FROM ${tableName} WHERE email = ? AND password_hash = ?`;
    let values = [email, password_hash];

    res.ok = false;
    res.err = "";
     
    if(email === "" || password_hash === ""){
        res.err = "wrong parameters";
        return next();
    }

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if(rows.length === 0){
        res.err = "email or password wrong";
        return res.status(401).json({message: res.err});
    }

    let user = rows[0];

    let token = jwt.sign(
        {
            user_id: user.user_id,
            email: user.email
        },
        "secretKey",
        { expiresIn: "1h" }
    );

    res.ok = true;

    req.ItemsData = {
        user: user,
        token: token
    };

    next();
}

module.exports={
    GetAllItems,
    AddItem,
    DeleteItem,
    UpdateItem,
    LoginUser,
}