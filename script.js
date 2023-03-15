const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let  photosArr = [];


function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArr.length;
	photosArr.forEach(photo => {
		const item = document.createElement('a');
		item.setAttribute('href', photo.links.html);
		item.setAttribute('target', '_blank');
		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt', photo.alt_description);
		img.setAttribute('title', photo.alt_description);
		img.addEventListener('load',imageLoaded);
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

const count = 10;
const apikey = 'MlLSVyn4KVud5uFfPYHrjnZ08HuXK5MVTtzQCcnqKCg';
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
async function getPhotos() {
	try {
		const response = await fetch(apiurl);
		photosArr = await response.json();
		// console.log(photosArr);
		displayPhotos()
	} catch (error) {

	}
}
window.addEventListener('scroll', ()=> {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
})
getPhotos();
