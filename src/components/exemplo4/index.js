import { gql, useApolloClient, useQuery } from '@apollo/client';

const GET_PRODUTOS = gql`
    query getProdutos {
        produtos {
            id
            nome
            preco
            estaNoCarrinho @client 
        }
    }
`

const ListaProdutos = () => {
	const { data, loading } = useQuery(GET_PRODUTOS)
    const client = useApolloClient() 

    const addCarrinho = (produto) => {
        client.writeFragment({
            id: `Produto:${produto.id}`,
            fragment: gql`
              fragment MeuProdutoEstaNoCarrinho on Produto {
                estaNoCarrinho @client
              }
            `,
            data: {
                estaNoCarrinho: !produto.estaNoCarrinho,
            },
        });
    }
    
	if (loading) return <p>Loading...</p>;

	return	(
		<ul style={{ display: 'flex' }}> 
			{data?.produtos?.map(produto => (
                <div style={{ borderBlockColor: 'black', marginRight: 20 }} key={produto.id}>
                    <li style={{  marginRight: 20 }}>{produto.nome}</li>
                    <button onClick={() => addCarrinho(produto)}>{produto.estaNoCarrinho ? 'Remover' : 'Adicionar' }</button>
                </div>
			))}
		</ul>
	) 
}

export default ListaProdutos;
