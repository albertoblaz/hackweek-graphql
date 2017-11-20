import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import List from '../../shared/list'
import ListItem from '../../shared/listitem'

import { type Workspace, type GraphQLQueryResult } from '../../types/'

export const workspacesListQuery = gql`
  query WorkspacesListQuery {
    workspaces {
      id
      name
      description
      members {
        id
        firstName
        lastName
      }
    }
  }
`

export type WorkspaceItemProps = Workspace

export const WorkspaceItem = ({ name, description, members }: WorkspaceItemProps) => (
  <ListItem>
    <strong>{name}</strong>
    <br />
    <small>{description}</small>
  </ListItem>
)

export type WorkspaceListProps = GraphQLQueryResult & {|
  workspaces: Array<Workspace>
|}

export const WorkspacesList = ({ data: { loading, error, workspaces } }: WorkspaceListProps) =>
  loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>${error.message}</p>
  ) : workspaces ? (
    <List>{workspaces.map((ws, i) => <WorkspaceItem key={i} {...ws} />)}</List>
  ) : null

export const WorkspacesListWithData = graphql(workspacesListQuery)(WorkspacesList)

export default WorkspacesListWithData
