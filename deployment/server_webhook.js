const http = require("http");
const { exec } = require("child_process");

// Path to your pull script
const PULL_SCRIPT_PATH = "/root/cicd.sh";

// Function to handle incoming requests
const requestListener = (req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      console.log("Received webhook payload:", body);

      // Execute the pull script
      exec(PULL_SCRIPT_PATH, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error.message}`);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }

        console.log(`stdout: ${stdout}`);

        // Respond to GitHub with success status
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Pull request received and processed successfully.");
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

// Create and start the HTTP server
const server = http.createServer(requestListener);
server.listen(8999, () => {
  console.log("Server is listening on port 8999...");
});
