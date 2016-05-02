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

function _lookupMapItIDByArea(area_id) {

}

function _promiseQueryAllArangoRepo(aql_query, bind_vars, options) {
    // Returns Promise

    return new Promise(function (resolve, reject) {
        db.query(aql_query, bind_vars, options).then(
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
            },
            err => {
                // console.error("ERR: ", err)
                reject(err.message)
            }
        )
    })
}


module.exports = {
    getGeoJSONByArea: function (area_id) {

        return new Promise(function(resolve, reject) {
            let aql_query = `
            FOR m IN par
                FILTER m._key == @id
                FOR pd IN par_details
                    FILTER TO_STRING(m.data.id) == pd._key
                RETURN {
                    n: m.data.name,
                    c: pd.data.coordinates
                }
        `
            let bind_vars = {
                "id": area_id
            }
            let p1 = _promiseQueryAllArangoRepo(aql_query, bind_vars, {count: true})
            p1.then(
                (value) => {
                    // DEBUG:
                    // console.log("getGeoJSONByArea: ", util.inspect(value))
                    resolve(value)
                    // this.geojsons.par = value
                }
            ).catch(
                (err) => {
                    // DEBUG:
                    // console.error("ERR: ", err)
                    reject(err)
                }
            )
        })
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