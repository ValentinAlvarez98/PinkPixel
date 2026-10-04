# Pink Pixel — Next.js + Cloudflare

Landing full-stack de Pink Pixel construida con Next.js 16 (App Router), preparada para Cloudflare Workers mediante OpenNext y con D1 para catálogo y métricas.

## Incluye

- Hero con carrusel, tres diferenciales, galería filtrable y lightbox.
- Catálogo administrable con consultas específicas por WhatsApp.
- Sección personal y formulario de contacto por correo.
- Panel `/admin` con usuario, contraseña hasheada y sesiones revocables para catálogo y métricas.
- API Next.js con validación de runtime, SQL parametrizado y rutas administrativas protegidas.
- Métricas propias sin cookies, IP, email ni identificadores personales.
- SEO técnico: Metadata API, canonical, Open Graph, JSON-LD, sitemap, robots y manifest.
- CSP con nonce, headers de seguridad y assets locales sin scripts de terceros.

## Desarrollo local

```powershell
npm install
Copy-Item .dev.vars.example .dev.vars
npm run db:migrate:local
npm run admin:password:local
npm run dev
```

El comando de contraseña pregunta el valor dos veces sin mostrarlo en pantalla. No lo recibe como argumento ni lo escribe en archivos del proyecto. La credencial se deriva con PBKDF2-HMAC-SHA256 y 600.000 iteraciones; D1 guarda únicamente un verificador HMAC con salt aleatorio.

## Despliegue gratuito en Cloudflare

1. Autenticarse:

```powershell
npx wrangler login
```

2. Crear D1:

```powershell
npx wrangler d1 create pinkpixel-db
```

3. Copiar el `database_id` devuelto y reemplazar el UUID de ceros en `wrangler.jsonc`.

4. Aplicar la migración en producción:

```powershell
npm run db:migrate:remote
```

5. Crear o actualizar la credencial administrativa en D1. Ingresar de forma interactiva la contraseña elegida:

```powershell
npm run admin:password:remote
```

Este paso también revoca todas las sesiones anteriores. La contraseña en texto plano nunca se envía como argumento de consola ni se guarda en el repositorio.

6. Desplegar:

```powershell
npm run deploy
```

7. En **Workers & Pages → pinkpixel-uy → Settings → Domains & Routes**, agregar `pinkpixel.uy` como Custom Domain. Si el dominio todavía apunta a Vercel, quitar el registro anterior cuando Cloudflare muestre el nuevo dominio como activo.

## Panel y API

- Panel: `/admin`
- Catálogo público: `GET /api/catalog`
- Alta: `POST /api/catalog`
- Edición: `PATCH /api/catalog/:id`
- Baja lógica: `DELETE /api/catalog/:id`
- Registrar evento: `POST /api/metrics`
- Resumen de 30 días: `GET /api/metrics`

Las rutas administrativas validan la sesión en el servidor. Durante el login, el navegador deriva la credencial con Web Crypto antes de enviarla para que el Worker mantenga un uso de CPU compatible con la capa gratuita; esa credencial no se persiste. El navegador recibe un identificador aleatorio en una cookie `HttpOnly`, `SameSite=Strict` y `Secure` sobre HTTPS; D1 guarda solamente su hash. Las operaciones que modifican el catálogo también requieren un token CSRF ligado a la sesión y validación de mismo origen. La sesión vence a las 8 horas y cinco intentos fallidos bloquean temporalmente el acceso durante 15 minutos.

La cuenta administrativa configurada por el script es `maru.pink.pixel`. Para rotar su contraseña, volver a ejecutar `npm run admin:password:remote`.

## Verificación

```powershell
npm run build
npx opennextjs-cloudflare build
npm audit
```

El proyecto desactiva la optimización de imágenes en runtime porque las fotos ya están optimizadas en WebP. Esto evita depender de Cloudflare Images y mantiene el despliegue dentro de servicios gratuitos.
