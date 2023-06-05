import { gql, useApolloClient } from "@apollo/client";
import Exemplo1 from "./components/exemplo1";
import Exemplo2 from "./components/exemplo2";
import Exemplo3 from "./components/exemplo3";
import Exemplo4 from "./components/exemplo4";
import Exemplo5 from "./components/exemplo5";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";



function App() {
	const client = useApolloClient();

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

	client.writeQuery({
		query: GET_CART,
		data: {
			cart: {
				id: 'MEUCARRINHO',
				products: [],
				__typename: 'Cart'
			}
		}
	})

	return (
		<BrowserRouter>

			<ul>
				<li> <Link to="/example-get-product">Exemplo busca produtos</Link></li>
				<li> <Link to="/example-add-product">Exemplo adiciona produto</Link></li>
				<li> <Link to="/example-fetch-policy">Exemplo fetch policy</Link></li>
				<li> <Link to="/example-add-wishlist">Exemplo adiciona favoritos</Link></li>
				<li> <Link to="/example-cart">Exemplo carrinho de compras</Link></li>
			</ul>

			<Routes>
				<Route index path="/example-get-product" element={<Exemplo1 />} />
				<Route path="/example-add-product" element={<Exemplo2 />} />
				<Route path="/example-fetch-policy" element={<Exemplo3 />} />
				<Route path="/example-add-wishlist" element={<Exemplo4 />} />
				<Route path="/example-cart" element={<Exemplo5 />} />
			</Routes>
			
		</BrowserRouter>
	)
}

export default App;
