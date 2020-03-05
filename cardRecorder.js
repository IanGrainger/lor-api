const apiFetcher = require("./apiFetcher");
const path = require("path");
const fs = require("fs");

exports.writeFileIfChanged = async (
  previousContentStr,
  logLevel,
  cardsChangedFn
) => {
  const cardPositions = await apiFetcher.getCardPositions();
  if (logLevel > 0) console.log("got card positions", cardPositions.length);

  if (!cardPositions || !cardPositions.length) return previousContentStr;

  const cardPositionsStr = JSON.stringify(cardPositions);
  if (logLevel > 0)
    console.log("got valid cardPositions", cardPositions.length);

  if (cardPositionsStr != previousContentStr) {
    writeFileWithDate("positional-rectangles", cardPositionsStr, logLevel);

    // console.log(
    //   apiFetcher
    //     .getCardDataForRectangles(
    //       // should be OK?!
    //       //   apiFetcher.getCardsWithLargestArea(
    //       cardPositions
    //       //   )
    //     )
    //     .map(c => [c.name, c.cost, c.TopLeftX, c.TopLeftY])
    // );
    if (cardsChangedFn && typeof cardsChangedFn === "function")
      cardsChangedFn(cardPositions);
    return cardPositionsStr;
  }

  return previousContentStr;
};

const writeFileWithDate = (filePrefix, content, logLevel) => {
  const filename = path.join(
    __dirname,
    `${filePrefix}-${new Date().toISOString().replace(/:/g, "-")}.json`
  );
  fs.writeFile(
    filename,
    content,
    { flag: "w" },
    err => err && console.log("error writing file!", err)
  );
  if (logLevel > 0) console.log("written " + filename);
};

exports.writeFileWithDate = writeFileWithDate;
