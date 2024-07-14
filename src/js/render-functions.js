export function createPhotoCard(arr) {
     return arr
       .map(
         ({
           webformatURL,
           largeImageURL,
           tags,
           likes,
           views,
           comments,
           downloads,
         }) => `
       <li class="gallery-item">
         <a class="gallery-link" href="${largeImageURL}" onclick="event.preventDefault()">
           <img
             class="gallery-image"
             src="${webformatURL}"
             alt="${tags}"
             width="360"
             height="200"
           />
           <ul class="gallery-info">
             <li  class="gallery-item-text">
             <h3 class="gallery-subtitle">Likes</h3>
             <p class ="gallery-text">${likes}</p></li>
 
             <li class="gallery-item-text">
             <h3 class="gallery-subtitle">Views</h3>
             <p class ="gallery-text">${views}</p></li>
 
             <li class="gallery-item-text">
             <h3 class="gallery-subtitle">Comments</h3>
             <p class ="gallery-text">${comments}</p></li>
 
             <li  class="gallery-item-text">
             <h3 class="gallery-subtitle">Downloads</h3>
             <p class ="gallery-text">${downloads}</p></li>
 
           </ul>
         </a>
       </li>`
       )
       .join('');
   }

   function renderImages(gallery, images) {
    const markup = createPhotoCard(images);
    gallery.insertAdjacentHTML("beforeend", markup);
  }
  
  function clearGallery(gallery) {
    gallery.innerHTML = '';
  }
  
  export { renderImages, clearGallery };