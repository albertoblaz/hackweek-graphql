import React, { PureComponent } from 'react'
import styled from 'styled-components'

import LoadingView from './components/loading'

import Topbar from './components/topbar'
import Navigation from './components/navigation'
import Assignments from './components/assignments'
import Workload from './components/workload'

import { type Page } from './types'

import './App.css'

type State = {|
  loading: boolean
|}

const pages = ['assignments', 'workload']

class App extends PureComponent<void, void, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // TODO set to true
      activePage: pages[0],
      session: {
        createdAt: new Date(),
        lastLogin: new Date(),
        me: {
          id: 0,
          email: 'albertoiscool@yeah.com',
          firstName: 'Alberto',
          lastName: 'Blazquez',
        },
      },
    }
  }

  handleNavigate = (activePage: Page) => {
    this.setState({ activePage })
  }

  render() {
    const { loading, session, activePage } = this.state
    return loading ? (
      <LoadingView me={session.me} />
    ) : (
      <AppView
        me={session.me}
        activePage={activePage}
        pages={pages}
        onNavigate={this.handleNavigate}
      />
    )
  }
}

type AppViewProps = {|
  me: Object,
  activePage: Page,
  pages: Array<Page>,
  onNavigate: (page: Page) => void
|}

const capitalize = (str: string): string => `${str[0].toUpperCase()}${str.substring(1, str.length)}`

const MainView = ({ activePage, children }: { activePage: Page, children: Object }) =>
  children.find(c => c.type.displayName === `Apollo(${capitalize(activePage)})`)

const StackedViewport = styled.section`
  display: flex;
  flex-direction: column;
`

const AppView = ({ me, activePage, pages, onNavigate }: AppViewProps) => (
  <StackedViewport>
    <Topbar me={me} />
    <Navigation activePage={activePage} pages={pages} onNavigate={onNavigate} />
    <MainView activePage={activePage}>
      <Assignments />
      <Workload />
    </MainView>
  </StackedViewport>
)

export default App
