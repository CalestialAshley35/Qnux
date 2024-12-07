const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');

// Git state stored in localStorage
const state = JSON.parse(localStorage.getItem('webgit')) || {
  currentProfile: null,
  profiles: {},
};

function saveState() {
  localStorage.setItem('webgit', JSON.stringify(state));
}

function printToTerminal(output) {
  terminal.innerHTML += `\n${output}`;
  terminal.scrollTop = terminal.scrollHeight;
}

function executeCommand(command) {
  const args = command.split(' ');
  const cmd = args[0];
  const params = args.slice(1);

  if (cmd === 'help') {
    printToTerminal(`
Commands:
  help                 Show this help message
  profile create <name> Create a new profile
  profile switch <name> Switch to a profile
  repo init <name>     Initialize a new repository
  repo add <file>      Add a file to staging
  repo commit <msg>    Commit staged changes
  repo log             Show commit history
`);
  } else if (cmd === 'profile') {
    if (params[0] === 'create') {
      const name = params[1];
      if (!name) {
        printToTerminal('Error: Profile name is required.');
        return;
      }
      if (state.profiles[name]) {
        printToTerminal(`Error: Profile '${name}' already exists.`);
        return;
      }
      state.profiles[name] = { repos: {} };
      state.currentProfile = name;
      saveState();
      printToTerminal(`Profile '${name}' created and selected.`);
    } else if (params[0] === 'switch') {
      const name = params[1];
      if (!name) {
        printToTerminal('Error: Profile name is required.');
        return;
      }
      if (!state.profiles[name]) {
        printToTerminal(`Error: Profile '${name}' does not exist.`);
        return;
      }
      state.currentProfile = name;
      saveState();
      printToTerminal(`Switched to profile '${name}'.`);
    } else {
      printToTerminal('Error: Unknown profile command.');
    }
  } else if (cmd === 'repo') {
    if (!state.currentProfile) {
      printToTerminal('Error: No profile selected. Use "profile create" or "profile switch".');
      return;
    }
    const profile = state.profiles[state.currentProfile];
    if (params[0] === 'init') {
      const name = params[1];
      if (!name) {
        printToTerminal('Error: Repository name is required.');
        return;
      }
      if (profile.repos[name]) {
        printToTerminal(`Error: Repository '${name}' already exists.`);
        return;
      }
      profile.repos[name] = { staging: [], commits: [] };
      saveState();
      printToTerminal(`Repository '${name}' initialized.`);
    } else if (params[0] === 'add') {
      const file = params[1];
      if (!file) {
        printToTerminal('Error: File name is required.');
        return;
      }
      const repo = getCurrentRepo();
      if (!repo) return;
      repo.staging.push(file);
      saveState();
      printToTerminal(`File '${file}' added to staging.`);
    } else if (params[0] === 'commit') {
      const message = params.slice(1).join(' ');
      if (!message) {
        printToTerminal('Error: Commit message is required.');
        return;
      }
      const repo = getCurrentRepo();
      if (!repo) return;
      repo.commits.push({ message, files: [...repo.staging], date: new Date() });
      repo.staging = [];
      saveState();
      printToTerminal(`Commit successful: "${message}"`);
    } else if (params[0] === 'log') {
      const repo = getCurrentRepo();
      if (!repo) return;
      if (repo.commits.length === 0) {
        printToTerminal('No commits yet.');
      } else {
        repo.commits.forEach((commit, index) => {
          printToTerminal(`Commit #${index + 1}: "${commit.message}" on ${commit.date}`);
          printToTerminal(`  Files: ${commit.files.join(', ')}`);
        });
      }
    } else {
      printToTerminal('Error: Unknown repo command.');
    }
  } else {
    printToTerminal(`Error: Unknown command '${cmd}'.`);
  }
}

function getCurrentRepo() {
  const repoName = Object.keys(state.profiles[state.currentProfile].repos)[0];
  if (!repoName) {
    printToTerminal('Error: No repository initialized. Use "repo init".');
    return null;
  }
  return state.profiles[state.currentProfile].repos[repoName];
}

commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim();
    commandInput.value = '';
    printToTerminal(`$ ${command}`);
    executeCommand(command);
  }
});
