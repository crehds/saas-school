# Variables de entorno

Esta tabla lista las variables que configuran la aplicación en cada ambiente. Dice dónde vive cada valor y quién lo conoce. **Nunca contiene valores**: el repositorio es público.

## Ambientes

- **Local:** tu máquina. Los valores van en tu archivo `.env`, que nunca se sube.
- **Preview:** el entorno que se crea para cada PR.
- **Producción:** el entorno que usa el colegio.

## Variables de la API

| Variable | Para qué sirve | ¿Secreta? | Local | Preview | Producción | Quién conoce el valor |
| --- | --- | --- | --- | --- | --- | --- |
| `DATABASE_URL` | URL de conexión a PostgreSQL | Sí | `.env` | Railway | Railway | Local: cada desarrollador el suyo. Preview y producción: solo el responsable |
| `SESSION_SECRET` | Clave para firmar sesiones | Sí | `.env` | Railway | Railway | Local: cada desarrollador el suyo. Preview y producción: solo el responsable |
| `ADMIN_INITIAL_PASSWORD` | Contraseña inicial del administrador | Sí | `.env` | Railway | Railway | Local: cada desarrollador el suyo. Preview y producción: solo el responsable |
| `LOGIN_MAX_ATTEMPTS` | Número máximo de intentos de inicio de sesión | No | `.env` | Railway | Railway | No es secreto: lo conoce todo el equipo |
| `SESSION_IDLE_TIMEOUT_MINUTES` | Minutos de inactividad tras los cuales se cierra la sesión | No | `.env` | Railway | Railway | No es secreto: lo conoce todo el equipo |
