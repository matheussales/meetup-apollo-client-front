


import { gql, useQuery } from '@apollo/client';

const GET_PRODUTOS = gql`
	query getProdutos {
		produtos {
			id
			nome
			preco
		}
	}
`

const ListaProdutos = () => {
	const { data, loading, error } = useQuery(GET_PRODUTOS)

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return	(
		<ul> 
			{data?.produtos?.map(produto => (
				<li>{produto.nome}</li>
			))}
		</ul>
	) 
}

export default ListaProdutos;
