import axios from "axios";

export function fetchPhotos(searchValue, page) { 
     return axios.get( 'https://pixabay.com/api/',{
         params: {
             key: "40355280-0db4916c92281ec1c35713201",
             q: searchValue,
             image_type: 'photo',
             orientation: 'horizontal',
             safesearch: 'true',
             page: page,
             per_page: '40',
         }
     })
         .then(resp => {
             return resp;
         });
}