import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
      newBooks {
		id
        author
        title
      }
  }
`

const Exemplo2 = () => {
	const { error } = useQuery(GET_BOOKS, { fetchPolicy: 'network-only'})

	if (error) return <p>Error : {error.message}</p>;
}

export default Exemplo2;
