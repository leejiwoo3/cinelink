let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // 4초마다 자동 슬라이드
}

// 초기 호출 시 첫 번째 슬라이드를 보이도록 설정
document.addEventListener("DOMContentLoaded", () => {
    let slides = document.getElementsByClassName("slide");
    if (slides.length > 0) {
        slides[0].style.display = "block";
    }
    showSlides(); // 추가로 자동 슬라이드 기능을 호출
});

function plusSlides(n) {
    let slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

