DELETE FROM socio;
DELETE FROM usuario;
DELETE FROM entrenador;
DELETE FROM administrador;
DELETE FROM membresia;
DELETE FROM clase;


-- Reiniciar auto-incrementales
-- DELETE FROM sqlite_sequence WHERE name='usuario';
-- DELETE FROM sqlite_sequence WHERE name='socio';
-- DELETE FROM sqlite_sequence WHERE name='membresia';
-- DELETE FROM sqlite_sequence WHERE name='administrador';
-- DELETE FROM sqlite_sequence WHERE name='entrenador';
-- DELETE FROM sqlite_sequence WHERE name='clase';

INSERT INTO usuario (primer_nombre_usuario, segundo_nombre_usuario, apellidos_usuario, email, telefono, documento_identidad, tipo_documento, contraseña, fecha_nacimiento, fecha_registro, id_rol, estado) VALUES 
('Kevin', 'Gabriel', 'Sistema', 'admin@gym.com', '922678123', '44532671', 'DNI', 'admin123', '1990-01-01', date('now'), 1, true),
('Carlos', 'Andrés', 'Pérez Gómez', 'carlos.perez@gym.com', '987654321', '12345678', 'DNI', 'entrenador123', '1985-05-15', date('now'), 2, true),
('María', 'Fernanda', 'López Rodríguez', 'maria.lopez@gym.com', '976543210', '87654321', 'DNI', 'entrenador456', '1988-08-20', date('now'), 2, true),
('Juan', 'Carlos', 'García Martínez', 'juan.garcia@email.com', '912345678', '11111111', 'DNI', 'socio123', '1990-03-10', date('now'), 3, true),
('Ana', 'María', 'Torres Sánchez', 'ana.torres@email.com', '923456789', '22222222', 'DNI', 'socio456', '1995-07-22', date('now'), 3, true),
('Pedro', 'Luis', 'Ramírez Díaz', 'pedro.ramirez@email.com', '934567890', '33333333', 'DNI', 'socio789', '1988-11-05', date('now'), 3, false);

INSERT INTO socio (id_usuario)
SELECT id_usuario 
FROM usuario
WHERE id_rol = 3 
  AND id_usuario NOT IN (SELECT id_usuario FROM socio);

INSERT INTO entrenador (id_usuario)
SELECT id_usuario 
FROM usuario
WHERE id_rol = 2 
  AND id_usuario NOT IN (SELECT id_usuario FROM entrenador);

INSERT INTO administrador (id_usuario)
SELECT id_usuario 
FROM usuario
WHERE id_rol = 1 
  AND id_usuario NOT IN (SELECT id_usuario FROM administrador);


-- Mensuales (70 soles)
INSERT INTO membresia (tipo_membresia, estado_membresia, fecha_inicio, fecha_vencimiento, id_entrenador, id_socio, monto_total) VALUES 
('Mensual', 1, '2026-06-01', '2026-07-01', 1, 1, 70.00),
('Mensual', 1, '2026-06-15', '2026-07-15', 2, 2, 70.00),
('Mensual', 0, '2026-04-01', '2026-05-01', 1, 3, 70.00),
('Mensual', 1, date('now'), date('now', '+1 month'), 1, 4, 70.00);

-- Trimestrales (150 soles)
INSERT INTO membresia (tipo_membresia, estado_membresia, fecha_inicio, fecha_vencimiento, id_entrenador, id_socio, monto_total) VALUES 
('Trimestral', 1, '2026-06-01', '2026-09-01', 2, 5, 150.00),
('Trimestral', 1, '2026-04-15', '2026-07-15', 1, 6, 150.00),
('Trimestral', 0, '2026-01-01', '2026-04-01', 2, 7, 150.00),
('Trimestral', 1, date('now'), date('now', '+3 months'), 2, 8, 150.00);

-- Anuales (500 soles)
INSERT INTO membresia (tipo_membresia, estado_membresia, fecha_inicio, fecha_vencimiento, id_entrenador, id_socio, monto_total) VALUES 
('Anual', 1, '2026-06-06', '2027-06-06', 1, 9, 500.00),
('Anual', 1, '2026-01-15', '2027-01-15', 2, 10, 500.00),
('Anual', 0, '2025-01-01', '2026-01-01', 1, 11, 500.00),
('Anual', 1, date('now'), date('now', '+1 year'), 1, 12, 500.00);


