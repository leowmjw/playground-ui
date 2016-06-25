"use strict"

import util from 'util'
import config from './config'
import repoArangoDB from './libs/repo-arangodb'
import TableComponent from './components/BabbageUI/components/table'
import {Api} from './components/BabbageUI/api/index'
import _ from 'lodash'

const api = new Api()

//
// Execute via babel-node
// scenario_babbageui_table_component()
// scenario_dimension_hiearachy()
// scenario_dimension_hiearachy_promise_all()
scenario_prepare_babbage_state()

function scenario_prepare_babbage_state() {

    const bob = [
        {
            "economic_classification_Top_x.Top_Level_x_1": "1.1"
        },
        {
            "economic_classification_Level.Level_1_x_2": "1.1.0"
        }
    ]

    // console.error(util.inspect(JSON.stringify(bob), {depth: 10}))

    let state_filter = [] // [{"Top_x_1": "abc"},{"Fisrt_1_x": "def"}]
    // state_filter["abc.def.sf_23"] = "1234"
    // state_filter.push('Top_x_1', "abc")
    // state_filter.push("Fisrt_1_x", "def")
    // state_filter.push("Second_2x.234:234")
    /*const new_filter
    state_filter.push(JSON.stringify({
        "economic_classification_Top_x.Top_Level_x_1": "1.1"
    }))
    state_filter.push(JSON.stringify({
        "economic_classification_Level.Level_1_x_2": "1.1.0"
    }))
    */
    const a = "1.1"
    const b = "1.1.0"
    state_filter.push(`economic_classification_Top_x.Top_Level_x_1:"${a}"`)
    state_filter.push(`economic_classification_Level.Level_1_x_2:"${b}"`)
    console.error(util.inspect(state_filter.join("|")))
    /*
     state_filter.map(function (key, value) {
     console.log("FULL_KEY: %s:%s", util.inspect(key), value)
     })

     _.map(state_filter, function (key, value) {
     console.log("FULL_KEY: %s:%s", util.inspect(key), value)

     })
     */

    const endpoint = "http://next.openspending.org/api/3"
    // const cube = "boost:boost-moldova-2005-2014"
    const cube = "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test"

    const state = {
        // aggregates: ["Amount.sum"],
        group: ["economic_classification_Level_2.Level_2_x_3"],
        // group: ["functional_classification_2.Item"],
        // order: [{key: "Amount.sum", direction: 'asc'}],
        // filter: state_filter,
        filter: state_filter
        // page: 30
    }

    // console.log("STATE:", util.inspect(state, {depth: 10}))
    /*
     const p = new Promise((resolve, reject) => {
     return api.aggregate(endpoint, cube, state)
     .then(resolve)
     .catch(reject)
     })
     p.then((values) => {
     console.log("RESULTS:", util.inspect(values, {depth: 10}))
     }).catch(
     (err) => {
     console.error("ERR:", err)
     }
     )
     */

    const babbageTable = new TableComponent()
    const p = new Promise((resolve, reject) => {
        babbageTable.getTableData(endpoint, cube, state)
            .then(resolve)
            .catch(reject)
    })
    // Execute promise ..
    p.then((tableData) => {
            console.error("RESULT: ", util.inspect(tableData, {colors: true, depth: 10}))
            result.tableData = tableData
        }
    ).catch(
        (err) => {
            console.error("ERR:", util.inspect(err, {depth: 10}))

        }
    )

}

function scenario_dimension_hiearachy_promise_all() {

    // filters will be appended; becomes the breadcrumb ..
    const connection = {
        cube: "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test",
        endpoint: "http://next.openspending.org/api/3"
    }

    let mypro = []

    const r = new Promise(function (resolve, reject) {

        const p = api.getPackageModel(connection.endpoint, connection.cube)
        p.then(
            (model) => {
                resolve(model.hierarchies)
            }
        ).catch(
            (err) => {
                reject("ERR:", err)
            }
        )
    })

    mypro.push(r)

    const q = new Promise(function (resolve, reject) {
        const p = api.getMeasures(connection.endpoint, connection.cube)
        p.then(
            (measures) => {
                resolve(measures)
            }
        ).catch(
            (err) => {
                reject("ERR:", err)
            }
        )
    })

    mypro.push(q)

    const p = new Promise(function (resolve, reject) {
        const p1 = api.getDimensions(connection.endpoint, connection.cube)
        p1.then(
            (dimensions) => {
                resolve(dimensions)
            })
            .catch(
                (err) => {
                    reject("ERR:", err)
                }
            )
    })

    /* NOTE: Promise.all without new!!

     const n = new Promise(function (resolve, reject) {
     const p1 = api.getDimensions(connection.endpoint, connection.cube)
     p1.then(
     (results) => {
     let promises = []
     for (let singleDimension of results) {
     const myq = api.getDimensionMembers(connection.endpoint, connection.cube, singleDimension.key)
     promises.push(myq)
     }
     const p2 = Promise.all(promises)
     p2.then(
     (result) => {
     console.log("DONE!!!", util.inspect(result))
     },
     (err) => {
     console.log("ERR:", util.inspect(err))
     }
     )
     }
     ).catch(
     (err) => {
     reject("ERRp1:", util.inspect(err, {depth: 10}))
     }
     )
     })
     */

    mypro.push(p)

    const o = Promise.all(mypro)
    o.then(
        (values) => {
            console.log("ALL:", util.inspect(values, {depth: 10}))
        }
    ).catch(
        (err) => {
            console.error("ERR:", err)
        }
    )

}

