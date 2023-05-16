import { gql, useMutation, useQuery } from '@apollo/client';

const ADD_TECHNOLOGIES = gql`
  mutation AddTechnologies($name: String!) {
    addTechnologies(name: $name) {
      id
      name
    }
  }
`;

const GET_TECHNOLOGIES = gql`
  query GetTechnologies {
    technologies {
      id
      name
    }
  }
`;

const Exemplo3 = () => {
    // Exemplo de Mutation e atualização da lista utilizando o refetchQuery

    let input;

    const [addTechnologies, { loading }] = useMutation(ADD_TECHNOLOGIES, {
        refetchQueries: [
            GET_TECHNOLOGIES, 
            'GetTechnologies' 
          ],
    });
    const { data: technologiesData } = useQuery(GET_TECHNOLOGIES);
  
    if (loading) return 'Submitting...';
    
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addTechnologies({ variables: { name: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>

        <div>
            <h1>Lista de tecnologias:</h1>
            {technologiesData?.technologies?.map(technologie => (
                <p>{technologie.name}</p>
            ))}
        </div>
      </div>
    );
}

export default Exemplo3;
