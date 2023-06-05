import { gql, useMutation } from '@apollo/client';

const ADD_PRODUCT = gql`
  mutation addProduct($product: ProductInput) {
    addProduct(product: $product) {
      id
      name
      price
    }
  }
`;

const ProductForm = () => {
    const [addProduct, { loading }] = useMutation(ADD_PRODUCT);
  
    if (loading) return 'Submitting...';

    let nameInput;
    let priceInput;
    
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();

            addProduct({ 
              variables: { 
                product: { 
                    name: nameInput.value,
                    price: parseInt(priceInput.value)
                } 
              }
            });

            nameInput.value = '';
          }}
        >
          <input ref={node => { nameInput = node; }} placeholder="Nome" />
          <br />
          <br />
          <input ref={node => { priceInput = node; }} placeholder="Preço" />
          <br />
          <br />
          <button type="submit">Adicionar produto</button>
        </form>
      </div>
    );
}

export default ProductForm;
