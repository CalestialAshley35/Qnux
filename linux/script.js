const terminalOutput = document.getElementById("output");
const commandInput = document.getElementById("command-input");

// Simulated file system
const fileSystem = {
  "/": ["Documents", "Downloads", "Music", "Pictures", "Videos"],
  "/Documents": [],
  "/Downloads": [],
  "/Music": [],
  "/Pictures": [],
  "/Videos": [],
};
let currentDirectory = "/";

// Command functions
const commands = {
  pwd: () => currentDirectory,
  ls: () => fileSystem[currentDirectory].join("  ") || "No files or directories",
  cd: (dir) => {
    if (dir === "..") {
      const parts = currentDirectory.split("/");
      parts.pop();
      currentDirectory = parts.length > 1 ? parts.join("/") : "/";
      return "";
    }
    const newDir = currentDirectory === "/" ? `/${dir}` : `${currentDirectory}/${dir}`;
    if (fileSystem[newDir]) {
      currentDirectory = newDir;
      return "";
    }
    return `Error: Directory not found: ${dir}`;
  },
  mkdir: (dir) => {
    if (!dir) return "Error: mkdir requires a directory name";
    const newDir = currentDirectory === "/" ? `/${dir}` : `${currentDirectory}/${dir}`;
    if (fileSystem[newDir]) return `Error: Directory already exists: ${dir}`;
    fileSystem[newDir] = [];
    fileSystem[currentDirectory].push(dir);
    return `Directory created: ${dir}`;
  },
  rm: (file) => {
    if (!file) return "Error: rm requires a file or directory name";
    const index = fileSystem[currentDirectory].indexOf(file);
    if (index === -1) return `Error: File or directory not found: ${file}`;
    fileSystem[currentDirectory].splice(index, 1);
    const fullPath = currentDirectory === "/" ? `/${file}` : `${currentDirectory}/${file}`;
    delete fileSystem[fullPath];
    return `${file} removed`;
  },
  touch: (file) => {
    if (!file) return "Error: touch requires a file name";
    if (fileSystem[currentDirectory].includes(file)) return `Error: File already exists: ${file}`;
    fileSystem[currentDirectory].push(file);
    return `File created: ${file}`;
  },
  clear: () => {
    terminalOutput.innerHTML = "";
    return "";
  },
  help: () => `
Available commands:
- pwd: Print the current directory
- ls: List files and directories
- cd [dir]: Change directory (.. to go up)
- mkdir [dir]: Create a new directory
- rm [file/dir]: Remove a file or directory
- touch [file]: Create a new file
- clear: Clear the terminal
- help: Display available commands
  `,
};

// Process command input
commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const input = commandInput.value.trim();
    commandInput.value = "";

    if (input) {
      const [cmd, ...args] = input.split(" ");
      let response;

      if (commands[cmd]) {
        response = commands[cmd](...args);
      } else {
        response = `Command not found: ${cmd}`;
      }

      appendToTerminal(`user@weblinux:${currentDirectory}$  it);
      if (response) appendToTerminal(response);
    }
  }
});

// Append text to the terminal output
function appendToTerminal(text) {
  const line = document.createElement("div");
  line.textContent = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
