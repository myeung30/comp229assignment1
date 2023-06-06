/*
File name:
Student's name: Man Chun Yeung
StudentID: 301251548
Date: 28 May 2023
*/

const categorySelect = document.getElementById("category");
const getButton = document.getElementById("get-button");
const gallery = document.querySelector(".gallery");
const API_URL = "https://api.thecatapi.com/";
const API_KEY = "live_99CzXaB1Snc6FimZSHDvPDMtP632KyrAejlVsYSjn6SCpuj4aMIfXkdWI6o2uCK3";
const getFavourites = document.getElementById("get-favourites");

// load the categories selection
window.addEventListener("load", getCategories);
// get the feedback from API when get picture button click
getButton.addEventListener("click",fetchCat);
// add and show favorite when Show favorite button click
getFavourites.addEventListener("click",fetchFavCat);

//get the list of categories from API
async function getCategories(){
  try{
    const response = await fetch(API_URL + "/v1/categories?api_key=" + API_KEY);
    const categories = await response.json();  
    for (let i = 0; i < categories.length; i++){
    const categoriesOption = document.createElement("option");
      categoriesOption.value = categories[i].id;
      categoriesOption.textContent = categories[i].name;
      categorySelect.appendChild(categoriesOption);
      }
    }
catch (error) {
  console.error(error);
}
}

//Clear all the image display
function clearDisplay(){
  while(gallery.firstElementChild != null){
    gallery.removeChild(gallery.firstChild);
    }
}

//display the image using APIData as parameter
function displayImage(APIData, imageSrc){
  for ( let i = 0; i < APIData.length ; i ++){
    const catDivElement = document.createElement("div");
    catDivElement.className = "gallery-item";
    catDivElement.id = APIData[i].id;
    gallery.appendChild(catDivElement)
    const catImageElement = document.createElement("img");
    if(imageSrc == "favourite"){
      catImageElement.src = APIData[i].image.url;
      catDivElement.className = "gallery-item showheart";
    }else{
      catImageElement.src = APIData[i].url
    }                                                              
    catDivElement.appendChild(catImageElement);
    //bonus, add heart
    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.innerHTML = "&#x2764;";
    catDivElement.appendChild(heart);
    // add favourite to API or delete favourite from API
    catDivElement.addEventListener("click",editFavourite)
  } 
}

// get API categoies data and display image
async function fetchCat() {
  try {
    const response = await fetch(API_URL + "/v1/images/search?limit=9&api_key=" + API_KEY + "&category_ids=" + categorySelect.value);
    const data = await response.json();
    clearDisplay();
    displayImage(data,"categories");
  } catch (error) {
    console.error(error);
  }
}

// add favourite to API or delete favourite from API
async function editFavourite(e) {
  //if heart is showed, it should be inside the favourite API, so delete from favourite when click
  const currentID = e.currentTarget.id;
  if(e.currentTarget.className == "gallery-item showheart"){
    e.currentTarget.className = "gallery-item";
      const delFavourite = await fetch(API_URL + "/v1/favourites/" + currentID, 
          {
              method: 'DELETE',
              headers: { 
                "content-type": "application/json",
                'x-api-key': API_KEY} ,
          }
      )
  }else{
    //if heart is not showed, post into favourite when click
    e.currentTarget.classList.toggle("showheart");
    //check if favourite api contain this image
    try {
      const response = await fetch(API_URL + "/v1/favourites?limit=9&api_key=" + API_KEY,{
            headers:{
                "content-type":"application/json",
                'x-api-key': API_KEY
            }
        });
      const favourites = await response.json();
      let unMatchFav = 0;
      for (let i = 0; i < favourites.length ; i++){
        if(favourites[i].id != currentID){
          unMatchFav ++;
        }
      }
      //if image not in favourite, then post new favourite into api
      if (unMatchFav == favourites.length){
        var rawBody = JSON.stringify({ 
              "image_id": currentID
              });
              const newFavourite = await fetch(
                API_URL + "/v1/favourites", 
                  {
                      method: 'POST',
                      headers: { 
                        "content-type": "application/json",
                        'x-api-key': API_KEY} ,
                      body: rawBody
                  }
              );
      }
    } catch (error) {
      console.error(error);
    }
  }
}  

// get API favourite data and display image
async function fetchFavCat() {
  try {
    const response = await fetch(
      API_URL + '/v1/favourites?limit=9&api_key=' + API_KEY,{
          headers:{
              "content-type":"application/json",
              'x-api-key': API_KEY
          }
      });
    const favourites = await response.json();
    clearDisplay();
    displayImage(favourites,"favourite");
  } catch (error) {
    console.error(error);
  }
}
