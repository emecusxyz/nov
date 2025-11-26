const core = require("@actions/core");
const fetch = require("node-fetch");

async function run() {
  try {
    const apiUrl = core.getInput("api_url");
    const method = core.getInput("api_method").toUpperCase();
    const body = core.getInput("api_body");

    console.log("🌐 Making API request...");
    console.log(`➡ URL: ${apiUrl}`);
    console.log(`➡ METHOD: ${method}`);

    let options = { method };

    if (method === "POST") {
      options.headers = { "Content-Type": "application/json" };
      options.body = body;
    }

    const response = await fetch(apiUrl, options);

    const text = await response.text();

    console.log("📥 API Response:");
    console.log(text);

    core.setOutput("api_response", text);

    if (!response.ok) {
      core.setFailed(`❌ API call failed with status ${response.status}`);
    } else {
      console.log("✅ API call succeeded!");
    }

  } catch (error) {
    core.setFailed(`❌ Action failed: ${error.message}`);
  }
}

run();
