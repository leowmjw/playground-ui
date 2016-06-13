/**
 * Created by leow on 6/13/16.
 */
"use strict"

import {Api} from '../api/index'

const api = new Api()

// Port from ...os-viewer/app/front/scripts/services/os-viewer-service/index.js

// Possible idea is to stampit with the API from BabbageUI

// Compose anything else missing?? Like Getting Package Info
// can port from:
// ...os-viewer/app/front/scripts/services/data-package-api/index.js

const osViewerService = {
    initState: function (state) {

    },
    getState: function () {

    },
    _getDimensionsSortingIndexes: function (model) {

    },
    _buildHierarchies: function (model, dimensionItems) {

    },
    getPossibleValues: function (packageName, dimension) {

    },
    lazyLoadDimensionValues: function (dimension, packageName) {

    },
    buildState: function (packageName, options) {

    },
    getPackageInfo: function (packageName) {

    },
    start: function (initState) {

    }
}

export default osViewerService