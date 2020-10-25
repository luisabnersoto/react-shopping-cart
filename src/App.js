import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';

import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
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
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Cart Items
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
