import db from "./db.js";


class ep_macros {



    query(q, res) {
        const sql = q;
        db.query(sql, (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    }

    //craft a search string, automatically creating an OR statement for different columns to search
    //prefix: (optional else use "") the operator to put in front of the string WITH SPACES
    //search: the string to search for
    //inArgs: an array of column name strings to search in
    generate_search_string(prefix, search, inArgs) {
        var s = prefix;
        s += "(";
        for (var i in inArgs) {
            s += inArgs[i] + " LIKE '%" + search + "%'";
            if (i != inArgs.length - 1) s += " OR ";
        }
        s += ")";
        return s;
    }

    //craft a SELECT query then POST it
    //table: the table
    //args: the query arguments
    // columns: the fields
    // other: other info
    // where: the condition
    // groupBy: group by
    // orderBy: order by ... [desc]
    // (leave out fields for default values, or pass blank list for no args)
    // res: the response object
    select(table, args, res) {
        var q = "SELECT ";
        if (args.columns) q += args.columns;
        else q += "*";
        q += " FROM " + table;
        if (args.other) q += " " + args.other;
        if (args.where) q += " WHERE " + args.where;
        if (args.groupBy) q += " GROUP BY " + args.groupBy;
        if (args.orderBy) q += " ORDER BY " + args.orderBy;
        console.log(q);

        db.query(q, (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    }


    //check if an item is defined
    //item: the object
    exists = (item) => item ? 1 : 0;

}

export default ep_macros;