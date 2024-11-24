import { useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as eventService from '../../services/productService';
import { Link } from 'react-router-dom';

const ProductDetails = (props) => {
    const { ProductId } = useParams();
    const [Product, setProduct] = useState(null);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchProduct = async () => {
          const ProductData = await ProductService.show(ProductId);
          console.log('ProductData', ProductData);
          setProduct(ProductData);
        };
        fetchProduct();
    }, [ProductId]);
      
  

    if (!Product) return <main>Loading...</main>;

    return (
      <main className="Product-detail-container">
      <header className="Product-header">
        <h1 className="Product-title">{Product.title}</h1>
        <h2 className="Product-date">On {Product.date.split('T')[0]}</h2>
        <h2 className="Product-time">At {Product.date.split('T')[1].split('.')[0]}</h2>
        <h2 className="Product-location">{Product.location}</h2>
        <p className="Product-description">{Product.description}</p>
        {Product.planner._id === user._id && (
          <div className="Product-actions">
            <Link to={`/Products/${ProductId}/edit`} className="Product-edit-link">Edit</Link>
            <button onClick={() => props.handleDeleteProduct(ProductId)} className="Product-delete-button">Delete</button>
          </div>
        )}
      </header>
    </main>
    );
};
  
export default ProductDetails;