const fs = require("fs");
const path = require("path");
const apiFetcher = require("./apiFetcher");

// const rectanglesStr = getPreviousRectanglesStrFromFile(
//   /positional-rectangles-2020-03-01T18-13-08.941Z.json/
// );
const rectanglesStr = getPreviousRectanglesStrFromFile(
  /positional-rectangles-2020-03-02T18-44-11.594Z.json/
);

const rectangles = JSON.parse(rectanglesStr);
console.log("rects", rectangles);

const cardsinsets = apiFetcher.getCardsInSets(rectangles);
console.log(
  "cardsinsets",
  Object.keys(cardsinsets).map(k => [k, cardsinsets[k].length])
);

function getPreviousRectanglesStrFromFile(fileNameRegEx) {
  const files = fs.readdirSync(path.join(__dirname, "deck1"));
  const filesFiltered = files.filter(f => f.match(fileNameRegEx));
  const latestFileName = filesFiltered.length
    ? filesFiltered.sort()[filesFiltered.length - 1]
    : null;
  let previousContentStr = latestFileName
    ? fs.readFileSync(
        path.join(path.join(__dirname, "deck1"), latestFileName),
        "utf8"
      )
    : null;
  return previousContentStr;
}
