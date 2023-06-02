


import { gql, useLazyQuery } from '@apollo/client';

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
	const[getProdutos, { data, loading, called }] = useLazyQuery(GET_PRODUTOS)

	if (called && loading) return <p>Loading...</p>;
	if (!called) return <button onClick={() => getProdutos()}>Carregar produtos</button>;

	return	(
		<ul> 
			{data?.produtos?.map(produto => (
				<li>{produto.nome}</li>
			))}
		</ul>
	) 
}

export default ListaProdutos;
