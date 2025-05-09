let logInterval = null;
const logBox = document.getElementById("comfyLogBox");
const logWrapper = document.querySelector(".comfy-logs-wrapper");
const jumpButton = document.getElementById("jumpToBottomButton");

let autoScrollEnabled = true;
let lastContentHeight = 0;

// Handle card click
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    // Add 'selected' to clicked, hide others
    document.querySelectorAll(".card").forEach((other) => {
      if (other !== card) {
        other.classList.add("hidden");
      }
    });
    card.classList.add("selected");

    const cardButtons = card.querySelector(".card-buttons");
    cardButtons.classList.remove("hidden");
    let cardName = card.querySelector(".name").textContent;
    if (cardName.toLowerCase() === "intern") {
      let setupButton = cardButtons.querySelector(".setup-button");
      setupButton.classList.remove("hidden");
    }
    // Delay log box appearance to sync with card transition
    const logBox = document.getElementById("logBox");
    setTimeout(() => {
      logBox.classList.add("visible");
    }, 500); // match transition duration
    const pageHeader = document.getElementById("pageHeader");
    pageHeader.classList.add("hidden");
  });
});

// Handle back button click
document.getElementById("backButton").addEventListener("click", () => {
  // Hide log box
  const logBox = document.getElementById("logBox");
  logBox.classList.remove("visible");

  // Remove selected class
  const selected = document.querySelector(".card.selected");
  if (selected) {
    selected.classList.remove("selected");
    selected.classList.remove("hidden");
    const cardButtons = selected.querySelector(".card-buttons");
    cardButtons.classList.add("hidden");
  }

  const pageHeader = document.getElementById("pageHeader");
  if (pageHeader) {
    pageHeader.classList.remove("hidden");
  }

  // Show all cards again after transition delay
  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("hidden");
    });
  }, 300);
});

// Update the visual state of the jump button based on autoscroll status
function updateJumpButtonState() {
  if (autoScrollEnabled) {
    jumpButton.classList.remove("autoscroll-disabled");
    jumpButton.setAttribute("title", "Auto-scroll enabled");
  } else {
    jumpButton.classList.add("autoscroll-disabled");
    jumpButton.setAttribute(
      "title",
      "Auto-scroll disabled - Click to re-enable"
    );
  }
}

logWrapper.addEventListener("scroll", () => {
  const buffer = 20; // threshold in pixels to still count as "at bottom"
  const distanceFromBottom =
    logWrapper.scrollHeight - logWrapper.scrollTop - logWrapper.clientHeight;

  const wasAutoScrollEnabled = autoScrollEnabled;
  autoScrollEnabled = distanceFromBottom <= buffer;
  // Only update the UI if there was a change in the autoscroll state
  if (wasAutoScrollEnabled !== autoScrollEnabled) {
    updateJumpButtonState();
  }
});

jumpButton.addEventListener("click", () => {
  autoScrollEnabled = true;
  updateJumpButtonState();
  logWrapper.scrollTop = logWrapper.scrollHeight;
});

function scrollToBottomIfEnabled() {
  if (autoScrollEnabled) {
    // Ensure this happens after the DOM has updated
    setTimeout(() => {
      logWrapper.scrollTop = logWrapper.scrollHeight;
    }, 0);
  }
}

// called by the copy button
function copyToClipboard() {
  const text = document.getElementById("copyText").innerText;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard using navigator.clipboard");
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const isSuccessfulCopy = document.execCommand("copy");
    if (!isSuccessfulCopy) {
      throw new Error("Failed to copy using execCommand");
    }
    else{
      console.log("Text copied to clipboard using execCommand");
    }
    document.body.removeChild(textArea);
  }
  const copyButton = document.getElementById("copyButton");
  const buttonOrigHTML = copyButton.innerHTML;
  copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  copyButton.disabled = true;
  // Reset button after animation
  setTimeout(() => {
    if (document.body.contains(copyButton)) {
      copyButton.innerHTML = buttonOrigHTML;
      copyButton.disabled = false;
    } else {
      debugLog("Copy button removed from DOM before icon reset timeout.");
    }
  }, 1500);
}

// Functions
// gets called when the page loads
function updateCopyLink() {
  fetch("/copy_link")
    .then((response) => response.json())
    .then((data) => {
      const podlink = data.link;
      document.getElementById("copyText").innerText = podlink;
    })
    .catch((error) => console.error("Error fetching link:", error));
}

function updateName(personClass, newName) {
  const card = document.querySelector(`.card.${personClass}`);
  if (card) {
    let imageName = newName.toLowerCase();
    const imageUrl = `url('images/${imageName}.png')`;
    card.style.backgroundImage = imageUrl;
    let nameElement = card.querySelector(".name");
    nameElement.textContent = newName; // Update the name text
  } else {
    console.warn(`No element found with class .card.${personClass}`);
  }
}

function getUserNames() {
  return fetch("/config.json")
    .then((response) => response.json())
    .then((data) => {
      const vol_name = data.vol_name;
      return fetch("/volume_map.json")
        .then((response) => response.json())
        .then((volumeMap) => {
          const usersToShow = volumeMap[vol_name] || [];
          return usersToShow;
        })
        .catch((error) => console.error("Error fetching volume map:", error));
    })
    .catch((error) => console.error("Error fetching usernames:", error));
}

function fetchLogs(user) {
  fetch("/logs/" + user)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Only update DOM if content has changed
      if (logBox.innerHTML !== data) {
        logBox.innerHTML = data; // Update log box with new logs

        // Check if content has grown (new logs added)
        const contentHeightChanged = logBox.scrollHeight > lastContentHeight;
        lastContentHeight = logBox.scrollHeight;

        // If content height changed and we're supposed to auto-scroll, do it
        if (contentHeightChanged) {
          scrollToBottomIfEnabled();
        }
      }
    })
    .catch((error) => console.error("Error fetching logs:", error));
}

function startLogPolling(user) {
  if (logInterval) clearInterval(logInterval); // Clear any existing interval

  // Reset autoscroll state when starting to poll new logs
  autoScrollEnabled = true;
  updateJumpButtonState();
  lastContentHeight = 0;

  // Do an initial fetch
  fetchLogs(user);

  // Then set up the polling
  logInterval = setInterval(() => fetchLogs(user), 2000); // Fetch logs every 2 sec
}

function startComfy(person_id) {
  const card = document.querySelector(`.card.${person_id}`);
  const person_name = card.querySelector(".name").textContent;

  fetch("/start_comfyui/" + person_name)
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      startLogPolling(person_name); // Start log polling
    })
    .catch((error) => console.error("Error starting comfy:", error));
}

function stopComfy() {
  fetch("/stop_comfyui")
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      logBox.innerHTML = ""; // Clear previous logs
      lastContentHeight = 0;
      clearInterval(logInterval); // Stop log updates
    })
    .catch((error) => console.error("Error stopping comfy:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  updateCopyLink();
  updateJumpButtonState();
  getUserNames().then((names) => {
    // Assuming names is an array of user names
    // update names in the UI
    names.forEach((name, index) => {
      updateName(`person${index + 1}`, name);
    });
  });
});