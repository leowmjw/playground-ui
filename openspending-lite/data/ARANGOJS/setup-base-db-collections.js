// Console output like below does not seem to wirk :(
// console.log("Creating new Database sinar ...")
db._createDatabase("sinar")
db._useDatabase("sinar")
// console.log("Creating Document Collection named ... ")
db._createDocumentCollection("posts")
db._createDocumentCollection("persons")
db._createDocumentCollection("organizations")
db._createDocumentCollection("memberships")

// Create for popit
db._createDocumentCollection("popit_posts")
db._createDocumentCollection("popit_persons")
db._createDocumentCollection("popit_organizations")
db._createDocumentCollection("popit_memberships")

// Create for mapit
db._createDocumentCollection("par")
db._createDocumentCollection("par_details")
db._createDocumentCollection("dun")
db._createDocumentCollection("dun_details")
db._createDocumentCollection("zon")
db._createDocumentCollection("zon_details")
// Make above more robust by checking if they exist
// Can print out console outputs??
// TODO: Create the needed index; possibly as separate helper files??functions ..