INSERT INTO clase (id_entrenador, nombre_clase, descripcion, dias_de_la_semana, hora_1, hora_2) VALUES 
(1, 'Spinning', 'Clase en bicicletas estáticas', 'Martes y Jueves', '10:30', '11:20'),
(1, 'Yoga', 'Clase de relajación y estiramientos', 'Lunes y Miércoles', '09:00', '10:00'),
(2, 'CrossFit', 'Entrenamiento funcional de alta intensidad', 'Lunes, Miércoles y Viernes', '18:00', '19:30'),
(2, 'Boxeo', 'Técnicas de boxeo y entrenamiento cardiovascular', 'Martes y Jueves', '19:00', '20:00'),
(1, 'Pilates', 'Mejora de la flexibilidad y fuerza central', 'Miércoles y Viernes', '11:00', '12:00'),
(2, 'Zumba', 'Baile y ejercicio cardiovascular', 'Lunes y Jueves', '20:00', '21:00'),
(1, 'Musculación', 'Entrenamiento con pesas y máquinas', 'Lunes a Viernes', '07:00', '08:30'),
(2, 'Funcional', 'Entrenamiento con peso corporal', 'Martes y Jueves', '17:00', '18:00');

 

-- Rutina para socio 3 (Pedro Ramírez) con entrenador 2 (María)
INSERT INTO rutina (id_entrenador, id_socio, nombre_rutina, descripcion, objetivo, estado_rutina) VALUES 
(2, 3, 'Rutina de piernas', 'Ejercicios enfocados en piernas cada 2 días', 'Aumentar peso', true),
(1, 4, 'Rutina de brazos', 'Ejercicios para fortalecer brazos y hombros', 'Tonificación', true),
(2, 5, 'Rutina de abdominales', 'Rutina para definir abdomen', 'Definición muscular', true),
(1, 6, 'Rutina de espalda', 'Ejercicios para fortalecer espalda', 'Mejorar postura', false),
(2, 1, 'Rutina full body', 'Entrenamiento completo del cuerpo', 'Condicionamiento general', true),
(1, 2, 'Rutina de cardio', 'Ejercicios cardiovasculares', 'Resistencia', true);

-- Trigger para evitar eliminar entrenadores con clases activas
-- CREATE TRIGGER IF NOT EXISTS proteger_entrenador_con_clases
-- BEFORE DELETE ON entrenador
-- FOR EACH ROW
-- BEGIN
--     SELECT CASE 
--         WHEN (SELECT COUNT(*) FROM clase WHERE id_entrenador = OLD.id_entrenador) > 0
--         THEN RAISE(ABORT, 'No se puede eliminar el entrenador porque tiene clases asignadas')
--     END;
-- END;

-- Vista que muestra información completa de socios
CREATE VIEW IF NOT EXISTS vista_socios_completa AS
SELECT 
    u.id_usuario,
    u.primer_nombre_usuario,
    u.segundo_nombre_usuario,
    u.apellidos_usuario,
    u.email,
    u.telefono,
    u.documento_identidad,
    u.estado,
    s.id_socio,
    m.tipo_membresia,
    m.estado_membresia,
    m.fecha_inicio,
    m.fecha_vencimiento,
    m.monto_total
FROM usuario u
LEFT JOIN socio s ON u.id_usuario = s.id_usuario
LEFT JOIN membresia m ON s.id_socio = m.id_socio
WHERE u.id_rol = 3;

-- vista de clase con el nombre del entrenador 
CREATE VIEW IF NOT EXISTS vista_clases_completa AS
SELECT 
    c.id_clase,
    c.nombre_clase,
    c.descripcion,
    c.dias_de_la_semana,
    c.hora_1,
    c.hora_2,
    u.primer_nombre_usuario || ' ' || u.apellidos_usuario as nombre_entrenador,
    u.email as email_entrenador
FROM clase c
JOIN entrenador e ON c.id_entrenador = e.id_entrenador
JOIN usuario u ON e.id_usuario = u.id_usuario;

-- vista de membresias proximas a perder 
CREATE VIEW IF NOT EXISTS vista_membresias_por_vencer AS
SELECT 
    s.id_socio,
    u.primer_nombre_usuario || ' ' || u.apellidos_usuario as nombre_socio,
    u.email,
    m.tipo_membresia,
    m.fecha_vencimiento,
    julianday(m.fecha_vencimiento) - julianday(date('now')) as dias_restantes,
    m.monto_total
FROM membresia m
JOIN socio s ON m.id_socio = s.id_socio
JOIN usuario u ON s.id_usuario = u.id_usuario
WHERE m.estado_membresia = 1 
  AND m.fecha_vencimiento >= date('now')
ORDER BY dias_restantes ASC;