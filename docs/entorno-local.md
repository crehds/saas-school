# Guía del entorno local

Esta guía te lleva desde una máquina Windows sin nada instalado hasta una base de datos PostgreSQL local lista para el proyecto. Es la base de E0-H01-T01. Síguela en orden. Si ya instalaste alguna herramienta, no la reinstales: ejecuta la comprobación de su sección y continúa si el resultado coincide.

Usa **PowerShell** para todos los comandos: es la terminal por defecto de Windows y de VS Code. Cuando una tarea pida evidencia, pega en el issue la salida de las comprobaciones y **nunca** pegues contraseñas.

## 1. Herramientas

| Herramienta | Versión | Descarga |
| --- | --- | --- |
| Node.js | 24 o superior, siempre una versión LTS | https://nodejs.org |
| Git | La más reciente | https://git-scm.com/downloads |
| Visual Studio Code | La más reciente | https://code.visualstudio.com |
| PostgreSQL | 18 | Sección 2 |

Instala Node.js, Git y VS Code con sus instaladores y las opciones por defecto. Después configura tu identidad en Git, que aparece en cada commit:

```powershell
git config --global user.name "Tu nombre"
git config --global user.email "el-correo-de-tu-cuenta-de-github@ejemplo.com"
```

**Comprobación** (en una terminal nueva, abierta después de instalar):

```powershell
node -v          # v24.x o superior
npm -v
git --version
code --version
```

## 2. PostgreSQL 18

PostgreSQL es un **servidor**: un programa que queda corriendo en segundo plano como servicio de Windows y escucha conexiones en el puerto 5432. `psql` es el **cliente** con el que te conectas a ese servidor desde la terminal. Instalar PostgreSQL te da el servidor; las bases de datos se crean después, dentro de él (sección 3).

1. Descarga el instalador de EDB desde https://www.postgresql.org/download/windows/ y elige la versión **18**.
2. En **Select Components**, deja marcados PostgreSQL Server, pgAdmin 4 y Command Line Tools. Stack Builder no hace falta.
3. La contraseña que te pide es la del superusuario `postgres`. Guárdala en un gestor de contraseñas: nunca va en el repositorio ni en un issue.
4. Deja el puerto en **5432** y la configuración regional por defecto.
5. Al terminar, desmarca la opción de abrir Stack Builder.

El instalador **no agrega `psql` al PATH**, así que la terminal todavía no lo encuentra. Agrégalo a tu PATH de usuario:

```powershell
$bin = "C:\Program Files\PostgreSQL\18\bin"
$path = [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", "$path;$bin", "User")
```

**Comprobación** (en una terminal **nueva**):

```powershell
psql --version   # psql (PostgreSQL) 18.x
```

pgAdmin 4 queda instalado como herramienta visual para mirar tablas y datos. Es opcional: esta guía usa `psql`.

## 3. La base de datos del proyecto

El proyecto no usa el superusuario `postgres`: tiene su propio usuario, dueño de su propia base. Así la aplicación solo puede tocar lo suyo (mínimo privilegio) y la conexión tiene la misma forma que en producción.

Conéctate como `postgres`, con la contraseña del instalador:

```powershell
psql -h localhost -U postgres
```

Dentro de `psql` (el indicador cambia a `postgres=#`), ejecuta:

```sql
CREATE ROLE saas_school LOGIN;
\password saas_school
CREATE DATABASE saas_school_dev OWNER saas_school TEMPLATE template0 ENCODING 'UTF8';
\q
```

- `\password` te pide la contraseña nueva sin mostrarla, para que no quede en el historial ni en una captura. Elige una contraseña solo para tu máquina y guárdala en tu gestor de contraseñas.
- `ENCODING 'UTF8'` hace que las tildes y la ñ se guarden correctamente.

**Comprobación:**

```powershell
psql -h localhost -U saas_school -d saas_school_dev -c "SELECT current_user, current_database();"
```

