// so basically task is
// Task 1.showing all country
// Task 2.selecting country img..through the flag api like ind
// Task 3.converting the amount....

let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

let dropDowns = document.querySelectorAll(".dropDown select");
let btn = document.getElementById("showConvert");

let fromcurr =document.querySelector(".from select");
let tocurr =document.querySelector(".to select");

let msg =document.querySelector(".msg");

//showing all country Target......

for (let select of dropDowns) {
    console.log(select);
    for (const Currcode in countryList) {
        // console.log(code+"   "+ countryList[code])
        let newoption = document.createElement("option");

        if (select.name === "from" && Currcode === "USD") {
            newoption.selected = "selected"
        }
        if (select.name === "to" && Currcode === "INR") {
            newoption.selected = "selected"
        }


        newoption.innerText = Currcode;
        newoption.value = Currcode;
        select.append(newoption);


    }

    select.addEventListener("change", (event) => {
        // console.log(event.target);
        updateFlag(event.target);
    })
}

let updateFlag = (select) => {
    let Currcode = select.value;

    let country = countryList[Currcode];

    let src = `https://flagsapi.com/${country}/flat/64.png`;

    let img = select.parentElement.querySelector('img');
    img.src = src;
}

btn.addEventListener("click", async(event) => {
    event.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    console.log("value is " + amtval);

    if (amtval === "" || amtval<0) {     
        amtval=1;
        amt.value="1";
    }

    let url =`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response =await fetch(url);
    let data = await response.json();

    console.log("data is",data);

    let rate = await data[tocurr.value.toLowerCase()];
    console.log("rate",rate);

    let finalrate =amtval*rate;
    console.log("final rate is"+finalrate);

    // 1 usd to inr is value...
   msg.innerHTML=`${amtval} ${fromcurr.value} = ${tocurr.value} ${finalrate}`;

})