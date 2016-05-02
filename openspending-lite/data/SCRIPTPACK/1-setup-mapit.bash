#!/usr/bin/env bash
#

# Below might be a better way to execute the actions; then can choose individual components??
function setup_mapit_par_collections {
    echo "In setup_mapit_par_collections .."
    arangosh --javascript.execute-string \ 
        "db._useDatabase('sinar'); db._createDocumentCollection('par'); db._createDocumentCollection('par_details');" \
        --log.level debug
}

MYDATADIR=`pwd`

echo "I am in ${MYDATADIR}"

mkdir -p ${MYDATADIR}/MAPIT/{PAR,DUN,ZON}

