const Base = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const btn = document.querySelector("#btn");
const drop = document.querySelectorAll(".converter select");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg p");

for(let select of drop){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    
    select.addEventListener("change" , (evt) => {
        let tar = evt.target ; 
        let currCode = tar.value;
        let country = countryList[currCode];
        let newSrc = `https://flagsapi.com/${country}/flat/64.png`;
        let img = tar.parentElement.querySelector("img");
        img.src=newSrc; 
    });
}

const updateExchangeRate = async () => {
    let input = document.querySelector(".in input");
    let amt = input.value;
    let fromCurr = from.value;
    let toCurr = to.value;
    if(amt === "" || amt < 1){
        amt = 1;
        amt.value = "1";
    }
    let fromLow = fromCurr.toLowerCase();
    let toLow = toCurr.toLowerCase();
    const URL = `${Base}/${fromLow}.min.json`;
    let fun = await fetch(URL);
    let data = await fun.json();
    let tooo = data[fromLow][toLow];
    let final = amt*tooo;
    console.log(final);
    msg.innerHTML = `${amt} <b>${fromCurr}</b> = ${final.toFixed(3)} <b>${toCurr}</b>`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});



