#!/usr/bin/env bash
#

# Check that the ArngoJS file is there

# Check that existing PROCESS folder exists

MYDATADIR=`pwd`

echo "I am in ${MYDATADIR}"
# Create the needed folders if it does not exist
# Put as function might be better; for reusability ...
mkdir -p ${MYDATADIR}/PROCESS/{PERSONS,POSTS,ORGANIZATIONS,MEMBERSHIPS}
# Call the actual script doing things .. assumes it is in current folder