const querySel = (e) => document.querySelector(e);

// Sections
const headerSection = querySel('#header');
const trendingPreviewSection = querySel('#trendingPreview');
const categoriesPreviewSection = querySel('#categoriesPreview');
const genericSection = querySel('#genericList');
const movieDetailSection = querySel('#movieDetail');

// List & Containers
const searchForm = querySel('#searchForm');
const trendingMoviesPreviewList = querySel('.trendingPreview-movieList');
const categoriesPreviewList = querySel('.categoriesPreview-list');
const movieDetailCategoriesList = querySel('#movieDetail .categories-list');
const relatedMoviesCategoriesList = querySel('.relatedMovies-scrollContainer');

// Elements
const headerTitle = querySel('.header-title');
const arrowBtn = querySel('.header-arrow');
const headerCategoryTitle = querySel('.header-title--categoryView');

const searchFormInput = querySel('#searchForm input');
const searchFormBtn = querySel('#searchBtn');

const trendingBtn = querySel('.trendingPreview-btn');

const movieDetailTitle = querySel('.movieDetail-title');
const movieDetailDescription = querySel('.movieDetail-description');
const movieDetailScore = querySel('.movieDetail-score');