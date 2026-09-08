# Brand Guidelines — Look de Miedo v1.0

> Última actualización: 2026-09-08
> Estado: Cerrado en Fase 0. **La identidad se cierra una vez.**

Un manual de marca que llegue después de tener web en producción se archiva como
referencia, no se aplica. Es el error 13 de Navidad Ya.

## Referencia rápida

| Elemento | Valor |
|---|---|
| Color base | `#0D0A11` Negro noche |
| Acento de marca | `#B98CFF` Lila |
| Acento de acción | `#FF3D68` Rosa sangre — **solo CTA** |
| Tipografía display | Bodoni Moda |
| Tipografía de interfaz y texto | Bricolage Grotesque |
| Voz | Juvenil, de tú, directo, sin jerga regional |
| Símbolo | Percha cuyo gancho es un signo de interrogación |

<!-- Estas tres filas las lee sync-brand-to-tokens.cjs, que espera los nombres en
     inglés. No las borres al editar la tabla de arriba. -->

| Clave de sincronización | Hex |
|---|---|
| Primary Color | #B98CFF |
| Secondary Color | #0D0A11 |
| Accent Color | #FF3D68 |

---

## 1. Paleta

### Colores principales

| Nombre | Hex | RGB | Uso |
|---|---|---|---|
| Negro noche | `#0D0A11` | rgb(13,10,17) | Fondo de todo. Negro con sesgo violeta, no plano |
| Lila | `#B98CFF` | rgb(185,140,255) | Acento de marca: símbolo, enlaces, destacados |
| Rosa sangre | `#FF3D68` | rgb(255,61,104) | **Solo llamadas a la acción.** En más sitios pierde su función |

### Neutros

| Nombre | Hex | RGB | Uso |
|---|---|---|---|
| Hueso | `#F4EFE6` | rgb(244,239,230) | Texto y superficies claras |
| Gris niebla | `#6E6780` | rgb(110,103,128) | Texto secundario y bordes. No para texto pequeño |
| Panel | `#171320` | rgb(23,19,32) | Tarjetas y bloques sobre el fondo |
| Panel elevado | `#1F1A2B` | rgb(31,26,43) | Segundo nivel de superficie |
| Línea | `#2C2438` | rgb(44,36,56) | Bordes y divisores |

### Semánticos

| Estado | Hex | Uso |
|---|---|---|
| Correcto | `#7BE0A8` | Verificado, publicado, en verde |
| Atención | `#FFC46B` | Bloqueado a medias, en curso |
| Parado | `#FF3D68` | Bloquea el trabajo. Comparte color con el CTA a propósito |

### Accesibilidad — calculado, no estimado

Contraste sobre `#0D0A11`:

| | Ratio | Cumple |
|---|---|---|
| Hueso | 17,16:1 | AA en todo tamaño |
| Lila | 7,73:1 | AA en todo tamaño |
| Rosa sangre | 5,73:1 | AA en todo tamaño |
| Gris niebla | 3,66:1 | **Solo texto grande** |

### La regla que hace que funcione

**Nada de naranja calabaza.** Es el cliché que usan las siete tiendas de disfraces
competidoras y lo que más nos confundiría con ellas.

**El rosa se reserva para las llamadas a la acción.** En cuanto aparece en tres
sitios más deja de significar «pulsa aquí».

---

## 2. Tipografía

Dos familias, dos papeles. No es un empate: son las dos mitades de la marca.

```css
--font-display: "Bodoni Moda", Didot, "Times New Roman", serif;
--font-ui: "Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif;
```

| | Dónde | Dónde no |
|---|---|---|
| **Bodoni Moda** | Nombre del look, titulares de guía, la marca, el título del pin | **Nada por debajo de 20 px**: es una didone y los trazos finos se rompen en pantalla |
| **Bricolage Grotesque** | El gancho, botones, etiquetas, navegación, fichas y **todo el texto corrido** | Titulares editoriales |

Bodoni pone la voz de guía de moda; Bricolage, la energía de redes. **Manrope se
descartó**: Bricolage aguanta el cuerpo a peso 400 y dos familias es mejor
sistema que tres.

### Escala

| Elemento | Escritorio | Móvil | Peso |
|---|---|---|---|
| H1 | 60px | 36px | 400 display |
| H2 | 30px | 26px | 400 display |
| H3 | 15px | 15px | 800 ui |
| Cuerpo | 15px | 15px | 400 ui |
| Etiqueta | 11px | 11px | 700 ui, mayúsculas, `letter-spacing: .06em` |

