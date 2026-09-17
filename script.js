/* =================================
   LOADING SCREEN
================================= */

window.addEventListener("load", () => {

  setTimeout(() => {

    document
      .getElementById("loader")
      .classList.add("hide");

  }, 950);

});



/* =================================
   YEAR
================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();



/* =================================
   DAY / NIGHT MODE
================================= */

const themeToggle =
  document.getElementById("themeToggle");

const themeIcon =
  document.getElementById("themeIcon");



function getAutomaticTheme() {

  const hour = new Date().getHours();

  /*
    Day:
    7:00 AM → 6:59 PM

    Night:
    7:00 PM → 6:59 AM
  */

  if (hour >= 7 && hour < 19) {

    return "light";

  }

  return "dark";

}



function applyTheme(theme) {

  if (theme === "dark") {

    document.body.classList.add("dark");

    themeIcon.textContent = "☀";

  } else {

    document.body.classList.remove("dark");

    themeIcon.textContent = "☾";

  }

}



/*
  If the visitor has previously selected
  a theme, use their choice.

  Otherwise automatically choose
  according to their local time.
*/

const savedTheme =
  localStorage.getItem("portfolio-theme");


if (savedTheme) {

  applyTheme(savedTheme);

} else {

  applyTheme(getAutomaticTheme());

}



/*
  Manual theme switching
*/

themeToggle.addEventListener("click", () => {

  const dark =
    document.body.classList.contains("dark");


  const newTheme =
    dark ? "light" : "dark";


  applyTheme(newTheme);


  localStorage.setItem(
    "portfolio-theme",
    newTheme
  );

});



/* =================================
   SCROLL REVEAL
================================= */

const items =
  document.querySelectorAll(".reveal");


const observer =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


items.forEach((item) => {

  observer.observe(item);

});
