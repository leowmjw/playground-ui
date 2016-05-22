"use strict"

import util from 'util'
import config from './config'
import repoArangoDB from './libs/repo-arangodb'

//
// Execute via babel-node

console.log("This is cool!! PoC!!!")
// console.error("In PoC!!!", util.inspect(process))

const repo = repoArangoDB(config, "aduanku")
// const repo = repoArangoDB({}, "aduanku")
repo.save()
repo.query()
let query = `
    FOR a IN aduanku
        LIMIT 0,2
        RETURN a
    `
// let p = repo._promiseQueryAllArangoRepo(query, {}, {count: true})
let p = repo._promiseQueryAllArangoRepo(query, {}, {})
// DEBUG:
console.log(util.inspect(p))
p.then(
    value => repo.log("PROMISE:", value)
).catch(
    err => repo.err()
)



