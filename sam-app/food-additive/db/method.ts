exports.get = (offset: string, fetch: string) => {

    let sql: string = "";

    if (offset.length > 0 && fetch.length > 0) {

        sql += " SELECT                                     ";
        sql += "  [name],                                   ";
        sql += "  [descriptionText],                        ";
        sql += "  [usage],                                  ";
        sql += "  [type],                                   ";
        sql += "  [keywords]                                ";
        sql += " FROM                                       ";
        sql += "  [" + process.env.DB_NAME + "].[dbo].[FoodAdditive]       ";
        sql += " ORDER BY                                   ";
        sql += "  [name] ASC                                "; // キーで並び替える
        sql += " OFFSET " + offset + " ROWS                 ";
        sql += " FETCH NEXT " + fetch + " ROWS ONLY         ";
        sql += " ;";

    } else {
        
        // 全件取得
        sql += " SELECT                                     ";
        sql += "  [name],                                   ";
        sql += "  [descriptionText],                        ";
        sql += "  [usage],                                  ";
        sql += "  [type],                                   ";
        sql += "  [keywords]                                ";
        sql += " FROM                                       ";
        sql += "  [" + process.env.DB_NAME + "].[dbo].[FoodAdditive]       ";
        sql += " ORDER BY                                   ";
        sql += "  [name] ASC                                ";
        sql += " ;";

    }

    return sql
};

exports.post = (foodAdditive: any) => {

    let sql: string = ""

    sql += " INSERT INTO [" + process.env.DB_NAME + "].[dbo].[FoodAdditive] "
    sql += " (                                   "
    sql += "   [name],                           "
    sql += "   [descriptionText],                "
    sql += "   [usage],                          "
    sql += "   [type],                           "
    sql += "   [keywords]                        "
    sql += " )                                   "
    sql += " VALUES                              "
    sql += " (                                   "
    sql += "   @name,                            "
    sql += "   @descriptionText,                 "
    sql += "   @usage,                           "
    sql += "   @type,                            "
    sql += "   @keywords                         "
    sql += " );                                  "
    sql += "    "

    return sql

}