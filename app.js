const slides = document.getElementById("slides");
let currentIndex = 0;

function nextSlide() {
   currentIndex = (currentIndex + 1) % slides.children.length;
      updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

        // Slider automático
setInterval(nextSlide, 8000);


