import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposableCommand = vscode.commands.registerCommand(
    "extension.createHTMLPage",
    () => {
      const htmlContent = generateHTMLPage();
      const cssContent = generateCSSPage();
      const jsContent = generateJSPage();
      const htmlFilePath = path.join(
        vscode.workspace.rootPath || "",
        "index.html"
      );
      const cssFilePath = path.join(
        vscode.workspace.rootPath || "",
        "styles.css"
      );
      const jsFilePath = path.join(
        vscode.workspace.rootPath || "",
        "script.js"
      );

      const directoryPath = vscode.workspace.rootPath || "";
      if (directoryPath === "") {
        return errorMessage();
      }
      const filesExist = checkFilesExist(directoryPath);
      if (filesExist) {
        return vscode.window.showErrorMessage("Files already exist.");
      }

      fs.writeFile(htmlFilePath, htmlContent, (err) => {
        if (err) {
          errorMessage();
        } else {
          showMessage();
        }
      });
      fs.writeFile(cssFilePath, cssContent, (err) => {
        if (err) {
          errorMessage();
        } else {
          showMessage();
        }
      });
      fs.writeFile(jsFilePath, jsContent, (err) => {
        if (err) {
          errorMessage();
        } else {
          showMessage();
        }
      });
    }
  );

  context.subscriptions.push(disposableCommand);
}

function checkFilesExist(directoryPath: any) {
  const fileNamesToCheck = ["index.html", "styles.css", "script.js"];
  let fileExists = false;

  fileNamesToCheck.forEach((fileName) => {
    const filePath = `${directoryPath}/${fileName}`;

    if (fs.existsSync(filePath)) {
      fileExists = true;
      console.log(`${fileName} exists.`);
    } else {
      console.log(`${fileName} does not exist.`);
    }
  });

  return fileExists;
}

function showMessage() {
  vscode.window.showInformationMessage("Files created successfully.");
}

function errorMessage() {
  vscode.window.showErrorMessage(
    "Error creating the files. Make sure you have opened a folder or workspace."
  );
}

function generateHTMLPage() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your HTML Page</title>
      <link rel="stylesheet" type="text/css" href="styles.css" />
    </head>
    <body>
      <h1>Hello, World!</h1>
      <script src="script.js"></script>
    </body>
  </html>
  `;
}

function generateCSSPage() {
  return `h1 {
    color: blue;
    font-family: Arial, sans-serif;
  }
  `;
}

function generateJSPage() {
  return `console.log("Hello, World!");`;
}
