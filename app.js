// Global Variables


document.addEventListener('DOMContentLoaded', mainSearch);

// {
//     "success": true,
//     "data": {
//         "memes": [
//             {
//                 "id": "61579",
//                 "name": "One Does Not Simply",
//                 "url": "https://i.imgflip.com/1bij.jpg",
//                 "width": 568,
//                 "height": 335,
//                 "box_count": 2
//             },
//         ]
//     }
// }

function mainSearch(){
    let memeList = []
    let resultList = []
    fetch('https://api.imgflip.com/get_memes')
    .then(response => response.json())
    .then((data) =>{memeList = data.data.memes;})

    document.getElementById('searchBtn').addEventListener('click', function(event){
        let searchVal = document.getElementById('searchInput').value.toLowerCase();
        resultList = memeList.filter(word => word.name.includes(capFirstLetter(searchVal)));
        resultCard(resultList);
        event.preventDefault();
    })
  }


function capFirstLetter(words) {
    var separateWord = words.split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }


function resultCard(memeList){
    let resultEl = document.getElementById("resultCard");
    // "Meme Not Found" if array is empty
    if (memeList.length === 0){
        clearChildElements(resultEl)
        createNotFoundCard(resultEl)
    } else {
        buildCarousel(resultEl, memeList)
    }
}

function buildCarousel(resultEl, arr){
    // Build the carousel, only need one of these per carousel
    let carouselInnerEl = document.createElement("div");
    let carouselIndicatorsEl = document.createElement("div");
    let carouselEl = document.createElement("div");

    carouselInnerEl.setAttribute("class", "carousel-inner justify-content-center");
    carouselIndicatorsEl.setAttribute("class", "carousel-indicators")
    carouselEl.setAttribute("class", "carousel slide col-5 fade-in")
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
        let carouselDescEl = document.createElement("button");
        let carouselTitleEl = document.createElement("h5");
        let carouselCaptionEl = document.createElement("div");
        let carouselImgDiv = document.createElement("div");
        let carouselImgEl = document.createElement("img");
        let carouselItemEl = document.createElement("div");
        let carouselIndicatorButtons = document.createElement("button");
        // BS carousel needs at least 1 carousel item with active class, just 1!!!
        if (i===0){
            carouselItemEl.setAttribute("class", "carousel-item active border");
            carouselIndicatorButtons.setAttribute("class", "active");
            carouselIndicatorButtons.setAttribute("data-bs-target", "#carouselExampleCaptions");
            carouselIndicatorButtons.setAttribute("data-bs-slide-to", i);
        } 
        else {
            carouselItemEl.setAttribute("class", "carousel-item border");
            carouselIndicatorButtons.setAttribute("data-bs-target", "#carouselExampleCaptions");
            carouselIndicatorButtons.setAttribute("data-bs-slide-to", i);
        }
        carouselDescEl.setAttribute("class", "btn btn-outline-dark rounded-pill");
        carouselDescEl.setAttribute("id", "createMemeBtn");
        carouselDescEl.innerText = `USE MEME`; //${arr[i].id}
        carouselDescEl.addEventListener("click", function() {
            createMemeBtnFcn(resultEl, arr[i]);
          });


        carouselTitleEl.innerText = arr[i].name;
        carouselTitleEl.setAttribute("id", "cardTitleText")

        carouselCaptionEl.setAttribute("class", "carousel-caption d-none d-md-block");
        carouselImgEl.setAttribute("src", arr[i].url);
        carouselImgEl.setAttribute("class", "img-fluid .d-block");
        carouselImgDiv.setAttribute("class", "d-flex justify-content-center w-55 h-80");
        
        // Let the appending begin
        carouselCaptionEl.append(carouselTitleEl);
        carouselCaptionEl.append(carouselDescEl)
        carouselImgDiv.append(carouselImgEl)
        carouselItemEl.append(carouselImgDiv)
        carouselItemEl.append(carouselCaptionEl)
        carouselInnerEl.append(carouselItemEl)
        carouselIndicatorsEl.append(carouselIndicatorButtons)
        

    }
    carouselEl.append(carouselIndicatorsEl)
    carouselEl.append(carouselInnerEl)
    carouselEl.append(prevBtnEl)
    carouselEl.append(nextBtnEl)


    clearChildElements(resultEl);
    resultEl.append(carouselEl);

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



