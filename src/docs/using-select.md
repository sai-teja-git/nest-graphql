# Fetching Required Fields from DB

You can use graphql-fields (or manually parse GraphQLResolveInfo) to select only the requested fields.

1. The @Info() decorator in the resolver extracts the requested fields from the GraphQL query.
2. The getSelectedFields(info) function parses the fields and converts them into a TypeORM select query.
