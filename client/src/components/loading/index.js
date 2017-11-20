// @flow

import React from 'react'
import { Flex, Box } from 'grid-styled'

import ProjectplaceLogo from '../../assets/default-project-logo.svg'

export type LoadingProps = {|
  me: Member
|}

export const Loading = ({ me }: LoadingProps) => (
  <Flex align="center">
    <Box>
      <p>Welcome back, {me.firstName}!</p>
    </Box>
    <Box>
      <img src={ProjectplaceLogo} alt="Projectplace by Planview logotype" />
    </Box>
    <Box>
      <p>Loading...</p>
    </Box>
  </Flex>
)

export default Loading
