import { useState } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';


const READ_COLOR = gql`
  query ReadColor($color: String!) {
    theme(color: $color) {
      uiType
      color
    }
  }
`;

const WRITE_COLOR = gql`
  query WriteColor($color: String!) {
    theme(color: $color) {
      uiType
      color
    }
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  width: 200px;
`

const App = ({ client }) => {
  const [cacheColor, setCacheColor] = useState('white')
  const [componentStateColor, setComponentStateColor] = useState('white')

  const setThemeColor = () => {
    client.writeQuery({
      query: WRITE_COLOR,
      data: {
        theme: {
          __typename: 'Theme',
          uiType: 'for buttons',
          color: componentStateColor,
        },
      },
      variables: {
        color: componentStateColor,
      }
    });
  }

  const getThemeColor = () => {
    const data = client.readQuery({
      query: READ_COLOR,
      variables: {
        color: componentStateColor,
      },
    });
    if (data) {
      setCacheColor(data.theme.color)
    }
  }

  return  (
    <Container>
      <input onChange={(e) => setComponentStateColor(e.target.value)} />
      <button onClick={() => setThemeColor()}>ADD TO CACHE</button>
      <button onClick={() => getThemeColor()}>READ FROM CACHE</button>
      <h1>{cacheColor}</h1>
    </Container>
  );
}

export default App;
