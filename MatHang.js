fetch('https://636784f3f5f549f052d6e874.mockapi.io/clothesTest/Clothes')
.then((response) => response.json())
.then((data) => {
    var listOfitem = [];
    for(var i =0; i<data.length; i++) {
        listOfitem.push({
            name: data[i].name,
            price: data[i].price*10000,
            picture: data[i].picture,
        });
    }
    onloading(listOfitem);
});

function onloading(itemTo) {
    generNumberOfItemIncart();
    newElement("BoxItem")
    timKiem(itemTo);
    cartCondition();

    dividePages(itemTo);
}

function newElement(classNameElement) {
    var createdElement = document.createElement("div");
    createdElement.className = classNameElement;
    document.body.appendChild(createdElement);
}   

function createBoxItem(itemInput) {

    var BoxItem = document.getElementsByClassName("BoxItem")[0];
    
    var listBoxItem = document.createElement("div");
    listBoxItem.className = "listHangHoa";

    itemInput.forEach( item => {
        var boxItem = document.createElement("div");
        boxItem.className = "hangHoa";

        var itemImg = document.createElement("img");
        itemImg.className = "anhSanPham";
        itemImg.src = item.picture;

        var itemName = document.createElement("p");
        itemName.className = "thongTinHangHoa";
        itemName.innerText = item.name;

        var itemPrice = document.createElement("p");
        itemPrice.className = "price";
        itemPrice.innerHTML = translateNumber(item.price) + " vnd";

        var addToCartButton = document.createElement("button");
        addToCartButton.className = "Them";
        addToCartButton.innerText = "Thêm vào giỏ hàng";

        BoxItem.appendChild(listBoxItem);
        listBoxItem.appendChild(boxItem);
        boxItem.appendChild(itemImg);
        boxItem.appendChild(itemName);
        boxItem.appendChild(itemPrice);
        boxItem.appendChild(addToCartButton);
    });
}

function translateNumber(number) {
    var numberToConvert = number;
    if(parseInt(numberToConvert / Math.pow(10,3)) !=0) {
        var result = parseInt(numberToConvert % Math.pow(10,3)).toString();
        while(result.length <3) {
            result = "0" + result;
        }  
        return translateNumber(parseInt(numberToConvert / Math.pow(10,3))) + "," + result;
    }
    return (numberToConvert % Math.pow(10,3)).toString();
}

function generNumberOfItemIncart() {

    var boxCart = document.getElementsByClassName("header__navbar-cart")[0];
    var Cart = document.getElementsByClassName("header__navbar-cart-payment")[0];

    var tempSumPrice = document.createElement("p");
    tempSumPrice.className="sumOfPrice";
    tempSumPrice.innerHTML = "0 vnd"; 

    var numberOfItem = document.createElement("p");
    numberOfItem.id="numberOfItem";
    numberOfItem.innerHTML = 0;

    boxCart.appendChild(numberOfItem);
    Cart.appendChild(tempSumPrice);
}

function addToCartItem(item) {
    var exsist = false;
    var cartTempBox = document.getElementsByClassName("cart__list-listItems")[0];

    var numberItemInCart = document.getElementById("numberOfItem");

    var checkItemExist = document.querySelectorAll(".temp");
    checkItemExist.forEach(Element => {
        if (item.procName == Element.children[1].innerText ) {
            Element.children[4].innerText = parseInt(Element.children[4].innerText) + 1 ;
            exsist = true;
        }
    });  
    if(!exsist) {

        numberItemInCart.innerText = parseInt(numberItemInCart.innerText) +1;

        var cartItem = document.createElement("li");
        cartItem.className="temp";
            
        var cartItemPic = document.createElement("img");
        cartItemPic.className = "tempPicItem";
        cartItemPic.src = item.proPicture;
    
        var cartItemName = document.createElement("p");
        cartItemName.className = "tempNameItem";
        cartItemName.innerHTML = item.procName;
            
        var cartItemPrice = document.createElement("p");
        cartItemPrice.className = "tempPriceItem";
        cartItemPrice.innerHTML = item.price;

        var buttonAdd = document.createElement("button");
        buttonAdd.className="buttonAdd";
        buttonAdd.innerHTML = "+";

        var buttonMinus = document.createElement("button");
        buttonMinus.className="buttonMinus";
        buttonMinus.innerHTML = "-";
    
        var cartItemQuantity = document.createElement("p");
        cartItemQuantity.className = "tempQuantityItem";
        cartItemQuantity.innerText = item.quantity;

        cartTempBox.appendChild(cartItem);
        cartItem.appendChild(cartItemPic);
        cartItem.appendChild(cartItemName);
        cartItem.appendChild(cartItemPrice);
        cartItem.appendChild(buttonMinus);
        cartItem.appendChild(cartItemQuantity);
        cartItem.appendChild(buttonAdd);
    }      
    increaseNumberOfItemInCart();
    
}

