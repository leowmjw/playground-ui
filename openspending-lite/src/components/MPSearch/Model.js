/**
 * Created by leow on 4/16/16.
 */
"use strict";

let util = require('util');
let arangojs = require('arangojs')
let config = require('../../config')

// How to dependency injection the config??
let db = new arangojs.Database({
    url: `http://${config.db.host}:${config.db.port}`
});

// Don't for get to change' or set by default!!!
db.useDatabase(`${config.db.name}`)

// To store result??
let myresult = null

function _queryAllArangoRepo(aql_query, options) {
    // Returns array
    db.query(aql_query, options).then(
        cursor => {
            // console.log(cursor.count, " result(s) returned!!")
            // self.result = cursor.count
            return cursor.all()
        },
        err => {
            console.error("ERR: ", err)
        }
    ).then(
        value => {
            // console.log("Got back from ARANGODB: ", util.inspect(value))
            // DEBUG:
            // console.log(JSON.stringify(value))
            this.result = value
            if (config.db.debug) {
                this.debugresult = JSON.stringify(this.result)
            }
        },
        err => {
            console.error("ERR: ", err)
        }
    )
}

function _promiseQueryAllArangoRepo(aql_query, options) {

    return db.query(aql_query, options)

}

module.exports = {
    search: function (keyword) {
        // DEBUG: db connection
        // console.log(util.inspect(db))
        // Validation; check keyword not empty .. trigger msg?? and color??

        // console.log("Input is ", util.inspect(keyword))
        // Trim the keyword so can match anything ...
        keyword = keyword.trim().toLowerCase()
        let aql_query = `
        FOR mp in current_mps
            FILTER LIKE(mp.myname.search, "%${keyword}%")
            RETURN {
                name: mp.myname.data.name,
                image: mp.myname.data.image,
                label: mp.mypost.data.label,
                org: mp.myorg.data.name,
                area: mp.myarea
            }
        `

        // console.log(util.inspect(aql_query))
        _queryAllArangoRepo.call(this, aql_query, {}, {count: true})

    },
    searchArea: function (keyword) {
        // Search for area ID

        // Search

        // Categorize them

        // Use Promise all ??
        keyword = keyword.trim().toLowerCase()
        // Here can be the more details one etc ..
        let aql_query = `
        FOR mp in current_mps
            FILTER LIKE(LOWER(mp.myarea.id), "%${keyword}%") || LIKE(LOWER(mp.myarea.name), "%${keyword}%")
            RETURN {
                name: mp.myname.data.name,
                image: mp.myname.data.image,
                label: mp.mypost.data.label,
                org: mp.myorg.data.name,
                area: mp.myarea
            }
        `

        // console.log(util.inspect(aql_query))
        _queryAllArangoRepo.call(this, aql_query, {}, {count: true})

    }

}