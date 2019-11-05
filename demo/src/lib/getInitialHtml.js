export default function getInitialHtml(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        <link rel="stylesheet" href="/demo.bundle.css" />
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/demo.bundle.js"></script>
      </body>
    </html>
  `;
}
