import { gql, useApolloClient, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
    query getProducts {
        products {
            id
            name
            price
            isInCart @client 
        }
    }
`

const GET_CART = gql`
    query getCart {
        cart @client {
            id
            products {
                id
                name
                price
            }
        }
    }
`

const ListaProducts = () => {
    const { data, loading } = useQuery(GET_PRODUCTS)
    const client = useApolloClient();
    const { cart } = client.readQuery({ query: GET_CART });

    const addCart = (product) => {
        if (product?.isInCart) {
            const newProducts = cart?.products?.filter(productNoCart => productNoCart.id !== product.id);

            client.writeQuery({
                query: GET_CART,
                data: {
                    cart: {
                        ...cart,
                        products: newProducts
                    }
                }
            })
        } else {
            client.writeQuery({
                query: GET_CART,
                data: {
                    cart: {
                        ...cart,
                        products: [...cart.products, { ...product, __typename: 'Product'}],
                    }
                }
            })
        }

        client.writeFragment({
            id: `Product:${product.id}`,
            fragment: gql`
              fragment MeuProductisInCart on Product {
                isInCart @client
              }
            `,
            data: {
                isInCart: !product.isInCart,
            },
        });
    }
    
	if (loading) return <p>Loading...</p>;

	return	(
        <>
        <div>Cart: {cart?.products?.length} </div>
		<ul style={{ display: 'flex' }}> 
			{data?.products?.map(produtc => (
                <div style={{ borderBlockColor: 'black', marginRight: 20 }} key={produtc.id}>
                    <li style={{  marginRight: 20 }}>{produtc.name}</li>
                    <button onClick={() => addCart(produtc)}>{produtc.isInCart ? 'Remover' : 'Adicionar' }</button>
                </div>
			))}
		</ul>
        </>
	) 
}

export default ListaProducts;
