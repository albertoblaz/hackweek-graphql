import { makeExecutableSchema } from "graphql-tools";

import resolvers from "./resolvers";

export const typeDefs = `
type Member {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  group: Group
  cards: [Card!]!
  workspaces: [Workspace!]!
}

type Group {
  id: ID!
  name: String!
  description: String
  members: [Member!]!
  workspace: Workspace
}

type Card {
  id: ID!
  name: String!
  description: String
  assignedTo: Member
  createdBy: Member!
  workspace: Workspace
}

type Workspace {
  id: ID!
  name: String!
  description: String
  cards: [Card!]!
  members: [Member!]!
  groups: [Group!]!
}

type Query {
  me: Member
  members: [Member!]!
  member(id: ID!): Member
  groups: [Group!]!
  group(id: ID!): Group
  cards: [Card!]!
  card(id: ID!): Card
  workspaces: [Workspace!]!
  workspace(id: ID!): Workspace
}

type Mutation {
  # A mutation to add a new channel to the list of channels
  deleteCard(id: ID!): Card
}
`;

// type Query {
//   me: Member
//   members: [Member!]!
//   membersByWorkspace(wid: ID!): [Member!]!
//   member(id: ID!): Member
//   groups: [Group!]!
//   groupsByWorkspace(wid: ID!): [Group!]!
//   group(id: ID!): Group
//   cards: [Card!]!
//   cardsByWorkspace(wid: ID!): [Card!]!
//   card(id: ID!): Card
//   workspaces: [Workspace!]!
//   workspace(id: ID!): Workspace
// }

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
