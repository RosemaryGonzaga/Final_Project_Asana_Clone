# debugger
json.id team.id
json.name team.name


# NOTE: not sure if :description and :privacy are needed
    # these fields don't appear in the create / manage workspace forms
    # but :description is listed as a field in the Asana developers api reference
    # To consider later: run migration to remove these two columns?
    # leaving them in this jbuilder for now
# json.description team.description
# json.privacy team.privacy