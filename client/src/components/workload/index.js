// @flow

import { graphql } from 'react-apollo'

import { workloadQuery } from './api'
import View, { type WorkloadProps as WP } from './view'

export type WorkloadProps = WP
export const WorkloadView = View
export const WorkloadWithData = graphql(workloadQuery)(View)
export default WorkloadWithData
