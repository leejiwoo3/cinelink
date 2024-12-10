let service;

document.getElementById('search-button').addEventListener('click', () => {
    const theaterName = document.getElementById('theater-name').value.trim();

    if (!theaterName) {
        alert('극장 이름을 입력하세요.');
        return;
    }

    const request = {
        query: theaterName,
        fields: ['name', 'formatted_address', 'geometry'],
    };

    service = new google.maps.places.PlacesService(document.createElement('div'));
    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayResults(results);
        } else {
            alert('검색 결과를 불러올 수 없습니다.');
        }
    });
});

function displayResults(theaters) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화

    if (theaters.length === 0) {
        resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }

    theaters.forEach(theater => {
        const theaterItem = document.createElement('div');
        theaterItem.classList.add('theater-item');
        theaterItem.innerHTML = `
            <h2>${theater.name}</h2>
            <p>주소: ${theater.formatted_address || '정보 없음'}</p>
        `;

        resultsContainer.appendChild(theaterItem);
    });
}
