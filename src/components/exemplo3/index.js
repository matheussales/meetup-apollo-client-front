import { gql, useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const GET_PRODUCTS = gql`
	query getProducts {
		products {
			id
			name
			price
			category {
				id  
				name
			}
		}
	}
`

const ListaProducts = () => {
	const [products, setProducts] = useState([])
	const [getProductsCache, { data, loading }] = useLazyQuery(GET_PRODUCTS, { fetchPolicy: 'cache-only' })
	const [getProdutctsNetowork, { data: dataNetwork }] = useLazyQuery(GET_PRODUCTS, { fetchPolicy: 'network-only' })

	useEffect(() => {
		console.log('alterou o data??')
		if (data) {
			setProducts(data.products)
		}

		if (dataNetwork) {
			setProducts(dataNetwork.products)
		}

	}, [data, loading, dataNetwork])

	if (loading) return <p>Loading...</p>;

	return	(
		<>	
			<div style={{ display: 'flex' }}>
				<button style={{ marginRight: '10px' }} onClick={() => { getProdutctsNetowork(); }}>Buscar produtos network</button>
				<button style={{ marginRight: '10px' }} onClick={() => { getProductsCache(); }}>Buscar produtos cache</button>
				<button onClick={() => { setProducts([]); }}>Limpar Lista</button>
			</div>
			<ul> 
				{products?.map(product => (
					<li key={product.name}>{product.name} - R${product.price},00</li>
				))}
			</ul>
		</>
	) 
}

export default ListaProducts;







