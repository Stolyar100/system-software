const fs = require("fs");
const readline = require("readline");

const readStream = fs.createReadStream("text.txt", "utf8");
const writeStream = fs.createWriteStream("normalized-text.txt");
const rl = readline.createInterface({
  input: readStream,
});

readStream.on("err", (err) => console.error(err));
writeStream.on("err", (err) => console.error(err));

rl.on("line", (line) => {
  if (!isLineEmpty(line)) {
    const normalizedLine = normalizeLine(line);

    writeStream.write(`${normalizedLine}\n`);
  }
});

rl.on("close", () => writeStream.end());

function normalizeLine(line) {
  const normalizedWordArray = line.split(" ").filter((word) => word !== "");
  const normalizedLine = normalizedWordArray.join(" ");

  return normalizedLine;
}

function isLineEmpty(line) {
  return line.trim() === "";
}
