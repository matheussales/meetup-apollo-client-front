import { gql, useApolloClient, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
    query getProducts {
        products {
            id
            name
            price
            isInWishList @client 
        }
    }
`

const ListaProducts = () => {
	const { data, loading } = useQuery(GET_PRODUCTS)
    const client = useApolloClient() 

    const addProductInWishList = (product) => {
        client.writeFragment({
            id: `Product:${product.id}`,
            fragment: gql`
              fragment MeuProductIsInCart on Product {
                isInWishList @client
              }
            `,
            data: {
                isInWishList: !product.isInWishList,
            },
        });
    }
    
	if (loading) return <p>Loading...</p>;

	return	(
		<ul style={{ display: 'flex' }}> 
			{data?.products?.map(product => (
                <div style={{ borderBlockColor: 'black', marginRight: 20 }} key={product.id}>
                    <li style={{  marginRight: 20 }}>{product.name} {product.isInWishList ? '❤️' : null }</li> 
                    <button onClick={() => addProductInWishList(product)}>
                        {product.isInWishList ? 'Remover favoritos' : 'Adicionar favoritos' }
                    </button>
                </div>
			))}
		</ul>
	) 
}

export default ListaProducts;
