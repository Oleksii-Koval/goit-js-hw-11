export function createMarkup(response) {
  return response.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  <div class="photo-card">
     <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" class="card-img" loading="lazy"/>
        </a>
    <div class="info">
      <p class="info-item">
        <b>${likes} Likes</b>
      </p>
      <p class="info-item">
        <b>${views} Views</b>
      </p>
      <p class="info-item">
        <b>${comments} Comments</b>
      </p>
      <p class="info-item">
        <b>${downloads} Downloads</b>
      </p>
    </div>
  </div>
  `).join('');
}


