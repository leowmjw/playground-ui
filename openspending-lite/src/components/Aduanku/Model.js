/**
 * Created by leow on 5/12/16.
 */
"use strict"

export const COLLECTION = "aduanku"

import config from '../../config'
import repoArangoDB from '../../libs/repo-arangodb'
import repoDummy from '../../libs/repo-dummy'

// BY feature flag; select the repo type?
// and simulation type? and values?
let repo = null
if (config.repo === "dummy") {
    repo = repoDummy(config, COLLECTION)
} else {
    repo = repoArangoDB(config, COLLECTION)
}

export default {
    getAllIssues: function (options = null) {
        const myaql = `
        FOR a IN aduanku
            // LIMIT 10,20
            FILTER LIKE(a.search,"%#%")
            RETURN {
                refid: a._key,
                data: a.data
            }        
        `
        return repo.query(myaql, {}, {count: true})
    },
    getAllAuthorities: function (options = null) {

    },
    getAllIssuesByAuthority: function (authority, options = null) {

    },
    getAllIssuesByTopic: function (topic) {
        const myaql = `
        FOR a IN aduanku
            FILTER LIKE(a.search,"%#${topic}%")
            RETURN {
                refid: a._key,
                data: a.data
            }        
        `
        return repo.query(myaql, {}, {count: true})
    }

}