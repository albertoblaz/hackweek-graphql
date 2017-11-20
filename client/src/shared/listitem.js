// @flow

import styled from 'styled-components'

export const ListItem = styled.li`
  list-style: none;
  padding: 1em 1.5em;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;

  &:last-child {
    border-bottom: 1px solid #ccc;
  }
`

export default ListItem
