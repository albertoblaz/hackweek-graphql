// @flow

import React from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import SessionData from '../sessiondata'

import ppLogo from '../../assets/pp-logo-2x.png'
import ppBrand from '../../assets/pp-brand-text-2x.png'

import { type Member } from '../../types'

export type TopbarProps = {|
  me: Member
|}

const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 25px;
  background-color: #1f2532;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
`

const ProjectplaceLogo = styled.img`
  width: 30px;
  height: 30px;
`

const ProjectplaceBrand = styled.img`
  width: 74px;
  height: 30px;
`

const Topbar = ({ me }: TopbarProps) => (
  <Bar>
    <ProjectplaceLogo src={ppLogo} alt="Projectplace logotype" />
    <ProjectplaceBrand src={ppBrand} alt="Projectplace by Planview" />
    <Flex ml="auto">
      <SessionData me={me} />
    </Flex>
  </Bar>
)

export default Topbar
