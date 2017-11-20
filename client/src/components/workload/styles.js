import React from 'react'
import styled from 'styled-components'

import happySVG from '../../assets/emojis/happy.svg'
import mehSVG from '../../assets/emojis/meh.svg'
import desperadoSVG from '../../assets/emojis/desperado.svg'

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  min-height: ${props => (props.loading ? '100px' : 'none')};
  border: ${props => (props.loading ? '1px solid #ddd' : 'none')};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Tr = styled.tr`
  height: 48px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`

export const CardNamesList = styled.ul`
  margin: 0;
  padding-left: 20px;
  width: 100%;
  list-style: none;
`

export const CardName = styled.li`
  width: 100%;
  color: #666;
  font-size: 12px;
`

export const WhatsAppEmoji = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
`

export const HappyEmoji = () => <WhatsAppEmoji src={happySVG} alt="Happy" />
export const MehEmoji = () => <WhatsAppEmoji src={mehSVG} alt="Meh" />
export const DesperadoEmoji = () => <WhatsAppEmoji src={desperadoSVG} alt="Desperado" />
