/**
 * Created by leow on 5/12/16.
 */
"use strict"

export const COLLECTION = "aduanku"

import config from '../../config'
import repoArangoDB from '../../libs/repo-arangodb'

// BY feature flag; select the repo type?
// and simulation type? and values?
const repo = repoArangoDB(config, COLLECTION)

export default {
    getAllIssues: function (options = null) {
        const myaql = `
        FOR a IN aduanku
            LIMIT 10,20
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

    }

}