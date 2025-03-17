document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("actividadForm")
    const actividadLista = document.getElementById("actividadLista")
    const temaSelect = document.getElementById("temaSelect")

    fetchTemas()

    temaSelect.addEventListener("change", async () => {
        const temaId = temaSelect.value
        if (temaId) {
            fetchActividades(temaId)
        } else {
            actividadLista.innerHTML = ""
        }
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const actividad = {
            tipoActividad: document.getElementById("tipoActividad").value,
            calificacion: document.getElementById("calificacion").value,
            fecha: document.getElementById("fecha").value,
            calificacionOpcional: document.getElementById("calificacionOpcional").value || null,
            temaId: temaSelect.value
        }

        const response = await fetch("/api/actividad", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actividad)
        })

        if (response.ok) {
            form.reset()
            fetchActividades(temaSelect.value)
        } else {
            console.error("Error al agregar la actividad")
        }
    })

    async function fetchTemas() {
        const response = await fetch("/api/tema")
        const temas = await response.json()

        temas.forEach((tema) => {
            const option = document.createElement("option")
            option.value = tema._id
            option.textContent = tema.tema
            temaSelect.appendChild(option)
        })
    }

    async function fetchActividades(temaId) {
        actividadLista.innerHTML = ""
        const response = await fetch(`/api/actividad?temaId=${temaId}`)
        const actividades = await response.json()

        actividades.forEach((actividad) => {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td><input type="text" value="${actividad.tipoActividad}" id="tipo-${actividad._id}"></td>
                <td><input type="number" value="${actividad.calificacion}" id="calificacion-${actividad._id}"></td>
                <td>${actividad.fecha.split("T")[0]}</td>
                <td><input type="number" value="${actividad.calificacionOpcional || ''}" id="opc-${actividad._id}"></td>
                <td>
                    <button onclick="editActividad('${actividad._id}')">Modificar</button>
                    <button onclick="deleteActividad('${actividad._id}')">Eliminar</button>
                </td>
            `
            actividadLista.appendChild(row)
        })
    }

    window.deleteActividad = async (id) => {
        if (confirm("¿Estás seguro de eliminar esta actividad?")) {
            const response = await fetch(`/api/actividad/${id}`, { method: "DELETE" })

            if (response.ok) {
                fetchActividades(temaSelect.value)
            } else {
                console.error("Error al eliminar la actividad")
            }
        }
    }

    window.editActividad = async (id) => {
        const newTipoActividad = prompt("Nueva actividad:")
        const newCalificacion = prompt("Nueva calificacion")
        const newCalificacionOpcional = prompt("Nueva calificacion opcional:")

        if (newTipoActividad && newCalificacion && newCalificacionOpcional) {
            const response = await fetch(`/api/actividad/${id}`, {

                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tipoActividad: newTipoActividad,
                    calificacion: newCalificacion,
                    calificacionOpcional: newCalificacionOpcional
                })
            })

            if (response.ok) {
                fetchActividades()
            } else {
                console.error("Error al actualizar la actividad")
            }

        }
    }
})
