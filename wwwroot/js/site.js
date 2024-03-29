﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const loginModal = document.querySelector(".modal");


function openLoginModal(orderID) {
    loginModal.classList.add("open");
}

document.querySelector(".auth-form__switch-btn").addEventListener("click", () => {
    loginModal.classList.remove("open");
});

window.onclick = (event) => {
    if (event.target == loginModal) {
        loginModal.classList.remove("open");
    }
}

// Tìm kiếm danh mục
function searchProducts(input) {
    document.querySelector('.header__search-history').style.display = 'block';
    var formData = new FormData();
    if (input.value != "") {
        formData.append("keyword", input.value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Home/Search', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            let html = "";
            html +=     "<ul class='header__search-history-list'>";
            html += data.map(obj => `
                            <li class="header__search-history-item">
                                <a href="/Product/Index?categoryID=${obj.pK_iCategoryID}">${obj.sCategoryName}</a>
                            </li>`).join('');
            html +=     "</ul>";
            document.querySelector('.header__search-history').innerHTML = html;
        } 
    };
    xhr.send(formData);
}
const searchHistory = document.querySelector('.header__search-history');
window.onclick = (event) => {
    if (event.target == searchHistory) {
        searchHistory.style.display = 'none';
    }
}

// lấy số lượng sản phẩm giỏ hàng
function getCartInfo() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Cart/GetCartInfo', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.table(data);
        }
    }
    xhr.send(null);
}
//getCartInfo();

// Tăng, giảm số lượng sản phẩm
function cong(event, productID, unitPrice) {
    // console.log(productID);
    const parentElement = event.target.parentNode;
    // console.log(parentElement);
    var cong = parentElement.querySelector("#qnt").value;
    var input = parentElement.querySelector("#qnt");
    if (parseInt(cong) < 100) { // Nếu sau này ta convert biến này sang int, double thì không dùn constance cho biến qnt
        input.value = parseInt(cong) + 1;
        console.log(input.value);
        var formData = new FormData(); // Gửi dữ liệu dạng formData
        formData.append('quantity', input.value);
        formData.append('productID', productID);
        formData.append('unitPrice', unitPrice)
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/Quantity', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const money = JSON.parse(xhr.responseText);
                const trParent = parentElement.parentNode.parentNode;
                // console.log(money.money);
                trParent.querySelector("#money").innerText = money.money;
            }
        }
        xhr.send(formData);
    }
}

function tru(event, productID, unitPrice) {
    const parentElement = event.target.parentNode;
    var tru = parentElement.querySelector("#qnt").value;
    var input = parentElement.querySelector("#qnt");
    if (parseInt(tru) > 1) {
        input.value = parseInt(tru) - 1;
        var formData = new FormData();
        formData.append('quantity', input.value);
        formData.append('productID', productID);
        formData.append('unitPrice', unitPrice);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/Quantity', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const money = JSON.parse(xhr.responseText);
                const trParent = parentElement.parentNode.parentNode;
                trParent.querySelector("#money").innerText = money.money;
            }
        };
        xhr.send(formData);
    } else if ((parseInt(tru) == 0)) {
        if (confirm("Bạn muốn xoá sản phẩm này khỏi giỏ hàng")) {

        }
    }
}

// Tăng / Giảm số lượng sản phẩm trong chi tiết sản phẩm
function increaseProduct(event) {
    const parentElement = event.target.parentNode;
    var increase = parentElement.querySelector("#qnt").value;
    if (parseInt(increase) < 100) {
        parentElement.querySelector("#qnt").value = parseInt(increase) + 1;
    }
}

function reduceProduct(event) {
    const parentElement = event.target.parentNode;
    var reduce = parentElement.querySelector("#qnt").value;
    if (parseInt(reduce) > 0) {
        parentElement.querySelector("#qnt").value = parseInt(reduce) - 1;
    }
}

//AddToCart
function addToCart(productID, price) {
    var quantity = document.getElementById("qnt").value;
    if (parseInt(quantity) == 0) {
        toast({title: "Thông báo", msg: "Bạn chưa nhập số lượng sản phẩm!", type: "success", duration: 5000});
        // alert('Bạn chưa nhập số lượng sản phẩm!');
    } else {
        var formData = new FormData();
        formData.append('productID', productID);
        formData.append('unitPrice', price);
        formData.append('quantity', quantity);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/AddToCart', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const obj = JSON.parse(xhr.responseText);
                toast({title: "Thông báo", msg: `${obj.msg}`, type: "success", duration: 5000});
                //alert(obj.msg);
            }
        }
        xhr.send(formData);
    }
}

function deleteProduct(productID) {
    if (confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?")) {
        var formData = new FormData();
        formData.append('productID', productID);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/Cart/DeleteProduct', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const msg = JSON.parse(xhr.responseText);
                document.getElementById("product__" + productID).style.display = 'none';
                alert(`${msg.msg}`);
            } 
        };
        xhr.send(formData);
    }
}

// Checkout
function checkout() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Order/Checkout', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
            data.map(obj => {
                document.querySelector(".money").innerText = obj.dTotalMoney;
            });
        }
    };
    xhr.send(null);
}

// Sắp xếp các sản phẩm trong trang sản phẩm theo giá tăng dần
function sortIncre(categoryID) {
    var formData = new FormData();
    formData.append("categoryID", categoryID);
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/Product/Sort', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            let html = "";
            html += data.products.map(obj => `
            <div class="col l-2-4 c-6 m-4">
                <a class="home-product-item" href="/Product/Detail/${obj.pK_iProductID}">
                    <div class="home-product-item__img"
                        style="background-image: url(/img/${obj.sImageUrl});"></div>
                    <h4 class="home-product-item__name">${obj.sProductName}</h4>
                    <div class="home-product-item__price">
                        <span class="home-product-item__price-old">1.200 000đ</span>
                        <span class="home-product-item__price-current">${obj.dPrice} đ</span>
                    </div>
                    <div class="home-product-item__action">
                        <span class="home-product-item__like home-product-item__like--liked">
                            <i class="home-product-item__like-icon-empty far fa-heart"></i>
                            <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                        </span>
                        <div class="home-product-item__rating">
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="home-product-item__star--gold fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <span class="home-product-item__sold"> 88 Đã bán</span>
                    </div>
                    <div class="home-product-item__origin">
                        <span class="home-product-item__brand">Who</span>
                        <span class="home-product-item__origin-name">Nhật Bản</span>
                    </div>
                    <div class="home-product-item__favourite">
                        <i class="fas fa-check"></i>
                        <span>Yêu thích</span>
                    </div>
                    <div class="home-product-item__sale-off">
                        <span class="home-product-item__sale-off-percent">53%</span>
                        <span class="home-product-item__sale-off-label">GIẢM</span>
                    </div>
                </a>
            </div>
            `).join('');
            console.log(document.querySelector(".product__container").innerHTML = html);
            document.querySelector(".product__container").innerHTML = html;
        }
    }
    xhr.send(formData);
}