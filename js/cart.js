//Notre tableau stockant toutes les informations du panier
const cart = [
    {
        cartRef : "cart-223545587",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        title: "T-shirt",
        price: 30.00,
        quantity: 3,
        total: function () {
            return this.quantity * this.price;
        },
        isFavorite: true
    },
    {
        cartRef : "cart-878935455",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        title: "Shoes",
        price: 99.00,
        quantity: 9,
        total: function () {
            return this.quantity * this.price;
        },
        isFavorite: true
    },
    {
        cartRef : "cart-87897676",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        title: "Shoes",
        price: 99.00,
        quantity: 9,
        total: function () {
            return this.quantity * this.price;
        },
        isFavorite: false
    },
    {
        cartRef : "cart-989345455",
        image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
        title: "Apple Watch",
        price: 56.00,
        quantity: 4,
        total: function () {
            return this.quantity * this.price;
        },
        isFavorite: false
    }
];

var cartElement = document.getElementsByClassName('cart-items')[0];

//Fonction de recalcul du prix total
var recalculateTotalPrice = (item) => {
    var cardEl = document.getElementById(item.cartRef);
    var totalPrice = cardEl.childNodes[0].childNodes[0].childNodes[3];
    totalPrice.innerHTML = `<h5 class="mb-0"><strong class="totalPrice">$${item.total()}</strong></h5>`
}

var likeItem = (el, item) => {
    var likeBtn = el.childNodes[0];
    var addLike = function(){
        likeBtn.removeAttribute('class');
        likeBtn.setAttribute('class', 'fa-solid text-danger fa-heart icon-size fa-bounce');
        likeBtn.style.color = "rgb(218, 40, 40)";
        item.isFavorite = true;
    
        likeBtn.removeEventListener('click', addLike);
        likeBtn.addEventListener('click', removeLike);
    }
    
    var removeLike = () => {
        likeBtn.removeAttribute('class');
        likeBtn.setAttribute('class', 'fa-regular fa-heart icon-size fa-bounce');
        likeBtn.style.color = "black";
        item.isFavorite = false;
    
        likeBtn.removeEventListener('click', removeLike);
        likeBtn.addEventListener('click', addLike);
    }
    
    item.isFavorite ? likeBtn.addEventListener('click', removeLike)  : likeBtn.addEventListener('click', addLike);
}

function removeItem(el, item){
    var removeBtn = el.childNodes[1];
    removeBtn.addEventListener('click', () => {
        var cardEl = document.getElementById(item.cartRef);
        var confirRemove = confirm("Are you sure you want to remove this article from the cart ?");
        confirRemove ? cardEl.remove() : null;
        confirRemove ? cart.shift(item) : null;
    });
}


//Fonction pour creer un element HTMl du panier
var createItemHTML = (item) => {
    //Premiere Div
    var cardDiv = document.createElement('div');
    cardDiv.className = "card rounded-3 mb-4 shadow-lg";
    cardDiv.id = item.cartRef;

    //CardBody
    var cardBody = document.createElement('div');
    cardBody.className = "card-body p-4";
    cardDiv.appendChild(cardBody);

    //row
    var row = document.createElement('div');
    row.className = "row d-flex justify-content-between align-items-center";
    cardBody.appendChild(row);

    //Product Image
    var productImageDiv = document.createElement('div');
    productImageDiv.className = "col-md-2 col-lg-2 col-xl-2"
    var productImage = document.createElement('img');
    productImage.src = item.image;
    productImage.alt = item.title;
    productImage.className = "img-fluid rounded-3 shadow";
    productImageDiv.appendChild(productImage);

    //Product Title
    var productTitleDiv = document.createElement('div');
    productTitleDiv.className = "col-md-3 col-lg-3 col-xl-3";
    var productTitle = document.createElement('p');
    productTitle.className = "lead fw-normal mb-2 main-color";
    productTitle.innerHTML = `<strong>${item.title}</strong>`;
    var productPrice = document.createElement('p');
    productPrice.className = "lead fw-normal mb-2";
    productPrice.innerHTML = `<span>Price:<strong> $${item.price}</strong></span>`;
    productTitleDiv.appendChild(productTitle);
    productTitleDiv.appendChild(productPrice);

    //Product Quantity
    var productQteDiv = document.createElement('div');
    productQteDiv.className = "col-md-3 col-lg-3 col-xl-2 d-flex";
    //price field
    var inputPrice = document.createElement('input');
    inputPrice.type = "number";
    inputPrice.name = "quantity";
    inputPrice.min = "1";
    inputPrice.id = "formPrice";
    inputPrice.value = item.quantity;
    inputPrice.className = "form-control form-control-sm text-center";
    inputPrice.readOnly = true;

    //minus btn
    var MinusQteBtn = document.createElement('button');
    MinusQteBtn.className = "btn btn-link px-2";
    MinusQteBtn.onclick = function () {
        var input = this.parentNode.querySelector('input[type=number]');
        if (input) {
            input.stepDown();
            item.quantity = input.value;
            recalculateTotalPrice(item);
        }
    }
    MinusQteBtn.innerHTML = `<i class="fas fa-minus main-color"></i>`

    //add btn
    var addQteBtn = document.createElement('button');
    addQteBtn.className = "btn btn-link px-2";
    addQteBtn.onclick = function () {
        var input = this.parentNode.querySelector('input[type=number]');
        if (input) {
            input.stepUp();
            item.quantity = input.value;
            recalculateTotalPrice(item);
        }
    }
    addQteBtn.innerHTML = `<i class="fas fa-plus main-color"></i>`

    productQteDiv.appendChild(MinusQteBtn);
    productQteDiv.appendChild(inputPrice);
    productQteDiv.appendChild(addQteBtn);

    //Product Total Price
    var productTotalPrice = document.createElement('div');
    productTotalPrice.className = "col-md-3 col-lg-2 col-xl-2 offset-lg-1";
    productTotalPrice.innerHTML = `<h5 class="mb-0"><strong class="totalPrice">$${item.total()}</strong></h5>`;

    //Product action
    var productAction = document.createElement('div');
    productAction.className = "col-md-2 col-lg-1 col-xl-1 text-end";

    // if(item.isFavorite)
    // {
    //     productAction.innerHTML = `<i class="fa-solid text-danger fa-heart icon-size fa-bounce"></i>`;
    // }
    // else
    // {
    //     productAction.innerHTML = `<i class="fa-regular fa-heart icon-size fa-bounce"></i>`;
    // }
    //condition ternaire equivalent au if else ci-dessus
    productAction.innerHTML = item.isFavorite ? `<i class="fa-solid text-danger fa-heart icon-size fa-bounce"></i>` : `<i class="fa-regular fa-heart icon-size fa-bounce"></i>`;
    productAction.innerHTML += `<i class="fas fa-trash fa-beat-fade fa-lg icon-size text-danger"></i>`;

    likeItem(productAction, item);
    removeItem(productAction, item);

    row.appendChild(productImageDiv);
    row.appendChild(productTitleDiv);
    row.appendChild(productQteDiv);
    row.appendChild(productTotalPrice);
    row.appendChild(productAction);

    cartElement.appendChild(cardDiv);

}

//la fonction qui nous permettra de creer automatiquement nos ligne de produits disponible dans le panier
var createCartItems = () => {
    cart.map((item) => {
       createItemHTML(item);
    })
}

window.addEventListener('load', () => {
    createCartItems();
});


