export default function getInitialHtml(content) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
        <link rel="stylesheet" href="react-autocomplete.css" />
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="react-autocomplete.js"></script>
      </body>
    </html>
  `;
}
