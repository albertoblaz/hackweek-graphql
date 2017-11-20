import React from 'react'
import styled from 'styled-components'

import { type Page } from '../../types'

export type NavigationProps = {|
  activePage: Page,
  pages: Array<Page>,
  onNavigate: (page: Page) => void
|}

const Tabs = styled.ul`
  display: flex;
  align-items: baseline;
  margin: 1.75em 0 1em;
  padding: 0 25px;
`

const Tab = styled.li`
  margin-right: 1em;
  list-style: none;
  font-size: 24px;
  font-weight: 100;
  border-bottom: ${props => (props.active ? '2px solid #8AB98E' : '2px solid transparent')};
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.25s;

  &:last-child {
    margin-right: 0;
  }
`

export const Navigation = ({ activePage, pages, onNavigate }: NavigationProps) => (
  <nav>
    <Tabs>
      {pages.map((page, i) => (
        <Tab key={i} active={page === activePage} onClick={() => onNavigate(page)}>
          {page}
        </Tab>
      ))}
    </Tabs>
  </nav>
)

export default Navigation
