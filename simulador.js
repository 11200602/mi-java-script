// app.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsElement = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const clearCartButton = document.getElementById("clear-cart");
  const purchaseButton = document.getElementById("purchase");
  const leaveMessageButton = document.getElementById("leave-message");
  const talkToAdvisorButton = document.getElementById("talk-to-advisor");

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsElement.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((product, index) => {
      totalPrice += product.price * product.quantity;

      const listItem = document.createElement("li");
      listItem.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      listItem.innerHTML = `
                ${product.name} - $${product.price} x ${product.quantity}
                <div>
                    <button class="btn btn-sm btn-primary change-quantity" data-index="${index}" data-action="increase">+</button>
                    <button class="btn btn-sm btn-primary change-quantity" data-index="${index}" data-action="decrease">-</button>
                    <button class="btn btn-sm btn-danger remove-from-cart" data-index="${index}">Eliminar</button>
                </div>
            `;
      cartItemsElement.appendChild(listItem);
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    attachEventListeners();
  }

  function addToCart(event) {
    const productElement = event.target.closest(".product");
    const product = {
      id: productElement.getAttribute("data-id"),
      name: productElement.getAttribute("data-name"),
      price: parseFloat(productElement.getAttribute("data-price")),
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
  }

  function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
  }

  function removeFromCart(event) {
    const index = event.target.getAttribute("data-index");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  function changeQuantity(event) {
    const index = event.target.getAttribute("data-index");
    const action = event.target.getAttribute("data-action");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (action === "increase") {
      cart[index].quantity += 1;
    } else if (action === "decrease") {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  function attachEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", removeFromCart);
    });
    document.querySelectorAll(".change-quantity").forEach((button) => {
      button.addEventListener("click", changeQuantity);
    });
  }

  clearCartButton.addEventListener("click", clearCart);

  purchaseButton.addEventListener("click", () => {
    alert("¡Gracias por tu compra!");
    clearCart();
  });

  leaveMessageButton.addEventListener("click", () => {
    const messageModal = new bootstrap.Modal(
      document.getElementById("messageModal")
    );
    messageModal.show();
  });

  talkToAdvisorButton.addEventListener("click", () => {
    const advisorModal = new bootstrap.Modal(
      document.getElementById("advisorModal")
    );
    advisorModal.show();
  });

  document
    .getElementById("message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const messageText = document.getElementById("message-text").value;
      alert(`Mensaje enviado: ${messageText}`);
      const messageModal = bootstrap.Modal.getInstance(
        document.getElementById("messageModal")
      );
      messageModal.hide();
    });

  document
    .getElementById("advisor-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const meetingTime = document.getElementById("meeting-time").value;
      if (meetingTime) {
        alert(`Reunión programada para ${meetingTime}`);
        const advisorModal = bootstrap.Modal.getInstance(
          document.getElementById("advisorModal")
        );
        advisorModal.hide();
      } else {
        alert("Por favor, selecciona un horario.");
      }
    });

  loadCart();
});
