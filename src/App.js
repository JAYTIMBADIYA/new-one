// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Components/Login';
// import Dashboard from './Components/Dashboard';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './component/ProductDetails';
import ProductList from './component/ProductList';
import Navbar from './component/Navbar';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

