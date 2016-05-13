/**
 * Created by leow on 5/12/16.
 */
"use strict"

import util from 'util'
import stampit from 'stampit'

const Logger = stampit({
    methods: {
        log: console.log,
        err: console.error
    }
})

const repoInterface = stampit
    .init(

    ).methods({
            query (opts) {
                this.err("Please IMPLEMENT!! Opts passed is", util.inspect(opts))
            },
            save () {
                this.err("Please IMPLEMENT!!!")
            }
        }
    ).refs(

    ).compose(
        Logger
    )

export default repoInterface
/*
 class BaseRepo {
 foo() {
 console.log("In BaseRepo")
 }

 bartoo() {
 console.log("BAR2!!!!")
 }

 query() {

 }
 }

 export {BaseRepo}
 */