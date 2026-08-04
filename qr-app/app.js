const STORAGE_KEY = "qr-studio-templates-v1";

const builtInTemplates = [
  {
    id: "default-light",
    name: "Default Light",
    builtIn: true,
    vars: {
      bg: "#f5f7fb",
      panel: "#ffffff",
      text: "#151a29",
      accent: "#335dff",
      radius: 14,
      qrDark: "#151a29",
      qrLight: "#ffffff"
    }
  },
  {
    id: "midnight",
    name: "Midnight",
    builtIn: true,
    vars: {
      bg: "#0f172a",
      panel: "#111827",
      text: "#e5e7eb",
      accent: "#22c55e",
      radius: 16,
      qrDark: "#0f172a",
      qrLight: "#ffffff"
    }
  },
  {
    id: "mint",
    name: "Mint",
    builtIn: true,
    vars: {
      bg: "#f0fdf4",
      panel: "#ffffff",
      text: "#064e3b",
      accent: "#059669",
      radius: 18,
      qrDark: "#064e3b",
      qrLight: "#ffffff"
    }
  }
];

const state = {
  templates: [],
  activeTemplateId: "",
  generated: false,
  lastUrl: ""
};

const dom = {
  urlInput: document.getElementById("urlInput"),
  sizeInput: document.getElementById("sizeInput"),
  marginInput: document.getElementById("marginInput"),
  generateBtn: document.getElementById("generateBtn"),
  statusText: document.getElementById("statusText"),
  qrCanvas: document.getElementById("qrCanvas"),
  downloadPngBtn: document.getElementById("downloadPngBtn"),
  downloadFileBtn: document.getElementById("downloadFileBtn"),
  sharePngBtn: document.getElementById("sharePngBtn"),
  shareFileBtn: document.getElementById("shareFileBtn"),
  templateSelect: document.getElementById("templateSelect"),
  templateName: document.getElementById("templateName"),
  radiusInput: document.getElementById("radiusInput"),
  bgColorInput: document.getElementById("bgColorInput"),
  panelColorInput: document.getElementById("panelColorInput"),
  textColorInput: document.getElementById("textColorInput"),
  accentColorInput: document.getElementById("accentColorInput"),
  qrDarkInput: document.getElementById("qrDarkInput"),
  qrLightInput: document.getElementById("qrLightInput"),
  applyTemplateBtn: document.getElementById("applyTemplateBtn"),
  saveTemplateBtn: document.getElementById("saveTemplateBtn"),
  deleteTemplateBtn: document.getElementById("deleteTemplateBtn")
};

function boot() {
  const customTemplates = loadCustomTemplates();
  state.templates = [...builtInTemplates, ...customTemplates];
  state.activeTemplateId = state.templates[0].id;

  renderTemplateOptions();
  selectTemplate(state.activeTemplateId);

  dom.generateBtn.addEventListener("click", generateQr);
  dom.downloadPngBtn.addEventListener("click", downloadPng);
  dom.downloadFileBtn.addEventListener("click", downloadUrlFile);
  dom.sharePngBtn.addEventListener("click", sharePng);
  dom.shareFileBtn.addEventListener("click", shareUrlFile);
  dom.templateSelect.addEventListener("change", onTemplateChange);
  dom.applyTemplateBtn.addEventListener("click", applyTemplateFromEditor);
  dom.saveTemplateBtn.addEventListener("click", saveTemplate);
  dom.deleteTemplateBtn.addEventListener("click", deleteTemplate);
}

function loadCustomTemplates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomTemplates() {
  const custom = state.templates.filter((t) => !t.builtIn);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}

function renderTemplateOptions() {
  dom.templateSelect.innerHTML = "";
  for (const template of state.templates) {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.builtIn ? `${template.name} (Built-in)` : template.name;
    dom.templateSelect.appendChild(option);
  }
}

function onTemplateChange() {
  selectTemplate(dom.templateSelect.value);
}

function selectTemplate(templateId) {
  const template = state.templates.find((t) => t.id === templateId);
  if (!template) return;
  state.activeTemplateId = template.id;
  dom.templateSelect.value = template.id;
  writeTemplateToEditor(template);
  applyTemplate(template);
}

function writeTemplateToEditor(template) {
  dom.templateName.value = template.name;
  dom.radiusInput.value = template.vars.radius;
  dom.bgColorInput.value = template.vars.bg;
  dom.panelColorInput.value = template.vars.panel;
  dom.textColorInput.value = template.vars.text;
  dom.accentColorInput.value = template.vars.accent;
  dom.qrDarkInput.value = template.vars.qrDark;
  dom.qrLightInput.value = template.vars.qrLight;
  dom.deleteTemplateBtn.disabled = template.builtIn;
}

function readEditorAsTemplateVars() {
  return {
    bg: dom.bgColorInput.value,
    panel: dom.panelColorInput.value,
    text: dom.textColorInput.value,
    accent: dom.accentColorInput.value,
    radius: Number(dom.radiusInput.value),
    qrDark: dom.qrDarkInput.value,
    qrLight: dom.qrLightInput.value
  };
}

function applyTemplate(template) {
  document.documentElement.style.setProperty("--bg", template.vars.bg);
  document.documentElement.style.setProperty("--panel", template.vars.panel);
  document.documentElement.style.setProperty("--text", template.vars.text);
  document.documentElement.style.setProperty("--accent", template.vars.accent);
  document.documentElement.style.setProperty("--radius", `${template.vars.radius}px`);
}

