document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form")
    const heroList = document.getElementById("hero-list")

    fetchHeroes()

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const superhero = {
            superheroRealName: document.getElementById("superheroRealName").value,
            superheroName: document.getElementById("superheroName").value,
            superheroUrl: document.getElementById("superheroUrl").value,
            superheroInfo: document.getElementById("superheroInfo").value
        }

        const response = await fetch("/api/superheros", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(superhero)
        })

        if (response.ok) {
            form.reset()
            fetchHeroes()
        } else {
            console.error("Error al registrar el superhero")
        }
    })

    async function fetchHeroes() {
        heroList.innerHTML = ""
        const response = await fetch("/api/superheros")
        const heroes = await response.json()

        heroes.forEach((hero) => {
            const heroCard = document.createElement("div")
            heroCard.classList.add("hero-card")
            heroCard.innerHTML = `
                <h2>${hero.superheroName}</h2>
                <h4>(${hero.superheroRealName})</h4>
                <img src="${hero.superheroUrl}" width="100">
                <p>${hero.superheroInfo}</p>
                <button onclick="editHero('${hero._id}')">Editar</button>
                <button onclick="deleteHero('${hero._id}')">Eliminar</button>
            `
            heroList.appendChild(heroCard)
        })
    }

    window.deleteHero = async (id) => {
        if (confirm("¿Estás seguro de eliminar este superhéroe?")) {
            const response = await fetch(`/api/superheros/${id}`, { method: "DELETE" })
            
            if (response.ok) {
                fetchHeroes()
            } else {
                console.error("Error al eliminar el superhéroe")
            }
        }
    }

    //Editar un superhéroe
    window.editHero = async (id) => {
        const newName = prompt("Nuevo nombre del superhéroe:")
        const newRealName = prompt("Nuevo nombre real:")
        const newUrl = prompt("Nueva URL de imagen:")
        const newInfo = prompt("Nueva información:")

        if (newName && newRealName && newUrl && newInfo) {
            const response = await fetch(`/api/superheros/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    superheroName: newName,
                    superheroRealName: newRealName,
                    superheroUrl: newUrl,
                    superheroInfo: newInfo
                })
            })

            if (response.ok) {
                fetchHeroes()
            } else {
                console.error("Error al actualizar el superhéroe")
            }
        }
    }
})
