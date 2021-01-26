priceList = {
    "BKHDG90NG":152.10,
    "BKB90NG":	111.15,
    "BKHDG65NG":	133.20,
    "BKSS65":	126.00,
    "BKSS90":	168.00,
    "BKSS50":	115.50,
    "BKGAS":	28.80,
    "BKBS500":	119.70,
    "BS75":	18.90,
    "BKBS100":	21.24,
    "BS100SS":	46.20,
    "BS125":	27.00,
    "BS150":	18.00,
    "BKCS20":	51.30,
    "BKSD65B":	163.80,
    "BKSD65":	147.00,
    "BKAB32":	16.92,
    "BKSB32":	16.92,
    "BKAB45":	17.82,
    "BKSB45":	17.82,
    "BKBS8":	10.26,
    "BKBS15":	10.98,
    "BKBS25":	12.96,
    "BKBS42":	17.17,
    "BKBS50":	21.42,
    "BKBS75":	24.93,
    "BKBS110":	25.74,
    "SEAL125":	32.40,
    "SEAL150":	37.80,
    "SEAL200":	46.80,
    "BKMPG":	8.78,
    "BKMPO":	8.78,
    "BKMPP":	8.78,
    "BKMPR":	8.78
}

data = {
    "BKHDG90NG":["Gun Nails", "Hot Dip Galvanised - 90mm x 3.15mm- D-Head Smooth"],
    "BKB90NG":	["Gun Nails", "Brights - 90mm x 3.15mm- D-Head Smooth"],
    "BKHDG65NG":	["Gun Nails", "Hot Dip Galvanised Shank - 65mm x 2.87mm Offset - Round head"],
    "BKSS65":	["Gun Nails", "316 Stainless Steel - 65 x 2.87mm- D-Head Ring"],
    "BKSS90":	["Gun Nails", "316 Stainless Steel - 90 x 3.1mm- D-Head Ring"],
    "BKSS50":	["Gun Nails", "304 Stainless Steel - 50mm x 2.8mm Full Round Ring Drive Plastic Collated"],
    "BKGAS":	["Gun Nails", "Pack of 3x Nail Gun Fuel Cells"],
    "BKBS500":	["Fixings", "Batten Screws - 14g x 100mm Mechanical Galvanised Bugle Head Hex Drive"],
    "BS75":	["Fixings", "Batten Screws - 14g x 75mm Mechanical Galvanised Class 4 Bugle Head Hex Drive"],
    "BKBS100":	["Fixings", "Batten Screws - 14g x 100mm Mechanical Galvanised Bugle Head Hex Drive"],
    "BS100SS":	["Fixings", "Batten Screws - 14g x 100mm Stainless Steel 316 Bugle Head Hex Drive"],
    "BS125":	["Fixings", "Batten Screws - 14g x 125mm Mechanical Galvanised Class 4 Bugle Head Hex Drive"],
    "BS150":	["Fixings", "Batten Screws - 14g x 150mm Mechanical Galvanised Class 4 Bugle Head Hex Drive"],
    "BKCS20":	["Fixings", "Concrete Screws - 150mm x M12 / 10.9 Grade Concrete Screw with 50mm x 50mm x 3mm Washer"],
    "BKSD65B":	["Fixings", "Decking Screws - 10G x 65mm Bronze Finish"],
    "BKSD65":	["Fixings", "Decking Screws - 10G x 65mm Stainless Finish"],
    "BKAB32":	["Brad Nails", "32mm 16G Galvanised 20 Degree Angled Brads"],
    "BKSB32":	["Brad Nails", "32mm 16G Galvanised Straight Brads"],
    "BKAB45":	["Brad Nails", "45mm 16G Galvanised 20 Degree Angled Brads"],
    "BKSB45":	["Brad Nails", "45mm 16G Galvanised Straight Brads"],
    "BKBS8":	["Building Seal", "Building Seal - 8mm – 12mm"],
    "BKBS15":	["Building Seal", "Building Seal - 15mm – 22mm"],
    "BKBS25":	["Building Seal", "Building Seal - 25mm – 32mm"],
    "BKBS42":	["Building Seal", "Building Seal - 42mm – 55mm"],
    "BKBS50":	["Building Seal", "Building Seal - 50mm – 70mm"],
    "BKBS75":	["Building Seal", "Building Seal - 75mm – 90mm"],
    "BKBS110":	["Building Seal", "Building Seal - 100mm – 110mm"],
    "SEAL125":	["Building Seal", "Building Seal - 125mm – 135mm"],
    "SEAL150":	["Building Seal", "Building Seal - 150mm – 165mm"],
    "SEAL200":	["Building Seal", "Building Seal - 200mm – 220mm"],
    "BKMPG":	["Marker Paint", "Fluro Marker Paint Green - 400ml"],
    "BKMPO":	["Marker Paint", "Fluro Marker Paint Orange - 400ml"],
    "BKMPP":	["Marker Paint", "Fluro Marker Paint Pink - 400ml"],
    "BKMPR":	["Marker Paint", "Fluro Marker Paint Red - 400ml"]
}


