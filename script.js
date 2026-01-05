const bikes = [
  {
    id: 1,
    name: "WorkBike Mountain X",
    price: 1899,
    image_url: "https://via.placeholder.com/400x250"
  },
  {
    id: 2,
    name: "WorkBike Urban Flex",
    price: 1299,
    image_url: "https://via.placeholder.com/400x250"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("bike-list");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const cartCountSpan = document.getElementById("cart-count");

function renderBikes() {
  list.innerHTML = "";
  bikes.forEach(bike => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${bike.image_url}">
      <h2>${bike.name}</h2>
      <div class="price">R$ ${bike.price}</div>
      <button onclick="addToCart(${bike.id})">Adicionar ao carrinho</button>
    `;

    list.appendChild(card);
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else {
    const bike = bikes.find(b => b.id === id);
    cart.push({ ...bike, qty: 1 });
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCountSpan.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function openCart() {
  renderCart();
  cartModal.style.display = "block";
}

function closeCart() {
  cartModal.style.display = "none";
}

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        ${item.name} (x${item.qty}) - R$ ${item.price * item.qty}
      </div>
    `;
  });

  cartTotalSpan.textContent = total;
}

document.getElementById("cart-btn").addEventListener("click", openCart);

renderBikes();
updateCartCount();
