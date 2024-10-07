// Slider Section

let index = 0;
const slides = document.getElementsByClassName("slider-pic")
let dotBtn = document.getElementsByClassName("btn-slider");

function plusSlides(n) {
    index = ((n + index) % slides.length);
    for (let slide of slides) slide.style.display = "none";
    for (const btn of dotBtn) btn.style.background = "#0000004a";

    slides[index].style.display = "block";
    dotBtn[index].style.background = "#424242"
}

setInterval(() => plusSlides(1), 5000);

// Slider Btn Dots

function setSlideIndex(n) {
    index = n;
    plusSlides(0);
}

setSlideIndex(0);



// Offer Section

let offer = document.querySelectorAll(".offer-slider");
let offerItem = document.querySelectorAll(".offer-item");


offerItem.forEach((box, index) => {
    box.addEventListener("click", () => {
        offer.forEach((show, i) => {
            if (index == i) {
                removeActive();
                show.classList.add("active-offer");
            }
        })
    })
})

function removeActive() {
    offer.forEach(hide => {
        hide.classList.remove("active-offer");
    })
}


// Offer Section - pink box

offerItem.forEach((box, index) => {
    box.addEventListener("click", () => {
        offerItem.forEach(hide => {
            hide.classList.remove("active");
        })
        box.classList.add("active");
    })
})



// Timer Function

let totalTime = 2 * 60 * 60; // 2 ساعت = 7200 ثانیه

function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    const interval = setInterval(() => {
        // محاسبه ساعت، دقیقه و ثانیه
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = Math.floor(timer % 60);

        // اضافه کردن صفر به زمان‌هایی که تک رقمی هستند
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // نمایش زمان باقی‌مانده
        display.textContent = hours + ":" + minutes + ":" + seconds;

        // کاهش زمان
        if (--timer < 0) {
            clearInterval(interval); // متوقف کردن تایمر بعد از اتمام زمان
            display.textContent = "اتمام زمان";
        }
    }, 1000);
}

window.onload = function () {
    const display = document.querySelector('#timer');
    startTimer(totalTime, display);
};


//  Login Form

let login = document.getElementById("login")
let formSection = document.getElementById("form-section")

login.addEventListener("click", function () {
    formSection.classList.toggle("display-form")  
})

let lightMode = document.getElementById("dark-light-mode")
lightMode.addEventListener("click", function () {
    if (lightMode.checked == true) {      
        formSection.style.background = "gray"
    } else {
        formSection.style.background = "silver"
    }
})



// Cards Section

let next = document.getElementById("next")
let prev = document.getElementById("previous")
let productCards= document.getElementById("section-cards");

prev.addEventListener('click', function(){
    productCards.scrollLeft -= 160;
})

next.addEventListener('click', function(){
    productCards.scrollLeft += 160;
})

const maxScrollLeft = productCards.scrollWidth - productCards.clientWidth;



// MakeUp Products

// Pink Border Bottom

let makeup= document.querySelectorAll(".makeup-items")
let title= document.querySelectorAll(".makeup-title");


title.forEach((th, index) => {
    th.addEventListener("click", () => {
        title.forEach(line => {
            line.classList.remove("active");
        })
        th.classList.add("active");
    })
})


let makeupItem = document.querySelectorAll(".item-show");

title.forEach((box, index) => {
    box.addEventListener("click", () => {
        makeupItem.forEach((show, i) => {
            if (index == i) {
                removebox();
                show.classList.add("show-display");
            }
        })
    })
})

function removebox() {
    makeupItem.forEach(h => {
        h.classList.remove("show-display");
    })
}



//  Product Box

const countCounter = document.querySelector('.cart__count');
const cartDOM = document.querySelector('.cart__items');
const addToCartBtn = document.querySelectorAll('.btn_add_to_cart');
const totalCount = document.querySelector('.total__counter');
const totalCost = document.querySelector('.total__cost');
const check_out_btn = document.querySelector('.check_out_btn');


let cartItems = (JSON.parse(localStorage.getItem("cart___items")) || []);

document.addEventListener("DOMContentLoaded", loadData)


