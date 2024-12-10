let map;
let service;
let infowindow;

document.getElementById('find-theater-button').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            initializeMap(userLocation);
            findNearbyTheaters(userLocation);
        }, () => {
            alert('위치 정보를 가져올 수 없습니다.');
        });
    } else {
        alert('브라우저가 위치 서비스를 지원하지 않습니다.');
    }
});

function initializeMap(location) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15,
    });
    new google.maps.Marker({
        position: location,
        map: map,
        title: '현재 위치',
    });
}

function findNearbyTheaters(location) {
    const request = {
        location: location,
        radius: '5000', // 5km 반경
        type: ['movie_theater'], // 극장 유형
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayTheaters(results);
        } else {
            alert('근처 극장을 찾을 수 없습니다.');
        }
    });
}

function displayTheaters(theaters) {
    const theaterList = document.getElementById('theater-list');
    theaterList.innerHTML = ''; // 기존 결과 초기화

    theaters.forEach(theater => {
        const theaterItem = document.createElement('div');
        theaterItem.classList.add('theater-item');
        theaterItem.innerHTML = `
            <h2>${theater.name}</h2>
            <p>${theater.vicinity}</p>
        `;

        const marker = new google.maps.Marker({
            position: theater.geometry.location,
            map: map,
            title: theater.name,
        });

        theaterList.appendChild(theaterItem);

        marker.addListener('click', () => {
            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
            }
            infowindow.setContent(`<h2>${theater.name}</h2><p>${theater.vicinity}</p>`);
            infowindow.open(map, marker);
        });
    });
}
