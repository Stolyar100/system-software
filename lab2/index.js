const fs = require("fs");

const inputFile = process.argv[2];
const outputFile = inputFile.replace(/(?<fileName>.+)(?<extension>\.\w+$)/, '$<fileName>.tmp')

const regExp =
  /#ifdef\s+(?<condition>\w+)\s(?<ifBlock>([^#]+\n?)+)#else\s?(?<elseBlock>([^#]+\n?)+)#endif\s?/gm;

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const result = data.replace(
    regExp,
    (match, condition, ifBlock, unused, elseBlock, unused2, offset, string) =>
      string.includes(`#define ${condition}`) ? ifBlock : elseBlock
  );

  fs.writeFile(outputFile, result, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Finished without errors')
    }
  });
});
