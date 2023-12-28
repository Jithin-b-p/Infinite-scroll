// unspash API
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

let imageCount = 5;
const apiKey = "2gtFQb4wpaL4EZgRzmscfbQj8kV-oaGbmDVqoxKkQjE";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 30;

let data = [];

// check if image is loaded
function imageLoad() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    ready = true;
    // showing loader.
    loader.hidden = true;
    imageCount = 30;

  }
}

// helper function to set attributes.
function setAttributes(element, attributes) {
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
}

// create elements for links and photos, add to DOM.
function displayPhotos() {
  imageLoaded = 0;
  totalImages = data.length;

  // Run function for each object in photoArray.
  data.forEach((photo) => {
    // create <a> to link to unsplash.
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    imageLoad();

    // put <img> inside <a>, the put both inside image container.
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// get photos from unsplash API
async function getPhotos() {
  try {
    // fetching API.
    const response = await fetch(apiURL);
    data = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// check to see if scrolling near bottom of page, Load more photos.
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// onload
getPhotos();
