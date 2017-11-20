import gql from 'graphql-tag'

export const workloadQuery = gql`
  query workloadQuery {
    workspace(id: 1) {
      members {
        id
        firstName
        lastName
        cards {
          id
          name
        }
      }
    }
  }
`
