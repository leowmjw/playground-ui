/**
 * Created by leow on 4/11/16.
 */
"use strict";

let util = require('util');

module.exports = {

    prepopulateOrg: function (org_code) {
        switch (org_code) {
            case 'P-SUBANG':
                break

            case 'N-KOTADAMANSARA':
                break

            case 'MBPJ':
                break

            case 'ZON3':
                break

            case 'PHSSB':
                break

            default:
                // Default to MPs in SELANGOR??
                break
        }
    },
    prepopulatePax: function (pax_code) {
        switch (pax_code) {
            case 'MP-SUBANG':
                break

            case 'ADUN-KOTADAMANSARA':
                break

            case 'MY-MBPJ':
                break

            case 'LC-ZON3':
                break

            case 'PHSSB':
                break

            default:
                // Default to MPs in SELANGOR??
                break
        }

    },
    prepopulateIssue: function (issue_code) {
        switch (issue_code) {
            case 'HEALTH':
                break

            case 'SAFETY':
                break

            case 'EDUCATION':
                break

            case 'POVERTY':
                break

            case 'PHSSB':
                break

            default:
                // Default to ALL issues?
                break
        }

    }

}