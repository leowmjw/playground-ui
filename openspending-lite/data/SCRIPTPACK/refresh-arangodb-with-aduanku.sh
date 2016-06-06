#!/usr/bin/env bash
#

function clean_up_aduans {
    curcat=$1
    defstrip='def stripchars(banish):explode - (banish | explode) | implode;'
    extreq='.requests[0].request[] | { _key: .service_request_id[]|tostring, search: .description[]|stripchars("\r\n")|ascii_downcase, '
    clndat='data: values } | del(.data.service_request_id) '
    # NOTE: Can concatenate as per below; but must enclose with ""
    cat all-${curcat}-requests.json | jq  "${defstrip}${extreq}${clndat}" \
        | jq -c '.' >arangodb-all-${curcat}-requests.json
}

echo "Sinar Project Refresh ArangoDB with Aduanku Data!!"

mycat=$1
# DEBUG:
# echo "Category is $mycat"
MYDATADIR=`pwd`

if [ "${mycat}X" == "X" ]
    then
    echo "ERROR: Please use 'refresh-arangodb-with-aduanku <n>' where <n> IS ALL or <specific>: ADUANKU"
elif [ "${mycat}X" == "ALLX" ]
    then
    # Trubcate DB first .. :P
    # TODO: Implement .. or maybe just use string ....
    # arangosh --javascript.execute ${MYDATADIR}/ARANGOJS/truncate-arangos.js --log.level debug
    arangosh --javascript.execute-string "db._useDatabase('sinar');db.aduanku.truncate();" --log.level debug

    # ALL
    for curcat in `ls ${MYDATADIR}/ADUANKU`
        do
        # Source all the dependencies function for each type
        # . ./TOOLS/arangodb-utility.bash

        # DEBUG:
        # echo "Going into folder PROCESS/${curcat}"
        # cd into the correct one inside PROCESS folder
        cd ${MYDATADIR}/ADUANKU/${curcat}

        # Can use below if Bash 4 and above ..
        # curcat={$curcat,,}
        curcat=`echo ${curcat} | tr '[:upper:]' '[:lower:]'`

        # Get the latest 1000 cases ...
        # leow$ curl --user-agent "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
        #       "https://aduanku.my/open311/v2/requests.json?jurisdiction_id=aduanku" -o all-aduanku-requests.json
        # DEBUG:
        echo "Downloading https://aduanku.my/open311/v2/requests.json?jurisdiction_id=${curcat}"
        # curl --user-agent "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)" \
        #   "https://aduanku.my/open311/v2/requests.json?jurisdiction_id=${curcat}" -o all-${curcat}-requests.json

        clean_up_aduans ${curcat}

        # Load using arangoimp (maybe just later in one fell swoop??)
        arangoimp --server.database=sinar --collection=${curcat} \
           --file=arangodb-all-${curcat}-requests.json

        # Finish; use cd - to get back to top level directory
        cd ${MYDATADIR}
        # DEBUG:
        # echo "Got out .. now in `pwd`"

    done
else

    echo "Going into folder ADUANKU/${mycat}"
    # Check first if folder exists??
    curcat=${mycat}
    # cd into the correct one inside PROCESS folder
    cd ${MYDATADIR}/ADUANKU/${curcat}

    # Can use below if Bash 4 and above ..
    # curcat={$curcat,,}
    curcat=`echo ${curcat} | tr '[:upper:]' '[:lower:]'`

    # Truncate the whole collection first; to be controlled by a flag of some sort??
    arangosh --javascript.execute-string "db._useDatabase('sinar');db.${curcat}.truncate();" --log.level debug

    # Get the latest 1000 cases ...
    # leow$ curl --user-agent "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)"
    #       "https://aduanku.my/open311/v2/requests.json?jurisdiction_id=aduanku" -o all-aduanku-requests.json
    # DEBUG:
    echo "Downloading https://aduanku.my/open311/v2/requests.json?jurisdiction_id==${curcat}"
    curl --user-agent "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)" \
        "https://aduanku.my/open311/v2/requests.json?jurisdiction_id=${curcat}" -o all-${curcat}-requests.json

    clean_up_aduans ${curcat}

    # Load using arangoimp (maybe just later in one fell swoop??)
    arangoimp --server.database=sinar --collection=${curcat} \
        --file=arangodb-all-${curcat}-requests.json

    # Finish; use cd - to get back to top level directory
    cd ${MYDATADIR}
    # DEBUG:
    # echo "Got out .. now in `pwd`"

fi

