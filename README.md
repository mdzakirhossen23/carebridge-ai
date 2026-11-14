# CareBridge AI

CareBridge AI is a clinic follow-up prototype for DSH Hacks V2. It uses fictional clinic records and requires no sign-in. Its AI care guide explains clinician-written plans in plain language and can read the result aloud.

[Open the live demo](https://carebridge-ai.baharsoftbd.com/public-demo.html)

## Run locally

Use PHP 8 with the cURL extension enabled. Set the `GROQ_API_KEY` environment variable before starting PHP if you want to test live AI responses. You can also set `GROQ_MODEL` to override the default model.

```sh
php -S localhost:8000
```

Open http://localhost:8000/public-demo.html. From Overview, select **AI care guide** and enter fictional follow-up instructions. Demo records persist in browser storage. The AI endpoint runs server-side. Use fictional data and have a clinician review generated explanations.

## Files

- `public-demo.html`, `clinic.css`, and the JavaScript files implement the public workspace.
- `api/guide.php` handles AI requests and reads its provider credential from server configuration.
