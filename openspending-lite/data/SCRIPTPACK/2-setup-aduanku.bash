#!/usr/bin/env bash
#

# Below might be a better way to execute the actions; then can choose individual components??
function setup_aduanku_aduanku_collections {
    echo "In setup_aduanku_aduanku_collections .."
    arangosh --javascript.execute-string \
        "db._useDatabase('sinar');db._createDocumentCollection('aduanku'); " \
        --log.level debug
    # arangosh --javascript.execute-string \
    #    "db._useDatabase('sinar'); db._createDocumentCollection('par'); db._createDocumentCollection('par_details');" \
    #    --log.level debug

}

MYDATADIR=`pwd`

echo "I am in ${MYDATADIR}"

mkdir -p ${MYDATADIR}/ADUANKU/ADUANKU

echo "Setting up the Collection .. aduanku"

setup_aduanku_aduanku_collections



