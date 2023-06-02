import { gql, useApolloClient } from "@apollo/client";
import Exemplo1 from "./components/exemplo1";
import Exemplo2 from "./components/exemplo2";
import Exemplo3 from "./components/exemplo3";
import Exemplo4 from "./components/exemplo4";
import Exemplo5 from "./components/exemplo5";

function App() {
	const client = useApolloClient();

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

	client.writeQuery({
		query: GET_CARRINHO,
		data: {
			carrinho: {
				id: 'MEUCARRINHO',
				produtos: [],
				__typename: 'Carrinho'
			}
		}
	})

	return ( 
	<> 		
		{/* TODO: Adicionar um menu com o Router */}
		{/* <Exemplo1 /> */}
		{/* <Exemplo2 /> */}
		{/* <Exemplo3 /> */}
		{/* <Exemplo4 /> */}
		<Exemplo5 />
	</>
	)
}

export default App;
