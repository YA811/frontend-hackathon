import { Link } from 'react-router-dom';

const ProductList = (props) => {

  if (props.products.length === 0) return <h4>No products added yet.</h4>;

  return (
    <main className="event-list-container">
      {props.products.map((product) => (
        <Link key={product._id} to={`/products/${product._id}`}>
          <article>
            <header>
              <h2>{product.product_name}</h2>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
};
  
  export default ProductList;