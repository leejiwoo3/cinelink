const API_KEY = 'e6124fbd7009c7fbc687d2cd0ca91b1e'; // TMDB API 키
const BASE_URL = 'https://api.themoviedb.org/3';

// 페이지 로드 시 장르 목록 가져오기
document.addEventListener('DOMContentLoaded', async () => {
    const genreSelect = document.getElementById('genre-select');
    const genres = await fetchGenres();
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
});

// 장르 목록 가져오기
async function fetchGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko`);
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('장르 목록 가져오기 실패:', error);
        alert('장르 데이터를 불러올 수 없습니다.');
    }
}

// 영화 검색 버튼 클릭 이벤트
document.getElementById('search-button').addEventListener('click', async () => {
    const genreId = document.getElementById('genre-select').value;
    const sortBy = document.getElementById('sort-select').value;

    if (!genreId) {
        alert('카테고리를 선택하세요.');
        return;
    }

    const movies = await fetchMoviesByGenre(genreId, sortBy);
    displayResults(movies);
});

// 장르별 영화 검색 (정렬 포함)
async function fetchMoviesByGenre(genreId, sortBy) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=${sortBy}&language=ko`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('영화 검색 중 오류 발생:', error);
        alert('영화 데이터를 가져오는 데 실패했습니다.');
    }
}


// 검색 결과 표시
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
            </div>
        `;
        resultsContainer.appendChild(movieElement);
    });
}
