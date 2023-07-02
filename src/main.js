const api = axios.create({
    baseURL: 'http://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json:charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'es'
    }
})


async function getTrendingMoviesPreview() {
    const res = await fetch('http://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();


    const movies = data.results;
    console.log('Movies');
    console.log( {data, movies});
    
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    
    movies.forEach(movie => {


        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');


        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}


async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');


    const categories = data.genres;
    console.log('Categories');
    console.log( {data, categories});
    
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    
    categories.forEach(category => {


        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container'); 


        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' +category.id);
        const categoryTitleText = document.createTextNode(category.name);


        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer);
    });
}
getTrendingMoviesPreview();
getCategoriesPreview();


console.log('API_URL = https://lkjaslkdfns.com/asokjdlkjnf?' + API_KEY);
