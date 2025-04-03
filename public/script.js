let logInterval = null;

function fetchLogs(user) {
    if (!user) return;
    $.get(`/logs/${user}`, function(data) {
        const logBox = $("#log-output");
        logBox.text(data);

        // Auto-scroll to the bottom
        logBox.scrollTop(logBox[0].scrollHeight);
    });
}

function startLogPolling(user) {
    if (logInterval) clearInterval(logInterval); // Clear any existing interval
    logInterval = setInterval(() => fetchLogs(user), 2000); // Fetch logs every 2 sec
}

function updateUI() {
    $.get("/status", function (status) {
        if (status.running) {
            $(".start-comfy").prop("disabled", true);
            $(".stop-comfy").prop("disabled", false);
            fetchLogs(status.user); // Restore logs on page refresh
            startLogPolling(status.user);
        } else {
            $(".start-comfy").prop("disabled", false);
            $(".stop-comfy").prop("disabled", true);
            $("#log-output").text(""); // Clear logs if not running
            clearInterval(logInterval);
        }
    });
}

$(document).ready(function() {
    updateUI();
    $.getJSON("/config.json", function(config) {
        const volumeName = config.vol_name;

        $.getJSON("/volume_map.json", function(volumeMap) {
            const usersToShow = volumeMap[volumeName] || [];

            // Initially hide all rows
            $("tbody tr").hide();

            // Show only the users from the correct volume
            usersToShow.forEach(function(user) {
                $("#row" + user).show();
            });
        });
    });
    $('.stop-comfy').prop("disabled", true); // Ensure stop buttons are initially disabled
    $('.start-comfy').click(function () {
        const user = $(this).data('user');
        // Disable Start button and enable Stop button
        $(this).prop("disabled", true);
        $(this).siblings('.stop-comfy').prop("disabled", false);
        $.get('/start_comfyui/' + user, function (data) {
            alert(data);
            fetchLogs(user); // Fetch logs after starting
            startLogPolling(user); // Keep logs updating
        });
    });

    $('.stop-comfy').click(function () {
        const user = $(this).siblings('.start-comfy').data('user');
        // Disable Stop button and enable Start button
        $(this).prop("disabled", true);
        $(this).siblings('.start-comfy').prop("disabled", false);
        $.get('/stop_comfyui', function (data) {
            alert(data);
            $("#log-output").text(""); // Clear logs when stopped
            clearInterval(logInterval); // Stop log updates
        });
    });

});