function increaseNumberOfItemInCart(){

    var buttonListAdd = document.querySelectorAll(".buttonAdd");
    buttonListAdd.forEach(item => {
        item.onclick = () => {
            var parentElementButton = item.parentElement;
            parentElementButton.children[4].innerHTML = (parseInt(parentElementButton.children[4].innerHTML) + 1).toString();
            calculatePriceOfCart();
        }

    });
    var buttonListMinus = document.querySelectorAll(".buttonMinus");
    buttonListMinus.forEach(item => {
        item.onclick = () => {
            
            var parentElementButton = item.parentElement;
            parentElementButton.children[4].innerHTML = (parseInt(parentElementButton.children[4].innerHTML) - 1).toString();
            
            if(parentElementButton.children[4].innerHTML <= "0"){
                var changeNumberOfItem = document.getElementById("numberOfItem");
                changeNumberOfItem.innerHTML = parseInt((changeNumberOfItem.innerHTML) - 1).toString()
                parentElementButton.remove();
            }
            calculatePriceOfCart();
        }

    });

    calculatePriceOfCart();
}

function calculatePriceOfCart() {
    var Cart = document.querySelectorAll(".temp");
    console.log(Cart);
    var CartPrice = document.getElementsByClassName("sumOfPrice")[0];
    var sumPrice = 0;

    Cart.forEach(element => {
        var ProcductPrice = (element.children[2].innerText);
        ProcductPrice  = ProcductPrice .split("vnd").join("");
        ProcductPrice  = ProcductPrice .split(",").join("");
        sumPrice += parseInt(element.children[4].innerText) * parseInt(ProcductPrice);
    })
    CartPrice.innerText = translateNumber(sumPrice) + " vnd";
}

function cartCondition() {
    var buttonList = document.querySelectorAll(".Them");
    buttonList.forEach(item =>{

        item.onclick = () => {

            var addToCart = item.parentElement;
            addToCartItem({
                proPicture: addToCart.children[0].src,
                procName: addToCart.children[1].innerHTML,
                price: addToCart.children[2].innerHTML,
                quantity: 1,
            });
    }
    }); 
}

function createButtonPages(numberOfPages) {
    var divIncludeButtonPages = document.createElement("div");
    divIncludeButtonPages.className = "PageList";
    for(var page = 1; page <= numberOfPages; page++) {
        var createButtons = document.createElement("button");
        createButtons.className = "Pages";
        createButtons.innerHTML = page;
        divIncludeButtonPages.appendChild(createButtons);
    }
    document.body.appendChild(divIncludeButtonPages);

}

function checkPagesNow(item, maxItemQuantity) {
    var numberOfPages = Math.ceil(item.length / maxItemQuantity);
    var init = false;
    var listItem  = [];

    if(!init) {
        for(var  i =0; i < 20; i++ ) {
            listItem.push(item[i]);
        }
        createBoxItem(listItem);
        createButtonPages(numberOfPages);
        init = true;
    }
    var buttonClicked = document.querySelectorAll(".Pages");

    buttonClicked.forEach(element => {
        element.onclick = ()=> {
            listItem = [];
            var pageNow = parseInt(element.innerText);
            var numberOfItemInAPage = 20;
            if(item.length - (pageNow-1)*maxItemQuantity < 20) {
                numberOfItemInAPage = item.length - (pageNow-1)*maxItemQuantity;
            }

            for(var  i =0; i < numberOfItemInAPage; i++ ) {
                listItem.push(item[i+20*(pageNow-1)]);
            }

            var listRemove = document.getElementsByClassName("listHangHoa")[0];
            listRemove.remove();

            createBoxItem(listItem);
        };
    });
}

function dividePages(fromList) {
    var maxItem = 20;
    checkPagesNow(fromList, maxItem);
}

function timKiem(list) {
    listSearchItem = [];
    var searchBar = document.getElementsByClassName("header__search-input")[0];
    searchBar.addEventListener("input", (event) => {

        var wantToFind = event.target.value;
        var listRemove = document.getElementsByClassName("listHangHoa")[0];
        if(wantToFind == "" ){
            if(listRemove != null) listRemove.remove();
        }
        list.forEach((element,index) => {

            var tenHangHoa = element.name;
            if((tenHangHoa.toLowerCase()).includes(wantToFind.toLowerCase())) { 
                listSearchItem.push(element);
                if(listRemove != null) listRemove.remove();
            } else {
                if(index = list.length) {
                    if(listRemove != null) listRemove.remove();
                }
            }
        })
        createBoxItem(listSearchItem);
        cartCondition();
        listSearchItem = [];
    })
}
