const alphabet = "abcdefghijklmnopqrstuvwxyz";

let fonts = [];

async function loadFonts() {

    const response = await fetch("fonts.json");

    fonts = await response.json();

    initialize();

}

function convert(text, chars) {

    return text
        .split("")
        .map(char => {

            const index =
                alphabet.indexOf(
                    char.toLowerCase()
                );

            return index >= 0
                ? chars[index]
                : char;

        })
        .join("");

}

function getInputText() {

    let text =
        document
            .getElementById("input")
            .value
            .trim();

    if (!text) {
        text = "Your Fancy Text";
    }

    return text;

}

function saveText() {

    localStorage.setItem(
        "fontText",
        document.getElementById("input").value
    );

}

function loadSavedText() {

    const saved =
        localStorage.getItem("fontText");

    if (saved) {

        document.getElementById("input").value =
            saved;

    }

}

function renderHomepage() {

    const text = getInputText();

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    fonts.forEach(font => {

        const output =
            convert(text, font.chars);

        const div =
            document.createElement("div");

        div.className = "result";

        div.innerHTML = `
            <div>
                <strong>${font.name}</strong>
                <div class="generated">
                    ${output}
                </div>
            </div>

            <button onclick="copyText('${output}')">
                Copy
            </button>
        `;

        results.appendChild(div);

    });

}

function renderSingleFont(fontName) {

    const font =
        fonts.find(
            f => f.name === fontName
        );

    if (!font) return;

    const text = getInputText();

    document.getElementById("output")
        .textContent =
        convert(text, font.chars);

}

function copyText(text) {

    navigator.clipboard.writeText(text);

}

function initialize() {

    loadSavedText();

    const page =
        document.body.dataset.page;

    if (page === "home") {

        renderHomepage();

        document
            .getElementById("input")
            .addEventListener("input", () => {

                saveText();

                renderHomepage();

            });

    }

    if (page === "single") {

        const fontName =
            document.body.dataset.font;

        renderSingleFont(fontName);

        document
            .getElementById("input")
            .addEventListener("input", () => {

                saveText();

                renderSingleFont(fontName);

            });

    }

}

loadFonts();
