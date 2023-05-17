/* write your code here ... */
let language = "en";
let movieNumber = 1;
const htmlElement = document.querySelector("html");

const savedLanguage = localStorage.getItem("language");
const savedNumber = localStorage.getItem("number");

if (savedLanguage && savedNumber) {
  language = savedLanguage;
  movieNumber = savedNumber;
} else {
  localStorage.setItem("language", "en");
  localStorage.setItem("number", 1);
  language = "en";
  number = 1;
}
console.log(language, movieNumber);

const handle = (language, movieNumber) => {
  htmlElement.lang = language;

  if (language === "fa") {
    htmlElement.dir = "rtl";
  } else {
    htmlElement.dir = "ltr";
  }

  const fetchData = async () => {
    await fetch("data/games.json")
      .then((res) => res.json())
      .then((data) => {
        document.querySelector(".info > span").textContent =
          data[movieNumber - 1].name;
        document.querySelector(".cover > img").src =
          data[movieNumber - 1].image;
        document.querySelector(".info > button").style.backgroundColor =
          data[movieNumber - 1]["callToActionButton"]["backgroundColor"];
        document.querySelector(".info > button").style.color =
          data[movieNumber - 1]["callToActionButton"]["color"];
      });

    await fetch(`languages/${language}.json`)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector(".info > h2").textContent =
          data["GAMES"][movieNumber - 1]["HEADING"];
        document.querySelector(".info > p").textContent =
          data["GAMES"][movieNumber - 1]["DESCRIPTION"];
        document.querySelector(".info > button").textContent =
          data["GENERAL"]["CALL_TO_ACTION"];
      });
  };

  fetchData();

  const allNavButtons = document.querySelectorAll("li > button");
  allNavButtons.forEach((navButton, index) => {
    if (index === movieNumber - 1) {
      navButton.classList.add("active");
    } else {
      navButton.classList.remove("active");
    }
  });
};

handle(language, movieNumber);

// adding event listeners for buttons
const handleNumberEvent = () => {
  const allNavButtons = document.querySelectorAll("li > button");
  allNavButtons.forEach((navButton, index) => {
    navButton.addEventListener("click", () => {
      allNavButtons.forEach((button, buttonIndex) => {
        button.classList.remove("active");
      });
      allNavButtons[index].classList.add("active");
      movieNumber = index + 1;
      localStorage.setItem("language", language);
      localStorage.setItem("number", movieNumber);
      handle(language, movieNumber);
    });
  });
};

handleNumberEvent();

const languageButton = document.querySelector("nav >  :nth-child(1)");
languageButton.addEventListener("hover", () => {
  languageButton.classList.add("active");
});
languageButton.addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";
  localStorage.setItem("language", language);
  localStorage.setItem("number", movieNumber);
  handle(language, movieNumber);
});
