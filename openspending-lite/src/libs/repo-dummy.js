/**
 * Created by leow on 5/12/16.
 */
"use strict"

import util from 'util'
import {BaseRepo} from './repo-base'
/*
 class MyClass extends mix(MyBaseClass).with(Mixin1, Mixin2) {
 ...
 }
 */

const Mixin2 = (superclass) => class extends superclass {
    bar() {
        console.error("BAR!!!")
    }
}

const Mixin1 = (superclass) => class extends superclass {

    constructor(...args) {
        console.error("constructor Mixin1")
        // mixins should either 1) not define a constructor, 2) require a specific
        // constructor signature, or 3) pass along all arguments.
        super(...args)
    }

    foo() {
        console.log('foo from MyMixin')
        // this will call superclass.foo()
        super.foo()
    }

}

class DummyRepo extends Mixin2(Mixin1(BaseRepo)) {
    constructor(...args) {
        console.error("constructor DummyRepo")
        console.error(util.inspect(args))
        super(...args)
    }

    save() {
        console.log("save ..")
    }
}

module.exports = DummyRepo
