import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
      books {
		id
        author
        title
      }
  }
`

const Exemplo1 = () => {
	const { data, loading, error, refetch } = useQuery(GET_BOOKS, { fetchPolicy: 'network-only'})

	const [getBooks, { data: lazyData }] =  useLazyQuery(GET_BOOKS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return ( 
		<>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}> 
				<div>
					<h1>Listagem de livros</h1>

					{data?.books.map((book) => (
					<div key={book.title}>
						<h1>{book.title}</h1>
					</div>
					))}

					<button onClick={() => refetch()}>Refetch</button>
				</div>
					
				<div>
					<h1>Listagem de livros (Lazy)</h1>

					{lazyData?.books.map((book) => (
						<div key={book.title}>
							<h1>{book.title}</h1>
						</div>
					))}

					<button onClick={getBooks}>Buscar livros (Cache)</button>
				</div>
			</div>
		</>
	)
}

export default Exemplo1;
