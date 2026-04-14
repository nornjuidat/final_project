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

module.exports={
    GetAllItems,
}