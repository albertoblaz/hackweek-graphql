// @flow

import React from 'react'
import { Flex } from 'grid-styled'

import {
  Container,
  Table,
  Tr,
  CardNamesList,
  CardName,
  HappyEmoji,
  MehEmoji,
  DesperadoEmoji,
} from './styles'

import { type Member, type GraphQLQueryResult } from '../../types/'

type Workspace = Object

export type WorkloadProps = GraphQLQueryResult & {|
  data: {
    workspace: Workspace
  }
|}

export const Workload = ({ data: { loading, error, workspace } }: WorkloadProps) => (
  <Container loading={loading}>
    {loading ? (
      <p>Loading Workload...</p>
    ) : error ? (
      <p>{error.message}</p>
    ) : workspace.members ? (
      <Table>
        <thead>
          <Tr>
            <th>Member</th>
            <th># Assignments</th>
            <th>Status</th>
          </Tr>
        </thead>
        <tbody>{workspace.members.map((member, i) => <MemberRow key={i} {...member} />)}</tbody>
      </Table>
    ) : null}
  </Container>
)

const MemberRow = ({ firstName, lastName, cards }: Member) => (
  <Tr>
    <td>
      {firstName} {lastName}
    </td>
    <td>
      <Flex align="baseline">
        {cards.length}
        <CardNamesList>
          {cards.map((c, i) => (
            <CardName key={i}>
              - {c.name} (id: {c.id})
            </CardName>
          ))}
        </CardNamesList>
      </Flex>
    </td>
    <td>
      <Flex align="center">{calcWorkloadStatus(cards.length)}</Flex>
    </td>
  </Tr>
)

const calcWorkloadStatus = (num: number) =>
  num === 0 ? <HappyEmoji /> : num === 1 ? <MehEmoji /> : <DesperadoEmoji />

export default Workload
