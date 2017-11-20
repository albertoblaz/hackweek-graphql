// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Flex, Box } from 'grid-styled'

import List from '../../shared/list'
import ListItem from '../../shared/listitem'

import EmptySlate from './emptyslate'

import { Container, Select } from './styles'

import { type GraphQLQueryResult } from '../../types/'

type Card = Object

export type AssignmentsProps = GraphQLQueryResult & {|
  data: {
    assignments: Array<Card>
  }
|}

export const cardsListQuery = gql`
  query CardsListQuery {
    cards {
      id
      name
      description
      assignedTo {
        id
        firstName
        lastName
      }
      workspace {
        id
        members {
          id
          firstName
          lastName
        }
      }
    }
  }
`

export const deleteCardMutation = gql`
  mutation deleteCard($id: ID!) {
    deleteCard(id: $id) {
      id
      name
    }
  }
`

const Assignments = ({ data: { loading, error, cards } }: AssignmentsProps) => (
  <Container loadingOrError={loading || error}>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error.message}</p>
    ) : cards && !cards.length ? (
      <EmptySlate />
    ) : cards.length ? (
      // <EmptySlate />
      <List>{cards.map((card, i) => <AssignmentWithMutation key={i} {...card} />)}</List>
    ) : null}
  </Container>
)

const Assignment = ({ id, name, description, assignedTo, workspace, mutate }: Card) => (
  <ListItem>
    <Flex>
      <Flex column justify="center">
        <strong>{name}</strong>
        <small>{description}</small>
      </Flex>
      <Flex ml="auto" align="center">
        <Box mr={10} w={140}>
          <AssigneeSelector assignedTo={assignedTo} members={workspace.members} />
        </Box>
        <button
          onClick={() =>
            mutate({
              variables: { id },
              refetchQueries: [{ query: cardsListQuery }],
            })}
        >
          X
        </button>
      </Flex>
    </Flex>
  </ListItem>
)

const AssignmentWithMutation = graphql(deleteCardMutation)(Assignment)

const AssigneeSelector = ({ assignedTo, members }) => (
  <Select>
    {assignedTo ? (
      <option value={assignedTo.id}>
        {assignedTo.firstName} {assignedTo.lastName}
      </option>
    ) : (
      <option value="no-assignee">No assignee</option>
    )}
    {members.map(({ id, firstName, lastName }) => (
      <option key={id} value={id}>
        {firstName} {lastName}
      </option>
    ))}
  </Select>
)

export const AssignmentsWithData = graphql(cardsListQuery)(Assignments)
export default AssignmentsWithData
