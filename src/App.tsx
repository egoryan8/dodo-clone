import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import React, { Suspense } from 'react';
import Preloader from './components/Preloader';

const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FullPizza = React.lazy(() => import('./components/FullPizza'));

const App: React.FC = () => (
  <div className="wrapper">
    <Header />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Preloader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<Preloader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Preloader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  </div>
);

export default App;