// box_count: 2
// height: 438
// id: "188390779"
// name: "Woman Yelling At Cat"
// url: "https://i.imgflip.com/345v97.jpg"
// width: 680

function createMemeBtnFcn(resultEl, meme){


    // Wipe it clean
    clearChildElements(resultEl);

    // Left Side Statics
    let memeImgEl = document.createElement("img");
    let memeImgDiv = document.createElement("div");
    memeImgEl.setAttribute("class","img-fluid");
    memeImgEl.setAttribute("src", meme.url);
    memeImgDiv.setAttribute("class", "col-4 justify-content-center gen-meme fade-in");
    memeImgDiv.append(memeImgEl);
    resultEl.append(memeImgDiv);

    // Right Side, Statics
    let genMemeRightCol = document.createElement("div");
    let genMemeTitleEl = document.createElement("div");
    let genMemeBtnEl = document.createElement("button");
    let genMemeBtnRow = document.createElement("div");
    genMemeTitleEl.setAttribute("class","row justify-content-center text-center fs-4 bottom-pad");
    genMemeTitleEl.innerText = "Enter Your Words of Wisdom"
    genMemeBtnEl.setAttribute("class", "btn btn-outline-dark rounded-pill")
    genMemeBtnEl.setAttribute("id", "generateMemeBtn")
    genMemeBtnEl.innerText = "Make My Meme"
    genMemeBtnRow.setAttribute("class","row input-group input-group-lg justify-content-center")
    genMemeRightCol.setAttribute("class","col-4 justify-content-center fade-in")

    genMemeRightCol.append(genMemeTitleEl);
    // Right Side, Text Boxes, Meme Dependent
    for(let i=0; i < meme.box_count; i++){
        let textBoxEl = document.createElement("input");
        let textBoxRow = document.createElement("div");
        textBoxEl.setAttribute("type","text");
        textBoxEl.setAttribute("class","form-control rounded-pill");
        textBoxEl.setAttribute("id","textBox_"+i);
        textBoxRow.setAttribute("class","row input-group input-group-lg mb-3 justify-content-center")

        textBoxRow.append(textBoxEl);
        genMemeRightCol.append(textBoxRow);
    }
    genMemeBtnRow.append(genMemeBtnEl);
    genMemeRightCol.append(genMemeBtnRow);
    resultEl.append(genMemeRightCol);
    // Appending Action

    createNewMeme(meme, memeImgDiv);
}

function createNewMeme(meme, memeImgDiv){
    let genMemeBtn = document.getElementById("generateMemeBtn");
    let postURL = 'https://fast-everglades-77638.herokuapp.com/https://api.imgflip.com/caption_image';
    
    genMemeBtn.addEventListener("click", function() {
        let formData = new FormData();
        formData.append("template_id", meme.id);
        formData.append("username", "toheneb279");
        formData.append("password", "toheneb279");
        for(let i=0; i<meme.box_count;i++){
            if(document.getElementById("textBox_"+i) !==null){
                formData.append(`boxes[${i}][text]`, document.getElementById("textBox_"+i).value)
            }
        }
    
        var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
        };

        fetch(postURL, requestOptions)
            .then(response => response.json())
            .then(result => newMemeReturn(result.data.url,memeImgDiv))
            .catch(error => console.log('error', error));
    });
}

function newMemeReturn(imgURL, memeImgDiv){
    clearChildElements(memeImgDiv);
    let newMemeAnchor = document.createElement("a");
    let newMemeEl = document.createElement("img");
    newMemeAnchor.setAttribute("href",imgURL);
    newMemeAnchor.setAttribute("target","_blank");
    newMemeAnchor.setAttribute("rel","noreferrer noopener");
    newMemeEl.setAttribute("class","img-fluid fade-in");
    newMemeEl.setAttribute("src", imgURL);
    newMemeAnchor.append(newMemeEl)
    memeImgDiv.append(newMemeAnchor)
    //console.log(imgURL)
}


