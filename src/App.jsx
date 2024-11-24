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

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); 

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const productsData = await productService.index();
      setProducts(productsData);
    };
    if (user) fetchAllEvents();
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
            <Route path="/products" element={<ProductList events={events} />} />
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
