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
            resultList = memeList.filter(word => word.name.includes(capitalizeFirstLetter(searchVal)))
            console.log(resultList)
            resultCard(resultList)
        });
        event.preventDefault();
    })
  }

function capitalizeFirstLetter(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}

function resultCard(arr){
    console.log(arr)
}




