# Endpoints del Backend - Documentación

## Endpoints Implementados ✅

### 1. Registro de Usuario
- **Método**: POST
- **URL**: `/api/auth/register`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "nombre": "string (mín 2 caracteres)",
  "email": "string (formato válido, único)",
  "password": "string (mín 6 caracteres)",
  "telefono": "string (mín 8 dígitos)",
  "edad": "number (1-120)"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "string",
      "nombre": "string",
      "email": "string",
      "telefono": "string",
      "edad": "number",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "token": "string"
  }
}
```

### 2. Login de Usuario
- **Método**: POST
- **URL**: `/api/auth/login`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "string",
      "nombre": "string",
      "email": "string",
      "telefono": "string",
      "edad": "number"
    },
    "token": "string"
  }
}
```

## Endpoints Faltantes ❌

### 3. Perfil de Usuario (Protegido)
- **Método**: GET
- **URL**: `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "data": {
    "id": "string",
    "nombre": "string",
    "email": "string",
    "telefono": "string",
    "edad": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Implementación Sugerida para el Endpoint Faltante

### En tu backend Express + TypeScript:

```typescript
// Middleware de autenticación
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acceso requerido' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }
    req.user = user;
    next();
  });
};

// Endpoint de perfil
app.get('/api/auth/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    
    // Buscar usuario en la base de datos
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Perfil obtenido exitosamente',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});
```

## Estado Actual del Frontend

El frontend está configurado para funcionar con los endpoints existentes:

1. ✅ **Registro**: Funciona correctamente
2. ✅ **Login**: Funciona correctamente  
3. ⚠️ **Perfil**: Funciona con datos locales (sin endpoint del backend)

### Comportamiento Actual del Perfil:
- Muestra la información del usuario guardada localmente
- No hace llamadas al backend para obtener datos actualizados
- Incluye un mensaje informativo sobre la fuente de los datos

### Para Activar el Endpoint de Perfil:
1. Implementa el endpoint `/api/auth/profile` en tu backend
2. Descomenta el código en `profile.component.ts` que usa `GetProfileUseCase`
3. El frontend automáticamente usará el endpoint del backend

## Configuración del Frontend

- **Base URL**: `http://localhost:3000/api`
- **Autenticación**: JWT Bearer Token
- **Headers**: `Content-Type: application/json`
- **Token Storage**: localStorage
