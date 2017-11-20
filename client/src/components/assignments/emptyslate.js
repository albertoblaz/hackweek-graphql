import React from 'react'

import { EmptySlateContainer, Img, H2, P, Button } from './styles'

import emptySlateImg from '../../assets/assignments-empty-slate.svg'

export const EmptySlate = ({ createAssignment }) => (
  <EmptySlateContainer>
    <Img src={emptySlateImg} alt="No Assignments" />
    <H2>No assignments yet!</H2>
    <P>Create an assignment and start planning your work</P>
    <Button onClick={createAssignment}>Create assignment</Button>
  </EmptySlateContainer>
)

export default EmptySlate