function scenario_dimension_hiearachy() {
    /*
     Hierarchy the next drillDown will be known

     in getDimensions
     KEY: budget_line_id_2.UUID DRILL: undefined
     KEY: date_2.Year DRILL: undefined
     KEY: economic_classification_Level.Level_1_x_2 DRILL: economic_classification_Level_2.Level_2_x_3
     KEY: economic_classification_Level_2.Level_2_x_3 DRILL: economic_classification_Level_3.Level_3_x_4
     KEY: economic_classification_Level_3.Level_3_x_4 DRILL: undefined
     KEY: economic_classification_Top_x.Top_Level_x_1 DRILL: economic_classification_Level.Level_1_x_2
     KEY: functional_classification_2.Item DRILL: undefined

     */

    // filters will be appended; becomes the breadcrumb ..
    const connection = {
        cube: "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test",
        endpoint: "http://next.openspending.org/api/3"
    }

    const options = {}

    buildStatefunction(connection, options)

    function buildStatefunction(connection, options) {
        options = options || {}
        let model = null

        console.error("IN buildState")

        const r = api.getPackageModel(connection.endpoint, connection.cube)
        r.then(
            (model) => {
                console.log("XXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXX")
                // console.log("getPackageModel:", util.inspect(model, {depth: 10}))
                for (let key of Object.keys(model.hierarchies)) {
                    console.log("Default Selection: ", util.inspect(model.hierarchies[key].levels[0], {depth: 10}))
                    break
                }
                console.log("XXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXX")
            }
        ).catch(
            (err) => {
                console.error("ERR:", err)
            }
        )

        const q = api.getMeasures(connection.endpoint, connection.cube)
        q.then(
            (results) => {
                console.log("********************************************")
                console.log("getMeasures: ", util.inspect(results, {depth: 10}))
                console.log("********************************************")
            }
        ).catch(
            (err) => {
                console.error("ERR:", err)
            }
        )

        const p = api.getDimensions(connection.endpoint, connection.cube)
        p.then(
            (results) => {
                console.log("+++++++================================================++++++++++")
                console.log("VAL_buildStatefunction", util.inspect(results, {depth: 10}))
                for (let singleDimension of results) {
                    console.log("KEY: %s DRILL: %s", singleDimension.key, singleDimension.drillDown)
                    const p1 = api.getDimensionMembers(connection.endpoint, connection.cube, singleDimension.key)
                    p1.then(
                        (members) => {
                            console.log("MEMBERS of %s : %s", singleDimension.key, util.inspect(members, {depth: 10}))
                            console.log("+++++++================================================++++++++++")
                        }
                    )
                }
            }
        ).catch(
            (err) => {
                console.error("ERR:", err)
            }
        )

        /* Below implemented in getDimneison already!!
         return api.getPackageModel(connection.endpoint, connection.cube)
         .then((model) => {
         console.error("getPackageModel:", util.inspect(model))
         return api.getDimensionsFromModel(model)
         })
         .then((result) => {

         })
         */

        // use the api lib ..
        //       return api.getDataPackageModel(packageName)
        //          //init measures
        //        result.measures.items = api.getMeasuresFromModel(model);
        //        result.measures.current = (_.first(result.measures.items)).key;
        // Now build the heirarchy
        // Ignore dimensions if can ..

    }
}

function scenario_babbageui_table_component() {

    const endpoint = "http://next.openspending.org/api/3"
    // const cube = "boost:boost-moldova-2005-2014"
    const cube = "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test"
    const state = {
        group: ["functional_classification_2.Item", "economic_classification_Level_2.Level_2_x_3"]
    }
    let result = {
        tableData: null
    }

    console.error("INSIDE: scenario_babbageui_table_component *****")

    const babbageTable = new TableComponent()
    const p = new Promise((resolve, reject) => {
        babbageTable.getTableData(endpoint, cube, state)
            .then(resolve)
            .catch(reject)
    })
    // Execute promise ..
    p.then((tableData) => {
            console.error("RESULT: ", util.inspect(tableData, {colors: true, depth: 10}))
            result.tableData = tableData
        }
    )
}

function scenario_composition_arangodb() {

    console.log("This is cool!! PoC!!!")
    // console.error("In PoC!!!", util.inspect(process))

    const repo = repoArangoDB(config, "aduanku")
    // const repo = repoArangoDB({}, "aduanku")
    repo.save()
    // repo.query()
    let query = `
    FOR a IN aduanku
        LIMIT 0,2
        RETURN a
    `
    let p = repo.query(query, {}, {count: true})
    p.then(
        value => repo.log("VALUE:", value)
    ).catch(
        err => repo.err()
    )

}

