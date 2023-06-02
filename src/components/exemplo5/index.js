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

const GET_CARRINHO = gql`
    query getCarrinho {
        carrinho @client {
            id
            produtos {
                id
                nome
                preco
            }
        }
    }
`

const ListaProdutos = () => {
    const { data, loading } = useQuery(GET_PRODUTOS)
    const { data: carrinhoData } = useQuery(GET_CARRINHO, { fetchPolicy: 'cache-only' })
    const client = useApolloClient();

    const addCarrinho = (produto) => {
        const { carrinho } = client.readQuery({ query: GET_CARRINHO});

        if (produto?.estaNoCarrinho) {
            const newProdutos = carrinho?.produtos?.filter(produtoNoCarrinho => produtoNoCarrinho.id !== produto.id);

            client.writeQuery({
                query: GET_CARRINHO,
                data: {
                    carrinho: {
                        ...carrinho,
                        produtos: newProdutos
                    }
                }
            })
        } else {
            client.writeQuery({
                query: GET_CARRINHO,
                data: {
                    carrinho: {
                        ...carrinho,
                        produtos: [...carrinho.produtos, { ...produto, __typename: 'Produto'}],
                    }
                }
            })
        }

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
        <>
        <div>Carrinho: {carrinhoData?.carrinho?.produtos?.length} </div>
		<ul style={{ display: 'flex' }}> 
			{data?.produtos?.map(produto => (
                <div style={{ borderBlockColor: 'black', marginRight: 20 }} key={produto.id}>
                    <li style={{  marginRight: 20 }}>{produto.nome}</li>
                    <button onClick={() => addCarrinho(produto)}>{produto.estaNoCarrinho ? 'Remover' : 'Adicionar' }</button>
                </div>
			))}
		</ul>
        </>
	) 
}

export default ListaProdutos;
