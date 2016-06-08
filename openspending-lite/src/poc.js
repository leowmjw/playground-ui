"use strict"

import util from 'util'
import config from './config'
import repoArangoDB from './libs/repo-arangodb'
import TableComponent from './components/BabbageUI/components/table'

//
// Execute via babel-node
scenario_babbageui_table_component()

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

