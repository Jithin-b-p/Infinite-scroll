// unspash API
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY


const count = 10;
const apiKey = "";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  }catch(error) {
    console.log(error);
  }
}

// onload
getPhotos();