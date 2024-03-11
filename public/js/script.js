(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// slider.js

const slider = document.querySelector(".slider-container");
const sliderContent = document.querySelector(".slider-content");
const slides = document.querySelectorAll(".slider-item");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
const slideWidth = slides[0].clientWidth;

function updateSlider() {
  sliderContent.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function goToNextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlider();
  }
}

function goToPrevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

prevBtn.addEventListener("click", goToPrevSlide);
nextBtn.addEventListener("click", goToNextSlide);

// slider button.js




let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  console.log(taxInfo);
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});