function quantityChanged(code){
    var value = document.getElementById(code).value * priceList[code];
    var currencyString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(value);
    document.getElementById(code + "Price").innerHTML = currencyString;
    
    // Updating quantities on order page
    if(document.getElementById("tableBody") != null) {
        var tempOrder = JSON.parse(sessionStorage.getItem("order"));
        
        if(parseInt(document.getElementById(code).value) == 0){
            delete tempOrder[code];
            sessionStorage.setItem("order", JSON.stringify(tempOrder));
            var table = document.getElementById("table")
            for(var i = 0 ; i < table.rows.length; i++) 
                if(table.rows[i].id == code+"Row"){ table.deleteRow(i); break; }
        }
        else{
            tempOrder[code] = parseInt(document.getElementById(code).value);
            sessionStorage.setItem("order", JSON.stringify(tempOrder));
        }
        updateTotal();
    }
}

function resetQuantity(code){
    var value = priceList[code];
    var currencyString = formatCurrency(value);
    document.getElementById(code + "Price").innerHTML = currencyString;
}

function formatCurrency(value){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(value);
}

function addToOrder(code){
    if(sessionStorage.getItem("order") == null){
        var temp = JSON.parse('{"' + code + '": ' + parseInt(document.getElementById(code).value) + '}');
        sessionStorage.setItem("order", JSON.stringify(temp));
    }
    else{
        var tempOrder = JSON.parse(sessionStorage.getItem("order"));
        if(tempOrder[code] == null) tempOrder[code] = parseInt(document.getElementById(code).value);
        else tempOrder[code] = tempOrder[code] + parseInt(document.getElementById(code).value);
        
        sessionStorage.setItem("order", JSON.stringify(tempOrder));
    }   
    
    document.getElementById(code).value = 0;
    resetQuantity(code);
    showToast();
}

async function showToast(){
    var toast = document.getElementById("toast");
    // Appear
    await new Promise(r => setTimeout(r, 250));
    toast.style.marginBottom = "1em";
    await new Promise(r => setTimeout(r, 1000));

    // Disappear
    var step = 5/100;
    var current = 1;
    for(var i = 0; i < 100; i++){
        toast.style.marginBottom = (current + step) + "em";
        current -= step;
        await new Promise(r => setTimeout(r, 11));
    }
}


