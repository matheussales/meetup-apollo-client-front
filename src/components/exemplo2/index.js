



import { gql, useMutation } from '@apollo/client';

const ADD_PRODUTO = gql`
  mutation addProduto($produto: ProdutoInput) {
    addProduto(produto: $produto) {
      id
      nome
      preco
    }
  }
`;

const FormularioProdutos = () => {
    const [addProduto, { loading }] = useMutation(ADD_PRODUTO);
  
    if (loading) return 'Submitting...';

    let nomeInput;
    let precoInput;
    
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();

            addProduto({ 
              variables: { 
                produto: { 
                    nome: nomeInput.value,
                    preco: parseInt(precoInput.value)
                } 
              }
            });

            nomeInput.value = '';
          }}
        >
          <input ref={node => { nomeInput = node; }} placeholder="Nome" />
          <input ref={node => { precoInput = node; }} placeholder="Preço" />
          
          <button type="submit">Add Produto</button>
        </form>
      </div>
    );
}

export default FormularioProdutos;
