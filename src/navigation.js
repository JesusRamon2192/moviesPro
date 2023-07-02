window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if(location.hash.startsWith('#trends')){
        trendPage();
    }  else if (location.hash.startsWith('#search=')) {
        searchPage();
    }  else if (location.hash.startsWith('#movieDetail=')) {
        movieDetailPage()
    }  else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    }  else {
        homePage();
    }
}

const homePage = () => {
    console.log('Home');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

const categoriesPage = () => {
    console.log('Categories');
}

const movieDetailPage = () => {
    console.log('MovieDetail');
}

const searchPage = () => {
    console.log('Search');
}

const trendPage = () => {
    console.log('Trends');
}