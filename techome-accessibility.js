(function (window, document) {

    "use strict";

    /*
    =========================================================
    TECHOME UNIVERSAL ACCESSIBILITY WIDGET
    =========================================================

    ✔ Compatível com QUALQUER site
    ✔ Evita conflito de CSS
    ✔ Shadow DOM isolado
    ✔ Não depende de estrutura HTML
    ✔ Funciona em React / Vue / WordPress / Shopify etc
    ✔ Configuração automática
    ✔ Persistência por domínio
    ✔ Auto init
    ✔ Seguro contra múltiplas execuções

    =========================================================
    */

    if (window.__TECHOME_ACCESSIBILITY__) return;

    window.__TECHOME_ACCESSIBILITY__ = true;

    const CONFIG = {
        storageKey: "__techome_accessibility__",
        position: {
            right: "25px",
            bottom: "25px"
        },
        zIndex: 2147483647
    };

    class TechomeAccessibility {

        constructor() {

            this.settings = {
                darkMode: false,
                contrast: false,
                motion: false,
                fontSize: 100,
                colorFilter: "normal"
            };

            this.loadSettings();

            this.createRoot();

            this.injectStyles();

            this.render();

            this.attachEvents();

            this.applySettings();

        }

        createRoot() {

            this.container = document.createElement("div");

            this.container.id = "techome-accessibility-root";

            this.container.style.position = "fixed";

            this.container.style.zIndex = CONFIG.zIndex;

            document.documentElement.appendChild(this.container);

            this.shadow = this.container.attachShadow({
                mode: "open"
            });

        }

        injectStyles() {

            const style = document.createElement("style");

            style.textContent = `

                *{
                    box-sizing:border-box;
                }

                .btn{
                    position:fixed;
                    right:${CONFIG.position.right};
                    bottom:${CONFIG.position.bottom};
                    width:62px;
                    height:62px;
                    border:none;
                    border-radius:50%;
                    background:#111;
                    color:#fff;
                    cursor:pointer;
                    font-size:24px;
                    box-shadow:0 10px 30px rgba(0,0,0,.2);
                }

                .popup{
                    position:fixed;
                    right:${CONFIG.position.right};
                    bottom:100px;
                    width:340px;
                    max-width:calc(100vw - 20px);
                    max-height:85vh;
                    overflow:auto;
                    background:#fff;
                    border-radius:24px;
                    padding:20px;
                    box-shadow:0 20px 60px rgba(0,0,0,.2);
                    opacity:0;
                    pointer-events:none;
                    transform:translateY(10px);
                    transition:.25s;
                    font-family:Arial,sans-serif;
                    color:#111;
                }

                .popup.active{
                    opacity:1;
                    pointer-events:auto;
                    transform:translateY(0);
                }

                .header{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                }

                .close{
                    width:34px;
                    height:34px;
                    border:none;
                    border-radius:50%;
                    cursor:pointer;
                }

                .option{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:14px 0;
                    border-bottom:1px solid #eee;
                }

                .switch{
                    position:relative;
                    width:52px;
                    height:30px;
                }

                .switch input{
                    display:none;
                }

                .slider{
                    position:absolute;
                    inset:0;
                    background:#ccc;
                    border-radius:999px;
                    cursor:pointer;
                }

                .slider::before{
                    content:"";
                    position:absolute;
                    width:24px;
                    height:24px;
                    top:3px;
                    left:3px;
                    background:#fff;
                    border-radius:50%;
                    transition:.25s;
                }

                .switch input:checked + .slider{
                    background:#34c759;
                }

                .switch input:checked + .slider::before{
                    transform:translateX(22px);
                }

                .range{
                    width:100%;
                    margin-top:10px;
                }

                select{
                    width:100%;
                    margin-top:10px;
                    padding:12px;
                    border-radius:12px;
                    border:none;
                    background:#eee;
                }

                @media(max-width:600px){

                    .popup{
                        width:calc(100vw - 20px);
                        right:10px;
                    }

                    .btn{
                        right:15px;
                        bottom:15px;
                    }

                }

            `;

            this.shadow.appendChild(style);

        }

        render() {

            this.shadow.innerHTML += `

                <button class="btn" id="openBtn">
                    ⚙
                </button>

                <div class="popup" id="popup">

                    <div class="header">
                        <h2>Acessibilidade</h2>
                        <button class="close" id="closeBtn">✕</button>
                    </div>

                    <div class="option">
                        <span>Modo Escuro</span>

                        <label class="switch">
                            <input type="checkbox" id="darkMode">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="option">
                        <span>Alto Contraste</span>

                        <label class="switch">
                            <input type="checkbox" id="contrast">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div class="option">
                        <span>Reduzir Movimento</span>

                        <label class="switch">
                            <input type="checkbox" id="motion">
                            <span class="slider"></span>
                        </label>
                    </div>

                    <div style="margin-top:20px;">

                        <div style="display:flex;justify-content:space-between;">
                            <span>Tamanho da Fonte</span>
                            <strong id="fontLabel">100%</strong>
                        </div>

                        <input
                            type="range"
                            min="80"
                            max="200"
                            value="100"
                            class="range"
                            id="fontSize">

                    </div>

                    <div style="margin-top:20px;">

                        <strong>Filtro Visual</strong>

                        <select id="filter">

                            <option value="normal">
                                Normal
                            </option>

                            <option value="grayscale">
                                Escala de Cinza
                            </option>

                            <option value="invert">
                                Invertido
                            </option>

                        </select>

                    </div>

                </div>

            `;

        }

        attachEvents() {

            const popup = this.shadow.getElementById("popup");

            this.shadow
                .getElementById("openBtn")
                .addEventListener("click", () => {

                    popup.classList.toggle("active");

                });

            this.shadow
                .getElementById("closeBtn")
                .addEventListener("click", () => {

                    popup.classList.remove("active");

                });

            document.addEventListener("click", (e) => {

                if (
                    !this.container.contains(e.target)
                ) {

                    popup.classList.remove("active");

                }

            });

            this.shadow
                .getElementById("darkMode")
                .addEventListener("change", (e) => {

                    this.settings.darkMode = e.target.checked;

                    this.applySettings();

                });

            this.shadow
                .getElementById("contrast")
                .addEventListener("change", (e) => {

                    this.settings.contrast = e.target.checked;

                    this.applySettings();

                });

            this.shadow
                .getElementById("motion")
                .addEventListener("change", (e) => {

                    this.settings.motion = e.target.checked;

                    this.applySettings();

                });

            this.shadow
                .getElementById("fontSize")
                .addEventListener("input", (e) => {

                    this.settings.fontSize = e.target.value;

                    this.shadow.getElementById("fontLabel")
                        .textContent = `${e.target.value}%`;

                    this.applySettings();

                });

            this.shadow
                .getElementById("filter")
                .addEventListener("change", (e) => {

                    this.settings.colorFilter = e.target.value;

                    this.applySettings();

                });

        }

        applySettings() {

            const html = document.documentElement;
            const body = document.body;

            body.classList.toggle(
                "techome-dark",
                this.settings.darkMode
            );

            body.classList.toggle(
                "techome-contrast",
                this.settings.contrast
            );

            body.classList.toggle(
                "techome-motion",
                this.settings.motion
            );

            html.style.fontSize =
                this.settings.fontSize + "%";

            switch (this.settings.colorFilter) {

                case "grayscale":
                    html.style.filter = "grayscale(100%)";
                    break;

                case "invert":
                    html.style.filter = "invert(1)";
                    break;

                default:
                    html.style.filter = "none";

            }

            this.injectGlobalAccessibilityCSS();

            this.saveSettings();

        }

        injectGlobalAccessibilityCSS() {

            if (
                document.getElementById(
                    "__techome_global_styles__"
                )
            ) return;

            const style = document.createElement("style");

            style.id = "__techome_global_styles__";

            style.textContent = `

                body.techome-dark{
                    background:#111 !important;
                    color:#fff !important;
                }

                body.techome-contrast{
                    background:#000 !important;
                    color:yellow !important;
                }

                body.techome-motion *,
                body.techome-motion *::before,
                body.techome-motion *::after{
                    animation:none !important;
                    transition:none !important;
                    scroll-behavior:auto !important;
                }

            `;

            document.head.appendChild(style);

        }

        saveSettings() {

            localStorage.setItem(
                CONFIG.storageKey,
                JSON.stringify(this.settings)
            );

        }

        loadSettings() {

            const saved = localStorage.getItem(
                CONFIG.storageKey
            );

            if (!saved) return;

            try {

                this.settings = {
                    ...this.settings,
                    ...JSON.parse(saved)
                };

            } catch (e) {}

        }

    }

    function init() {

        if (
            document.readyState === "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                () => new TechomeAccessibility()
            );

        } else {

            new TechomeAccessibility();

        }

    }

    init();

})(window, document);
