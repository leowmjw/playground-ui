/**
 * Created by leow on 6/14/16.
 */
"use strict"

import util from 'util'
import config from './config'
import repoArangoDB from './libs/repo-arangodb'

// import CSV from './csv'
import Papa from 'papaparse'
import SUtils from 'string_utils'
import wuzzy from 'wuzzy'

console.error("START!!")

// ArangoDB ..
const repo = repoArangoDB(config, "persons")


const fs = require('fs');
//fs.readFile('./PLC.csv', 'utf8', function (err, data) {
fs.readFile('./GLIC_PLC.csv', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    Papa.parse(data,
        {
            complete: function (results) {
                let i = 0

                // console.log(util.inspect(results))
                for (const row of results.data) {
                    const name = row[0]
                    const company = row[1]
                    let potentialMatches = []

                    if (i == 0) {
                        // console.log("HEADERS", row)
                    } else {
                        // Likely match
                        // extract(i, name, company, 0.94)
                        // Exact match
                        extract(i, name, company, 0.98)
                    }
                    i++
                }
            }
        })
})

function extract(i, name, company, jaro_threshold) {
    // Start Anon Function
    if (company != null && company != undefined) {
        // console.log("NAME: %s COMPANY: %s", name, company)
        // console.log("WORDS: ", SUtils.words(name))
        for (let partial of SUtils.words(name)) {
            if (partial.length > 3) {
                // console.log("Create promise for partial ", partial)
                const p = queryPartialPromise(partial)
                p.then(
                    value => {
                        // console.log("RESULTS: ", util.inspect(value))
                        // potentialMatches.push(value)
                        // Company, Orig_Name, LEV_SCORE, Compare_Name, PID
                        for (let item of value) {
                            const levenshtein = wuzzy.levenshtein(name.toLowerCase(), item.name.toLowerCase())
                            const jaro = wuzzy.jarowinkler(name.toLowerCase(), item.name.toLowerCase())
                            if (Number.parseFloat(jaro) > jaro_threshold) {
                                console.log("%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s",
                                    i, company, name, item.name,
                                    SUtils.distance(name.toLowerCase(), item.name.toLowerCase()),
                                    jaro,
                                    levenshtein,
                                    wuzzy.ngram(name.toLowerCase(), item.name.toLowerCase()),
                                    wuzzy.jaccard(name.toLowerCase(), item.name.toLowerCase()),
                                    wuzzy.tanimoto(name.toLowerCase(), item.name.toLowerCase()),
                                    item.id)
                            } else {
                                // console.error(name, "FAILED < 0.7:", Number.parseFloat(levenshtein) )
                            }
                        }
                    }
                ).catch(
                    err => {
                        console.error("ERR for ", partial)
                    }
                )
            } else {
                // console.error("%s is too short", partial)
            }
        }
        // Print out the final results
        //console.log(util.inspect(potentialMatches))
        // console.error("***END!!!!***")
    }
    // End Anon Function
}

function queryPartialPromise(partial) {
    // For each word; use below to grab result and push into result array

    partial = partial.toLowerCase()
    /*
     AQL:
     FOR p IN persons
     FILTER LIKE(LOWER(p.data.name),"%khairil%")
     RETURN {
     id: p._key,
     name: p.data.name
     }
     */
    let query = `
        FOR p IN persons
            FILTER LIKE(LOWER(p.data.name),"%${partial}%")
            RETURN {
                id: p._key,
                name: p.data.name
        }
    `
    return repo.query(query, {}, {count: true})
}
// Libs:
// 0) csv-es6-data-backend (get those CSVs coming)
// a) string_utils
// b) alt wuzzy and fuzzysearch (fast, less accurate)

// Load CSV
// extractNamesFromCSV("./GLIC_PLC.csv")
// extractNamesFromCSV("./PLC.csv")

// For each item in CSV

// Break up the name to words

// If length is less than 3; ignore; print out ...


// For each, run lev against it and print out the result; sorting the best??

// Profit!!

function extractNamesFromCSV(full_filepath) {
    CSV.fetch(full_filepath).then(
        data => {
            console.log(util.inspect(data))
        }
    )
}

function findPartialMatches(wordsArray) {

    // Start with empty array; to be pushed in later ...
    let allMatches = []

    console.log("findPartialMatches: ", util.inspect(wordsArray))

    const repo = repoArangoDB(config, "persons")
    // TODO: Magic here to extract out the partial for this round??
    let partial = "khairil"

    function queryPartial(partial) {
        // For each word; use below to grab result and push into result array

        /*
         AQL:
         FOR p IN persons
         FILTER LIKE(LOWER(p.data.name),"%khairil%")
         RETURN {
         id: p._key,
         name: p.data.name
         }
         */
        let query = `
        FOR p IN persons
            FILTER LIKE(LOWER(p.data.name),"%${partial}%")
            RETURN {
                id: p._key,
                name: p.data.name
        }
    `
        let p = repo.query(query, {}, {count: true})
        p.then(
            value => repo.log("VALUE:", util.inspect(value))
        ).catch(
            err => repo.err()
        )
    }

}
