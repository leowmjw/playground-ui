#!/usr/bin/env bash
#

# Pre-req helpers chek that are in the correct directory?
# Verify the the pre-req files??scripts??

MYDATADIR=`pwd`

arangosh --javascript.execute ${MYDATADIR}/ARANGOJS/setup-base-db-collections.js --log.level debug
