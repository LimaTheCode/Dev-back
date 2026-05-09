const openBtn =
    document.getElementById(
        "openAccessibility"
    );

const closeBtn =
    document.getElementById(
        "closeAccessibility"
    );

const popup =
    document.getElementById(
        "popup"
    );

/* ABRIR */

openBtn.addEventListener(
    "click",
    () => {

        popup.classList.toggle(
            "active"
        );

    }
);

/* FECHAR */

closeBtn.addEventListener(
    "click",
    () => {

        popup.classList.remove(
            "active"
        );

    }
);

/* FECHAR FORA */

document.addEventListener(
    "click",
    (e) => {

        const insidePopup =
            popup.contains(e.target);

        const insideButton =
            openBtn.contains(e.target);

        if (
            !insidePopup &&
            !insideButton
        ) {

            popup.classList.remove(
                "active"
            );

        }

    }
);

/* TOGGLES */

const darkModeToggle =
    document.getElementById(
        "darkModeToggle"
    );

const contrastToggle =
    document.getElementById(
        "contrastToggle"
    );

const motionToggle =
    document.getElementById(
        "motionToggle"
    );

/* DARK MODE */

darkModeToggle.addEventListener(
    "change",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    }
);

/* CONTRASTE */

contrastToggle.addEventListener(
    "change",
    () => {

        document.body.classList.toggle(
            "high-contrast"
        );

    }
);

/* MOTION */

motionToggle.addEventListener(
    "change",
    () => {

        document.body.classList.toggle(
            "reduce-motion"
        );

    }
);

/* TEXTO */

const fontSlider =
    document.getElementById(
        "fontSlider"
    );

const fontValue =
    document.getElementById(
        "fontValue"
    );

fontSlider.addEventListener(
    "input",
    () => {

        const size =
            fontSlider.value;

        document.documentElement.style.fontSize =
            size + "%";

        fontValue.textContent =
            size + "%";

    }
);

/* FILTROS */

const colorFilter =
    document.getElementById(
        "colorFilter"
    );

colorFilter.addEventListener(
    "change",
    () => {

        const filter =
            colorFilter.value;

        switch(filter) {

            case "protanopia":

                document.body.style.filter =
                    "url(#protanopia)";

            break;

            case "deuteranopia":

                document.body.style.filter =
                    "url(#deuteranopia)";

            break;

            case "tritanopia":

                document.body.style.filter =
                    "url(#tritanopia)";

            break;

            case "grayscale":

                document.body.style.filter =
                    "grayscale(100%)";

            break;

            default:

                document.body.style.filter =
                    "none";

        }

    }
);