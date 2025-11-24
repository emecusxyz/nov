const core = require('@actions/core');

async function run() {
  try {
    const name = core.getInput('name');

    const message = `Hello, ${name}! Your custom GitHub Action works! 🎉`;

    core.info(message);

    // set output so workflow can use it
    core.setOutput("message", message);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
