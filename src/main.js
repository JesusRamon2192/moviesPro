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


const createFunction = (e) => document.createElement(e);


async function getMovies(endpoint, section, id){
    const { data } = await api(endpoint, {
        params: {
            with_genres: id
        }
    });
    const movies = data.results;


    section.innerHTML = "";


    movies.forEach(movie=> {
        const movieContainer = createFunction('div');
        movieContainer.classList.add('movie-container');


        const movieImg = createFunction('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        section.appendChild(movieContainer);
    })
}




async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');


    const categories = data.genres;
    console.log('Categories');
    console.log( {data, categories});
    
    categoriesPreviewList.innerHTML = "";
    
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
        categoriesPreviewList.appendChild(categoryContainer);
    });
}
