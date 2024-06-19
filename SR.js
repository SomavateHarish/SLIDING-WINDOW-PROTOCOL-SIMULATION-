const recognition = new webkitSpeechRecognition(); // For Chrome
      recognition.continuous = true;

      const commands = {
        "click start": () => document.getElementById("startButton").click(),
        "click stop": () => document.getElementById("stopButton").click(),
        "send": () => document.getElementById("send").click()
      };

      recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        document.getElementById("output").textContent = result;

        for (const command in commands) {
          if (result.includes(command)) {
            commands[command]();
          }
        }
      };

      recognition.onerror = function (event) {
        console.error("Speech recognition error: " + event.error);
      };

      document.getElementById("startButton").addEventListener("click", function () {
        recognition.start();
      });

      document.getElementById("stopButton").addEventListener("click", function () {
        recognition.stop();
      });

      