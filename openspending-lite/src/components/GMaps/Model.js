/**
 * Created by leow on 4/23/16.
 */
"use strict"

let util = require('util')
// Need superagent??
let arangojs = require('arangojs')
let config = require('../../config')

// How to dependency injection the config??
let db = new arangojs.Database({
    url: `http://${config.db.host}:${config.db.port}`
})

// Don't for get to change' or set by default!!!
db.useDatabase(`${config.db.name}`)

function *_genMapItData(aql_query) {
    console.log("BEFORE: ", util.inspect(this.resultjson))
    this.resultjson = yield _queryAllArangoRepo.call(this, aql_query, {}, {count: true})
    console.log("AFTER: ", util.inspect(this.resultjson))
}

function _lookupMapItIDByArea(area_id) {

}

function _promiseQueryAllArangoRepo(aql_query, options) {
    // Returns Promise

    return new Promise(function (resolve, reject) {
        db.query(aql_query, options).then(
            cursor => {
                // console.log(cursor.count, " result(s) returned!!")
                // self.result = cursor.count
                return cursor.all()
            },
            err => {
                // console.error("ERR: ", err)
                reject(err.message)
            }
        ).then(
            value => {
                // console.log("Got back from ARANGODB: ", util.inspect(value))
                // DEBUG:
                // console.log(JSON.stringify(value))
                resolve(value)
                // resultjson = "DUDE"
                // if (config.db.debug) {
                //    this.debugresult = JSON.stringify(this.result)
                // }
                // console.log(util.inspect(this.resultjson))
            },
            err => {
                // console.error("ERR: ", err)
                reject(err.message)
            }
        )
    })
}

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
            this(value)
            // resultjson = "DUDE"
            // if (config.db.debug) {
            //    this.debugresult = JSON.stringify(this.result)
            // }
            // console.log(util.inspect(this.resultjson))
        },
        err => {
            console.error("ERR: ", err)
        }
    )
}

module.exports = {
    getGeoJSONByArea: function (area_id) {
        // Look up the Internal ID from area_id
        let mapit = _genMapItData()
        let myoutput = null
        myoutput = mapit.next()
    },
    testPromise: function () {
        // Data structure
        let resultjson = {
            resultjson: "BOB",
            lat: null,
            lng: null
        }

        console.log("resultJSON", util.inspect(resultjson))
        let aql_query = `
            FOR p IN posts
                LIMIT 0,2
                RETURN p
        `
        let myprom = new Promise(function (resolve, reject) {
            _queryAllArangoRepo.call(resolve, aql_query, {}, {count: true})
        })
            .then(
                (value) => {
                    console.log("PASS!!!", value)
                },
                (err) => {
                    console.error("DIED!!")
                }
            )

        // let it = _genMapItData.call(resultjson, aql_query)
        // console.log("RETURN: ", util.inspect(it.next().value))
    },
    testResolvePromise: function () {
        let aql_query = `
            FOR p IN posts
                LIMIT 0,2
                RETURN p
        `
        let p1 = _promiseQueryAllArangoRepo(aql_query, {}, {count: true})
        p1.then(
            (value) => {
                for (let item of value) {
                    console.log("MapIt ID!!!", item._key)
                    aql_query = `
                        FOR mymp IN current_mps
                            FILTER mymp.mypost.data.id == "${item._key}"
                            RETURN mymp.data.membership
                    `
                    console.log("AQL:", aql_query)
                    let p2 = _promiseQueryAllArangoRepo(aql_query, {}, {count: true})
                    p2.then(
                        (value) => {
                            for (let item of value) {
                                console.log("MEMBERSHIP: ", util.inspect(value))
                            }
                        }
                    ).catch(
                        (err) => {
                            console.error("ERR: ", err)
                        }
                    )
                }
            }
        ).catch(
            (err) => {
                console.error("DIED!!")
            }
        )
    }

}