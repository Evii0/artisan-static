function getStockLevels(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, "stock");
    }
    xmlHttp.open("GET", "https://southern-building-products.herokuapp.com/stock", true); // true for asynchronous 
    xmlHttp.send(null);
}

// function getStockData(){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", "https://southern-building-products.herokuapp.com/stockData", true); // true for asynchronous 
//     xmlHttp.send(null);
// }

function callback(text, type){
    if(type == "stock"){
        sessionStorage.setItem("stockLevels", text);
        displayStock();
    }
    else sessionStorage.setItem("stockData", text);
}

function loadPage(){
    // if(sessionStorage.getItem("stockData") == null){
    //     console.log("Retrieving Stock Data");
    //     getStockData();
    // }
    if(sessionStorage.getItem("stockLevels") == null){
        console.log("Retrieving Stock Levels");
        getStockLevels();
    }
    else{
        displayStock();
    } 
    

    // var container = document.querySelector(".row");
    // var template = document.querySelector("#product");
    // var clone = template.content.cloneNode(true);
    // var para = clone.querySelectorAll("p");
    // para[0].textContent = "Gun Fuel Cells";
    // para[1].textContent = " - 3x Nail Gun Fuel Cells.";
    // para[2].textContent = " - Fits Paslode Framing Guns.";

    // container.append(clone);
}

function displayStock(){
    var data = JSON.parse(sessionStorage.getItem("stockLevels"));
    Object.keys(data).forEach(function(key) {
        console.log(key);
        var temp = document.getElementById(key + "Price");
        if(temp != null){
            var tempData = data[key].split(":");
            console.log(tempData);
            if(tempData[0] >= 5){
                temp.innerHTML = `<p style="margin:0px;">${formatCurrency(tempData[1])}</p><p class=stockLevel stockGreen>5+ in stock.</p>`;
            }
            else if (tempData[0] > 0){
                temp.innerHTML = `<p style="margin:0px;">${formatCurrency(tempData[1])}</p><p class=stockLevel stockOrange>${tempData[0]} in stock.</p>`;
            }
            else{
                temp.innerHTML = `<p style="margin:0px;">${formatCurrency(tempData[1])}</p><p class=stockLevel stockGreen>In stock with supplier.</span>`;
            }
        }
        
    });
}