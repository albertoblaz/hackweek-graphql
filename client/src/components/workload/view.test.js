import React from 'react'
import ReactDOM from 'react-dom'
import Workload from './view'

describe('Workload', () => {
  it('renders loading message', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Workload
        data={{
          loading: true,
        }}
      />,
      div
    )
  })

  it('renders error (if any)', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Workload
        data={{
          loading: false,
          error: {
            message: 'This is an error message',
          },
        }}
      />,
      div
    )
  })

  it('renders the view with data from a workspace', () => {
    const div = document.createElement('div')
    const workspace = {
      members: [
        {
          cards: [],
          firstName: 'Tyree',
          id: '2',
          lastName: 'Kuvalis',
        },
        {
          cards: [
            {
              id: '6',
            },
          ],
          firstName: 'Ella',
          id: '3',
          lastName: 'Haley',
        },
        {
          cards: [
            {
              id: '7',
            },
            {
              id: '8',
            },
          ],
          firstName: 'Jayme',
          id: '4',
          lastName: 'Kuhlman',
        },
      ],
    }
    ReactDOM.render(
      <Workload
        data={{
          loading: false,
          workspace,
        }}
      />,
      div
    )
  })
})
