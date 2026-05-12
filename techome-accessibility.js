(function () {

    if (window.TechomeAccessibilityLoaded) return;
    window.TechomeAccessibilityLoaded = true;

    const style = document.createElement("style");

    style.innerHTML = `

    .techome-accessibility-btn {
        position: fixed;
        right: 25px;
        bottom: 25px;
        width: 62px;
        height: 62px;
        border: none;
        border-radius: 50%;
        background: #111;
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .techome-accessibility-popup {
        position: fixed;
        right: 25px;
        bottom: 100px;
        width: 340px;
        max-width: calc(100vw - 20px);
        max-height: 85vh;
        overflow-y: auto;
        padding: 24px;
        border-radius: 28px;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(18px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        opacity: 0;
        pointer-events: none;
        transform: translateY(15px);
        transition: 0.3s ease;
        z-index: 999998;
        font-family: Arial, sans-serif;
        color: #111;
    }

    .techome-accessibility-popup.active {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }

    .techome-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .techome-close-btn {
        width: 34px;
        height: 34px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        background: #ececec;
    }

    .techome-option {
        padding: 16px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0,0,0,0.06);
    }

    .techome-switch {
        position: relative;
        width: 52px;
        height: 30px;
    }

    .techome-switch input {
        display: none;
    }

    .techome-slider {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: #d1d1d6;
        cursor: pointer;
    }

    .techome-slider::before {
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        top: 3px;
        left: 3px;
        border-radius: 50%;
        background: white;
        transition: 0.3s ease;
    }

    .techome-switch input:checked + .techome-slider {
        background: #34c759;
    }

    .techome-switch input:checked + .techome-slider::before {
        transform: translateX(22px);
    }

    .techome-font-box {
        padding: 18px 0;
    }

    .techome-font-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
    }

    .techome-range-slider {
        width: 100%;
        appearance: none;
        height: 6px;
        border-radius: 999px;
        background: #d1d1d6;
    }

    .techome-range-slider::-webkit-slider-thumb {
        appearance: none;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: white;
        border: 4px solid #34c759;
        cursor: pointer;
    }

    .techome-filter-section {
        margin-top: 18px;
    }

    .techome-filter-header {
        margin-bottom: 10px;
        font-weight: 600;
    }

    .techome-filter-select {
        width: 100%;
        padding: 12px;
        border: none;
        outline: none;
        border-radius: 14px;
        background: rgba(0,0,0,0.06);
    }

    body.techome-dark-mode {
        background: #111 !important;
        color: white !important;
    }

    body.techome-high-contrast {
        background: black !important;
        color: yellow !important;
    }

    body.techome-reduce-motion *,
    body.techome-reduce-motion *::before,
    body.techome-reduce-motion *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
    }

    @media(max-width: 600px) {

        .techome-accessibility-popup {
            right: 10px;
            bottom: 85px;
            width: calc(100vw - 20px);
        }

        .techome-accessibility-btn {
            right: 15px;
            bottom: 15px;
        }

    }

    `;

    document.head.appendChild(style);

    const widgetHTML = `

    <button class="techome-accessibility-btn" id="techomeOpenAccessibility">
        ⚙
    </button>

    <aside class="techome-accessibility-popup" id="techomePopup">

        <div class="techome-popup-header">
            <h2>Acessibilidade</h2>
            <button class="techome-close-btn" id="techomeCloseAccessibility">✕</button>
        </div>

        <div class="techome-option">
            <span>Modo Escuro</span>
            <label class="techome-switch">
                <input type="checkbox" id="techomeDarkModeToggle">
                <span class="techome-slider"></span>
            </label>
        </div>

        <div class="techome-option">
            <span>Contraste Alto</span>
            <label class="techome-switch">
                <input type="checkbox" id="techomeContrastToggle">
                <span class="techome-slider"></span>
            </label>
        </div>

        <div class="techome-option">
            <span>Remover Animações</span>
            <label class="techome-switch">
                <input type="checkbox" id="techomeMotionToggle">
                <span class="techome-slider"></span>
            </label>
        </div>

        <div class="techome-font-box">

            <div class="techome-font-header">
                <span>Tamanho do Texto</span>
                <strong id="techomeFontValue">100%</strong>
            </div>

            <input
                type="range"
                min="80"
                max="170"
                value="100"
                id="techomeFontSlider"
                class="techome-range-slider">

        </div>

        <div class="techome-filter-section">

            <div class="techome-filter-header">
                Filtro Daltonismo
            </div>

            <select id="techomeColorFilter" class="techome-filter-select">
                <option value="normal">Normal</option>
                <option value="grayscale">Escala de Cinza</option>
            </select>

        </div>

    </aside>

    `;

    document.body.insertAdjacentHTML("beforeend", widgetHTML);

    const openBtn = document.getElementById("techomeOpenAccessibility");
    const closeBtn = document.getElementById("techomeCloseAccessibility");
    const popup = document.getElementById("techomePopup");

    openBtn.addEventListener("click", () => {
        popup.classList.toggle("active");
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    document.addEventListener("click", (e) => {

        const clickedPopup = popup.contains(e.target);
        const clickedButton = openBtn.contains(e.target);

        if (!clickedPopup && !clickedButton) {
            popup.classList.remove("active");
        }

    });

    const darkModeToggle = document.getElementById("techomeDarkModeToggle");
    const contrastToggle = document.getElementById("techomeContrastToggle");
    const motionToggle = document.getElementById("techomeMotionToggle");
    const fontSlider = document.getElementById("techomeFontSlider");
    const fontValue = document.getElementById("techomeFontValue");
    const colorFilter = document.getElementById("techomeColorFilter");

    darkModeToggle.addEventListener("change", () => {

        document.body.classList.toggle("techome-dark-mode");

        saveSettings();

    });

    contrastToggle.addEventListener("change", () => {

        document.body.classList.toggle("techome-high-contrast");

        saveSettings();

    });

    motionToggle.addEventListener("change", () => {

        document.body.classList.toggle("techome-reduce-motion");

        saveSettings();

    });

    fontSlider.addEventListener("input", () => {

        const size = fontSlider.value;

        document.documentElement.style.fontSize = size + "%";

        fontValue.textContent = size + "%";

        saveSettings();

    });

    colorFilter.addEventListener("change", () => {

        const filter = colorFilter.value;

        switch(filter) {

            case "grayscale":
                document.documentElement.style.filter = "grayscale(100%)";
                break;

            default:
                document.documentElement.style.filter = "none";

        }

        saveSettings();

    });

    function saveSettings() {

        const settings = {
            darkMode: darkModeToggle.checked,
            contrast: contrastToggle.checked,
            motion: motionToggle.checked,
            fontSize: fontSlider.value,
            colorFilter: colorFilter.value
        };

        localStorage.setItem(
            "techomeAccessibilitySettings",
            JSON.stringify(settings)
        );

    }

    function loadSettings() {

        const savedSettings = JSON.parse(
            localStorage.getItem(
                "techomeAccessibilitySettings"
            )
        );

        if (!savedSettings) return;

        if (savedSettings.darkMode) {

            darkModeToggle.checked = true;

            document.body.classList.add("techome-dark-mode");

        }

        if (savedSettings.contrast) {

            contrastToggle.checked = true;

            document.body.classList.add("techome-high-contrast");

        }

        if (savedSettings.motion) {

            motionToggle.checked = true;

            document.body.classList.add("techome-reduce-motion");

        }

        if (savedSettings.fontSize) {

            fontSlider.value = savedSettings.fontSize;

            fontValue.textContent = savedSettings.fontSize + "%";

            document.documentElement.style.fontSize = savedSettings.fontSize + "%";

        }

        if (savedSettings.colorFilter) {

            colorFilter.value = savedSettings.colorFilter;

            switch(savedSettings.colorFilter) {

                case "grayscale":
                    document.documentElement.style.filter = "grayscale(100%)";
                    break;

                default:
                    document.documentElement.style.filter = "none";

            }

        }

    }

    loadSettings();

})();
