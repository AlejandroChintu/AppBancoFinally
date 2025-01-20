-- Configuración inicial
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `banca_movil`

-- Tabla `cuentas`: Almacena la información de las cuentas de los usuarios
CREATE TABLE `cuentas` (
  `id` int(11) NOT NULL, -- Identificador único de la cuenta
  `nombre` varchar(100) NOT NULL, -- Nombre del usuario
  `apellido_paterno` varchar(50) NOT NULL, -- Apellido paterno del usuario
  `apellido_materno` varchar(50) NOT NULL, -- Apellido materno del usuario
  `correo` varchar(100) NOT NULL, -- Correo electrónico del usuario
  `saldo` decimal(10,2) NOT NULL DEFAULT 0.00, -- Saldo de la cuenta
  `fecha_apertura` timestamp NOT NULL DEFAULT current_timestamp(), -- Fecha de apertura de la cuenta
  `password` varchar(255) NOT NULL -- Contraseña de la cuenta
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Tabla `movimientos`: Almacena los movimientos de las cuentas
CREATE TABLE `movimientos` (
  `id` int(11) NOT NULL, -- Identificador único del movimiento
  `id_cuenta` int(11) NOT NULL, -- Identificador de la cuenta origen
  `id_destino` int(11) DEFAULT NULL, -- Identificador de la cuenta destino (si aplica)
  `monto` decimal(10,2) NOT NULL, -- Monto del movimiento
  `descripcion` varchar(15) DEFAULT NULL, -- Descripción del movimiento
  `concepto` varchar(255) DEFAULT NULL, -- Concepto del movimiento
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(), -- Fecha del movimiento
  `estado` enum('pendiente','completada') DEFAULT 'pendiente' -- Estado del movimiento
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Índices y claves primarias
ALTER TABLE `cuentas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cuenta` (`id_cuenta`),
  ADD KEY `id_destino` (`id_destino`);

-- Auto-incremento para las tablas
ALTER TABLE `cuentas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `movimientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

-- Restricciones y claves foráneas
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_ibfk_2` FOREIGN KEY (`id_destino`) REFERENCES `cuentas` (`id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
