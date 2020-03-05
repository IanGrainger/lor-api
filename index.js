// const anyKeyToExit = require("./anyKeyToExit");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const cardRecorder = require("./cardRecorder");
const apiFetcher = require("./apiFetcher");

let logLevel = 0;

let previousContentStr = getPreviousRectanglesStrFromFile(
  /positional-rectangles-.*/
);

function getPreviousRectanglesStrFromFile(fileNameRegEx) {
  const files = fs.readdirSync(__dirname);
  const filesFiltered = files.filter(f => f.match(fileNameRegEx));
  const latestFileName = filesFiltered.length
    ? filesFiltered.sort()[filesFiltered.length - 1]
    : null;
  let previousContentStr = latestFileName
    ? fs.readFileSync(latestFileName, "utf8")
    : null;
  return previousContentStr;
}

async function setupKeyboardRead() {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", async (key, data) => {
    if (
      key === "q" ||
      key === "e" ||
      key === "z" ||
      (data && data.name === "c" && data.ctrl)
    )
      process.exit();
    if (key === "l") {
      if (logLevel === 0) logLevel = 1;
      else logLevel = 0;
      console.log("log level", logLevel);
    }
    if (key === "v" || key === "c") {
      console.log(cardsForDisplay(previousContentStr));
    }
    if (key === "r" || (data && data.name === "return")) {
      const newContentStr = await cardRecorder.writeFileIfChanged(
        previousContentStr,
        logLevel
      );
      if (newContentStr == previousContentStr)
        console.log("no change detected");
    }
  });
  console.log(
    "Press [r] or [Enter] to read positions. [v] or [c] show cards, [l] changes logging level."
  );
  console.log("Press [q], [e] or [z] key to exit");
}

checkRectanglesEveryInterval(1000);
checkExpeditionEveryInterval(1000);

setupKeyboardRead();

function cardsForDisplay(previousContentStr) {
  const content = JSON.parse(previousContentStr);
  const largeCards = apiFetcher.getCardsWithLargestArea(content);
  const cardsWithData = apiFetcher.getCardDataForRectangles(largeCards);
  return cardsWithData.map(c => ({
    n: c.name,
    tier: c.tier,
    cost: c.cost
  }));
}

function checkRectanglesEveryInterval(intervalMS) {
  setTimeout(async () => {
    previousContentStr = await cardRecorder.writeFileIfChanged(
      previousContentStr,
      logLevel
    );
    if (logLevel > 0)
      console.log(`checking rectangles in ${intervalMS / 1000}s`);
    checkRectanglesEveryInterval(intervalMS);
  }, intervalMS);
}

let currentExpeditionsStateStr = getPreviousRectanglesStrFromFile(
  /expedition-state-.*/
);

function checkExpeditionEveryInterval(intervalMS) {
  setTimeout(async () => {
    const expeditionState = await apiFetcher.getExpeditionState();
    // todo: deep compare? or just get strings from the apiFetcher!?
    const expeditionStateStr = JSON.stringify(expeditionState);
    if (expeditionStateStr != currentExpeditionsStateStr) {
      if (logLevel > 0) console.log(`got new expedition state`);
      currentExpeditionsStateStr = expeditionStateStr;
      cardRecorder.writeFileWithDate(
        "expedition-state",
        currentExpeditionsStateStr,
        logLevel
      );
    }
    if (logLevel > 0)
      console.log(`checking expeditions in ${intervalMS / 1000}s`);
    checkExpeditionEveryInterval(intervalMS);
  }, intervalMS);
}

// pollForPositions(previousContent);

// async function pollForPositions(previousContent) {
//   console.log();

//   const cardPositions = await apiFetcher.getCardPositions();
//   if (cardPositions != previousContent)
//     fs.writeFileSync(
//       `./positional-rectangles-${new Date().toISOString()}.json`,
//       cardPositions,
//       err => console.log("error writing file!", err)
//     );

//   console.log(new Date().toISOString() + " " + cardPositions.length);

//   setTimeout(pollForPositions, 1000);
// }
// anyKeyToExit.wait();
