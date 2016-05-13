/**
 * Created by leow on 5/12/16.
 */
"use strict"

import util from 'util'
import stampit from 'stampit'
import repoInterface from './repo-base'

const repoArangoDB = stampit
    .props({
            database: "sinar",
            collectionName: "flll-er-up"
        }
    ).init(function () {
            // Init the ArangoDB connection
            // Using th db config ...
            this.dbconn = "BOB"
        }
    ).methods({
            _promiseQueryAllArangoRepo (aql_query = null, bind_vars = null, options = null) {
                // Execute async stuff here ..
                // with needed bindings??
                if (this.dbconn == null) {
                    this.err("No change when init!!; is NULL!!!")
                } else if (this.dbconn == undefined) {
                    this.err("Changed; but still need to implement; is UNDEFINED!!!")
                } else {
                    this.log(util.inspect(this.dbconn))
                }
            },
            save () {
                this.log("ArangoDB implementation of SAVE!!!")
            },
            query() {
                this.log("ArangoDB implementation of QUERY!!!")
            }
        }
    ).refs({
            dbconn: null
        }
    )


export default stampit.compose(repoInterface, repoArangoDB)

// From: http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
// const mix = (superclass) => new MixinBuilder(superclass)

// class ArangoRepo {
//    static mydb = null
/*
 constructor(height, width) {
 this.height = height;
 this.width = width;
 }
 */

//    get area() {
//
//    }
//}

// export default ArangoRepo

