console.log("Creating new Database sinar ...")
db._createDatabase("sinar")
db._useDatabase("sinar")
console.log("Creating Document Collection named ... ")
db._createDocumentCollection("posts")
db._createDocumentCollection("persons")
db._createDocumentCollection("organizations")
db._createDocumentCollection("memberships")

// Make above more robust by checking if they exist
// Can print out console outputs??
// TODO: Create the needed index; possibly as separate helper files??functions ..