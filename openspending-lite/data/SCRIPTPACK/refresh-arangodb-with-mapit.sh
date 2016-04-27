#!/usr/bin/env bash
#

function extract_details {
    curcat=$1
    ID=$2
    # http://mapit.sinarproject.org/area/7117.geojson
    if http --check-status --ignore-stdin "http://mapit.sinarproject.org/area/${ID}.geojson" -o ${curcat}-details-${ID}.json; then
        echo "Downloaded http://mapit.sinarproject.org/area/${ID}.geojson"
        # Prep;
        cat ${curcat}-details-${ID}.json \
           | jq ".| { _key:\"${ID}\", data: values }" \
           | jq -c '.' >arangodb-${curcat}-details-${ID}.json

        # Save into arangodb ...
        # Extract out only results; move the key (ID) to be primary
        # Save as for use by arangodbimp next; with the pattern arangodb-<resource-name>-pg-<current_page>.json

        # Load using arangoimp (maybe just later in one fell swoop??)
        arangoimp --server.database=sinar --collection="${curcat}_details" \
           --file=arangodb-${curcat}-details-${ID}.json
    fi

    # return 0
}

echo "Sinar Project Refresh ArangoDB with MapIt Data!!"

mycat=$1
# DEBUG:
# echo "Category is $mycat"
MYDATADIR=`pwd`

if [ "${mycat}X" == "X" ]
    then
    echo "ERROR: Please use 'refresh-arangodb-with-mapit <n>' where <n> IS ALL or <specific>: PAR, PAR_DETAILS"
elif [ "${mycat}X" == "ALLX" ]
    then
    # Trubcate DB first .. :P
    # TODO: Implement .. or maybe just use string ....
    # arangosh --javascript.execute ${MYDATADIR}/ARANGOJS/truncate-arangos.js --log.level debug
    arangosh --javascript.execute ${MYDATADIR}/ARANGOJS/truncate-mapit.js --log.level debug

    # ALL
    for curcat in `ls ${MYDATADIR}/MAPIT`
        do
        # Source all the dependencies function for each type
        # . ./TOOLS/arangodb-utility.bash

        # DEBUG:
        # echo "Going into folder PROCESS/${curcat}"
        # cd into the correct one inside PROCESS folder
        cd ${MYDATADIR}/MAPIT/${curcat}

        # NOTE: MapIT is CASE SENSITIVE!
        # http://mapit.sinarproject.org/areas/PAR is different from http://mapit.sinarproject.org/areas/par  !!
        # First one; will match type "PAR"; the others will macth name with prefix "par.."
        oricurcat=${curcat}

        # Can use below if Bash 4 and above ..
        # curcat={$curcat,,}
        curcat=`echo ${curcat} | tr '[:upper:]' '[:lower:]'`

        # Get the initial file
        # leow$ http http://mapit.sinarproject.org/areas/PAR -o mapit_par.json
        # DEBUG:
        echo "Downloading http://mapit.sinarproject.org/areas/${oricurcat}?type=${oricurcat}"
        http "http://mapit.sinarproject.org/areas/${oricurcat}?type=${oricurcat}" -o ${curcat}.json

        # Minor processing to get so the key is name that can be looked up; and loaded into arangodb
        # leow$ cat mapit_par.json | jq '.[] | { _key:.name, data: values } '

        cat ${curcat}.json | jq '.[] | { _key:.name, data: values } ' \
            | jq -c '.' >arangodb-${curcat}-index.json

        # Load using arangoimp (maybe just later in one fell swoop??)
        arangoimp --server.database=sinar --collection=${curcat} \
           --file=arangodb-${curcat}-index.json

        # Minor processing to get the IDs
        # http://stackoverflow.com/questions/2859908/iterating-over-each-line-of-ls-l-output
        # leow$ cat mapit_par.json | jq '.[] | .id' |  while read x; do echo "BOO is $x"; done
        # Using the IDs; call to extract out the rest; with the _key being the ID
        # NOTE: The 2 sec sleep in between while calls do make sure mapit rate limit is not triggered
        cat ${curcat}.json | jq '.[] | .id' | while read x ; do sleep 1; extract_details ${curcat} ${x} ; done

        # Finish; use cd - to get back to top level directory
        cd ${MYDATADIR}
        # DEBUG:
        # echo "Got out .. now in `pwd`"

    done

fi

