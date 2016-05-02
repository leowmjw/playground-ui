Installation of Pre-reqs
=========================

leowmjw$ sudo pip install httpie
leowmjw$ sudo apt-get install jq

If Jq is too old; should be jq-1.5
leowmjw$ wget https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64
leowmjw$ sudo mv ./jq-linux64 /usr/bin/jq

Setup ArangoDB Once
=====================
leowmjw$ ./SCRIPTPACK/init-setup-base-db-collections.bash 

Setup PopIt Pre-reqs Once
==========================
leowmjw$ ./SCRIPTPACK/0-setup-popit.bash

Run Updates of PopIt Data
===========================
leowmjw$ ./SCRIPTPACK/refresh-arangodb-with-popit.bash ALL

Patch the PopIt Changes
==========================

