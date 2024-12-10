const API_KEY = 'e6124fbd7009c7fbc687d2cd0ca91b1e'; // TMDB API 키
const BASE_URL = 'https://api.themoviedb.org/3';

// 페이지 로드 시 인기 영화 가져오기
document.addEventListener('DOMContentLoaded', async () => {
    const bestMoviesContainer = document.getElementById('best-movies');
    const bestMovies = await fetchBestMovies();

    if (!bestMovies.length) {
        bestMoviesContainer.innerHTML = '<p>베스트 영화 데이터를 불러올 수 없습니다.</p>';
        return;
    }

    bestMovies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
            <h2>${movie.title}</h2>
            <p>평점: ${movie.vote_average || 'N/A'}</p>
            <p>개봉일: ${movie.release_date || '정보 없음'}</p>
        `;
        bestMoviesContainer.appendChild(movieElement);
    });
});

// 인기 영화 데이터 가져오기
async function fetchBestMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=1`);
        const data = await response.json();
        return data.results.slice(0, 10); // 상위 10개 영화만 반환
    } catch (error) {
        console.error('베스트 영화 가져오기 실패:', error);
        return [];
    }
}