function createOrder(){
    if(sessionStorage.getItem("order") == null){
        // Empty Order
        console.log("hi");
        document.getElementById("nextButton").style.visibility = "hidden";
        return;
    }
    var orderData = JSON.parse(sessionStorage.getItem("order"));
    console.log(orderData);
    var codes = Object.keys(orderData);
    console.log("Codes: " + codes);
    var currenCategory = "";
    var orderHtml = document.getElementById("tableBody");

    var runningTotal = 0;

    for(var i = 0; i < codes.length; i++){
        if(orderData[codes[i]] != null){
            console.log("hello");
            var temp = data[codes[i]];
            // Section Heading
            if(currenCategory != temp[0]){
                orderHtml.innerHTML += "<tr><th scope='row' colspan='4'>" + temp[0] + "</th></tr>";
                currenCategory = temp[0];
            }

            // Order Item
            var price = priceList[codes[i]];
            var quantity = orderData[codes[i]];
            orderHtml.innerHTML += "<tr id='" + codes[i] + "Row'><td scope='row'>" + temp[1] + 
                "</td><td class='smallCol'><input id='" + codes[i] + "' class='quantity' type='number' min='0' max='100' placeholder='1' value='" + quantity + "' onchange='quantityChanged(\"" + codes[i] + "\")'></td>" + 
                "<td  class='smallCol' id=\"" + codes[i] + "Price\">" + formatCurrency(price * quantity) + "</td></tr>";
            runningTotal += price * quantity;
        }
    }
    orderHtml.innerHTML += "<tr><th id='total' scope='row' colspan='4'>Total <span style='font-weight: normal; font-style: italic;'>(exc. GST)</span>: " + formatCurrency(runningTotal) + "<br>" +
        "GST: " + formatCurrency(runningTotal * 0.15) + "<br>Total <span style='font-weight: normal; font-style: italic;'>(inc. GST)</span>: " + formatCurrency(runningTotal*1.15) + "</th></tr>";


}

function updateTotal(){
    var runningTotal = 0;
    var quantityElements = document.getElementsByClassName("quantity");
    for(var i = 0; i < quantityElements.length; i++){
        runningTotal += priceList[quantityElements[i].id] * quantityElements[i].value;
    }
    document.getElementById("table").deleteRow(-1);
    document.getElementById("table").insertRow(-1).innerHTML = "<tr><th id='total' scope='row' colspan='4'>Total <span style='font-weight: normal; font-style: italic;'>(exc. GST)</span>: " + formatCurrency(runningTotal) + "<br>" +
    "GST: " + formatCurrency(runningTotal * 0.15) + "<br>Total <span style='font-weight: normal; font-style: italic;'>(inc. GST)</span>: " + formatCurrency(runningTotal*1.15) + "</th></tr>";
}

function deliveryAddressSame(){
    console.log("hello??");
    if(document.getElementById("exampleCheck1").checked){
        document.getElementById("deliveryName").value = document.getElementById("name").value;
        document.getElementById("deliveryAddressLine1").value = document.getElementById("addressLine1").value;
        document.getElementById("deliveryAddressLine2").value = document.getElementById("addressLine2").value;
        document.getElementById("deliveryPostcode").value = document.getElementById("postcode").value;
    }
}

function checkForm(){
    var allIsWell = true;
    var inputs = document.getElementsByClassName("form-control");
    for(var i = 0; i < inputs.length; i++){
        if(inputs[i].value == ""){
            document.getElementById(inputs[i].id + "Feedback").style.display = "inherit";
            allIsWell = false;
        }
    }
    return allIsWell;
}

function submitOrder(){
    if(!checkForm()) return;
    var data = "";
    var tempOrder = JSON.parse(sessionStorage.getItem("order"));
    var keys = Object.keys(tempOrder);
    for(var i = 0; i < keys.length; i++){
        data += tempOrder[keys[i]] + "," + keys[i] + ":";
    }
    data = data.substring(0, data.length-1);

    console.log(data);
    console.log(JSON.stringify({"order": data}));
    
    const Http = new XMLHttpRequest();
    const url='https://southern-building-products.herokuapp.com/submitOrder';
    Http.open("POST", url);
    Http.setRequestHeader('Content-Type', 'application/json');
    Http.send(JSON.stringify({
        "order": data,
        "name": document.getElementById("name").value,
        "email": document.getElementById("email").value,
        "phone": document.getElementById("phone").value,
        "address1": document.getElementById("addressLine1").value,
        "address2": document.getElementById("addressLine2").value,
        "postcode": document.getElementById("postcode").value,
        "deliveryName": document.getElementById("deliveryName").value,
        "deliveryAddress1": document.getElementById("deliveryAddressLine1").value,
        "deliveryAddress2": document.getElementById("deliveryAddressLine2").value,
        "deliveryPostcode": document.getElementById("deliveryPostcode").value
    }));

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
        sessionStorage.removeItem("order");
        window.location.href = "../submit.html";
    }
}