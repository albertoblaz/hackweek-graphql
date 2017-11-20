// @flow

import { type Member } from '../types'

export const getFullName = (member: Member): string =>
  member ? `${member.firstName} ${member.lastName}` : ''
