document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("addSongTxt");
    const listContainer = document.getElementById("listContainer");

    // Aplicar estilos al contenedor para dividir en dos columnas
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "column";
    listContainer.style.alignItems = "center";
    listContainer.style.width = "100%";

    // Cargar datos guardados en localStorage
    loadItems();

    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && inputField.value.trim() !== "") {
            const formattedData = formatInput(inputField.value.trim());
            addItem(formattedData);
            saveItems();
            inputField.value = "";
        }
    });

    function formatInput(text) {
        let parts = text.split(/\s*-\s*/);

        let name = parts[0]?.trim() || "nombre desconocido";
        let surname = parts[1]?.trim() || "apellido desconocido";
        let imageUrl = parts[2]?.trim();

        if (!isValidUrl(imageUrl)) {
            imageUrl = "https://m.media-amazon.com/images/S/pv-target-images/81ef275effa427553a847bc220bebe1dc314b2e79d00333f94a6bcadd7cce851.jpg";
        }

        return { name, surname, imageUrl };
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    function addItem({ name, surname, imageUrl }) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        itemDiv.style.display = "flex";
        itemDiv.style.width = "100%";
        itemDiv.style.marginBottom = "10px";

        const textContainer = document.createElement("div");
        textContainer.style.width = "50%";
        textContainer.style.display = "flex";
        textContainer.style.flexDirection = "column";
        textContainer.style.alignItems = "center";
        textContainer.style.justifyContent = "center";
        textContainer.style.textAlign = "center";

        const span = document.createElement("span");
        span.textContent = `${name} - ${surname}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.style.marginTop = "10px";

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => editItem(span, img));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
            itemDiv.remove();
            saveItems();
        });

        buttonContainer.append(editButton, deleteButton);
        textContainer.append(span, buttonContainer);

        const imgContainer = document.createElement("div");
        imgContainer.style.width = "50%";
        imgContainer.style.display = "flex";
        imgContainer.style.alignItems = "center";
        imgContainer.style.justifyContent = "center";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = `${name} ${surname}`;
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.objectFit = "cover";

        img.onerror = () => img.src = "img_desconocida.jpeg";

        imgContainer.appendChild(img);
        itemDiv.append(textContainer, imgContainer);
        listContainer.appendChild(itemDiv);

        saveItems();
    }

    function editItem(span, img) {
        const newText = prompt("Edita el texto (nombre - apellido - URL de imagen):", span.textContent);
        if (newText?.trim()) {
            const formattedData = formatInput(newText.trim());
            span.textContent = `${formattedData.name} - ${formattedData.surname}`;
            img.src = formattedData.imageUrl;
            saveItems();
        }
    }

    function saveItems() {
        const items = [...listContainer.querySelectorAll(".item")].map(item => {
            const span = item.querySelector("span").textContent;
            const img = item.querySelector("img").src;
            return `${span} - ${img}`;
        });
        localStorage.setItem("heroes", JSON.stringify(items));
    }

    function loadItems() {
        const savedItems = JSON.parse(localStorage.getItem("heroes")) || [];
        savedItems.forEach(item => {
            const parts = item.split(" - ");
            const name = parts[0];
            const surname = parts[1];
            const imageUrl = parts.slice(2).join(" - ");
            addItem({ name, surname, imageUrl });
        });
    }
});
