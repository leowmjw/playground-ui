/**
 * Created by leow on 4/12/16.
 */
"use strict";

let util = require('util');
let arangojs = require('arangojs')

// How to dependency injection the config??
let db = new arangojs.Database({
    url: "http://localhost:8000"
});

// Don't for get to change' or set by default!!!
db.useDatabase("sinar")

// To store result??
let myresult = null

module.exports = {
    queryCursorArangoRepo: function (aql_query, options) {
        // Returns cursor .. Promise for future use?
    },
    getPostsByStates: function (array_states) {
        console.log("PARAMS: ", array_states)
        array_states = ['selangor', 'perak']

        // String join here to get the full picture ..
        // Form the AQL statement ..

        let aql_statement = `
        FOR p IN popit_posts
            FILTER LOWER(p.data.area.state) == 'selangor' && LIKE(LOWER(p.data.role),'%state%')
            RETURN [ p._key, p.data.role, p.data.area ]
        `
        // Form the AQL statement ..
        let aql_query = arangojs.aqlQuery`
        FOR p IN popit_posts
            FILTER LOWER(p.data.area.state) == 'selangor' && LIKE(LOWER(p.data.role),'%state%')
            RETURN [ p._key, p.data.role, p.data.area ]
        `
        // DEBUG:
        // console.log("DEBUG: Final AQL is ", util.inspect(aql_query))

        // Setup Generator
        // let myit = getAll(aql_query)
        // console.log("INIT", myit)
        // console.log("ITE", myit.next(aql_query))
        // console.log("ITE", myit.next(aql_query))

        console.log("Before arango call", this.request)
        _queryAllArangoRepo.call(this, aql_query, { count:true })
        // Parallel Old, New?
        // return myresult
    }
}

function *getAll(aql_query) {
    self.myresult = yield _queryAllArangoRepo(aql_query, {count: true})
    // console.log("GENERATOR: ", myresult)
    return
}

function _queryAllArangoRepo(aql_query, options) {
    // Returns array
    db.query(aql_query, options).then(
        cursor => {
            console.log(cursor.count, " result(s) returned!!")
            // self.result = cursor.count
            return cursor.all()
        },
        err => {
            console.error("ERR: ", err)
        }
    ).then(
        value => {
            // console.log("Got back from ARANGODB: ", util.inspect(value))
            this.result =  JSON.stringify(value)
        },
        err => {
            console.error("ERR: ", err)
        }
    )
}
