let maxPages;
let pageVal = 1;
let infiniteScroll;
searchForm.addEventListener('submit', (e) => e.preventDefault());

headerTitle.addEventListener('click',  () => location.hash='#home');

searchFormBtn.addEventListener('click', ()=> location.hash=`#search=${searchFormInput.value}`);

trendingBtn.addEventListener('click', ()=>   location.hash='#trends=');

arrowBtn.addEventListener('click', ()=> window.history.back());

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
         window.requestAnimationFrame(smoothscroll);
         window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};

function navigator() {
    console.log({ location });

    if(infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false});
        infiniteScroll = undefined;
    }

    location.hash.startsWith('#trends')
    ? trendPage()       :
    location.hash.startsWith('#search=')
    ? searchPage()      :
    location.hash.startsWith('#movie=')
    ? movieDetailPage() :
    location.hash.startsWith('#category=') 
    ? categoriesPage()  :
    homePage();

    smoothscroll();

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}

const homePage = () => {
    console.log('Home');
    /* console.log(lang); */

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    genericSection.innerHTML = "";
    movieDetailSection.classList.add('inactive');

    getMovies('trending/movie/day', trendingMoviesPreviewList);
    getCategoriesPreview();
    getLikedMovies();
}

const categoriesPage = () => {
    console.log('Categories');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#category', 'id-name']
    const [categoryUrl, categoryInfo] = location.hash.split('='); 
    const [idCat, nameCat] = categoryInfo.split('-');

    var encodedString = nameCat;
    var decodedString = decodeURIComponent(encodedString);

    headerCategoryTitle.innerHTML = decodedString;

    getMovies('discover/movie', genericSection, idCat);
    headerCategoryTitle.style.marginTop =  "40px"
    infiniteScroll = getPaginatedCategoriesMovies('discover/movie', genericSection, idCat);
}

const movieDetailPage = () => {
    console.log('MovieDetail');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#movie', 'id']
    const [_, movieId] = location.hash.split('='); 
    getMovieById(movieId);
}

const searchPage = () => {
    console.log('Search');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search', 'userSearch']
    const [searchHash, searchQuery] = location.hash.split('='); 
    const decodedQuery = decodeURI(searchQuery);
    getMovies('search/movie', genericSection, null, decodedQuery);
    infiniteScroll = getPaginatedSearchingMovies('search/movie', genericSection, decodedQuery);
}

const trendPage = () => {
    console.log('Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.remove('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';
    headerCategoryTitle.style.top = '67%';
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    getMovies('trending/movie/day', genericSection, null, null);
    infiniteScroll = getPaginatedTrendingMovies;
}