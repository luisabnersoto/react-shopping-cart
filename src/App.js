import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';

import data from './data.json';
import Cart from './components/Cart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort: "",
    }
  }

  removeFromCart = (product)=>{
    const cartItems = this.state.cartItems.slice().filter(item => (item._id!==product._id));

    this.setState({cartItems});

    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({
      cartItems: cartItems
    });

    localStorage.setItem("cartItems",JSON.stringify(cartItems));  
  }

  createOrder= (order)=>{
    alert("Need to save order for " + order.name)
  }

  sortProducts = (event) => {
    let sort = event.target.value;
    this.setState({
      sort,
      products: this.state.products.slice().sort((a, b) =>
        sort === 'lowest' ?
          ((a.price > b.price) ? 1 : -1) :
          sort === 'highest' ?
            ((a.price < b.price) ? 1 : -1) :
            (a._id < b._id) ? 1 : -1
      )
    });
  }

  filterProducts = (event) => {
    let value = event.target.value;
    if (value === "") {
      this.setState({
        size: value,
        products: data.products
      });
    } else {
      this.setState({
        size: value,
        products: data.products.filter(product => product.availableSizes.indexOf(value) >= 0)
      });
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart>
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }

}

export default App;