check_out_btn.addEventListener('click', function(){
    if(confirm('آیا از حذف محصولات در سبد خرید مطمئنید؟')){
        clearCatItems();
    }
})

countCounter.addEventListener('click', function () {
    cartDOM.classList.toggle('active')
})

addToCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let parentElement = btn.parentElement.parentElement.parentElement;
        console.log(parentElement);
        const product = {
            id: parentElement.querySelector('#product_id').value,
            name: parentElement.querySelector('.product__name').innerText,
            image: parentElement.querySelector('#image').getAttribute('src'),
            price: parentElement.querySelector('.product__price').innerText,
            quantity: 1,
        }

        let IsInCart = cartItems.filter(item => item.id === product.id).length > 0;

        if (!IsInCart) {
            addItemToTheDom(product)
        } else {
            alert('این محصول در سبد خرید موجود است.');
            return
        }


        const cartDOMItems = document.querySelectorAll('.cart__item');

        cartDOMItems.forEach(inItem => {
            if(inItem.querySelector('#product__id').value === product.id){
                increaseItem(inItem, product)
                decreaseItem(inItem, product)
                removeItem(inItem, product)
            }
        })


        cartItems.push(product);
        calculateTotal();
        saveToLocalStorage()
    })
})


function saveToLocalStorage(){
    localStorage.setItem("cart___items", JSON.stringify(cartItems)) 
}


function addItemToTheDom(product) {
    cartDOM.insertAdjacentHTML("afterbegin",`
            <div class="cart__item">
            <input type="hidden" id="product__id" value="${product.id}">
            <img src="${product.image}" id="product__" alt="">
            <h4 class="product__name">${product.name}</h4>
            <a  class="btn__small" action="decrease">&minus;</a>
            <h4 class="product__quantity">${product.quantity}</h4>
            <a class="btn__small" action="increase">&plus;</a>
            <h4 class="product_price">${product.price}</h4>
            <a class="btn__small btn__remove " action="remove">&times;</a>
        </div>
    `)
}


function calculateTotal(){
    let total = 0;
    cartItems.forEach(item => {
        total += item.quantity * item.price
    })
    totalCost.innerText = total;
    totalCount.innerText = cartItems.length
}


function increaseItem(inItem, product){
    inItem.querySelector("[action='increase']").addEventListener('click', function(){
        cartItems.forEach(cartItem => {
            if(cartItem.id === product.id){
                inItem.querySelector('.product__quantity').innerText = ++cartItem.quantity;
                calculateTotal()
                saveToLocalStorage()
            }
        })
    })
}

function decreaseItem(inItem, product){
    inItem.querySelector("[action='decrease']").addEventListener('click', function(){
        cartItems.forEach(cartItem => {
            if(cartItem.id === product.id){
              
                if(cartItem.quantity > 1){
                    inItem.querySelector('.product__quantity').innerText = --cartItem.quantity;
                }else{
                    cartItems = cartItems.filter(newElement => newElement.id !== product.id);
                    inItem.remove();
                }
                calculateTotal()
                saveToLocalStorage()
            }
        })
    })
}

function removeItem(inItem, product){
    inItem.querySelector("[action='remove']").addEventListener('click', function(){
        cartItems.forEach(cartItem => {
            if(cartItem.id === product.id){
              
                    cartItems = cartItems.filter(newElement => newElement.id !== product.id);
                    inItem.remove();
                calculateTotal()
                saveToLocalStorage()
            }
        })
    })
}

function loadData(){
    if(cartItems.length > 0){
        cartItems.forEach(product => {
            addItemToTheDom(product);

            const cartDOMItems = document.querySelectorAll('.cart__item');

            cartDOMItems.forEach(inItem => {
                if(inItem.querySelector('#product__id').value === product.id){
                    increaseItem(inItem, product)
                    decreaseItem(inItem, product)
                    removeItem(inItem, product)
                }
            })
    
        });
        calculateTotal()
        saveToLocalStorage()
    }
}

function clearCatItems(){
    localStorage.clear();
    cartItems= [];
    
    document.querySelectorAll('.cart__item').forEach(item => {
        item.remove();
    })
    calculateTotal()
}