Resultado esperado:

```
 current_user | current_database
--------------+------------------
 saas_school  | saas_school_dev
```

## 4. El archivo `.env` (desde E0-H03)

La aplicación lee los datos de conexión de variables de entorno. En la carpeta `api/` hay dos archivos con roles distintos:

- `.env.example` **se sube**: lista las variables que necesita el proyecto, con valores de ejemplo.
- `.env` **nunca se sube**: tiene tus valores reales, como la contraseña de la sección 3. `.gitignore` lo excluye.

Desde la raíz del repositorio, copia el ejemplo y completa `api/.env` con el usuario, la contraseña y la base de la sección 3:

```powershell
Copy-Item api/.env.example api/.env
```

**Comprobación** (debe imprimir `api/.env`; si no imprime nada, **no hagas commit** y avisa en el issue):

```powershell
git check-ignore api/.env
```

## 5. Migraciones y seeds (desde E0-H04)

Las **migraciones** crean y modifican las tablas paso a paso. Los **seeds** cargan datos de prueba, y en este proyecto son siempre ficticios.

```powershell
npx sequelize-cli db:migrate        # aplica las migraciones pendientes
npx sequelize-cli db:seed:all       # carga los seeds
npx sequelize-cli db:migrate:undo   # revierte la última migración
```

**Comprobación** (lista las tablas creadas por las migraciones):

```powershell
psql -h localhost -U saas_school -d saas_school_dev -c "\dt"
```

## 6. Escribe pensando en Linux

Tú trabajas en Windows, pero el CI y el servidor de producción corren en Linux. Algunas cosas que Windows tolera fallan en Linux, y el error aparece recién en el CI o en el deploy:

| Regla | Por qué |
| --- | --- |
| Nombres de archivo en minúsculas (`user-service.js`) y cada import con el nombre exacto | Windows encuentra `./Models/User` aunque el archivo sea `./models/user.js`; Linux no |
| Rutas con `path.join(...)`, nunca con `\` ni con rutas de tu máquina (`C:\Users\...`) | Linux separa las carpetas con `/` y no tiene `C:` |
| Scripts de `package.json` sin comandos propios de una terminal (`export`, `set`, `rm -rf`); las variables van en `.env` | `npm run` usa cmd en Windows y sh en Linux |
| Para cambiar solo mayúsculas en un nombre, `git mv viejo.js Nuevo.js` | Windows no distingue mayúsculas y Git no ve el cambio |

Los finales de línea ya están resueltos: `.gitattributes` hace que Git guarde los archivos con LF en todos los sistemas. Si Git te avisa que `CRLF will be replaced by LF`, es lo esperado.

## 7. Problemas comunes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| `psql` no se reconoce como comando | `psql` no está en el PATH, o la terminal se abrió antes de agregarlo | Repite el paso del PATH de la sección 2 y abre una terminal nueva |
| Falla la autenticación (`password authentication failed`) | Contraseña incorrecta | Para `postgres` es la del instalador; para `saas_school`, la que pusiste con `\password` |
| No se puede conectar al servidor (`connection refused`) | El servicio de PostgreSQL está detenido | `Get-Service postgresql*` muestra su nombre y estado; para iniciarlo, `Start-Service <nombre>` en una terminal de administrador |
| Advertencia de code page al abrir `psql` (`Console code page (850) differs from Windows code page (1252)`) | La consola de Windows usa otra codificación | Ejecuta `chcp 1252` antes de `psql` |
| `npx.ps1` no se puede cargar porque la ejecución de scripts está deshabilitada | La política de ejecución de PowerShell bloquea los scripts | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| El instalador propone el puerto 5433 | Ya hay otro PostgreSQL instalado | Avisa en el issue antes de seguir |

Si una comprobación no da el resultado esperado y esta tabla no lo resuelve, abre un issue de bloqueo (label `bloqueo`) con la salida completa del comando, sin contraseñas.
