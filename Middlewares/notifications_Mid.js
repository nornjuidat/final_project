let tableName="notifications";

async function GetAllItems(req, res, next) {
    let values = [];
    let Query = `SELECT * FROM ${tableName}`;
    Query += " ORDER BY date_target DESC";

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
        data_by_id[row.notification_id] = row.message;
    }

    res.ok = true;
    req.ItemsData = {
        list: rows,
        data_by_id: data_by_id
    };

    next();
}

async function AddItem(req,res,next){
    let user_id          = req.body.user_id        || "";
    let message          = req.body.message        || "";
    let date_target      = req.body.date_target    || "";


    res.ok=false;
    res.err="";

    if(user_id === "" || message === "" || date_target === "" ){
        res.err="wrong parameters";
        return next();
    }

    const Query = `INSERT INTO ${tableName} (user_id,message,date_target) VALUES (?,?,?)`;
    let values = [user_id,message,date_target];
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
    let notification_id      = req.body.notification_id  || -1 ;
    let Query = `DELETE FROM ${tableName}  `;
    Query += ` WHERE notification_id=? ` ;
    let values = [notification_id];

    res.ok=false;
    if(notification_id<0){
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
    let notification_id  = req.params.notification_id   || -1;
    let user_id        = req.body.user_id               || "";
    let message        = req.body.message               || "";
    let date_target    = req.body.date_target           || "";


    let Query = `UPDATE ${tableName} SET `;
    Query += `user_id            = ?,   `;
    Query += `message            = ?,   `;
    Query += `date_target        = ?   `;
    Query += ` WHERE notification_id=?` ;

    let values = [user_id, message, date_target, notification_id];

    res.ok=false;
    res.err="";
    if(notification_id<0){
        return res.status(500).json({status:"ERROR",message: "id is not valid"});
    }
    if(user_id === "" || message === "" || date_target === "" ){
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


module.exports={
    GetAllItems,
    AddItem,
    DeleteItem,
    UpdateItem,
}