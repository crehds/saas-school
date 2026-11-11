# Cómo trabajamos en Saas School

Esta guía reúne lo que necesitas para trabajar en el proyecto: cómo se organiza el trabajo, las convenciones, cuándo una tarea está terminada, cómo se revisa tu trabajo y las reglas del dominio que ya están decididas. Las historias de GitHub hacen referencia a esta guía. Si algo no está claro, pregunta en el issue o en el check-in semanal.

Saas School es un sistema para colegios. El MVP funciona para **un solo colegio piloto**: los alumnos consultan sus notas, su horario y los avisos de sus clases; los profesores registran notas y publican avisos; el administrador carga los datos del colegio.

## Cómo se organiza el trabajo

- **Épicas:** grandes bloques del proyecto, de E0 a E6. Cada una corresponde a un milestone en GitHub.
- **Historias:** issues con el label `historia` y un título como `[E1-H02] Iniciar sesión con username y contraseña`. Cada historia es un corte vertical (datos, API y pantalla) que se puede demostrar en el deploy de preview.
- **Subtareas:** sub-issues de cada historia, con títulos como `[E1-H02-T03] ...`. Cada subtarea dura como máximo 4 horas y se cierra con **un PR pequeño** o con **una nota escrita** en el issue (las de tipo Investigación).
- **Tareas del responsable:** issues con el label `responsable` y un título como `[R05] ...`. Son el trabajo de infraestructura que prepara el responsable. Algunas historias dependen de ellas y lo indican en su sección "Dependencias".

### Labels

| Label | Significado |
| --- | --- |
| `historia`, `subtarea` | Tipo de issue |
| `bloqueo` | Estás bloqueado y necesitas ayuda |
| `bug` | Algo no funciona como se espera |
| `responsable` | Tarea del responsable |
| `prioridad:imprescindible` | Entra en el entregable de 6 meses |
| `prioridad:importante`, `prioridad:deseable` | Fase 2 |
| `talla:xs`, `talla:s`, `talla:m`, `talla:l` | Hasta 2, 4, 8 y 16 horas |
| `guia:alta`, `guia:media`, `guia:baja` | Nivel de guía de las pistas |
| `area:front`, `area:back`, `area:db`, `area:infra`, `area:docs` | Área del trabajo |

### Tablero (GitHub Projects "MVP")

| Columna | Quién mueve la tarjeta | Qué significa |
| --- | --- | --- |
| Backlog | Automático | Publicada; todavía no se puede empezar |
| Ready | El responsable | Lista para empezar: sus dependencias están hechas |
| In progress | Tú | La estás trabajando |
| In review | Tú, al abrir el PR | El responsable revisa el código |
| Testing | El responsable | El responsable prueba los criterios de aceptación en el preview |
| Done | Al fusionar el PR | Entregada |

Trabaja en una subtarea a la vez: termina antes de empezar otra.

## Niveles de guía

Cada historia indica su nivel de guía en la sección "Pistas":

- **Alta:** objetivo, pasos sugeridos, capas o archivos involucrados, recursos concretos y un ejemplo análogo.
- **Media:** objetivo, enfoque general y recursos.
- **Baja:** objetivo y criterios de aceptación.

Las pistas **nunca** te dan el código ni la solución: te señalan qué investigar y qué preguntarte. El nivel de guía es por área (front, back, base de datos, etc.) y cambia con tus entregas:

- **Baja un nivel** después de 2 entregas seguidas en esa área con autonomía "Cumple" o mejor y como máximo una ronda de revisión.
- **Sube un nivel** si pasas más de 4 horas bloqueado sin pedir ayuda o si una entrega necesita 2 o más rondas de retrabajo.

## Convenciones

- **Ramas:** `feat/e1-h02-t03-descripcion-corta`.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
- **PR:** un PR pequeño por subtarea, hacia `main`, con la plantilla de PR completa y `Closes #<número>` de la subtarea. `main` está protegida: el PR necesita el CI en verde y la aprobación del responsable.
- **Horas reales:** las registras en la descripción del PR. Sirven para comparar con la estimación y mejorar los planes, no para evaluarte.
- **Repositorio público:** nunca subas secretos, contraseñas ni datos reales. Los seeds usan datos ficticios.

## Cómo probar

