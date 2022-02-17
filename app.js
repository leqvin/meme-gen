// Global Variables


document.addEventListener('DOMContentLoaded', mainSearch);


function mainSearch(){
    let memeList = []
    let resultList = []
    document.getElementById('searchBtn').addEventListener('click', function(event){
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then((data) =>{memeList = data.data.memes;
            let searchVal = document.getElementById('searchInput').value.toLowerCase();
            resultList = memeList.filter(word => word.name.includes(capFirstLetter(searchVal)));
            resultCard(resultList);
        });
        event.preventDefault();
    })
  }


function capFirstLetter(words) {
    var separateWord = words.split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }


function resultCard(arr){
    let resultEl = document.getElementById("resultCard");
    // "Meme Not Found" if array is empty
    if (arr.length === 0){
        clearChildElements(resultEl)
        createNotFoundCard(resultEl)
    } else {
        buildCarousel(resultEl, arr)
    }
}

function buildCarousel(resultEl, arr){
    // Build the carousel, only need one of these per carousel
    let carouselInnerEl = document.createElement("div");
    let carouselIndicatorsEl = document.createElement("div");
    let carouselEl = document.createElement("div");

    carouselInnerEl.setAttribute("class", "carousel-inner justify-content-center");
    carouselIndicatorsEl.setAttribute("class", "carousel-indicators")
    carouselEl.setAttribute("class", "carousel slide col-5")
    carouselEl.setAttribute("id", "carouselExampleCaptions")
    carouselEl.setAttribute("data-bs-ride", "carousel")

    // Next/Previous Buttons
    let prevBtnHidden = document.createElement("span");
    let prevBtnIcon = document.createElement("span");
    let prevBtnEl = document.createElement("button");

    prevBtnHidden.innerText = "Previous"
    prevBtnHidden.setAttribute("class","visually-hidden");
    prevBtnIcon.setAttribute("class","carousel-control-prev-icon");
    prevBtnEl.setAttribute("type","button");
    prevBtnEl.setAttribute("class","carousel-control-prev");
    prevBtnEl.setAttribute("data-bs-target","#carouselExampleCaptions");
    prevBtnEl.setAttribute("data-bs-slide","prev");

    prevBtnEl.append(prevBtnIcon);
    prevBtnEl.append(prevBtnHidden);

    let nextBtnHidden = document.createElement("span");
    let nextBtnIcon = document.createElement("span");
    let nextBtnEl = document.createElement("button");

    nextBtnHidden.innerText = "Next"
    nextBtnHidden.setAttribute("class","visually-hidden");
    nextBtnIcon.setAttribute("class","carousel-control-next-icon");
    nextBtnEl.setAttribute("type","button");
    nextBtnEl.setAttribute("class","carousel-control-next");
    nextBtnEl.setAttribute("data-bs-target","#carouselExampleCaptions");
    nextBtnEl.setAttribute("data-bs-slide","next");

    nextBtnEl.append(nextBtnIcon);
    nextBtnEl.append(nextBtnHidden);

    // One of these elements per meme result
    for (let i = 0; i < arr.length; i++){
        let carouselDescEl = document.createElement("p");
        let carouselTitleEl = document.createElement("h5");
        let carouselCaptionEl = document.createElement("div");
        let carouselImgDiv = document.createElement("div");
        let carouselImgEl = document.createElement("img");
        let carouselItemEl = document.createElement("div");
        let carouselIndicatorButtons = document.createElement("button");
        // BS carousel needs at least 1 carousel item with active class, just 1!!!
        if (i===0){
            carouselItemEl.setAttribute("class", "carousel-item active");
            carouselIndicatorButtons.setAttribute("class", "active");
            carouselIndicatorButtons.setAttribute("data-bs-target", "#carouselExampleCaptions");
            carouselIndicatorButtons.setAttribute("data-bs-slide-to", i);
        } 
        else {
            carouselItemEl.setAttribute("class", "carousel-item");
            carouselIndicatorButtons.setAttribute("data-bs-target", "#carouselExampleCaptions");
            carouselIndicatorButtons.setAttribute("data-bs-slide-to", i);
        }
        carouselDescEl.innerText = `The ID is ${arr[i].id}`;
        carouselTitleEl.innerText = arr[i].name;
        carouselCaptionEl.setAttribute("class", "carousel-caption d-none d-md-block");
        carouselImgEl.setAttribute("src", arr[i].url);
        carouselImgEl.setAttribute("class", "img-fluid .d-block");
        carouselImgDiv.setAttribute("class", "d-flex justify-content-center w-60 h-80");
        
        
        // Let the appending begin
        carouselCaptionEl.append(carouselTitleEl);
        carouselCaptionEl.append(carouselDescEl)
        carouselImgDiv.append(carouselImgEl)
        carouselItemEl.append(carouselImgDiv)
        carouselItemEl.append(carouselCaptionEl)
        carouselInnerEl.append(carouselItemEl)
        carouselIndicatorsEl.append(carouselIndicatorButtons)
        
        //console.log(carouselInnerEl)     
        //console.log(arr[i].url)
    }
    carouselEl.append(carouselIndicatorsEl)
    carouselEl.append(carouselInnerEl)
    carouselEl.append(prevBtnEl)
    carouselEl.append(nextBtnEl)
    console.log(carouselEl) 

    clearChildElements(resultEl);
    resultEl.append(carouselEl);
    //console.log(arr)
}

function clearChildElements(parentEl){
    while(parentEl.firstChild){
        parentEl.removeChild(parentEl.firstChild);
    }
}

function createNotFoundCard(resultEl){
    let notFoundEl = document.createElement("h4");
    notFoundEl.setAttribute("class", "display-4 title-pad text-center");
    notFoundEl.innerText = "Meme Not Found!";
    resultEl.append(notFoundEl);
}




