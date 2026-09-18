/* =========================================================
   MO. PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   LOADING SCREEN
   The page will NEVER remain stuck on the loader.
========================================================= */

function hideLoader() {

  const loader = document.getElementById("loader");

  if (!loader) {
    return;
  }

  loader.classList.add("hide");

}


/*
  Normal loading.
*/

window.addEventListener("load", () => {

  setTimeout(() => {

    hideLoader();

  }, 700);

});


/*
  Safety fallback.

  Even if an image, PDF, or another resource takes too
  long to load, the website will still appear.
*/

setTimeout(() => {

  hideLoader();

}, 3000);



/* =========================================================
   FOOTER YEAR
========================================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}



/* =========================================================
   DAY / NIGHT THEME
========================================================= */

const themeToggle =
  document.getElementById("themeToggle");

const themeIcon =
  document.getElementById("themeIcon");


function getAutomaticTheme() {

  const hour =
    new Date().getHours();


  /*
    Light:
    07:00 → 18:59

    Dark:
    19:00 → 06:59
  */

  if (hour >= 7 && hour < 19) {

    return "light";

  }


  return "dark";

}



function applyTheme(theme) {

  if (theme === "dark") {

    document.body.classList.add("dark");


    if (themeIcon) {

      themeIcon.textContent = "☀";

    }

  } else {

    document.body.classList.remove("dark");


    if (themeIcon) {

      themeIcon.textContent = "☾";

    }

  }

}



const savedTheme =
  localStorage.getItem("portfolio-theme");


if (savedTheme === "dark" || savedTheme === "light") {

  applyTheme(savedTheme);

} else {

  applyTheme(getAutomaticTheme());

}



/* =========================================================
   MANUAL THEME TOGGLE
========================================================= */

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    const isDark =
      document.body.classList.contains("dark");


    const newTheme =
      isDark ? "light" : "dark";


    applyTheme(newTheme);


    localStorage.setItem(
      "portfolio-theme",
      newTheme
    );

  });

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealItems =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  revealItems.forEach((item) => {

    observer.observe(item);

  });

} else {

  revealItems.forEach((item) => {

    item.classList.add("visible");

  });

}


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