---

## 3. Símbolo

**Una percha cuyo gancho es un signo de interrogación**, con el punto del
interrogante dentro del triángulo, en rosa.

El gancho de una percha y la curva de un interrogante son la misma forma. Dice
ropa, dice «¿qué me pongo?» y dice armario —que es el fondo maestro— sin
explicar nada.

### Ficheros — el SVG manda siempre

| Fichero | Uso |
|---|---|
| `marca/simbolo.svg` | El símbolo suelto, lila sobre transparente |
| `marca/avatar-redes.svg` | 1000×1000 con fondo negro. Foto de perfil |
| `marca/favicon.svg` | Cuadrado lila, percha en negro, esquinas redondeadas |

**El logo no se genera con IA.** Los modelos no reproducen geometría exacta:
devuelven una percha parecida cada vez, y un logo que cambia entre la web y las
redes deja de ser un logo. Para donde pidan PNG, se exporta el SVG.

---

## 4. Voz

- **Registro**: tuteo, juvenil, cercano. Hablamos sobre todo a chicas de 16-25
- **Sin jerga regional cerrada.** En Navidad Ya se pasó todo a jerga madrileña y
  se perdió dos veces al editar. Juvenil sí, de un barrio concreto no
- **La web no puede estar dirigida a menores de 13 años** *(Requisito 1)*

| | |
|---|---|
| **Palabras que sí** | look · montar · clavarlo · pieza · quedar bien · «a ver qué me pongo» · «sin liarte» |
| **Palabras que no** | el mejor · el más buscado · increíble · espectacular · todo el mundo lo lleva |

Las de «no» no son cuestión de estilo: son afirmaciones que no podemos probar y
las prohíbe el **Requisito 2(b)**. En Navidad Ya hubo que limpiar 40, y las cazó
el otro track, no quien las escribió.

**Antes** *(el neutro por defecto, donde se cae solo)*
> Esta propuesta combina una serie de prendas de inspiración gótica que permiten
> recrear un estilismo completo de manera accesible y sin necesidad de confección.

**Después**
> A ver, ¿qué te pones este año? Este es de los que se montan solos: cinco cosas,
> ninguna rara, y lo tienes. Y si vais dos, el de tu amiga sale de aquí mismo.

**Dónde no aplica**: legales, aviso de afiliados y FAQ van claros y sin jerga.

---

## 5. Imagen — de dónde sale cada una

| Fuente | Para qué |
|---|---|
| Pexels / Unsplash con filtro **0 personas** | Ambiente y fondos. Sin persona no hay cesión de modelo que pedir |
| Stock de pago | Único caso si hace falta una cara reconocible |
| **Avatares propios**, 4 personajes | El look montado. Fotorrealistas, españoles, 19-23 años |
| Dibujos generados desde texto | Las piezas sueltas |
| Dominio público **europeo** verificado | Fotogramas de clásicos. Plazo español, no americano *(LPI art. 28.2)* |

### Nunca

- Fotos de producto de Amazon, por cualquier vía *(Licencia 1, 2(h), 6(b))*.
  Se abren el día que haya PA API, no antes
- Pinterest, Instagram, fotogramas de películas modernas
- Pasar una imagen ajena por un filtro de IA: estilizar no lava el origen
- Una cara generada que recuerde a alguien real *(LO 1/1982)*

### Los avatares

Dos chicas y dos chicos, rasgos españoles y de Madrid, 19-23 años. El 2+2 cubre
los tres tipos de dúo sin generar a nadie más, y «en pareja» es la categoría que
duplica el ticket.

**La ropa base es negra y lisa, sin logos ni estampados.** Ese estado por defecto
es lo que los hace reutilizables: encima se viste cada look sin volver a generar
a la persona.

Tres reglas que no se saltan: etiqueta de IA donde la pidan · nunca dicen haber
probado nada · la prenda es un arquetipo, jamás el artículo que enlazas.

---

## 6. Divulgación — literal, no se redacta otra

> **Como Afiliado de Amazon, gano por compras elegibles.**

Fuente: `afiliados.amazon.es/help/node/topic/GPXFHVYZMTGPUMPE`

Web: visible y cerca del enlace, más su página legal · Redes: en la bio ·
Por pieza: `#ad` · Todo enlace: `rel="nofollow"`

**«Amazon» está prohibida en el nombre de usuario** *(Requisito 1(g))* y es
**obligatoria en la bio** dentro de esta frase. Son dos cosas distintas y es lo
que más se confunde.
