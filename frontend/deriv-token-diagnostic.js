(function () {
  const DERIV_ENDPOINT = "wss://ws.derivws.com/websockets/v3?app_id=1089";

  const form = document.querySelector("#diagnostic-form");
  const tokenInput = document.querySelector("#token");
  const runButton = document.querySelector("#run-button");
  const authorizedOutput = document.querySelector("#authorized");
  const loginIdOutput = document.querySelector("#loginid");
  const accountTypeOutput = document.querySelector("#account-type");
  const currencyOutput = document.querySelector("#currency");
  const balanceOutput = document.querySelector("#balance");
  const errorOutput = document.querySelector("#error");
  const rawLog = document.querySelector("#raw-log");

  function resetResult() {
    authorizedOutput.textContent = "Testing...";
    authorizedOutput.className = "";
    loginIdOutput.textContent = "-";
    accountTypeOutput.textContent = "-";
    currencyOutput.textContent = "-";
    balanceOutput.textContent = "-";
    errorOutput.textContent = "-";
    rawLog.textContent = "";
  }

  function appendRaw(label, payload) {
    rawLog.textContent += `${label}\n${JSON.stringify(payload, null, 2)}\n\n`;
  }

  function formatBalance(balance, currency) {
    const amount = Number(balance || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return currency ? `${amount} ${currency}` : amount;
  }

  function getAccountType(authorize) {
    return authorize.is_virtual || String(authorize.loginid || "").startsWith("VRTC") ? "Demo" : "Real";
  }

  function waitForOpen(socket) {
    return new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", () => reject(new Error("WebSocket connection failed.")), { once: true });
    });
  }

  function request(socket, payload) {
    return new Promise((resolve, reject) => {
      const handleMessage = (event) => {
        const data = JSON.parse(event.data);
        socket.removeEventListener("message", handleMessage);
        appendRaw(`Response for ${Object.keys(payload)[0]}:`, data);

        if (data.error) {
          reject(data);
          return;
        }

        resolve(data);
      };

      socket.addEventListener("message", handleMessage);
      appendRaw("Request:", payload);
      socket.send(JSON.stringify(payload));
    });
  }

  async function runDiagnostic(token) {
    resetResult();
    const socket = new WebSocket(DERIV_ENDPOINT);

    try {
      await waitForOpen(socket);
      appendRaw("WebSocket:", { status: "connected", endpoint: DERIV_ENDPOINT });

      const authResponse = await request(socket, { authorize: token });
      const authorize = authResponse.authorize;
      authorizedOutput.textContent = "Yes";
      authorizedOutput.className = "pass";
      loginIdOutput.textContent = authorize.loginid || "-";
      accountTypeOutput.textContent = getAccountType(authorize);
      currencyOutput.textContent = authorize.currency || "-";

      const balanceResponse = await request(socket, { balance: 1 });
      const balance = balanceResponse.balance;
      balanceOutput.textContent = formatBalance(balance.balance, balance.currency || authorize.currency);
      currencyOutput.textContent = balance.currency || authorize.currency || "-";
    } catch (errorResponse) {
      const rawError = errorResponse.error || { message: errorResponse.message || "Unknown failure." };
      appendRaw("Failure:", errorResponse);
      authorizedOutput.textContent = "No";
      authorizedOutput.className = "fail";
      errorOutput.textContent = `${rawError.code || "ERROR"}: ${rawError.message || "Authorization failed."}`;
    } finally {
      socket.close();
      tokenInput.value = "";
      runButton.disabled = false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const token = tokenInput.value.trim();
    if (!token) {
      authorizedOutput.textContent = "No";
      authorizedOutput.className = "fail";
      errorOutput.textContent = "Enter a Deriv API token.";
      return;
    }

    runButton.disabled = true;
    runDiagnostic(token);
  });
}());
