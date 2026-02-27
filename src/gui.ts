import { createServer } from "node:http";

const COLOR_MAP: Record<string, string> = {
  R: "red",
  G: "green",
  B: "blue",
  Y: "yellow"
};

const tubes: string[][] = [
  ["R", "G", "B", "R"],
  ["B", "G", "R", "G"],
  [],
  []
];

const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Water Sort Preview</title>
    <style>
      body { margin: 0; font-family: sans-serif; background: #f6f7fb; }
      .wrap { min-height: 100vh; display: grid; place-items: center; }
      canvas { background: white; border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
    </style>
  </head>
  <body>
    <div class="wrap">
      <canvas id="cv" width="400" height="220"></canvas>
    </div>
    <script>
      const COLOR_MAP = ${JSON.stringify(COLOR_MAP)};
      const tubes = ${JSON.stringify(tubes)};
      const canvas = document.getElementById("cv");
      const ctx = canvas.getContext("2d");
      const tubeWidth = 40;
      const tubeHeight = 160;

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let idx = 0; idx < tubes.length; idx += 1) {
          const tube = tubes[idx];
          const x = 60 + idx * 80;
          const y = 30;

          ctx.lineWidth = 2;
          ctx.strokeStyle = "#888";
          ctx.strokeRect(x, y, tubeWidth, tubeHeight);

          for (let i = 0; i < tube.length; i += 1) {
            const color = tube[tube.length - 1 - i];
            const cy = y + tubeHeight - (i + 1) * 40;
            ctx.fillStyle = COLOR_MAP[color] || "white";
            ctx.fillRect(x, cy, tubeWidth, 40);
          }
        }
      }

      draw();
    </script>
  </body>
</html>`;

export function startPreviewServer(port = 3000): void {
  const server = createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });

  server.listen(port, () => {
    console.log(`Preview server: http://localhost:${port}`);
  });
}

if (require.main === module) {
  startPreviewServer();
}
