var fs = require("fs");
const readline = require("readline");
const path = require("path");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter the directory of text files you wish to combine: ",
  function (_dirname) {
    rl.question(
      "Enter the name of the new combined txt file: ",
      function (newFileName) {
        combineFiles(_dirname, newFileName);
        console.log(`Your combined file is at ${_dirname}`);
      }
    );
  }
);

rl.on("close", function () {
  process.exit(0);
});

function combineFiles(_dirname, newFileName = "combined-file") {
  const newFile = `${newFileName}.txt`;

  try {
    if (!fs.existsSync(_dirname)) {
      console.log("Directory does not exist");
      return;
    }
    fs.readdir(_dirname, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      files.forEach((file) => {
        fs.readFile(path.join(_dirname, file), (err, content) => {
          if (err) {
            return reject(err);
          }
          fs.appendFile(path.join(_dirname, newFile), content, (err) => {
            if (err) {
              return reject(err);
            }
          });
        });
      });
    });
  } catch (err) {
    console.error("Directory does not exist", err);
  }
}
