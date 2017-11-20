// #region Domain Types

export type Member = {|
  __typename: string,
  id: string,
  firstName: string,
  lastName: string
|}

export type Workspace = {|
  __typename: string,
  id: string,
  name: string,
  description: string,
  members: Array<Member>
|}

// #region GraphQL-specific Types

export type GraphQLQueryResult = {|
  loading: boolean,
  error?: Object,
  variables: Object,
  fetchMore: Function,
  networkStatus: number,
  refetch: Function,
  startPolling: Function,
  stopPolling: Function,
  subscribeToMore: Function,
  updateQuery: Function
|}

// #region Client-specific Types

export type Page = string
