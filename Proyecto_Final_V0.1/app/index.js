import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import connection from "./db.js"; // Importar la configuración de la base de datos

// Fix para __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servidor
const app = express();

app.set("port", 3000);
app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en puerto", app.get("port"));
});

// Configuración
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta
app.get("/", (req, res) => res.sendFile(__dirname + "/Views/Login.html"));
app.get("/register", (req, res) => res.sendFile(__dirname + "/Views/register.html"));
app.get("/admin", (req, res) => res.sendFile(__dirname + "/Views/admin/admin.html"));

// Ruta para manejo de registro de usuarios
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        connection.query(query, [name, email, hashedPassword], (err, results) => {
            if (err) {
                console.error("Error al insertar usuario:", err);
                return res.status(500).send("Error en el servidor");
            }

            // Asignar rol de 'user' por defecto
            const userId = results.insertId;
            const roleQuery = "INSERT INTO user_roles (user_id, role_id) VALUES (?, (SELECT id FROM roles WHERE role_name = 'user'))";
            connection.query(roleQuery, [userId], (err, results) => {
                if (err) {
                    console.error("Error al asignar rol:", err);
                    return res.status(500).send("Error en el servidor");
                }
                res.send("Usuario registrado con éxito");
            });
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error en el servidor");
    }
});
