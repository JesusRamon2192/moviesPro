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

const lazyLoader = new IntersectionObserver((entries)=> {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            //console.log(entry);
            entry.target.setAttribute('src', url);
        }
    });
});

const createFunction = (e) => document.createElement(e);
const bntLoadMore = createFunction('button');

async function getMovies(endpoint, section, id, searchQuery){
    const { data } = await api(endpoint, {
        params: {
            with_genres: id,
            query: searchQuery
        }
    });
    maxPages = data.total_pages;
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
        movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        movieImg.addEventListener('error', ()=> {
            movieImg.setAttribute('src', `https://as01.epimg.net/meristation/imagenes/2021/04/26/reportajes/1619438192_264857_1619438392_sumario_normal.jpg`);
        });
        
        movieContainer.appendChild(movieImg);
        section.appendChild(movieContainer);
        lazyLoader.observe(movieImg);
    });
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

async function getPaginatedTrendingMovies() {
    var { scrollTop, clientHeight, scrollHeight} = document.documentElement;

    var scrollBottomIs = (scrollTop + clientHeight) >= (scrollHeight - 15);
    
    const pageIsNotMax = pageVal < maxPages;
    if (scrollBottomIs && pageIsNotMax) {
        pageVal++;
        const { data } = await api('trending/movie/day', {
            params: {
                page: pageVal
            }
        });

        const movies = data.results;
    
        movies.forEach(movie=> {
            const movieContainer = createFunction('div');
            movieContainer.classList.add('movie-container');
            movieContainer.addEventListener('click', () => {
                location.hash = `#movie=${movie.id}`;
            })
    
            const movieImg = createFunction('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.title);
            movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
            movieImg.addEventListener('error', ()=> {
                movieImg.setAttribute('src', `https://as01.epimg.net/meristation/imagenes/2021/04/26/reportajes/1619438192_264857_1619438392_sumario_normal.jpg`);
            });
            
            movieContainer.appendChild(movieImg);
            genericSection.appendChild(movieContainer);
            lazyLoader.observe(movieImg);
        })
    }
}

// En esta funcion se realiza un closure que es una funcion que llama a otra funcion pero no se ejecuta de manera inmediata y se le pueden pasar parametros
function getPaginatedCategoriesMovies(endpoint, section, idCat) {
    return async function () {
        const { scrollTop, clientHeight, scrollHeight} = document.documentElement;

        const scrollBottomIs = (scrollTop + clientHeight) >= (scrollHeight - 15)

        if (scrollBottomIs) {
            pageVal++;
            const { data } = await api(endpoint, {
                params: {
                    page: pageVal,
                    with_genres: idCat
                }
            });
            console.log({data});
            const movies = data.results;
        
            movies.forEach(movie=> {
                const movieContainer = createFunction('div');
                movieContainer.classList.add('movie-container');
                movieContainer.addEventListener('click', () => {
                    location.hash = `#movie=${movie.id}`;
                })
        
                const movieImg = createFunction('img');
                movieImg.classList.add('movie-img');
                movieImg.setAttribute('alt', movie.title);
                movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
                movieImg.addEventListener('error', ()=> {
                    movieImg.setAttribute('src', `https://as01.epimg.net/meristation/imagenes/2021/04/26/reportajes/1619438192_264857_1619438392_sumario_normal.jpg`);
                });
                
                movieContainer.appendChild(movieImg);
                section.appendChild(movieContainer);
                lazyLoader.observe(movieImg);
            })
        }
    }
}

function getPaginatedSearchingMovies(endpoint, section, decodedQuery) {
    return async function () {
        var { scrollTop, clientHeight, scrollHeight} = document.documentElement;

        var scrollBottomIs = (scrollTop + clientHeight) >= (scrollHeight - 15)
 
        if (scrollBottomIs) {
            pageVal++;
            const { data } = await api(endpoint, {
                params: {
                    page: pageVal,
                    query: decodedQuery
                }
            });

            console.log({data});

            const movies = data.results;
        
            movies.forEach(movie=> {
                const movieContainer = createFunction('div');
                movieContainer.classList.add('movie-container');
                movieContainer.addEventListener('click', () => {
                    location.hash = `#movie=${movie.id}`;
                })
        
                const movieImg = createFunction('img');
                movieImg.classList.add('movie-img');
                movieImg.setAttribute('alt', movie.title);
                movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
                movieImg.addEventListener('error', ()=> {
                    movieImg.setAttribute('src', `https://as01.epimg.net/meristation/imagenes/2021/04/26/reportajes/1619438192_264857_1619438392_sumario_normal.jpg`);
                });
                
                movieContainer.appendChild(movieImg);
                section.appendChild(movieContainer);
                lazyLoader.observe(movieImg);
            })
        }
    }
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');

    const categories = data.genres;
    console.log('Categories');
    //console.log( {data, categories});
        
    createCategories(categories, categoriesPreviewList);
}

async function getMovieById(id) {
    genericSection.innerHTML ="";
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
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/similar`);
    console.log("RelatedMovies",data);

    relatedMoviesCategoriesList.innerHTML = "";
    data.results.forEach(movie=> {
        const movieContainer = createFunction('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        })

        const movieImg = createFunction('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        relatedMoviesCategoriesList.appendChild(movieContainer);
        relatedMoviesCategoriesList.scrollTo(0,0);
        lazyLoader.observe(movieImg);
    })
}