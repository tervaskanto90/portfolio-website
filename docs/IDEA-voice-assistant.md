# Idea en hold: "Call my AI assistant" (Voice Agent en Live Hub)

> Estado: **ON HOLD** — a desarrollar el fin de semana. No hay nada en la UI todavía.

## Concepto

Un botón en el sitio (probablemente en el nav junto a "Let's talk", o un CTA
dentro del capítulo *The Voice*) que te deja **llamar a un agente de voz**
montado en **AudioCodes Live Hub**. El agente actúa como asistente personal de
Octavio: cuenta datos y curiosidades sobre su perfil, experiencia y proyectos.
Si el visitante le deja un número de teléfono, recibe los puntos de contacto
de Octavio **por WhatsApp**.

Es la demo perfecta del posicionamiento del sitio: no solo *dice* Voice AI,
lo *demuestra* en vivo.

## Arquitectura propuesta

```
Visitante (botón "Call my assistant")
   │  WebRTC (AudioCodes Web SDK) — llamada desde el browser, sin marcar nada
   ▼
AudioCodes Live Hub  ── STT/TTS, barge-in, ES/EN
   │  conector de bot / AI Agent
   ▼
Agente LLM (persona: "asistente de Octavio")
   │  knowledge base = lib/content.ts (bio, experiencia, proyectos, curiosidades)
   │  tool: capture_phone_number(number, name?)
   ▼
Webhook → automatización (n8n o Kapso)
   └─ envía template de WhatsApp con vCard / links de contacto
```

## Decisiones a tomar el finde

- **Entrada de la llamada**: WebRTC desde el browser (mejor UX, un click) vs.
  mostrar un número DID para llamar. Ideal: WebRTC con fallback a DID.
- **Cerebro del agente**: qué LLM y dónde corre (Live Hub AI Agents nativo vs.
  bot propio conectado por Bot API). Persona y guardrails: qué puede contar y
  qué no (nada de datos sensibles, salario, etc.).
- **WhatsApp**: número de WhatsApp Business + template pre-aprobado con los
  puntos de contacto. Evaluar Kapso (ya hay cuenta) vs. n8n + Cloud API.
- **Idiomas**: detectar ES/EN o preguntar al inicio.
- **Consentimiento**: el número lo deja el visitante voluntariamente; igual
  avisar que se usará solo para enviar el contacto una única vez.
- **Costos/límites**: minutos de Live Hub, mensajes de WhatsApp, rate limit
  para que nadie queme la demo.

## UI (cuando se implemente)

- Botón secundario en el nav: `▸ Call my AI assistant`
- En el capítulo *The Voice*: línea final tipo "Don't take my word for it —
  **call my assistant** and ask her yourself."
