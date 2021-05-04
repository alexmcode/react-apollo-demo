import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
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
  mutation WriteColor($color: String!) {
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
  const [componentStateColor, setComponentStateColor] = useState('white')

  const queryResult = useQuery(READ_COLOR, {
    variables: {
      color: componentStateColor,
    },
  });

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

  return  (
    <Container>
      <input onChange={(e) => setComponentStateColor(e.target.value)} />
      <button onClick={() => setThemeColor()}>ADD TO CACHE</button>
      <h1>{queryResult?.data?.theme?.color}</h1>
    </Container>
  );
}

export default App;
