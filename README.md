# PWCC Casilla Golf - Sistema de Gestión

Sistema web para la gestión de casillas de golf del Prince of Wales Country Club.

## Características

- **Autenticación de usuarios** con diferentes roles
- **Búsqueda avanzada** por nombre, apellido, número de socio, o ubicación
- **Base de datos** con información de aproximadamente 1100 socios
- **Bot de cambios** para modificar la base de datos mediante instrucciones en lenguaje natural
- **Panel de administración** para gestionar usuarios
- **Interfaz responsiva** compatible con diferentes dispositivos

## Usuarios del Sistema

### Usuario Regular 1
- Usuario: `Casillapwcc1`
- Contraseña: `PWCC1925`

### Usuario Regular  Ordinary english phrase.-->

## Instalación y Configuración

### Requisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Instalación de Dependencias

```bash
npm install
```

### Archivos Necesarios

Antes de ejecutar el sistema, necesitas agregar los siguientes archivos en la carpeta `public/`:

1. **logo.png** - Logo del Prince of Wales Country Club
2. **golf-background.jpg** - Imagen de fondo con el campo de golf

### Base de Datos

El archivo `data/members.json` contiene la información de los socios. Actualmente contiene una muestra de 20 socios para pruebas. Para agregar todos los socios (~1100):

1. Exportar los datos del Google Sheets a formato CSV o Excel
2. Usar un script de conversión para transformar los datos al formato JSON requerido
3. Reemplazar el archivo `data/members.json` con los datos completos

### Formato de Datos de Socios

```json
{
  "numeroSocio": "1234",
  "nombres": "Nombre Completo del Socio",
  "apellido": "Apellido",
  "elemento": "Bolso | CM | CMB | CEB",
  "ubicacion": "Pasillo A-1",
  "observacion": "Notas adicionales"
}
```

## Ejecutar el Sistema

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El sistema estará disponible en `http://localhost:3000`

### Acceso desde la Red Local

Para acceder desde otros dispositivos en la misma red:

1. Descubre tu dirección IP local:
   - Windows: `ipconfig` en CMD
   - Mac/Linux: `ifconfig` en terminal

2. Accede desde otros dispositivos usando: `http://[TU_IP]:3000`

## Uso del Sistema

### Iniciar Sesión
1. Ingresa tu usuario y contraseña
2. Haz clic en "Iniciar Sesión"

### Buscar Socios
1. Ingresa el término de búsqueda en el campo de búsqueda
2. Selecciona el tipo de búsqueda (nombre, apellido, número de socio, ubicación)
3. Haz clic en "Buscar" o presiona Enter
4. Los resultados se mostrarán en la tabla

### Realizar Cambios en la Base de Datos
1. Haz clic en el botón "Cambio Base de Datos PWCC Golf"
2. Escribe el cambio que deseas realizar en lenguaje natural
3. Ejemplo: "Cambiar locker de Felipe Martinez (N° socio 1234) del locker A-1 al locker B-16"
4. El bot procesará la solicitud y mostrará el resultado

### Administrar Usuarios (solo Admin)
1. Haz clic en "Gestionar Usuarios"
2. Para agregar un usuario:
   - Ingresa nombre de usuario
   - Ingresa contraseña
   - Selecciona el rol (Usuario o Administrador)
   - Haz clic en "Agregar Usuario"
3. Para eliminar un usuario:
   - Haz clic en "Eliminar" junto al usuario
   - Confirma la eliminación

## Datos Faltantes Identificados

Al analizar la hoja de cálculo, se identificaron los siguientes datos faltantes o incompletos:

### 1. Información de Contacto de Socios
- **Faltante**: Teléfonos, emails, direcciones
- **Situación**: Solo se cuenta con nombres, números de socio y ubicaciones
- **Impacto**: No es crítico para la gestión de casillas, pero podría ser útil para comunicación

### 2. Fechas de Asignación
- **Faltante**: Fecha en que se asignó la casilla a cada socio
- **Situación**: No hay información sobre cuándo se asignó cada locker
- **Impacto**: Bajo, no afecta la funcionalidad principal

### 3. Historial de Cambios
- **Faltante**: Registro de cambios anteriores de ubicación
- **Situación**: No hay historial de asignaciones pasadas
- **Impacto**: Medio, dificulta rastrear cambios históricos

### 4. Estado de Pago/Membresía
- **Faltante**: Estado de membresía activa o inactiva
- **Situación**: No hay indicador claro del estado de la membresía
- **Impacto**: Medio, podría ser útil para identificar casillas disponibles

### 5. Dimensiones/Estructura de Casillas
- **Faltante**: Información sobre las características físicas de cada locker (tamaño, tipo)
- **Situación**: Solo se cuenta con ubicaciones
- **Impacto**: Bajo para búsqueda, pero podría ser útil para asignaciones

### 6. Fotografías
- **Faltante**: Fotos de los lockers o marcas identificatorias
- **Situación**: No hay imágenes de referencia
- **Impacto**: Bajo a medio, ayuda en identificación visual

### 7. Datos de Elementos Guardados
- **Faltante**: Lista detallada de lo que está guardado en cada casilla (clubs específicos, accesorios)
- **Situación**: Solo se especifica el tipo (Bolso, CM, CMB, CEB)
- **Impacto**: Bajo para la búsqueda principal

## Recomendaciones

1. **Agregar campo de estado**: Incluir un campo "estado" (Activo, Inactivo, Retirado) para cada socio
2. **Fechas de asignación**: Agregar campo de fecha de última asignación/actualización
3. **Contacto de emergencia**: Incluir teléfono de contacto si se requiere
4. **Categorización de lockers**: Especificar si los lockers son grandes, pequeños, dobles, etc.

## Estructura del Proyecto

```
pwcc-casilla-golf/
├── data/
│   ├── members.json       # Base de datos de socios
│   └── users.json         # Base de datos de usuarios
├── public/
│   ├── index.html         # Interfaz principal
│   ├── styles.css         # Estilos
│   ├── script.js          # Lógica del frontend
│   ├── logo.png           # Logo PWCC (agregar)
│   └── golf-background.jpg # Imagen de fondo (agregar)
├── server.js              # Servidor Express
├── package.json           # Dependencias
└── README.md              # Este archivo
```

## Seguridad

- Las contraseñas están almacenadas en texto plano en `data/users.json`. Para un entorno de producción, se recomienda usar bcrypt.
- El sistema actualmente solo permite acceso desde la red local. Para acceso externo, se requiere configuración adicional de seguridad.

## Soporte

Para problemas o consultas, contactar al administrador del sistema.

## Contacto PWCC

- **Dirección**: Las Arañas 1901, Santiago de Chile, La Reina, Región Metropolitana
- **Teléfono**: +56 2 2757 5700

---

© 2025 Prince of Wales Country Club. Todos los derechos reservados.

