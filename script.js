/* =========================================================
   MO. PORTFOLIO
========================================================= */


/* =========================
   LOADING SCREEN
========================= */

function hideLoader() {

    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }

}


/*
   Hide normally after the page loads.
*/

window.addEventListener("load", function () {

    setTimeout(hideLoader, 700);

});


/*
   Emergency fallback.
   The loader can NEVER remain forever.
*/

setTimeout(hideLoader, 3000);



/* =========================
   FOOTER YEAR
========================= */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}



/* =========================
   DAY / NIGHT MODE
========================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


function automaticTheme() {

    const hour = new Date().getHours();

    return (
        hour >= 7 && hour < 19
    )
        ? "light"
        : "dark";

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


applyTheme(
    savedTheme || automaticTheme()
);



/* =========================
   THEME BUTTON
========================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains("dark");


            const newTheme =
                isDark
                    ? "light"
                    : "dark";


            applyTheme(newTheme);


            localStorage.setItem(
                "portfolio-theme",
                newTheme
            );

        }
    );

}



/* =========================
   SCROLL REVEAL
========================= */

const revealItems =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    revealItems.forEach(
        function (item) {

            observer.observe(item);

        }
    );

} else {

    revealItems.forEach(
        function (item) {

            item.classList.add("visible");

        }
    );

}
