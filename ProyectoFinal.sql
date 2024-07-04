CREATE DATABASE ProyectoTareas;
USE ProyectoTareas;

CREATE TABLE Usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NombreUsuario VARCHAR(50) NOT NULL,
    CorreoElectronico VARCHAR(100) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
    Confirmado BOOLEAN DEFAULT FALSE,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tareas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioId INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    FechaLimite DATE,
    Estado ENUM('Pendiente', 'Completada') DEFAULT 'Pendiente',
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

ALTER TABLE Tareas ADD COLUMN Completada BOOLEAN DEFAULT FALSE;
