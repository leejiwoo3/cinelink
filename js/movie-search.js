const API_KEY = 'e6124fbd7009c7fbc687d2cd0ca91b1e'; // TMDB API 키
const BASE_URL = 'https://api.themoviedb.org/3';

document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('movie-search-input').value.trim();
    if (!query) {
        alert('검색어를 입력하세요.');
        return;
    }
    const searchResults = await searchMovies(query);
    displayResults(searchResults);
});

// 영화 검색 함수
async function searchMovies(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=ko`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('영화 검색 중 오류 발생:', error);
        alert('영화 정보를 가져오는 데 실패했습니다.');
    }
}

// 검색 결과 표시 함수
function displayResults(movies) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // 기존 결과 제거

    if (movies.length === 0) {
        resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
            <div>
                <h2>${movie.title}</h2>
                <p>개봉일: ${movie.release_date || '정보 없음'}</p>
                <p>평점: ${movie.vote_average || 'N/A'}</p>
                <p>${movie.overview || '설명이 없습니다.'}</p>
            </div>
        `;
        resultsContainer.appendChild(movieElement);
    });
}
