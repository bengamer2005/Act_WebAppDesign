document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm")

    if (!form) {
        console.error("Formulario no encontrado.")
        return
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (!username || !password) {
            alert("Todos los campos son obligatorios")
            return
        }

        const user = { username, password }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })

            const data = await response.json()

            if (response.ok) {
                alert("Usuario registrado con éxito.")
                window.location.href = "main.html"
            } else {
                alert(`Error: ${data.message}`)
            }
        } catch (error) {
            console.error("Error de conexión:", error)
        }
    })
})