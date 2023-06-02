


import { gql, useQuery } from '@apollo/client';

const GET_PRODUTOS = gql`
	query getProdutos {
		produtos {
			id
			nome
			preco
      categoria {
        id  
        nome
      }
		}
	}
`

const ListaProdutos = () => {
	const { data, loading } = useQuery(GET_PRODUTOS, { fetchPolicy: 'cache-first' })

	if (loading) return <p>Loading...</p>;

	return	(
		<ul> 
			{data?.produtos?.map(produto => (
				<li>{produto.nome}</li>
			))}
		</ul>
	) 
}

export default ListaProdutos;







