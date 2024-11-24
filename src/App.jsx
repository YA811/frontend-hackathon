import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; 
import * as productService from './services/productService'; 
import ProductList from './components/ProductList/ProductList'; 
import ProductDetails from './components/ProductDetails/ProductDetails';
import CommentForm from './components/CommentForm/CommentForm';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); 

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productsData = await productService.index();
      setProducts(productsData);
    };
    if (user) fetchAllProducts();
  }, [user]);
  

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
        {user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/products" element={<ProductList products={products} />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/products/:productId/comments/commentId/edit" element={<CommentForm />} />
          </>
        ) : (
          // Public Route:
          <Route path="/" element={<Landing />} />
        )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </Routes>
            </AuthedUserContext.Provider>
          </>
  );
};

export default App;
