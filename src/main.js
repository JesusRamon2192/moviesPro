const api = axios.create({
    baseURL: 'http://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'es'
    }
});

// Utils

const createFunction = (e) => document.createElement(e);

async function getMovies(endpoint, section, id, searchQuery){
    const { data } = await api(endpoint, {
        params: {
            with_genres: id,
            query: searchQuery
        }
    });
    const movies = data.results;
    section.innerHTML = "";

    movies.forEach(movie=> {
        const movieContainer = createFunction('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        })

        const movieImg = createFunction('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        section.appendChild(movieContainer);
    })
}

function createCategories(categories, container){
    container.innerHTML = "";
    
    categories.forEach(category => {
        const categoryContainer = createFunction('div');
        categoryContainer.classList.add('category-container'); 

        const categoryTitle = createFunction('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' +category.id);
        categoryTitle.addEventListener('click', ()=> {
            location.hash = `#category=${category.id}-${category.name}`; 
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// Llamados a la API

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');

    const categories = data.genres;
    console.log('Categories');
    console.log( {data, categories});
    
    //categoriesPreviewList.innerHTML = "";
    
    createCategories(categories, categoriesPreviewList);
}

async function getMovieById(id) {
    const { data: movie } = await api('/movie/' + id);
    console.log("MovieDetail",movie);

    const movieUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log("MovieUrl", movieUrl);
    headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%),
        url(${movieUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
}