Las pruebas de tu código son parte de cada subtarea, igual que el código. El responsable escribe las pruebas de punta a punta (Playwright) y las de seguridad, y revisa las tuyas en cada PR.

- **Herramientas:** [Vitest](https://vitest.dev/guide/) para tus pruebas y [Supertest](https://github.com/forwardemail/supertest) para los endpoints de la API.
- **Qué pruebas:** cada criterio de aceptación de la API o de la lógica (cálculos, validaciones, transformaciones de datos) tiene al menos una prueba, también el escenario de error. Las pantallas no llevan pruebas tuyas: las cubren las pruebas de punta a punta del responsable.
- **Dónde:** dentro de su carpeta (`api/` o `web/`), en archivos que terminan en `.test.js`.
- **Cuándo:** ejecuta `npm test` dentro de la carpeta antes de abrir el PR; el CI corre el mismo comando.
- **Cómo saber si una prueba sirve:** rompe a propósito el código que verifica y comprueba que la prueba falla.

## Definition of Done

- [ ] Se cumplen todos los criterios de aceptación de la historia.
- [ ] Cada criterio de aceptación de la API o de la lógica tiene su prueba, incluido el escenario de error, y las pruebas pasan en el CI (ver "Cómo probar").
- [ ] El CI está en verde.
- [ ] El deploy de preview funciona y la funcionalidad se puede demostrar.
- [ ] El PR es pequeño, tiene descripción y cierra su issue.
- [ ] No hay código comentado ni `console.log` de depuración.
- [ ] Las horas reales están registradas en el PR.
- [ ] El responsable revisó y aprobó el PR con la rúbrica de revisión y, cuando aplica, con la lista de seguridad.

## Cómo se revisa tu trabajo

### Rúbrica de revisión

Cada PR se revisa con seis criterios, con puntaje 1 (No cumple), 2 (Cumple) o 3 (Supera):

| Criterio | Qué se mira |
| --- | --- |
| Funcionalidad | Se cumplen los criterios de aceptación en el preview |
| Calidad de código | Nombres claros, capas separadas, código simple |
| Pruebas | Cada criterio de aceptación de la API o de la lógica tiene su prueba, incluido el escenario de error, y la prueba falla si se rompe el código que verifica |
| Git y PR | Commits convencionales, descripción completa, PR pequeño |
| Comunicación | Avisaste de los bloqueos a tiempo y con contexto |
| Autonomía | Resolviste con las pistas y la documentación |

La revisión también registra las horas estimadas y reales y las rondas de revisión, y termina con una devolución: una fortaleza, una mejora y un recurso para estudiar.

### Lista de seguridad

Es obligatoria en las historias de autenticación, permisos o datos personales. Las historias indican qué ítems se revisan con más atención.

1. Las contraseñas se guardan con un hash adaptativo (bcrypt o argon2); nunca en texto plano ni en logs.
2. El inicio de sesión responde con un mensaje genérico y no revela si el usuario existe.
3. La cookie de sesión es `httpOnly`, `secure` en producción y tiene `sameSite` definido (`express-session` no activa `secure` ni `sameSite` por defecto).
4. Las sesiones se guardan en PostgreSQL, nunca en `MemoryStore`.
5. La sesión se regenera al iniciar sesión y se destruye al cerrarla.
6. Hay un límite de intentos de inicio de sesión.
7. Cada endpoint valida los datos de entrada en el backend.
8. Los permisos por rol se comprueban en el backend, no solo ocultando botones en el frontend.
9. Toda consulta de datos del colegio filtra por `school_id`.
10. Los secretos viven en variables de entorno; el repositorio es público y nunca contiene secretos ni datos reales.
11. Las peticiones que cambian datos están protegidas contra CSRF (peticiones falsificadas desde otro sitio que aprovechan la cookie de sesión), con la estrategia aprobada en E1-H01-T01.

## Ritmo de seguimiento y cómo pedir ayuda

- **Check-in semanal** de 30 minutos con el responsable.
- **Al final de cada sesión de trabajo**, deja un comentario en el issue: qué hiciste, qué sigue y qué te bloquea.
- **Si llevas 2 horas atascado**, abre un issue con la plantilla de bloqueo. Pedir ayuda a tiempo es parte del trabajo y cuenta a favor en la rúbrica.

## Stack y decisiones técnicas

| Tema | Decisión |
| --- | --- |
| Lenguaje | JavaScript (sin TypeScript) |
| Frontend (`web/`) | React + Vite como SPA, TanStack Router, TanStack Query; Zustand solo cuando una historia necesite estado de interfaz |
| Backend (`api/`) | Express con arquitectura por capas: rutas, controladores, servicios y acceso a datos |
| Base de datos | PostgreSQL con Sequelize v6. Todas las tablas se crean con migraciones de `sequelize-cli`; nunca con `sync()` |
| Autenticación | Passport (`passport-local`) + `express-session`, con las sesiones guardadas en PostgreSQL |
| Repositorio | Monorepo `saas-school` con las carpetas `web/` y `api/`, cada una con su `package.json` |
| Despliegue | Frontend en Cloudflare y API en Railway, con un deploy de preview por PR. La infraestructura la administra el responsable |
| Pruebas | Las de tu código las escribes tú con Vitest (y Supertest en la API) en cada subtarea; las de punta a punta (Playwright) y las de seguridad las escribe el responsable. Todas corren en el CI |

## Reglas del dominio

Son decisiones ya tomadas. Cada historia repite las que necesita.

- **Un colegio piloto, modelo preparado para varios:** toda tabla que pertenece a un colegio tiene `school_id` y toda consulta filtra por el colegio de la sesión. El MVP no tiene funciones para gestionar varios colegios.
- **Roles:** administrador, profesor y alumno. No hay registro abierto: las cuentas las crea el administrador.
- **Usernames:** los genera el backend y nunca se reutilizan ni contienen datos personales. Alumnos: `<código del colegio>-<año de ingreso>-<correlativo>` (por ejemplo `PIL-26-0042`). Personal: `<código del colegio>-<correlativo>` (por ejemplo `PIL-0007`).
- **Contraseña temporal:** el sistema la genera al crear o resetear un usuario y se la muestra una sola vez al administrador. El usuario debe cambiarla en su primer inicio de sesión. No hay correo: si alguien olvida su contraseña, la resetea el administrador.
- **Política de contraseñas:** mínimo de 12 caracteres para administradores, 10 para profesores y 8 para alumnos; máximo de al menos 64; sin reglas de composición; se rechazan las contraseñas comunes; hay límite de intentos fallidos.
- **Bajas:** los usuarios nunca se borran. Se desactivan (no pueden iniciar sesión y se cierran sus sesiones) y se reactivan con el mismo username e historial. No se usa el modo `paranoid` de Sequelize en usuarios.
- **Perfil:** cada usuario solo puede cambiar su propia contraseña. Nombres, rol y sección los cambia el administrador.
- **Modelo académico:** año escolar → nivel → grado → sección. Los cursos se definen por grado. Un curso en una sección es una **clase** y tiene un profesor asignado; ahí viven las notas y los avisos. Cada alumno pertenece a una sección en un año escolar. No hay flujo de matrícula.
- **Carga de datos:** la estructura, los alumnos y los horarios se importan desde CSV con validación y reporte de errores. Después de importar alumnos, el administrador descarga **una sola vez** la lista de usernames y contraseñas temporales.
- **Horario de timbres del piloto:** de lunes a viernes, 7 horas de 45 minutos y 2 recreos de 15: 1.ª 7:45-8:30, 2.ª 8:30-9:15, recreo 9:15-9:30, 3.ª 9:30-10:15, 4.ª 10:15-11:00, 5.ª 11:00-11:45, recreo 11:45-12:00, 6.ª 12:00-12:45, 7.ª 12:45-13:30.
- **Notas:** escala de 0 a 20 y 4 bimestres. Por curso y bimestre, el profesor registra tres componentes enteros de 0 a 20 (tareas, exámenes e intervenciones en clase) y un cuadro de puntos enteros. Nota del bimestre = promedio de los tres componentes + puntos, con tope en 20, mostrada como entero (el .5 redondea hacia arriba). El alumno ve sus notas en cuanto el profesor las guarda, marcadas como parciales mientras el bimestre está en curso.
- **Avisos:** solo texto y enlaces, sin archivos adjuntos. El alumno los ve al entrar al sistema.
