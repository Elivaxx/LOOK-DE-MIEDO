# Look de Miedo

Guía de looks de Halloween para España, pieza a pieza. Monetizada con enlaces de
afiliado de Amazon y con recompensas de Prime Video Channels.

**Objetivo declarado de esta temporada: conseguir las 3 ventas que aprueban la
cuenta de Afiliados.** No facturar. La API desbloquea fotos y precios en todas
las webs del workspace, y vale más que cualquier comisión de octubre.

## Antes de tocar nada

| Documento | Qué es |
|---|---|
| [`docs/BRIEFING.md`](docs/BRIEFING.md) | La Fase 0 completa y cerrada. **Manda sobre todo lo demás** |
| [`docs/KICKOFF-CONSTRUCCION.md`](docs/KICKOFF-CONSTRUCCION.md) | El mensaje para el chat de Construcción |
| [`docs/KICKOFF-MARKETING.md`](docs/KICKOFF-MARKETING.md) | El de Marketing. Solo cuando Construcción confirme las rutas |
| `docs/marca.html` · `docs/prompts.html` · `docs/cuentas.html` | Sistema de marca, kit de generación y alta de cuentas |
| `docs/sala-de-operaciones.html` | La consola del proyecto, con la bitácora compartida |

## La restricción que da forma a todo

**La cuenta de Afiliados no está aprobada, así que no hay PA API.** Sin PA API no
hay fotos de producto, ni precios, ni valoraciones. Eso no es un detalle legal:
define que esto sea una guía editorial y no un escaparate.

- Ninguna imagen de Amazon, por ninguna vía *(Licencia 1, 2(h), 6(b))*
- Cero precios *(Requisito 2(b))* y cero valoraciones *(Requisito 6(t))*
- Jamás recorrer Amazon con automatización *(Licencia 1, Términos de Agente §4)*
- Divulgación literal: «Como Afiliado de Amazon, gano por compras elegibles.»

## La web

```bash
npm install
npm run dev        # http://localhost:3000
npm run comprobar  # las tres puertas: guardarraíl + build + verificación
```

La app de Next vive **en la raíz del repo** a propósito: así Vercel la detecta sin
tener que configurar `Root Directory` en cada proyecto. Los documentos del
proyecto están en `docs/`.

### Las tres puertas

1. **`npm run probar`** — mete al guardarraíl las frases reales que hubo que
   limpiar en la web anterior y comprueba que las rechaza, sin bloquear el copy
   legítimo.
2. **`npm run build`** — `validarCatalogo()` corre al cargar el módulo, así que
   **un dato prohibido revienta el build**: precios, valoraciones, superlativos,
   testimonios falsos, ASIN inválidos, fichas sin marca o modelo.
3. **`npm run verificar [url]`** — asierta sobre el HTML servido: tag en cada
   enlace, `nofollow`, sin imágenes de Amazon, divulgación presente. Contra
   producción, no contra capturas.

### Por qué el catálogo está vacío

`LOOKS = []` es deliberado. Un producto sin marca, modelo y ASIN reales no entra.
En la web hermana se cargaron 99 con nombres genéricos y 34 siguen bloqueando la
conversión meses después. Esos datos los aporta una persona: la ficha de siete
casillas está en `prompts.html`.

## Estructura

```
src/afiliados/enlace.ts   ← el punto de paso único del tag. Va antes que nada
src/looks/looks.ts        ← datos + el guardarraíl del catálogo
src/compartido/           ← ProductoImagen y el símbolo
src/app/                  ← rutas
scripts/                  ← verificar.mjs y probar-guardarrail.mjs
docs/                     ← BRIEFING, marca, prompts, cuentas, kickoffs
```

El tag se aplica **dentro de la capa de datos**, nunca en las vistas: así no hay
forma de escribir un enlace sin él aunque se quiera.
