const fs = require('node:fs');

const name = process.argv[2];
const path = name.toLowerCase();
const id = process.argv[3];
const url = process.argv[4].replaceAll('https://', '');
fs.mkdirSync(path);

const index = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <link rel="manifest" href="${path}/manifest.json" />
  <meta name="theme-color" content="#000000" />

  <title>${name}</title>

  <style>
    body {
      background: #000;
      margin: 0;
      height: 100vh;
      width: 100vw;
    }
  </style>
</head>
<body>

<script>
function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone ||
    document.referrer.startsWith("android-app://")
  );
}

document.body.onclick = () => {

  if (!isStandalone()) return;

  setTimeout(() => {
    location.replace(
      "intent://${url}/#Intent;scheme=https;package=${id};end"
    );
  }, 100);

  setTimeout(() => {
    history.back();
  }, 300);

};

</script>

</body>
</html>
`;

const manifest = `
{
  "name": "${name}",
  "short_name": "${name}",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "./icon.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "./icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}`;


fs.writeFileSync(`${path}/index.html`, index);
fs.writeFileSync(`${path}/manifest.json`, manifest);
console.log("✅ - Arquivos criados com sucesso");