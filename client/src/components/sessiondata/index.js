// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

import meAvatar from '../../assets/me.jpeg'

import { type Member } from '../../types/'

const ipc = window.require ? window.require('electron').ipcRenderer : null

type SessionDataProps = {|
  me: Member,
|}

type State = {|
  avatar: string,
|}

const UserName = styled.p`
  margin-right: 10px;
  font-size: 13px;
`

const Avatar = styled.img`
  border-radius: 100%;
  height: 32px;
  width: 32px;
`

class SessionData extends PureComponent<void, SessionDataProps, State> {
  state = {
    avatar: meAvatar,
  }

  render() {
    const { me } = this.props
    const { avatar } = this.state
    const fullName = `${me.firstName} ${me.lastName}`
    return (
      <Flex align="center">
        <UserName>{fullName}</UserName>
        <Avatar
          src={avatar}
          alt={`${fullName}'s profile`}
          onClick={() => {
            if (ipc) {
              ipc.send('open-file-dialog')
              ipc.on('selected-directory', (event, path) => {
                this.setState({ avatar: `file://${path}` })
              })
            }
          }}
        />
      </Flex>
    )
  }
}

export default SessionData
