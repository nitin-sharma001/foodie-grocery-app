
var data = localStorage.getItem("data");
var storedData = JSON.parse(data);
console.log(storedData);
var imgURl ="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";


function fetchData(){
    var card = "";

    storedData.forEach((elem, index)=> {
        card += `<div class="card">
                    <div class="img">
                        <img src="${imgURl + elem.info.cloudinaryImageId}" alt="">
                    </div>
                    <p>${elem.info.name}</p>
                    <div class="rating">
                    <div class="star">
                        <i class="ri-star-s-fill"></i>
                    </div>
                    <div class="rate">${elem.info.avgRatingString}</div></div>
                    <div class="time">${elem.info.sla.slaString}</div>
                    <div class="price">₹${elem.info.costForTwo.substr(1, 4)}</div>

                    <div data-index="${index}" class="del">
                        <i data-index="${index}" class="del ri-delete-bin-line"></i>
                    </div>
                </div>`;
    });

    document.querySelector(".allCards").innerHTML = card;
}

function delItem(){
    let items = document.querySelector('.allCards' );
    items.addEventListener("click", (e) => {
        if(e.target.classList.contains("del")){
            // console.log(storedData[e.target.dataset.index])

            storedData.splice(e.target.dataset.index, 1);
            
            fetchData();
            totalAmount();
        }
    })


}

function totalAmount(){
    let sum = 0;
    storedData.forEach((elem) => {
        sum += parseInt(elem.info.costForTwo.substr(1, 4));
    })
document.querySelector(".total").textContent = sum;
document.querySelector(".item").textContent = storedData.length;

}


fetchData();
totalAmount();
delItem();