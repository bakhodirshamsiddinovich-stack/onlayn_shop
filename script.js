// ===============================
// FRESH FRUITS — SCRIPT.JS
// ===============================

// Mahsulotlar ro‘yxati
const products = [
    {
        id: 1,
        name: "Ananas",
        price: 5000,
        image: "images/ananas.jpg",
        unit: "kg"
    },
    {
        id: 2,
        name: "Apelsin",
        price: 3000,
        image: "images/apelsin.webp",
        unit: "kg"
    },
    {
        id: 3,
        name: "Kivi",
        price: 3000,
        image: "images/kivi.jpg",
        unit: "kg"
    },
    {
        id: 4,
        name: "Malina",
        price: 5000,
        image: "images/malina.webp",
        unit: "kg"
    },
    {
        id: 5,
        name: "Mandarin",
        price: 3000,
        image: "images/mandarin.avif",
        unit: "kg"
    },
    {
        id: 6,
        name: "Olma",
        price: 2000,
        image: "images/olma.webp",
        unit: "kg"
    },
    {
        id: 7,
        name: "Qulupnay",
        price: 4000,
        image: "images/qulupnay.jpeg",
        unit: "kg"
    },
    {
        id: 8,
        name: "Tarvuz",
        price: 1000,
        image: "images/tarvuz.jpg",
        unit: "kg"
    },
    {
        id: 9,
        name: "Qora tut",
        price: 2000,
        image: "images/tut.webp",
        unit: "kg"
    }
];

// Savatcha
let cart = [];

// HTML elementlari
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cartPanel");

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", function () {
    displayProducts(products);
    updateCart();
});

// Mahsulotlarni chiqarish
function displayProducts(productList) {
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (productList.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <h2>😔 Mahsulot topilmadi</h2>
                <p>Boshqa meva nomini qidirib ko‘ring.</p>
            </div>
        `;
        return;
    }

    productList.forEach(function (product) {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-image-box">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.src='https://via.placeholder.com/300x220?text=Rasm+topilmadi'"
                >
            </div>

            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="product-price">
                    ${formatPrice(product.price)} so‘m
                    <span>/${product.unit}</span>
                </p>

                <button
                    class="add-cart-btn"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Savatchaga qo‘shish
                </button>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Narxni formatlash
function formatPrice(price) {
    return price.toLocaleString("uz-UZ");
}

// Savatchaga qo‘shish
function addToCart(productId) {
    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) return;

    const existingProduct = cart.find(function (item) {
        return item.id === productId;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            unit: product.unit,
            quantity: 1
        });
    }

    updateCart();
    showMessage(`${product.name} savatchaga qo‘shildi!`);
}

// Savatchani yangilash
function updateCart() {
    updateCartCount();
    displayCartItems();
    calculateCartTotal();
}

// Savatchadagi umumiy mahsulot soni
function updateCartCount() {
    if (!cartCount) return;

    const totalQuantity = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

// Savatcha mahsulotlarini chiqarish
function displayCartItems() {
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Savatcha bo‘sh</h3>
                <p>Hali hech qanday mahsulot qo‘shilmagan.</p>
            </div>
        `;
        return;
    }

    cart.forEach(function (item) {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.src='https://via.placeholder.com/80x80?text=Rasm'"
            >

            <div class="cart-item-info">
                <h4>${item.name}</h4>

                <p>
                    ${formatPrice(item.price)} so‘m / ${item.unit}
                </p>

                <strong>
                    ${formatPrice(item.price * item.quantity)} so‘m
                </strong>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>
                </div>
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
                title="O‘chirish"
            >
                ✕
            </button>
        `;

        cartItems.appendChild(cartItem);
    });
}

// Mahsulot miqdorini o‘zgartirish
function changeQuantity(productId, change) {
    const item = cart.find(function (product) {
        return product.id === productId;
    });

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(function (product) {
            return product.id !== productId;
        });
    }

    updateCart();
}

// Savatchadan o‘chirish
function removeFromCart(productId) {
    cart = cart.filter(function (item) {
        return item.id !== productId;
    });

    updateCart();
    showMessage("Mahsulot savatchadan o‘chirildi.");
}

// Umumiy narxni hisoblash
function calculateCartTotal() {
    if (!cartTotal) return;

    const total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = `${formatPrice(total)} so‘m`;
}

// Mahsulot qidirish
function searchProducts() {
    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchText);
    });

    displayProducts(filteredProducts);
}

// Qidiruvga yozilganda
if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
}

// Savatchani ochish
function openCart() {
    if (!cartPanel) return;

    cartPanel.classList.add("active");
    document.body.classList.add("cart-open");
}

// Savatchani yopish
function closeCart() {
    if (!cartPanel) return;

    cartPanel.classList.remove("active");
    document.body.classList.remove("cart-open");
}

// Mahsulotlar bo‘limiga o‘tish
function scrollToProducts() {
    const productsSection = document.getElementById("products");

    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Buyurtma berish
function orderProducts() {
    if (cart.length === 0) {
        showMessage("Avval savatchaga mahsulot qo‘shing!");
        return;
    }

    const total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    let orderText = "FRESH FRUITS BUYURTMASI\n\n";

    cart.forEach(function (item) {
        orderText +=
            `${item.name} — ${item.quantity} ${item.unit} — ` +
            `${formatPrice(item.price * item.quantity)} so‘m\n`;
    });

    orderText += `\nJami: ${formatPrice(total)} so‘m`;
    orderText += "\n\nBuyurtmangiz qabul qilindi!";

    alert(orderText);

    cart = [];
    updateCart();
    closeCart();
}

// Ekranga xabar chiqarish
function showMessage(message) {
    const oldMessage = document.querySelector(".toast-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.classList.add("show");
    }, 100);

    setTimeout(function () {
        toast.classList.remove("show");

        setTimeout(function () {
            toast.remove();
        }, 300);
    }, 2500);
}

// ESC tugmasi bilan savatchani yopish
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCart();
    }
});