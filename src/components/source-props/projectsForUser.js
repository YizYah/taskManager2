import gql from 'graphql-tag';

export const SOURCE_PROJECTS_FOR_USER_QUERY = gql`
  query UNIT(
    $id: ID!
    $typeRelationships: String!
    $parameters: String
  ) {
    unitData(
      unitId: $id
      typeRelationships: $typeRelationships
      parameters: $parameters
    )
    {
      instance {
      id
      value
    }
    }
  }
`;

  export const PROJECTS_FOR_USER_RELATIONSHIPS = {
   project: null,
};