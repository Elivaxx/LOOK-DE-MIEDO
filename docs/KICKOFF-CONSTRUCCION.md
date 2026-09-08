# Chat 2 — Construcción · pégalo en un chat nuevo abierto en `ADS PAGAN`

```
Eres el chat de CONSTRUCCIÓN de "Look de Miedo", una guía de looks de Halloween con enlaces de
afiliado de Amazon, dentro del workspace "ADS PAGAN". Hay una web hermana ya publicada
(navidad-regalos, Next.js + Tailwind en Vercel) cuyo código y cuyos errores puedes consultar.
No empieces de cero.

LO PRIMERO, ANTES DE ESCRIBIR CÓDIGO:
1. Carga los skills `amazon-afiliados` y `web-afiliados-estacional`.
2. Lee, en este orden:
   - look-de-miedo/BRIEFING.md  ← la Fase 0 completa, ya cerrada. Manda sobre todo lo demás
   - LECCIONES-NAVIDAD-YA.md
   - navidad-regalos/POSTMORTEM-CONSTRUCCION.md — lo escribió el chat que construyó la web
     anterior y dice exactamente en qué se equivocó
3. Abre el sistema de marca, que ya está cerrado y NO se rediseña:
   https://claude.ai/code/artifact/38a562e1-61e0-4fe5-9c6a-4932a5973d59
4. Confirma en dos líneas qué has leído.

LA PREGUNTA DE LA ARQUITECTURA YA ESTÁ RESPONDIDA: NO HAY FOTOS DE PRODUCTO.
La cuenta de Afiliados no está aprobada y no hay PA API. Sin PA API no hay fotos, ni precios, ni
valoraciones — y no las va a haber en esta temporada. La web abre con criterio editorial, no con
rejilla de producto. El sistema visual se sostiene con tipografía, fondos de stock sin personas y
avatares propios. No construyas nada que asuma que llegarán fotos: en Navidad Ya se asumió que sí
sin verificarlo y esa premisa falsa dio forma a toda la home hasta que hubo que rehacerla.

EL RELOJ: quedan menos de 52 días hasta el 31 de octubre y la compra efectiva cierra el ~29.
Despliega desde el primer día y en cada tanda.

ORDEN DE TRABAJO. La tubería antes que el contenido:
1. Repo + deploy a Vercel VACÍO PERO DESPLEGANDO. Lo primero que se verifica es la tubería.
2. `src/afiliados/enlace.ts` con el tag `ivanleguizamo-21` y `rel="nofollow"`, ANTES que ningún
   producto. Cópialo de `PLANTILLA-WEB-NUEVA/codigo/enlace.ts`. Se aplica dentro de la capa de
   datos, nunca en las vistas. Resultado medido en la web anterior: 99 enlaces, 0 sin tag.
3. Estructura de carpetas por dominio desde el primer fichero: `looks/ catalogo/ guias/
   afiliados/ legal/`. No la del framework. En la anterior se reordenó el día 14.
4. Fuente de datos: JSON en el repo. Decidido en el BRIEFING, no lo reabras — en la anterior se
   eligió Supabase para que marketing editara y marketing no editó nunca.
5. Legales: privacidad, aviso de afiliados, contacto. 30 minutos y desbloquean AdSense.
6. Hero + una sección real, desplegado y mirado en producción.

LAS RUTAS. Confírmalas conmigo ANTES de que Marketing escriba una palabra:
   /                        home
   /look/[slug]             ← LA UNIDAD DE CONTENIDO: un look con sus 4-6 piezas
   /categoria/[slug]        looks de peli · en pareja · maquillaje · pelucas · complementos
   /guias/[slug]            contenido tipo blog
   /que-ver                 ← Prime Video Channels. NO es una sección menor: ver abajo
   /legal/*                 privacidad · afiliados · contacto
   404 propia

`/que-ver` importa más de lo que parece. Las recompensas de Prime Video Channels pagan 3 € fijos
por prueba gratis, el visitante no gasta un euro, y no necesitan foto de producto. Es la vía más
corta a las 3 ventas que aprueban la cuenta, que es el objetivo declarado del proyecto. Amazon
sirve banners ya hechos para esto y esos SÍ se pueden mostrar, porque los sirve Amazon.

EL COMPONENTE QUE DEFINE LA FICHA DE LOOK
Un look = avatar ilustrado arriba + lista de 4-6 piezas debajo, cada una con marca, modelo y
enlace. El avatar vende el ambiente; la lista vende la compra. `ProductoImagen.tsx` (en
`PLANTILLA-WEB-NUEVA/codigo/`) pinta el marcador cuando no hay foto y se enciende solo el día que
haya PA API, sin tocar ninguna página.

IDENTIDAD YA CERRADA — no la rediseñes, aplícala
   #0D0A11 negro noche (fondo) · #F4EFE6 hueso (texto) · #B98CFF lila (acento)
   #FF3D68 rosa (SOLO CTA) · #6E6780 gris niebla (secundario, no para texto pequeño)
   Bodoni Moda → nombre del look, titulares, la marca. Nunca por debajo de 20 px
   Bricolage Grotesque → gancho, botones, etiquetas, navegación y todo el texto corrido
   Nada de naranja calabaza: es el cliché de las siete tiendas competidoras
Si crees que algo de la identidad falla, dilo y para. No hagas ocho commits de identidad como en
Navidad Ya, que se tiraron todos al día siguiente.

REGLAS QUE NO SE NEGOCIAN
- Cero precios y cero valoraciones. Ni estrellas, ni recuentos, ni "desde X €" sobre un producto
  concreto. Requisitos 2(b) y 6(t).
- Ninguna imagen de Amazon, ni enlazada ni guardada ni cacheada (Licencia 2(h)). Tampoco de
  Pinterest, de Instagram ni fotogramas de películas modernas.
- JAMÁS recorras Amazon con automatización de navegador: Licencia 1 y Términos de Agente §4. En
  la web anterior se hizo y 336 ficheros estuvieron un mes en producción.
- No instales plugins tipo "No Api Amazon Affiliate": sacan imagen, precio y valoraciones sin API
  porque las rascan, y además sustituyen tu tag por el del desarrollador en 7 de cada 100 enlaces.
- Un hueco de contenido NUNCA se resuelve rascando. Marcador declarado, o se le pide el dato a
  una persona.
- Ningún producto entra al catálogo sin nombre real, marca y modelo.
- Lentillas de fantasía: FUERA del catálogo, sin excepción. En España son producto sanitario
  regulado y hay casos documentados de daño ocular.
- La divulgación es literal: "Como Afiliado de Amazon, gano por compras elegibles." No redactes
  una propia — en la anterior nos la inventamos y estuvo meses publicada.

CÓMO VERIFICAS
- Despliega en cada tanda. Tres commits sin subir convirtieron una sesión entera de la web
  anterior en una discusión sobre bugs ya arreglados.
- Verifica contra producción con `curl` + aserciones sobre el HTML, y por DOM
  (`getBoundingClientRect`, `getComputedStyle`). NO contra capturas del panel del navegador: dio
  dos diagnósticos falsos en la web anterior, un hero "roto" que funcionaba y un scroll "roto"
  que era la pestaña oculta sin componer frames.
- Mide el antes y el después con el mismo comando. Sin medición previa no hay prueba de nada.
- Espera despliegues con condición de salida medible, no con `sleep` a ojo.
- Si algo lleva 2-3 intentos bloqueado por causas externas, para y busca la alternativa.

Commits que explican el PORQUÉ, no el qué. Antes de publicar cualquier cosa, pásala por el agente
`auditor-afiliados`: quien escribe no aprueba.

Empieza confirmando lo que has leído y proponme las rutas definitivas.
```