function applyTemplateFromEditor() {
  const template = {
    name: dom.templateName.value.trim() || "Preview",
    vars: readEditorAsTemplateVars()
  };
  applyTemplate(template);
  if (state.generated) {
    generateQr();
  }
  setStatus("Template preview applied.");
}

function saveTemplate() {
  const name = dom.templateName.value.trim();
  if (!name) {
    setStatus("Provide a template name before saving.");
    return;
  }
  const vars = readEditorAsTemplateVars();
  const existing = state.templates.find((t) => t.id === state.activeTemplateId);

  if (existing && !existing.builtIn) {
    existing.name = name;
    existing.vars = vars;
    setStatus("Template updated.");
  } else {
    const id = `custom-${Date.now()}`;
    state.templates.push({ id, name, builtIn: false, vars });
    state.activeTemplateId = id;
    setStatus("Template saved.");
  }

  saveCustomTemplates();
  renderTemplateOptions();
  selectTemplate(state.activeTemplateId);
}

function deleteTemplate() {
  const template = state.templates.find((t) => t.id === state.activeTemplateId);
  if (!template || template.builtIn) return;
  state.templates = state.templates.filter((t) => t.id !== template.id);
  saveCustomTemplates();
  renderTemplateOptions();
  selectTemplate(state.templates[0].id);
  setStatus("Template deleted.");
}

function getActiveTemplate() {
  return state.templates.find((t) => t.id === state.activeTemplateId) ?? state.templates[0];
}

function normalizeUrl(input) {
  const value = input.trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

async function generateQr() {
  const normalized = normalizeUrl(dom.urlInput.value);
  const size = Number(dom.sizeInput.value);
  const margin = Number(dom.marginInput.value);

  if (!normalized) {
    setStatus("Please enter a URL.");
    return;
  }

  try {
    new URL(normalized);
  } catch {
    setStatus("Invalid URL format.");
    return;
  }

  const template = getActiveTemplate();
  const safeSize = Number.isFinite(size) ? Math.min(Math.max(size, 128), 1024) : 320;
  const safeMargin = Number.isFinite(margin) ? Math.min(Math.max(margin, 0), 8) : 2;

  dom.qrCanvas.width = safeSize;
  dom.qrCanvas.height = safeSize;

  try {
    await QRCode.toCanvas(dom.qrCanvas, normalized, {
      width: safeSize,
      margin: safeMargin,
      color: {
        dark: template.vars.qrDark,
        light: template.vars.qrLight
      }
    });
    state.generated = true;
    state.lastUrl = normalized;
    dom.urlInput.value = normalized;
    setExportEnabled(true);
    setStatus("QR code generated.");
  } catch {
    state.generated = false;
    setExportEnabled(false);
    setStatus("Failed to generate QR code.");
  }
}

function setExportEnabled(enabled) {
  dom.downloadPngBtn.disabled = !enabled;
  dom.downloadFileBtn.disabled = !enabled;
  dom.sharePngBtn.disabled = !enabled;
  dom.shareFileBtn.disabled = !enabled;
}

function setStatus(message) {
  dom.statusText.textContent = message;
}

function getPngBlob() {
  return new Promise((resolve) => {
    dom.qrCanvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

function triggerDownload(fileName, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

async function downloadPng() {
  if (!state.generated) return;
  const blob = await getPngBlob();
  if (!blob) {
    setStatus("Unable to export PNG.");
    return;
  }
  triggerDownload("qr-code.png", blob);
  setStatus("PNG downloaded.");
}

function downloadUrlFile() {
  if (!state.generated) return;
  const blob = new Blob([`${state.lastUrl}\n`], { type: "text/plain" });
  triggerDownload("qr-url.txt", blob);
  setStatus("URL file downloaded.");
}

async function sharePng() {
  if (!state.generated) return;
  if (!navigator.share || !navigator.canShare) {
    setStatus("File sharing is not supported on this browser.");
    return;
  }

  const blob = await getPngBlob();
  if (!blob) {
    setStatus("Unable to prepare PNG for sharing.");
    return;
  }

  const file = new File([blob], "qr-code.png", { type: "image/png" });
  if (!navigator.canShare({ files: [file] })) {
    setStatus("PNG sharing is not available on this device.");
    return;
  }

  try {
    await navigator.share({
      title: "QR Code",
      text: state.lastUrl,
      files: [file]
    });
    setStatus("PNG shared.");
  } catch {
    setStatus("Share was cancelled or failed.");
  }
}

async function shareUrlFile() {
  if (!state.generated) return;
  if (!navigator.share || !navigator.canShare) {
    setStatus("File sharing is not supported on this browser.");
    return;
  }

  const file = new File([`${state.lastUrl}\n`], "qr-url.txt", { type: "text/plain" });
  if (!navigator.canShare({ files: [file] })) {
    setStatus("Text file sharing is not available on this device.");
    return;
  }

  try {
    await navigator.share({
      title: "QR URL",
      text: "Shared from QR Studio",
      files: [file]
    });
    setStatus("URL file shared.");
  } catch {
    setStatus("Share was cancelled or failed.");
  }
}

boot();
