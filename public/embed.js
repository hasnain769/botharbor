(function () {
  const BOT_IFRAME_ID = "botharbor-chatbot-iframe";

  function getScriptConfig() {
    // Prefer window config
    if (window.BOTHARBOR_CONFIG && window.BOTHARBOR_CONFIG.botId) {
      return window.BOTHARBOR_CONFIG;
    }

    // Fallback: only run this after DOM is fully ready
    const scripts = document.querySelectorAll('script[src]');
    for (const script of Array.from(scripts).reverse()) {
      if (
        script.src.includes("botharbor.ai/embed.js") ||
        script.src.includes("localhost:3000/embed.js")
      ) {
        const dataset = script.dataset || {};
        if (dataset.botId) {
          return {
            botId: dataset.botId,
            theme: dataset.theme || "default",
            greeting: dataset.greeting || "",
          };
        }
      }
    }

    return null;
  }

  function loadChatbot() {
    if (document.getElementById(BOT_IFRAME_ID)) return;

    const config = getScriptConfig();
    if (!config || !config.botId) {
      console.error("Botharbor: botId is required via BOTHARBOR_CONFIG or data-bot-id.");
      return;
    }

    const { botId, theme, greeting } = config;

    const params = new URLSearchParams({
      bot_id: botId,
      theme,
    });
    if (greeting) params.set("greeting", greeting);

    const iframe = document.createElement("iframe");
    iframe.id = BOT_IFRAME_ID;
    iframe.src = `https://botharbor.ai/widget?${params.toString()}`;

    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.width = "360px";
    iframe.style.height = "480px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.zIndex = "999999";

    document.body.appendChild(iframe);
  }

  if (document.readyState === "complete") {
    setTimeout(loadChatbot, 0); // Ensures DOM is fully parsed
  } else {
    window.addEventListener("load", () => setTimeout(loadChatbot, 0));
  }
})();
