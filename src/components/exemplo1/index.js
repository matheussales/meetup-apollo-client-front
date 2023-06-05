import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
	query getProduct {
		products {
			id
			name
			price
		}
	}
`

const ProductList = () => {
	const { data, loading, error } = useQuery(GET_PRODUCTS)

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return	(
		<ul> 
			{data?.products?.map(product => (
				<li key={product.name}>{product.name} - R${product.price},00</li>
			))}
		</ul>
	) 
}

export default ProductList;
