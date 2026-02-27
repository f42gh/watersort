import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

type Color = string;
type Tube = Color[];

const CAPACITY = 4;

function canPour(src: number, dst: number, tubes: Tube[], capacity = CAPACITY): boolean {
  if (!tubes[src] || !tubes[dst]) {
    return false;
  }
  if (tubes[src].length === 0) {
    return false;
  }
  if (tubes[dst].length >= capacity) {
    return false;
  }

  const topColor = tubes[src][tubes[src].length - 1];
  return tubes[dst].length === 0 || tubes[dst][tubes[dst].length - 1] === topColor;
}

function pour(src: number, dst: number, tubes: Tube[]): void {
  const color = tubes[src].pop();
  if (color !== undefined) {
    tubes[dst].push(color);
  }
}

function isSolved(tubes: Tube[]): boolean {
  return tubes.every((tube) => tube.length === 0 || tube.every((color) => color === tube[0]));
}

function display(tubes: Tube[]): void {
  for (const tube of tubes) {
    console.log(`[${tube.join("").padEnd(CAPACITY, "_")}]`);
  }
  console.log("-".repeat(10));
}

export async function runGame(): Promise<void> {
  const tubes: Tube[] = [
    [..."RGBR"],
    [..."BGRG"],
    [],
    []
  ];

  const rl = createInterface({ input, output });

  try {
    while (!isSolved(tubes)) {
      display(tubes);

      const s = await rl.question("注ぐ元の筒番号を入力 (0-3): ");
      const d = await rl.question("注ぐ先の筒番号を入力 (0-3): ");

      const src = Number.parseInt(s, 10);
      const dst = Number.parseInt(d, 10);

      if (Number.isNaN(src) || Number.isNaN(dst)) {
        console.log("正しい数字を入力してください。");
        continue;
      }

      if (canPour(src, dst, tubes)) {
        pour(src, dst, tubes);
      } else {
        console.log("そこには注げません！");
      }
    }

    console.log("クリア！");
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  runGame().catch((error: unknown) => {
    console.error("ゲーム実行中にエラーが発生しました:", error);
    process.exitCode = 1;
  });
}
