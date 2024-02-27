const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];



// Render product list
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Render cart list
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const clearcartBtn = document.getElementById("clear-cart-btn");
  cartList.innerHTML = "";
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    cart.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - $${product.price}`;
      cartList.appendChild(li);
    });
    clearcartBtn.style.display = "block";
  } else {
    const li = document.createElement("li");
    li.textContent = "your cart is empty";
    cartList.appendChild(li);
    clearcartBtn.style.display = "none";
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderProducts();
renderCart();

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);