"use strict"

import util from 'util'
import repoArangoDB from './libs/repo-arangodb'

//
// Execute via babel-node

console.log("This is cool!! PoC!!!")
// console.error("In PoC!!!", util.inspect(process))

const repo = repoArangoDB()
repo.save()
repo.query()
repo._promiseQueryAllArangoRepo()
