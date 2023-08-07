var cartIcon = document.querySelector("#cart-icon");
var cart = document.querySelector(".cart");
var closeCart = document.querySelector("#close__cart");      


cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart__remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart__quantity");
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  document.getElementsByClassName("btn__button")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart__content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal()
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product__title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product__img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal()
}

function addProductToCart(title, price, productImg){
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart__box");
  let cartItems = document.getElementsByClassName("cart__content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart__product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    alert("You have already add this item to cart")
  }
  updatetotal()
}

var cartBoxContent = `<img src="${productImg}" alt=""/>
                        <div class="detail__box">
                            <div class="cart__product-title">${title}</div>
                            <div class="cart__price">${price}</div>
                            <input type="number" value="1" class="cart__quantity">
                        </div>
                        <i class='bx bxs-trash cart__remove'></i>`

 cartShopBox.innerHtml = cartBoxContent
 cartItems.append(cartShopBox)
 cartShopBox.getElementsByClassName("cart__remove")[0].addEventListener("click", removeCartItem)
 cartShopBox.getElementsByClassName("cart__quantity")[0].addEventListener("change", quantityChanged)


function updatetotal() {
  var cartContent = document.getElementsByClassName("cart__content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart__box");
  var total = 0
  for (var i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart__price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart__quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total__price")[0].innerText = "$" + total;
}