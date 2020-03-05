const readline = require("readline");
exports.wait = _ => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", (key, data) => {
    process.exit();
  });
  console.log("Press any key to exit a");
};
