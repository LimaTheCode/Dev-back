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

const siteContent =
document.getElementById(
"siteContent"
);

openBtn.addEventListener(
"click",
() => {

popup.classList.toggle(
"active"
);

}
);

closeBtn.addEventListener(
"click",
() => {

popup.classList.remove(
"active"
);

}
);

document.addEventListener(
"click",
(e) => {

const clickedPopup =
popup.contains(e.target);

const clickedButton =
openBtn.contains(e.target);

if (
!clickedPopup &&
!clickedButton
) {

popup.classList.remove(
"active"
);

}

}
);

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

darkModeToggle.addEventListener(
"change",
() => {

document.body.classList.toggle(
"dark-mode"
);

saveSettings();

}
);

contrastToggle.addEventListener(
"change",
() => {

document.body.classList.toggle(
"high-contrast"
);

saveSettings();

}
);

motionToggle.addEventListener(
"change",
() => {

document.body.classList.toggle(
"reduce-motion"
);

saveSettings();

}
);

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

saveSettings();

}
);

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

siteContent.style.filter =
"url(#protanopia)";

break;

case "deuteranopia":

siteContent.style.filter =
"url(#deuteranopia)";

break;

case "tritanopia":

siteContent.style.filter =
"url(#tritanopia)";

break;

case "grayscale":

siteContent.style.filter =
"grayscale(100%)";

break;

default:

siteContent.style.filter =
"none";

}

saveSettings();

}
);

function saveSettings() {

const settings = {

darkMode:
darkModeToggle.checked,

contrast:
contrastToggle.checked,

motion:
motionToggle.checked,

fontSize:
fontSlider.value,

colorFilter:
colorFilter.value

};

localStorage.setItem(
"accessibilitySettings",
JSON.stringify(settings)
);

}

function loadSettings() {

const savedSettings =
JSON.parse(
localStorage.getItem(
"accessibilitySettings"
)
);

if (!savedSettings) return;

if (savedSettings.darkMode) {

darkModeToggle.checked = true;

document.body.classList.add(
"dark-mode"
);

}

if (savedSettings.contrast) {

contrastToggle.checked = true;

document.body.classList.add(
"high-contrast"
);

}

if (savedSettings.motion) {

motionToggle.checked = true;

document.body.classList.add(
"reduce-motion"
);

}

if (savedSettings.fontSize) {

fontSlider.value =
savedSettings.fontSize;

fontValue.textContent =
savedSettings.fontSize + "%";

document.documentElement.style.fontSize =
savedSettings.fontSize + "%";

}

if (savedSettings.colorFilter) {

colorFilter.value =
savedSettings.colorFilter;

switch(savedSettings.colorFilter) {

case "protanopia":

siteContent.style.filter =
"url(#protanopia)";

break;

case "deuteranopia":

siteContent.style.filter =
"url(#deuteranopia)";

break;

case "tritanopia":

siteContent.style.filter =
"url(#tritanopia)";

break;

case "grayscale":

siteContent.style.filter =
"grayscale(100%)";

break;

default:

siteContent.style.filter =
"none";

}

}

}

loadSettings();
