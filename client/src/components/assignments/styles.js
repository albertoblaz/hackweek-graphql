import styled from 'styled-components'

//

export const EmptySlateContainer = styled.div`
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Img = styled.img`
  width: 50vw;
  max-width: 400px;
`
export const H2 = styled.h2`margin-bottom: 5px;`
export const P = styled.p`
  margin-top: 0;
  margin-bottom: 30px;
`
export const Button = styled.button`
  margin: 0;
  padding: 5px 35px;
  outline: none;
  background-color: #8ab98e;
  border: none;
  border-radius: 2px;
  color: white;
  font-size: 11px;
  transition: all 0.25s;
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 36px;

  &:hover {
    background-color: #acd8af;
    transition: all 0.25s;
  }
`

//

export const Select = styled.select`width: inherit;`

//

const centerStyles = `display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;`

export const Container = styled.main`${props => (props.loadingOrError ? centerStyles : null)};`
