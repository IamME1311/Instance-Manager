const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 8000;
const fs = require('fs');
const path = require('path');

let isRunning = false;
let lastUser = null;
  app.use(express.static('public'));

// Serve the external config.json
app.get('/config.json', (req, res) => {
  // res.sendFile(path.resolve('D:/Software_Projects/Cloud Deployment/dockerfiles/comfyUI dockerfile/app-manager/config.json'));
  res.sendFile(path.resolve('/workspace/config_app.json'));
});

app.get('/stop_comfyui', (req, res) => {
    exec('scripts/stop_comfyui.sh &', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping ComfyUI: ${error}`);
        }
    });
    isRunning = false;
    lastUser = null;
    res.send('Stopped ComfyUI successfully!');
});

app.get('/setup', (req, res) => {
  exec('scripts/setup_script.sh &', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing models: ${error}`);
    }
  });
  res.send("Download Started");
});

app.get('/start_comfyui/:user', (req, res) => {
    const user = req.params.user.toLowerCase();
    const scriptPath = `scripts/start_comfyui_${user}.sh`;
    
    exec(`${scriptPath} &`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting ComfyUI for ${user}: ${error}`);
      }
    });
    isRunning = true;
    lastUser = user;
    res.send(`Started ComfyUI for ${user} successfully!`);
  });

  app.get('/logs/:user', (req, res) => {
    const user = req.params.user.toLowerCase();
    const logFilePath = path.join('/workspace/logs', `comfyui_${user}.log`);

    if (!fs.existsSync(logFilePath)) {
        return res.status(404).send("No logs found for this user.");
    }

    res.setHeader('Content-Type', 'text/plain');
    
    // Stream the log file to the frontend
    const logStream = fs.createReadStream(logFilePath, { encoding: 'utf8' });
    logStream.pipe(res);
});

// Expose global running state
app.get('/status', (req, res) => {
    res.json({ running: isRunning , user:lastUser});
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
