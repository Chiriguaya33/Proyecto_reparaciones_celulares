import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Estado para controlar si se muestra el formulario de login o registro

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                isLogin ? "/usuarios/login" : "/usuarios", // Ruta diferente para login y registro
                {
                    method: isLogin ? "POST" : "POST", // Método POST para ambos
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre_usuario: username,
                        contrasena: password,
                    }),
                }
            );

            if (response.ok) {
                // Acción exitosa (login o registro)
                const data = await response.json();
                if (isLogin) {
                    // Guarda la información del usuario en el localStorage o en un contexto
                    localStorage.setItem("user", JSON.stringify(data));
                    // Redirige al usuario a la página principal o a una página protegida
                    navigate("/clientes");
                } else {
                    // Muestra un mensaje de éxito y cambia al formulario de login
                    alert("Usuario registrado correctamente");
                    setIsLogin(true);
                }
            } else {
                // Acción fallida (login o registro)
                const errorData = await response.json();
                alert(errorData.message || "Error en la solicitud");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error en la solicitud");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <h1>{isLogin ? "Iniciar sesión" : "Registrarse"}</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    label="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    id="password"
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">
                    {isLogin ? "Iniciar sesión" : "Registrarse"}
                </Button>
                {/* Botón para cambiar entre login y registro */}
                <Button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Registrarse" : "Iniciar sesión"}
                </Button>
            </form>
        </Box>
    );
}

export default LoginForm;