"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  BRAIN_CONSOLE_BUILD_ID: () => BRAIN_CONSOLE_BUILD_ID,
  default: () => BrainConsolePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/settings.ts
var DEFAULT_BRAIN_CONSOLE_SETTINGS = {
  brainCoreUrl: "http://localhost:4877"
};
function normalizeBrainCoreUrl(rawValue) {
  try {
    const url = new URL(rawValue);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { value: DEFAULT_BRAIN_CONSOLE_SETTINGS.brainCoreUrl, error: "Brain Core URL must use http or https." };
    }
    const warning = isLikelyLocalhost(url.hostname) ? void 0 : "Brain Core URL is not localhost; this plugin is intended for local read-only use.";
    return { value: url.toString().replace(/\/+$/g, ""), warning };
  } catch {
    return { value: DEFAULT_BRAIN_CONSOLE_SETTINGS.brainCoreUrl, error: "Brain Core URL is invalid." };
  }
}
function isLikelyLocalhost(hostname) {
  return ["localhost", "127.0.0.1", "::1"].includes(hostname);
}

// src/view.ts
var import_obsidian = require("obsidian");

// src/components/VO/types.ts
var DEFAULT_DATE_RANGE = {
  preset: "week",
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
  endDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
};

// src/components/VO/VOContext.ts
var STORAGE_KEY = "vo-context-state";
function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {
      projectId: null,
      accountId: null,
      platformTargets: [],
      pipelineProfileId: null,
      dateRange: DEFAULT_DATE_RANGE
    };
    const parsed = JSON.parse(stored);
    return {
      projectId: parsed.projectId ?? null,
      accountId: parsed.accountId ?? null,
      platformTargets: parsed.platformTargets ?? [],
      pipelineProfileId: parsed.pipelineProfileId ?? null,
      dateRange: parsed.dateRange ?? DEFAULT_DATE_RANGE
    };
  } catch {
    return {
      projectId: null,
      accountId: null,
      platformTargets: [],
      pipelineProfileId: null,
      dateRange: DEFAULT_DATE_RANGE
    };
  }
}
var VOContextManager = class {
  state = getInitialState();
  listeners = /* @__PURE__ */ new Set();
  getState() {
    return { ...this.state };
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  notify() {
    this.listeners.forEach((listener) => listener(this.getState()));
    this.persist();
  }
  persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
    }
  }
  setProjectId(projectId) {
    this.state = {
      ...this.state,
      projectId,
      accountId: null,
      platformTargets: [],
      pipelineProfileId: null
    };
    this.notify();
  }
  setAccountId(accountId) {
    this.state = {
      ...this.state,
      accountId,
      platformTargets: []
    };
    this.notify();
  }
  setPlatformTargets(platformTargets) {
    this.state = {
      ...this.state,
      platformTargets
    };
    this.notify();
  }
  setPipelineProfileId(pipelineProfileId) {
    this.state = {
      ...this.state,
      pipelineProfileId
    };
    this.notify();
  }
  setDateRange(dateRange) {
    this.state = {
      ...this.state,
      dateRange
    };
    this.notify();
  }
  reset() {
    this.state = getInitialState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
    }
    this.notify();
  }
};
var instance = null;
function getVOContextManager() {
  if (!instance) {
    instance = new VOContextManager();
  }
  return instance;
}

// src/components/VO/VOContextBar.ts
var VOContextBar = class {
  container;
  projects = [];
  accounts = [];
  pipelineProfiles = [];
  selector;
  ctx = getVOContextManager();
  unsubscribe = null;
  constructor(container, data) {
    this.container = container;
    this.projects = data.projects || [];
    this.accounts = data.accounts || [];
    this.pipelineProfiles = data.pipelineProfiles || [];
    this.selector = data.selector;
    this.unsubscribe = this.ctx.subscribe(() => this.render());
    this.render();
  }
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  getFilteredAccounts() {
    const state = this.ctx.getState();
    return this.accounts.filter((a) => a.projectId === state.projectId);
  }
  getSelectedAccount() {
    const state = this.ctx.getState();
    return this.getFilteredAccounts().find((a) => a.id === state.accountId);
  }
  getFilteredProfiles() {
    const state = this.ctx.getState();
    return this.pipelineProfiles.filter((p) => p.projectId === state.projectId);
  }
  render() {
    const state = this.ctx.getState();
    const filteredAccounts = this.getFilteredAccounts();
    const selectedAccount = this.getSelectedAccount();
    const filteredProfiles = this.getFilteredProfiles();
    this.container.innerHTML = `
      <div class="vo-context-bar">
        <div class="vo-context-selectors">
          ${this.renderProjectSelector()}
          ${this.renderAccountSelector(filteredAccounts)}
          ${this.renderPlatformTargets(selectedAccount)}
          ${this.renderProfileSelector(filteredProfiles)}
        </div>
        <div class="vo-context-meta">
          ${this.renderSelectorHealthChip()}
          ${this.renderDateRange()}
        </div>
      </div>
    `;
    this.attachEventListeners(filteredAccounts, filteredProfiles);
  }
  renderProjectSelector() {
    const state = this.ctx.getState();
    return `
      <div class="vo-selector">
        <label>Project</label>
        <select class="vo-select vo-project-select" ${this.projects.length === 0 ? "disabled" : ""}>
          <option value="">\u2014 Choose project \u2014</option>
          ${this.projects.map((p) => `
            <option value="${p.id}" ${p.id === state.projectId ? "selected" : ""}>
              ${p.name}
            </option>
          `).join("")}
        </select>
      </div>
    `;
  }
  renderAccountSelector(filteredAccounts) {
    const state = this.ctx.getState();
    return `
      <div class="vo-selector">
        <label>Account</label>
        <select class="vo-select vo-account-select" ${!state.projectId || filteredAccounts.length === 0 ? "disabled" : ""}>
          <option value="">\u2014 Choose account \u2014</option>
          ${filteredAccounts.map((a) => `
            <option value="${a.id}" ${a.id === state.accountId ? "selected" : ""}>
              ${a.handle} (${a.platform})
            </option>
          `).join("")}
        </select>
      </div>
    `;
  }
  renderPlatformTargets(selectedAccount) {
    const state = this.ctx.getState();
    if (!selectedAccount) {
      return `
        <div class="vo-selector">
          <label>Platform Targets</label>
          <div class="vo-platform-targets">
            <span class="vo-placeholder">Select account first</span>
          </div>
        </div>
      `;
    }
    return `
      <div class="vo-selector">
        <label>Platform Targets</label>
        <div class="vo-platform-targets">
          <label class="vo-checkbox">
            <input
              type="checkbox"
              class="vo-platform-checkbox"
              value="${selectedAccount.platform}"
              ${state.platformTargets.includes(selectedAccount.platform) ? "checked" : ""}
            />
            ${selectedAccount.platform.toUpperCase()}
          </label>
        </div>
      </div>
    `;
  }
  renderProfileSelector(filteredProfiles) {
    const state = this.ctx.getState();
    return `
      <div class="vo-selector">
        <label>Pipeline Profile</label>
        <select class="vo-select vo-profile-select" ${!state.projectId || filteredProfiles.length === 0 ? "disabled" : ""}>
          <option value="">\u2014 Choose profile \u2014</option>
          ${filteredProfiles.map((p) => `
            <option value="${p.id}" ${p.id === state.pipelineProfileId ? "selected" : ""}>
              ${p.name}
            </option>
          `).join("")}
        </select>
      </div>
    `;
  }
  renderDateRange() {
    const state = this.ctx.getState();
    const dateLabel = state.dateRange.preset === "custom" ? `${state.dateRange.startDate} to ${state.dateRange.endDate}` : state.dateRange.preset.charAt(0).toUpperCase() + state.dateRange.preset.slice(1);
    return `
      <div class="vo-date-range">
        <label>Date Range</label>
        <div class="vo-date-buttons">
          <button class="vo-date-btn ${state.dateRange.preset === "today" ? "active" : ""}" data-preset="today">
            Today
          </button>
          <button class="vo-date-btn ${state.dateRange.preset === "week" ? "active" : ""}" data-preset="week">
            Week
          </button>
          <button class="vo-date-btn ${state.dateRange.preset === "month" ? "active" : ""}" data-preset="month">
            Month
          </button>
          <button class="vo-date-btn ${state.dateRange.preset === "custom" ? "active" : ""}" data-preset="custom">
            Custom
          </button>
        </div>
        <span class="vo-date-display">${dateLabel}</span>
      </div>
    `;
  }
  renderSelectorHealthChip() {
    const selector = this.selector;
    const state = !selector ? "unknown" : selector.running && selector.healthy ? "healthy" : selector.running ? "degraded" : "stopped";
    const statusLabel = state === "healthy" ? "Running" : state === "degraded" ? "Degraded" : state === "stopped" ? "Stopped" : "Unknown";
    const currentProvider = selector?.providers?.find((provider) => provider.healthy)?.id ?? selector?.providers?.[0]?.id ?? "No provider";
    const lastChecked = selector?.lastChecked ? new Date(selector.lastChecked).toLocaleTimeString() : "Not checked";
    return `
      <div class="vo-selector-health-chip vo-selector-health-chip--${state}" title="AI selector last checked: ${lastChecked}">
        <span class="vo-selector-health-dot"></span>
        <span class="vo-selector-health-main">AI Selector ${statusLabel}</span>
        <span class="vo-selector-health-provider">${currentProvider}</span>
      </div>
    `;
  }
  attachEventListeners(filteredAccounts, filteredProfiles) {
    const projectSelect = this.container.querySelector(".vo-project-select");
    const accountSelect = this.container.querySelector(".vo-account-select");
    const profileSelect = this.container.querySelector(".vo-profile-select");
    const platformCheckbox = this.container.querySelector(".vo-platform-checkbox");
    const dateButtons = this.container.querySelectorAll("[data-preset]");
    if (projectSelect) {
      projectSelect.addEventListener("change", (e) => {
        const target = e.target;
        this.ctx.setProjectId(target.value || null);
      });
    }
    if (accountSelect) {
      accountSelect.addEventListener("change", (e) => {
        const target = e.target;
        this.ctx.setAccountId(target.value || null);
      });
    }
    if (profileSelect) {
      profileSelect.addEventListener("change", (e) => {
        const target = e.target;
        this.ctx.setPipelineProfileId(target.value || null);
      });
    }
    if (platformCheckbox) {
      platformCheckbox.addEventListener("change", (e) => {
        const target = e.target;
        const updated = target.checked ? [target.value] : [];
        this.ctx.setPlatformTargets(updated);
      });
    }
    dateButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const preset = btn.getAttribute("data-preset");
        this.setDatePreset(preset);
      });
    });
  }
  setDatePreset(preset) {
    const now = /* @__PURE__ */ new Date();
    let startDate;
    switch (preset) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "custom":
        return;
    }
    this.ctx.setDateRange({
      preset,
      startDate: startDate.toISOString().split("T")[0],
      endDate: now.toISOString().split("T")[0]
    });
  }
};

// src/components/Design/shadcn-components.ts
function Badge(props) {
  const { count, status = "ok", className = "" } = props;
  return `<span class="bc-badge ${status} ${className}">${count}</span>`;
}
function StatusPill(props) {
  const { status, label, icon = "\u25CF", className = "" } = props;
  const mappedStatus = status === "ok" ? "online" : status === "warning" ? "degraded" : status;
  return `<div class="bc-status-pill ${mappedStatus} ${className}">${icon} ${label}</div>`;
}

// src/components/VO/OverviewPanel.ts
var BASE_URL = "http://localhost:4877";
var REFRESH_INTERVAL_MS = 3e4;
var OverviewPanel = class {
  container;
  selector;
  analytics;
  accountStats;
  accounts = [];
  voStatus;
  ctx = getVOContextManager();
  unsubscribe = null;
  refreshTimer = null;
  loading = false;
  constructor(container, data) {
    this.container = container;
    this.selector = data.selector;
    this.analytics = data.analytics;
    this.accountStats = data.accountStats;
    this.accounts = data.accounts || [];
    this.unsubscribe = this.ctx.subscribe(() => this.render());
    this.render();
    this.fetchLiveData();
    this.refreshTimer = setInterval(() => this.fetchLiveData(), REFRESH_INTERVAL_MS);
  }
  async fetchLiveData() {
    this.loading = true;
    try {
      const [statusRes, analyticsRes] = await Promise.allSettled([
        fetch(`${BASE_URL}/api/infra/video-orchestrator/status`).then((r) => r.json()),
        fetch(`${BASE_URL}/api/video-orchestrator/analytics/summary`).then((r) => r.json())
      ]);
      if (statusRes.status === "fulfilled") {
        this.voStatus = statusRes.value;
      }
      if (analyticsRes.status === "fulfilled") {
        this.analytics = analyticsRes.value;
      }
    } catch {
    } finally {
      this.loading = false;
      this.render();
    }
  }
  render() {
    this.container.innerHTML = `
      <div class="vo-overview-panel">
        ${this.renderRefreshIndicator()}
        ${this.renderWorkerHealthCard()}
        ${this.renderAiSelectorCard()}
        ${this.renderActiveJobsCard()}
        ${this.renderQuotaWarningsCard()}
        ${this.renderCredentialStatusCard()}
        ${this.renderBlockers()}
      </div>
    `;
  }
  renderRefreshIndicator() {
    return `
      <div class="vo-overview-refresh-bar">
        <span class="vo-overview-refresh-label">
          ${this.loading ? "Refreshing..." : "Auto-refreshes every 30s"}
        </span>
        <span class="vo-overview-refresh-dot ${this.loading ? "vo-refresh-dot--active" : ""}"></span>
      </div>
    `;
  }
  renderWorkerHealthCard() {
    const queueDepth = this.voStatus?.queueDepth;
    const pending = queueDepth?.pending ?? "\u2013";
    const running = queueDepth?.running ?? "\u2013";
    const failed = queueDepth?.failed ?? "\u2013";
    const hasStatus = this.voStatus?.ok !== void 0;
    const workerOk = this.voStatus?.ok ?? null;
    const workerStatus = workerOk === true ? "Online" : workerOk === false ? "Error" : "Unknown";
    const statusPill = workerOk === true ? "ok" : workerOk === false ? "error" : "warning";
    return `
      <div class="vo-overview-card">
        <div class="vo-card-header">
          <span class="vo-card-icon">\u2699</span>
          <span class="vo-card-label">Worker Health</span>
          ${StatusPill({ status: statusPill, label: workerStatus })}
        </div>
        <div class="vo-card-body">
          <div class="vo-card-stat-row">
            <span class="vo-card-stat-label">Queue: Pending</span>
            <span class="vo-card-stat-value">${pending}</span>
          </div>
          <div class="vo-card-stat-row">
            <span class="vo-card-stat-label">Queue: Running</span>
            <span class="vo-card-stat-value" style="color: var(--bc-blue)">${running}</span>
          </div>
          <div class="vo-card-stat-row">
            <span class="vo-card-stat-label">Queue: Failed</span>
            <span class="vo-card-stat-value" style="color: var(--bc-red)">${failed}</span>
          </div>
          ${this.voStatus?.lastJobAt ? `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Last Job</span>
              <span class="vo-card-stat-value">${this.formatDate(this.voStatus.lastJobAt)}</span>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }
  renderAiSelectorCard() {
    const selectorHealthy = this.selector?.healthy ?? false;
    const selectorRunning = this.selector?.running ?? false;
    const selectorLabel = selectorHealthy ? "Healthy" : selectorRunning ? "Degraded" : "Offline";
    const statusPill = selectorHealthy ? "ok" : selectorRunning ? "warning" : "error";
    const providerCount = this.selector?.providers?.length ?? 0;
    const healthyProviders = this.selector?.providers?.filter((p) => p.healthy).length ?? 0;
    return `
      <div class="vo-overview-card">
        <div class="vo-card-header">
          <span class="vo-card-icon">\u25C6</span>
          <span class="vo-card-label">AI Selector Status</span>
          ${StatusPill({ status: statusPill, label: selectorLabel })}
        </div>
        <div class="vo-card-body">
          ${providerCount > 0 ? `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Providers</span>
              <span class="vo-card-stat-value">${healthyProviders}/${providerCount} healthy</span>
            </div>
          ` : `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Providers</span>
              <span class="vo-card-stat-value vo-muted">No data</span>
            </div>
          `}
          ${this.selector?.error ? `
            <div class="vo-card-alert">${this.selector.error}</div>
          ` : ""}
          ${this.selector?.uptime ? `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Uptime</span>
              <span class="vo-card-stat-value">${this.selector.uptime}</span>
            </div>
          ` : ""}
          ${(this.selector?.providers ?? []).map((p) => `
            <div class="vo-card-provider-row">
              <span class="vo-card-provider-dot" style="background: ${p.healthy ? "var(--bc-green)" : "var(--bc-red)"}"></span>
              <span class="vo-card-provider-name">${p.id}</span>
              <span class="vo-card-provider-state vo-muted">${p.circuitState}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
  renderActiveJobsCard() {
    const running = this.voStatus?.queueDepth?.running ?? null;
    const byType = this.voStatus?.jobsByType ?? {};
    const typeEntries = Object.entries(byType);
    const accounts = this.voStatus?.activeAccounts ?? null;
    return `
      <div class="vo-overview-card">
        <div class="vo-card-header">
          <span class="vo-card-icon">\u25B6</span>
          <span class="vo-card-label">Active Jobs</span>
          ${StatusPill({ status: "ok", label: `${running ?? "\u2013"} running` })}
        </div>
        <div class="vo-card-body">
          ${accounts !== null ? `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Active Accounts</span>
              <span class="vo-card-stat-value">${accounts}</span>
            </div>
          ` : ""}
          ${typeEntries.length > 0 ? typeEntries.map(([type, count]) => `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">${type}</span>
              <span class="vo-card-stat-value">${count}</span>
            </div>
          `).join("") : `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label vo-muted">No active job breakdown</span>
            </div>
          `}
          ${this.renderRecentPosts()}
        </div>
      </div>
    `;
  }
  renderRecentPosts() {
    const recent = this.voStatus?.recentPosts;
    if (!recent || recent.length === 0) return "";
    return `
      <div class="vo-card-divider"></div>
      <div class="vo-card-sublabel">Recent Posts</div>
      ${recent.slice(0, 3).map((post) => `
        <div class="vo-card-post-row">
          <span class="vo-card-post-platform">${post.platform}</span>
          <span class="vo-card-post-handle">${post.accountHandle}</span>
          <span class="vo-card-post-time vo-muted">${this.formatDate(post.postedAt)}</span>
        </div>
      `).join("")}
    `;
  }
  renderQuotaWarningsCard() {
    const accountsByPlatform = this.voStatus?.accountsByPlatform ?? {};
    const platformEntries = Object.entries(accountsByPlatform);
    const quotaWarnings = [];
    for (const account of this.accounts) {
      if (account.quotaState === "limited") {
        quotaWarnings.push(`${account.handle} (${account.platform}) quota limited`);
      }
    }
    const hasWarnings = quotaWarnings.length > 0;
    const statusPill = hasWarnings ? "warning" : "ok";
    const badgeLabel = hasWarnings ? `${quotaWarnings.length} warning${quotaWarnings.length !== 1 ? "s" : ""}` : "All OK";
    return `
      <div class="vo-overview-card ${hasWarnings ? "vo-overview-card--warn" : ""}">
        <div class="vo-card-header">
          <span class="vo-card-icon">\u26A1</span>
          <span class="vo-card-label">Quota Warnings</span>
          ${StatusPill({ status: statusPill, label: badgeLabel })}
        </div>
        <div class="vo-card-body">
          ${hasWarnings ? quotaWarnings.map((w) => `
            <div class="vo-card-warning-row">
              <span class="vo-card-warning-dot" style="background: var(--bc-yellow)"></span>
              <span class="vo-card-warning-text">${w}</span>
            </div>
          `).join("") : `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label vo-muted">No quota warnings</span>
            </div>
          `}
          ${platformEntries.length > 0 ? `
            <div class="vo-card-divider"></div>
            <div class="vo-card-sublabel">Accounts by Platform</div>
            ${platformEntries.map(([platform, count]) => `
              <div class="vo-card-stat-row">
                <span class="vo-card-stat-label">${platform}</span>
                <span class="vo-card-stat-value">${count}</span>
              </div>
            `).join("")}
          ` : ""}
        </div>
      </div>
    `;
  }
  renderCredentialStatusCard() {
    const missing = this.accounts.filter((a) => a.credentialState === "missing");
    const manual = this.accounts.filter((a) => a.credentialState === "manual");
    const connected = this.accounts.filter((a) => a.credentialState === "connected");
    const total = this.accounts.length;
    const hasIssues = missing.length > 0;
    const statusPill = hasIssues ? "error" : "ok";
    const badgeLabel = hasIssues ? `${missing.length} missing` : total > 0 ? "All configured" : "No accounts";
    return `
      <div class="vo-overview-card ${hasIssues ? "vo-overview-card--alert" : ""}">
        <div class="vo-card-header">
          <span class="vo-card-icon">\u{1F511}</span>
          <span class="vo-card-label">Credential Status</span>
          ${StatusPill({ status: statusPill, label: badgeLabel })}
        </div>
        <div class="vo-card-body">
          ${total === 0 ? `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label vo-muted">No accounts configured</span>
            </div>
          ` : `
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Connected</span>
              <span class="vo-card-stat-value" style="color: var(--bc-green)">${connected.length}</span>
            </div>
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Manual</span>
              <span class="vo-card-stat-value" style="color: var(--bc-yellow)">${manual.length}</span>
            </div>
            <div class="vo-card-stat-row">
              <span class="vo-card-stat-label">Missing</span>
              <span class="vo-card-stat-value" style="color: var(--bc-red)">${missing.length}</span>
            </div>
          `}
          ${missing.length > 0 ? `
            <div class="vo-card-divider"></div>
            ${missing.map((a) => `
              <div class="vo-card-warning-row">
                <span class="vo-card-warning-dot" style="background: var(--bc-red)"></span>
                <span class="vo-card-warning-text">${a.handle} (${a.platform})</span>
              </div>
            `).join("")}
          ` : ""}
        </div>
      </div>
    `;
  }
  renderBlockers() {
    const blockers = this.collectBlockers();
    if (blockers.length === 0) {
      return "";
    }
    return `
      <div class="vo-overview-card vo-overview-card--alert">
        <div class="vo-card-header">
          <span class="vo-card-icon">\u26A0</span>
          <span class="vo-card-label">Blockers</span>
          ${Badge({ count: blockers.length, status: "error" })}
        </div>
        <div class="vo-card-body">
          <div class="vo-blockers-list">
            ${blockers.map((blocker) => `
              <div class="vo-blocker">
                <div class="vo-blocker-icon">\u26A0\uFE0F</div>
                <div class="vo-blocker-content">
                  <div class="vo-blocker-title">${blocker.title}</div>
                  <div class="vo-blocker-detail">${blocker.detail}</div>
                  <div class="vo-blocker-guidance">${blocker.guidance}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }
  collectBlockers() {
    const blockers = [];
    const state = this.ctx.getState();
    if (this.selector && !this.selector.healthy) {
      blockers.push({
        title: "AI Selector Degraded",
        detail: this.selector.error || "The AI model selector service is not responding normally",
        guidance: "Check selector logs at ~/.config/video-orchestrator/logs/selector.log"
      });
    }
    if (state.accountId && this.accounts.length > 0) {
      const account = this.accounts.find((a) => a.id === state.accountId);
      if (account && account.credentialState === "missing") {
        blockers.push({
          title: "Missing Credentials",
          detail: `${account.handle} (${account.platform}) lacks configured credentials`,
          guidance: "Configure credentials in Brain Console credentials section, then restart the worker."
        });
      }
    }
    if (state.accountId && this.accountStats?.stats) {
      const stats = this.accountStats.stats.find((s) => s.accountId === state.accountId);
      if (stats && stats.failedJobs30d > stats.succeededJobs30d * 2 && stats.totalJobs30d > 0) {
        const failRate = (stats.failedJobs30d / stats.totalJobs30d * 100).toFixed(0);
        blockers.push({
          title: `High Failure Rate (${failRate}%)`,
          detail: `${stats.accountHandle} has ${stats.failedJobs30d} failed jobs in last 30 days`,
          guidance: `Review failed job logs and quota limits for ${stats.platform}.`
        });
      }
    }
    return blockers;
  }
  formatDate(iso) {
    if (!iso) return "\u2013";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return iso;
    }
  }
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.refreshTimer !== null) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/PipelinesPanel.ts
var PIPELINE_STAGES = [
  "Intake",
  "Script",
  "Assets",
  "Design",
  "Voiceover",
  "Visuals",
  "Assembly",
  "Publishing"
];
var PipelinesPanel = class {
  container;
  profiles = [];
  contentItems = [];
  liveJobs = [];
  ctx = getVOContextManager();
  unsubscribe = null;
  selectedProfileId = null;
  selectedRunId = null;
  loading = false;
  constructor(container, data) {
    this.container = container;
    this.profiles = data.profiles || [];
    this.contentItems = data.contentItems || [];
    this.unsubscribe = this.ctx.subscribe(() => this.render());
    this.render();
    this.fetchLiveJobs();
  }
  async fetchLiveJobs() {
    const state = this.ctx.getState();
    this.loading = true;
    try {
      const url = state.projectId ? `http://localhost:4877/api/infra/video-orchestrator/jobs?limit=50&projectId=${encodeURIComponent(state.projectId)}` : "http://localhost:4877/api/infra/video-orchestrator/jobs?limit=50";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.liveJobs = data.jobs || [];
      }
    } catch {
    } finally {
      this.loading = false;
      this.render();
    }
  }
  render() {
    const state = this.ctx.getState();
    const profilesForProject = this.profiles.filter((p) => p.projectId === state.projectId);
    const runs = this.buildRuns();
    this.container.innerHTML = `
      <div class="vo-pipelines-panel vo-pipelines-panel--threecol">
        <div class="vo-pipelines-left">
          ${this.renderStageMap(profilesForProject)}
          ${this.renderProfileSelector(profilesForProject)}
        </div>
        <div class="vo-pipelines-center">
          ${this.renderRunHistory(runs)}
        </div>
        <div class="vo-pipelines-right ${this.selectedRunId ? "vo-pipelines-right--open" : ""}">
          ${this.renderRunDetail(runs)}
        </div>
      </div>
    `;
    this.attachEventListeners(profilesForProject, runs);
  }
  renderStageMap(profiles) {
    const currentProfileId = this.selectedProfileId || profiles[0]?.id;
    const profile = profiles.find((p) => p.id === currentProfileId);
    const stages = profile?.enabledStages ?? [];
    return `
      <div class="vo-pipelines-card">
        <h3 class="vo-overview-title">Pipeline Stages</h3>
        <div class="vo-stage-map vo-stage-map--horizontal">
          ${PIPELINE_STAGES.map((stageName, idx) => {
      const configuredStage = stages.find((s) => s.label.toLowerCase().includes(stageName.toLowerCase()));
      const statusClass = configuredStage ? this.getStageStatusClass(configuredStage.status) : "vo-status-disabled";
      const status = configuredStage?.status ?? "n/a";
      return `
              <div class="vo-stage-item vo-stage-item--compact">
                <div class="vo-stage-number">${idx + 1}</div>
                <div class="vo-stage-content">
                  <div class="vo-stage-name">${stageName}</div>
                  <div class="vo-stage-status ${statusClass}">${status}</div>
                </div>
                ${idx < PIPELINE_STAGES.length - 1 ? '<div class="vo-stage-arrow">\u2192</div>' : ""}
              </div>
            `;
    }).join("")}
        </div>
      </div>
    `;
  }
  renderProfileSelector(profiles) {
    if (profiles.length === 0) {
      return `
        <div class="vo-pipelines-card">
          <p class="vo-placeholder">No pipeline profiles for this project</p>
        </div>
      `;
    }
    return `
      <div class="vo-pipelines-card">
        <h3 class="vo-overview-title">Profile</h3>
        <div class="vo-pipeline-selector">
          ${profiles.map((p) => `
            <button
              class="vo-pipeline-btn ${this.selectedProfileId === p.id || !this.selectedProfileId && profiles[0]?.id === p.id ? "active" : ""}"
              data-profile-id="${p.id}"
            >
              <span class="vo-pipeline-name">${p.name}</span>
              <span class="vo-pipeline-targets">${p.targetPlatforms.join(", ")}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }
  renderRunHistory(runs) {
    if (this.loading) {
      return `
        <div class="vo-pipelines-card">
          <h3 class="vo-overview-title">Run History</h3>
          <p class="vo-placeholder">Loading...</p>
        </div>
      `;
    }
    if (runs.length === 0) {
      return `
        <div class="vo-pipelines-card">
          <h3 class="vo-overview-title">Run History</h3>
          <p class="vo-placeholder">No runs recorded</p>
        </div>
      `;
    }
    return `
      <div class="vo-pipelines-card vo-pipelines-card--fill">
        <h3 class="vo-overview-title">Run History</h3>
        <div class="vo-runs-table">
          <div class="vo-runs-header vo-runs-header--extended">
            <div class="vo-run-col-id">ID</div>
            <div class="vo-run-col-status">Status</div>
            <div class="vo-run-col-stage">Stage</div>
            <div class="vo-run-col-progress">Progress</div>
            <div class="vo-run-col-date">Started</div>
            <div class="vo-run-col-date">Completed</div>
          </div>
          ${runs.map((run) => `
            <div
              class="vo-run-row ${this.selectedRunId === run.id ? "vo-run-row--selected" : ""}"
              data-run-id="${run.id}"
              title="Click to see detail"
            >
              <div class="vo-run-row-main vo-run-row-main--extended">
                <div class="vo-run-col-id vo-monospace">${run.id.slice(0, 10)}\u2026</div>
                <div class="vo-run-col-status">
                  <span class="vo-run-status ${this.getRunStatusClass(run.status)}">${run.status}</span>
                </div>
                <div class="vo-run-col-stage">${run.stage}</div>
                <div class="vo-run-col-progress">
                  <div class="vo-progress-bar-wrap">
                    <div class="vo-progress-bar-fill" style="width: ${run.progress}%"></div>
                  </div>
                  <span class="vo-progress-label">${run.progress}%</span>
                </div>
                <div class="vo-run-col-date">${run.startedAt}</div>
                <div class="vo-run-col-date">${run.completedAt ?? "\u2013"}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
  renderRunDetail(runs) {
    if (!this.selectedRunId) {
      return `
        <div class="vo-pipelines-card vo-pipelines-detail-placeholder">
          <p class="vo-placeholder">Click a run row to see detail</p>
        </div>
      `;
    }
    const run = runs.find((r) => r.id === this.selectedRunId);
    if (!run) {
      return `
        <div class="vo-pipelines-card">
          <p class="vo-placeholder">Run not found</p>
        </div>
      `;
    }
    return `
      <div class="vo-pipelines-card vo-pipelines-detail-panel">
        <div class="vo-detail-panel-header">
          <h3 class="vo-overview-title">Run Detail</h3>
          <button class="vo-detail-close-btn" data-action="close-detail">\u2715</button>
        </div>
        <div class="vo-detail-panel-body">
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">ID</span>
            <span class="vo-detail-value vo-detail-monospace">${run.id}</span>
          </div>
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">Status</span>
            <span class="vo-detail-value">
              <span class="vo-run-status ${this.getRunStatusClass(run.status)}">${run.status}</span>
            </span>
          </div>
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">Stage</span>
            <span class="vo-detail-value">${run.stage}</span>
          </div>
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">Progress</span>
            <span class="vo-detail-value">${run.progress}%</span>
          </div>
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">Started</span>
            <span class="vo-detail-value">${run.startedAt}</span>
          </div>
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">Completed</span>
            <span class="vo-detail-value">${run.completedAt ?? "\u2013"}</span>
          </div>
          <div class="vo-run-detail-row">
            <span class="vo-detail-key">Content</span>
            <span class="vo-detail-value">${run.contentTitle}</span>
          </div>
          ${run.errorMessage ? `
            <div class="vo-run-detail-row vo-detail-error">
              <span class="vo-detail-key">Error</span>
              <span class="vo-detail-value vo-detail-monospace">${run.errorMessage}</span>
            </div>
          ` : ""}
          ${run.logs && run.logs.length > 0 ? `
            <div class="vo-detail-section-label">Logs</div>
            <div class="vo-detail-logs">
              ${run.logs.map((log) => `<div class="vo-detail-log-line">${log}</div>`).join("")}
            </div>
          ` : ""}
          ${run.artifacts && run.artifacts.length > 0 ? `
            <div class="vo-detail-section-label">Artifacts</div>
            <div class="vo-detail-artifacts">
              ${run.artifacts.map((a) => `<div class="vo-detail-artifact">${a}</div>`).join("")}
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }
  buildRuns() {
    const state = this.ctx.getState();
    const now = /* @__PURE__ */ new Date();
    if (this.liveJobs.length > 0) {
      return this.liveJobs.map((job) => {
        const jobStatus = this.mapJobStatus(job.jobStatus);
        const progress = this.estimateProgress(job.pipelineState, jobStatus);
        return {
          id: job.jobId,
          contentItemId: job.jobId,
          contentTitle: job.title ?? `Job ${job.jobId}`,
          date: this.formatDate(job.createdAt),
          status: jobStatus,
          progress,
          startedAt: this.formatDate(job.createdAt),
          completedAt: job.completedAt ? this.formatDate(job.completedAt) : null,
          stage: job.pipelineState || job.jobType,
          errorMessage: job.errorMessage ?? void 0,
          logs: job.errorMessage ? [`[${job.jobStatus}] ${job.errorMessage}`] : [],
          artifacts: job.adapterMode ? [`adapter: ${job.adapterMode}`] : []
        };
      });
    }
    if (!state.projectId) return [];
    const fixtureRuns = [
      { status: "completed", progress: 100, stage: "Publishing" },
      { status: "completed", progress: 100, stage: "Publishing" },
      { status: "completed", progress: 100, stage: "Publishing" },
      { status: "failed", progress: 62, stage: "Captions", errorMessage: "Timeout waiting for caption service" },
      { status: "running", progress: 37, stage: "Script" },
      { status: "queued", progress: 0, stage: "Intake" }
    ];
    const projectItems = this.contentItems.filter((i) => i.projectId === state.projectId);
    return projectItems.slice(0, 6).map((item, idx) => {
      const runDate = new Date(now.getTime() - idx * 24 * 60 * 60 * 1e3);
      const fixture = fixtureRuns[idx] ?? fixtureRuns[0];
      return {
        id: `run-${item.id}-${idx}`,
        contentItemId: item.id,
        contentTitle: item.title,
        date: this.formatDate(runDate.toISOString()),
        status: fixture.status,
        progress: fixture.progress,
        startedAt: this.formatDate(runDate.toISOString()),
        completedAt: fixture.status === "completed" || fixture.status === "failed" ? this.formatDate(new Date(runDate.getTime() + 2 * 60 * 60 * 1e3).toISOString()) : null,
        stage: fixture.stage,
        errorMessage: fixture.errorMessage,
        logs: fixture.errorMessage ? [`[error] ${fixture.errorMessage}`, "[info] Retrying with fallback..."] : ["[info] Pipeline started", `[info] Stage: ${fixture.stage}`],
        artifacts: fixture.status === "completed" ? ["video.mp4", "captions.srt", "thumbnail.jpg"] : []
      };
    });
  }
  mapJobStatus(jobStatus) {
    switch (jobStatus?.toLowerCase()) {
      case "completed":
      case "done":
        return "completed";
      case "failed":
      case "error":
        return "failed";
      case "running":
      case "in_progress":
        return "running";
      case "pending":
      case "queued":
      default:
        return "queued";
    }
  }
  estimateProgress(pipelineState, status) {
    if (status === "completed") return 100;
    if (status === "queued") return 0;
    if (status === "failed") {
      const stageIndex2 = PIPELINE_STAGES.findIndex((s) => s.toLowerCase() === pipelineState?.toLowerCase());
      return stageIndex2 >= 0 ? Math.round(stageIndex2 / PIPELINE_STAGES.length * 100) : 50;
    }
    const stageIndex = PIPELINE_STAGES.findIndex((s) => s.toLowerCase() === pipelineState?.toLowerCase());
    return stageIndex >= 0 ? Math.round((stageIndex + 0.5) / PIPELINE_STAGES.length * 100) : 33;
  }
  getStageStatusClass(status) {
    switch (status) {
      case "enabled":
        return "vo-status-enabled";
      case "approval-gated":
        return "vo-status-approval";
      case "manual-only":
        return "vo-status-manual";
      case "disabled":
        return "vo-status-disabled";
      default:
        return "";
    }
  }
  getRunStatusClass(status) {
    switch (status) {
      case "completed":
        return "vo-run-completed";
      case "failed":
        return "vo-run-failed";
      case "running":
        return "vo-run-in-progress";
      case "queued":
        return "vo-run-blocked";
      default:
        return "";
    }
  }
  formatDate(iso) {
    if (!iso) return "\u2013";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return iso;
    }
  }
  attachEventListeners(profiles, runs) {
    this.container.querySelectorAll(".vo-pipeline-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const profileId = target.getAttribute("data-profile-id");
        this.container.querySelectorAll(".vo-pipeline-btn").forEach((b) => b.classList.remove("active"));
        target.classList.add("active");
        this.selectedProfileId = profileId;
        this.render();
      });
    });
    this.container.querySelectorAll(".vo-run-row").forEach((row) => {
      row.addEventListener("click", () => {
        const runId = row.getAttribute("data-run-id");
        if (this.selectedRunId === runId) {
          this.selectedRunId = null;
        } else {
          this.selectedRunId = runId;
        }
        this.render();
      });
    });
    const closeBtn = this.container.querySelector('[data-action="close-detail"]');
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.selectedRunId = null;
        this.render();
      });
    }
  }
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/AccountsPanel.ts
var PLATFORM_ICONS = {
  youtube: "\u25B6",
  "youtube-shorts": "\u25B6",
  tiktok: "\u266A",
  instagram: "\u25C9",
  facebook: "f",
  linkedin: "in",
  pinterest: "P"
};
var QUOTA_LIMITS = {
  youtube: 1e4,
  "youtube-shorts": 1e4,
  tiktok: 500,
  instagram: 200,
  facebook: 300,
  linkedin: 300,
  pinterest: 1e3
};
var AccountsPanel = class {
  container;
  accounts = [];
  profiles = [];
  accountStats = [];
  ctx = getVOContextManager();
  unsubscribe = null;
  constructor(container, data) {
    this.container = container;
    this.accounts = data.accounts || [];
    this.profiles = data.profiles || [];
    this.accountStats = data.accountStats || [];
    this.unsubscribe = this.ctx.subscribe(() => this.render());
    this.render();
  }
  render() {
    const state = this.ctx.getState();
    const accountsForProject = this.accounts.filter((a) => a.projectId === state.projectId);
    this.container.innerHTML = `
      <div class="vo-accounts-panel">
        ${this.renderSummaryBar(accountsForProject)}
        ${this.renderAccountCards(accountsForProject)}
      </div>
    `;
  }
  renderSummaryBar(accounts) {
    if (accounts.length === 0) return "";
    const configured = accounts.filter((a) => a.credentialState === "connected").length;
    const expired = accounts.filter((a) => a.credentialState === "missing").length;
    const manual = accounts.filter((a) => a.credentialState === "manual").length;
    const active = accounts.filter((a) => a.status === "active").length;
    return `
      <div class="vo-accounts-summary-bar">
        <div class="vo-accounts-summary-stat">
          <span class="vo-accounts-summary-value" style="color: var(--bc-status-ok)">${configured}</span>
          <span class="vo-accounts-summary-label">Connected</span>
        </div>
        <div class="vo-accounts-summary-stat">
          <span class="vo-accounts-summary-value" style="color: var(--bc-status-warning)">${manual}</span>
          <span class="vo-accounts-summary-label">Manual</span>
        </div>
        <div class="vo-accounts-summary-stat">
          <span class="vo-accounts-summary-value" style="color: var(--bc-status-error)">${expired}</span>
          <span class="vo-accounts-summary-label">Missing</span>
        </div>
        <div class="vo-accounts-summary-stat">
          <span class="vo-accounts-summary-value" style="color: var(--bc-accent)">${active}</span>
          <span class="vo-accounts-summary-label">Active</span>
        </div>
        <div class="vo-accounts-summary-stat">
          <span class="vo-accounts-summary-value">${accounts.length}</span>
          <span class="vo-accounts-summary-label">Total</span>
        </div>
      </div>
    `;
  }
  renderAccountCards(accounts) {
    if (accounts.length === 0) {
      return `
        <div class="vo-empty-state">
          <p>No platform accounts configured for this project</p>
        </div>
      `;
    }
    return `
      <div class="vo-accounts-grid">
        ${accounts.map((account) => this.renderAccountCard(account)).join("")}
      </div>
    `;
  }
  renderAccountCard(account) {
    const stats = this.accountStats.find((s) => s.accountId === account.id);
    const successRate = stats?.successRate30d !== null && stats?.successRate30d !== void 0 ? `${(stats.successRate30d * 100).toFixed(0)}%` : "N/A";
    return `
      <div class="vo-account-card">
        ${this.renderAccountHeader(account)}
        ${this.renderConnectionStateBadge(account)}
        ${this.renderAccountBody(account, stats, successRate)}
        ${this.renderQuotaBar(account, stats)}
        ${this.renderSchedulerToggle(account)}
        ${this.renderAccountFooter(account)}
      </div>
    `;
  }
  renderAccountHeader(account) {
    const icon = PLATFORM_ICONS[account.platform] ?? "\u25CB";
    return `
      <div class="vo-account-header">
        <div class="vo-account-icon">
          <span class="vo-platform-icon">${icon}</span>
        </div>
        <div class="vo-account-title">
          <div class="vo-account-handle">${account.handle}</div>
          <div class="vo-account-platform">${account.platform}</div>
        </div>
      </div>
    `;
  }
  renderConnectionStateBadge(account) {
    const label = this.getConnectionStateLabel(account.credentialState);
    const statusPill = this.getConnectionStatusForPill(account.credentialState);
    return `
      <div class="vo-account-connection-banner">
        ${StatusPill({ status: statusPill, label })}
        ${StatusPill({ status: this.getAdapterStatusForPill(account.adapterStatus), label: this.getAdapterLabel(account.adapterStatus) })}
      </div>
    `;
  }
  renderAccountBody(account, stats, successRate) {
    return `
      <div class="vo-account-body">
        <div class="vo-account-row">
          <span class="vo-account-label">Status</span>
          <span class="vo-account-value ${this.getStatusClass(account.status)}">${account.status}</span>
        </div>

        <div class="vo-account-row">
          <span class="vo-account-label">Quota State</span>
          <span class="vo-account-value ${this.getQuotaStateClass(account.quotaState)}">${account.quotaState}</span>
        </div>

        ${stats ? `
          <div class="vo-account-row">
            <span class="vo-account-label">Success Rate (30d)</span>
            <span class="vo-account-value">${successRate}</span>
          </div>
          <div class="vo-account-row">
            <span class="vo-account-label">Jobs (30d)</span>
            <span class="vo-account-value">${stats.succeededJobs30d}/${stats.totalJobs30d}</span>
          </div>
          ${stats.lastJobAt ? `
            <div class="vo-account-row">
              <span class="vo-account-label">Last Job</span>
              <span class="vo-account-value">${this.formatDate(stats.lastJobAt)}</span>
            </div>
          ` : ""}
        ` : ""}
      </div>
    `;
  }
  renderQuotaBar(account, stats) {
    const limit = QUOTA_LIMITS[account.platform] ?? 1e3;
    const usage = stats?.totalJobs30d ?? 0;
    const pct = Math.min(100, Math.round(usage / limit * 100));
    const barColor = pct >= 90 ? "var(--bc-red)" : pct >= 70 ? "var(--bc-yellow)" : "var(--bc-green)";
    return `
      <div class="vo-account-quota-section">
        <div class="vo-account-quota-row">
          <span class="vo-account-label">Quota Usage</span>
          <span class="vo-account-quota-text">${usage} / ${limit}</span>
        </div>
        <div class="vo-quota-bar-track">
          <div
            class="vo-quota-bar-fill"
            style="width: ${pct}%; background: ${barColor};"
            title="${pct}% of quota used"
          ></div>
        </div>
      </div>
    `;
  }
  renderSchedulerToggle(account) {
    const isActive = account.status === "active";
    const policyLabel = account.schedulerPolicy || "not-set";
    return `
      <div class="vo-account-scheduler-row">
        <span class="vo-account-label">Scheduler</span>
        <div class="vo-scheduler-toggle-wrap">
          <div class="vo-scheduler-toggle vo-scheduler-toggle--${isActive ? "on" : "off"}" title="Read-only in Phase 0.9">
            <div class="vo-scheduler-toggle-thumb"></div>
          </div>
          <span class="vo-scheduler-policy-label">${policyLabel}</span>
        </div>
      </div>
    `;
  }
  renderAccountFooter(account) {
    return `
      <div class="vo-account-footer">
        <div class="vo-account-profiles">
          <div class="vo-profiles-label">Enabled Profiles</div>
          <div class="vo-profiles-list">
            ${this.renderEnabledProfiles(account.enabledPipelineProfileIds)}
          </div>
        </div>
      </div>
      ${account.capabilities.length > 0 ? `
        <div class="vo-account-capabilities">
          <div class="vo-capabilities-label">Capabilities</div>
          <div class="vo-capabilities-tags">
            ${account.capabilities.map((cap) => `
              <span class="vo-capability-tag">${cap}</span>
            `).join("")}
          </div>
        </div>
      ` : ""}
    `;
  }
  renderEnabledProfiles(profileIds) {
    if (profileIds.length === 0) {
      return '<span class="vo-placeholder">None</span>';
    }
    const profileNames = profileIds.map((id) => this.profiles.find((p) => p.id === id)?.name || id).slice(0, 3);
    const more = profileIds.length > 3 ? ` +${profileIds.length - 3}` : "";
    return profileNames.map((name) => `<span class="vo-profile-tag">${name}</span>`).join("") + (more ? `<span class="vo-profile-tag">${more}</span>` : "");
  }
  getConnectionStateLabel(state) {
    switch (state) {
      case "connected":
        return "Connected";
      case "missing":
        return "Credentials Missing";
      case "manual":
        return "Manual";
      default:
        return state;
    }
  }
  getAdapterLabel(state) {
    switch (state) {
      case "ready-read-only":
        return "direct_upload";
      case "manual-package":
        return "n8n_fallback";
      case "disabled":
        return "manual_only";
      default:
        return state;
    }
  }
  getConnectionStatusForPill(state) {
    switch (state) {
      case "connected":
        return "ok";
      case "missing":
        return "error";
      case "manual":
        return "warning";
      default:
        return "warning";
    }
  }
  getAdapterStatusForPill(state) {
    switch (state) {
      case "ready-read-only":
        return "ok";
      case "manual-package":
        return "warning";
      case "disabled":
        return "error";
      default:
        return "warning";
    }
  }
  getCredentialColor(state) {
    switch (state) {
      case "connected":
        return "#4ade80";
      case "missing":
        return "#fb7185";
      case "manual":
        return "#facc15";
      default:
        return "#60a5fa";
    }
  }
  getAdapterColor(state) {
    switch (state) {
      case "ready-read-only":
        return "#4ade80";
      case "manual-package":
        return "#facc15";
      case "disabled":
        return "#fb7185";
      default:
        return "#60a5fa";
    }
  }
  getStatusClass(status) {
    switch (status) {
      case "active":
        return "vo-status-active";
      case "manual-only":
        return "vo-status-manual";
      case "blocked":
        return "vo-status-blocked";
      default:
        return "";
    }
  }
  getQuotaStateClass(quotaState) {
    switch (quotaState) {
      case "ok":
        return "vo-status-active";
      case "limited":
        return "vo-status-manual";
      case "unknown":
      default:
        return "";
    }
  }
  formatDate(iso) {
    if (!iso) return "\u2013";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return iso;
    }
  }
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/HistoryPanel.ts
var PAGE_SIZE = 50;
var HistoryPanel = class {
  container;
  contentItems = [];
  accounts = [];
  ctx = getVOContextManager();
  unsubscribe = null;
  // Filter state
  filterAccount = "";
  filterPlatform = "";
  filterStatus = "";
  filterDateStart = "";
  filterDateEnd = "";
  sortBy = "publishedAt";
  sortDesc = true;
  currentPage = 0;
  constructor(container, data) {
    this.container = container;
    this.contentItems = data.contentItems || [];
    this.accounts = data.accounts || [];
    this.unsubscribe = this.ctx.subscribe(() => {
      this.currentPage = 0;
      this.render();
    });
    this.render();
  }
  render() {
    const state = this.ctx.getState();
    const allEntries = this.buildEntries(state);
    const filtered = this.applyFilters(allEntries);
    const sorted = this.applySort(filtered);
    const pageEntries = sorted.slice(this.currentPage * PAGE_SIZE, (this.currentPage + 1) * PAGE_SIZE);
    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    this.container.innerHTML = `
      <div class="vo-history-panel">
        ${this.renderFilters(state, allEntries)}
        ${this.renderTable(pageEntries)}
        ${this.renderPagination(sorted.length, totalPages)}
      </div>
    `;
    this.attachEventListeners();
  }
  renderFilters(state, allEntries) {
    const accountsForProject = this.accounts.filter((a) => a.projectId === state.projectId);
    const platforms = [...new Set(allEntries.map((e) => e.platform).filter(Boolean))].sort();
    return `
      <div class="vo-history-filters">
        ${accountsForProject.length > 0 ? `
          <div class="vo-filter-group">
            <label class="vo-filter-label">Account</label>
            <select class="vo-filter-select" data-filter="account">
              <option value="">All accounts</option>
              ${accountsForProject.map((a) => `
                <option value="${a.id}" ${this.filterAccount === a.id ? "selected" : ""}>${a.handle}</option>
              `).join("")}
            </select>
          </div>
        ` : ""}

        <div class="vo-filter-group">
          <label class="vo-filter-label">Platform</label>
          <select class="vo-filter-select" data-filter="platform">
            <option value="">All platforms</option>
            ${platforms.map((p) => `
              <option value="${p}" ${this.filterPlatform === p ? "selected" : ""}>${p}</option>
            `).join("")}
          </select>
        </div>

        <div class="vo-filter-group">
          <label class="vo-filter-label">Status</label>
          <select class="vo-filter-select" data-filter="status">
            <option value="">All statuses</option>
            <option value="published" ${this.filterStatus === "published" ? "selected" : ""}>Published</option>
            <option value="scheduled" ${this.filterStatus === "scheduled" ? "selected" : ""}>Scheduled</option>
            <option value="failed" ${this.filterStatus === "failed" ? "selected" : ""}>Failed</option>
            <option value="draft" ${this.filterStatus === "draft" ? "selected" : ""}>Draft</option>
          </select>
        </div>

        <div class="vo-filter-group">
          <label class="vo-filter-label">From</label>
          <input
            class="vo-filter-date"
            type="date"
            data-filter="dateStart"
            value="${this.filterDateStart}"
          />
        </div>

        <div class="vo-filter-group">
          <label class="vo-filter-label">To</label>
          <input
            class="vo-filter-date"
            type="date"
            data-filter="dateEnd"
            value="${this.filterDateEnd}"
          />
        </div>

        <div class="vo-filter-group">
          <label class="vo-filter-label">Sort</label>
          <select class="vo-filter-select" data-filter="sortBy">
            <option value="publishedAt" ${this.sortBy === "publishedAt" ? "selected" : ""}>Published At</option>
            <option value="status" ${this.sortBy === "status" ? "selected" : ""}>Status</option>
            <option value="account" ${this.sortBy === "account" ? "selected" : ""}>Account</option>
            <option value="platform" ${this.sortBy === "platform" ? "selected" : ""}>Platform</option>
          </select>
        </div>

        <div class="vo-filter-group">
          <label class="vo-filter-label">Order</label>
          <button class="vo-filter-sort-btn" data-action="toggle-sort" title="Toggle sort direction">
            ${this.sortDesc ? "\u2193 Desc" : "\u2191 Asc"}
          </button>
        </div>
      </div>
    `;
  }
  renderTable(entries) {
    if (entries.length === 0) {
      return `
        <div class="vo-empty-state">
          <p>No history entries found</p>
        </div>
      `;
    }
    return `
      <div class="vo-history-table">
        <div class="vo-history-header vo-history-header--extended">
          <div class="vo-history-col-id">Content Item ID</div>
          <div class="vo-history-col-platform">Platform</div>
          <div class="vo-history-col-account">Account</div>
          <div class="vo-history-col-status">Status</div>
          <div class="vo-history-col-date">Published At</div>
          <div class="vo-history-col-error">Error</div>
        </div>
        ${entries.map((entry) => this.renderRow(entry)).join("")}
      </div>
    `;
  }
  renderRow(entry) {
    return `
      <div class="vo-history-row" data-entry-id="${entry.id}">
        <div class="vo-history-row-main vo-history-row-main--extended">
          <div class="vo-history-col-id vo-monospace">${entry.contentItemId.slice(0, 12)}\u2026</div>
          <div class="vo-history-col-platform">${entry.platform}</div>
          <div class="vo-history-col-account">${entry.accountHandle}</div>
          <div class="vo-history-col-status">
            <span class="vo-history-status ${this.getStatusClass(entry.status)}">${entry.status}</span>
          </div>
          <div class="vo-history-col-date">${entry.publishedAt}</div>
          <div class="vo-history-col-error ${entry.error ? "vo-detail-error" : "vo-muted"}">
            ${entry.error ? entry.error.slice(0, 40) + (entry.error.length > 40 ? "\u2026" : "") : "\u2013"}
          </div>
        </div>
      </div>
    `;
  }
  renderPagination(total, totalPages) {
    if (totalPages <= 1) {
      return `<div class="vo-history-pagination-bar"><span class="vo-muted">${total} entries</span></div>`;
    }
    const start = this.currentPage * PAGE_SIZE + 1;
    const end = Math.min((this.currentPage + 1) * PAGE_SIZE, total);
    return `
      <div class="vo-history-pagination-bar">
        <span class="vo-muted">${start}\u2013${end} of ${total}</span>
        <div class="vo-history-pagination-controls">
          <button
            class="vo-pagination-btn"
            data-action="page-prev"
            ${this.currentPage === 0 ? "disabled" : ""}
          >\u2190 Prev</button>
          <span class="vo-pagination-page">${this.currentPage + 1} / ${totalPages}</span>
          <button
            class="vo-pagination-btn"
            data-action="page-next"
            ${this.currentPage >= totalPages - 1 ? "disabled" : ""}
          >Next \u2192</button>
        </div>
      </div>
    `;
  }
  buildEntries(state) {
    const now = /* @__PURE__ */ new Date();
    const fixtureStatuses = ["published", "published", "failed", "scheduled", "draft"];
    const errors = [
      "Connection timeout to platform API",
      "OAuth token expired",
      "Upload size limit exceeded"
    ];
    const projectItems = this.contentItems.filter((i) => i.projectId === state.projectId);
    const entries = [];
    projectItems.forEach((item, itemIdx) => {
      const targets = item.platformTargets.length > 0 ? item.platformTargets : [{ platformAccountId: null, platform: "unknown", mode: "manual-package", status: "draft", approvalRequired: false, id: item.id }];
      targets.forEach((target, targetIdx) => {
        const account = this.accounts.find((a) => a.id === target.platformAccountId);
        const entryDate = new Date(now.getTime() - (itemIdx * 3 + targetIdx) * 12 * 60 * 60 * 1e3);
        const statusIdx = (itemIdx + targetIdx) % fixtureStatuses.length;
        const status = fixtureStatuses[statusIdx];
        const hasError = status === "failed";
        entries.push({
          id: `h-${item.id}-${targetIdx}`,
          contentItemId: item.id,
          contentTitle: item.title,
          projectId: item.projectId,
          accountId: account?.id ?? "unknown",
          accountHandle: account?.handle ?? target.platform ?? "Unknown",
          platform: account?.platform ?? target.platform ?? "unknown",
          status,
          publishedAt: entryDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          error: hasError ? errors[itemIdx % errors.length] : void 0
        });
      });
    });
    return entries;
  }
  applyFilters(entries) {
    return entries.filter((e) => {
      if (this.filterAccount && e.accountId !== this.filterAccount) return false;
      if (this.filterPlatform && e.platform !== this.filterPlatform) return false;
      if (this.filterStatus && e.status !== this.filterStatus) return false;
      return true;
    });
  }
  applySort(entries) {
    const sorted = [...entries].sort((a, b) => {
      let cmp = 0;
      switch (this.sortBy) {
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
        case "account":
          cmp = a.accountHandle.localeCompare(b.accountHandle);
          break;
        case "platform":
          cmp = a.platform.localeCompare(b.platform);
          break;
        case "publishedAt":
        default:
          cmp = 0;
          break;
      }
      return this.sortDesc ? -cmp : cmp;
    });
    return sorted;
  }
  getStatusClass(status) {
    switch (status) {
      case "published":
        return "vo-history-published";
      case "failed":
        return "vo-history-failed";
      case "draft":
        return "vo-history-pending";
      case "scheduled":
        return "vo-history-scheduled";
      default:
        return "";
    }
  }
  attachEventListeners() {
    this.container.querySelectorAll(".vo-filter-select[data-filter]").forEach((el) => {
      el.addEventListener("change", (e) => {
        const filter = e.currentTarget.getAttribute("data-filter");
        const value = e.currentTarget.value;
        this.currentPage = 0;
        switch (filter) {
          case "account":
            this.filterAccount = value;
            break;
          case "platform":
            this.filterPlatform = value;
            break;
          case "status":
            this.filterStatus = value;
            break;
          case "sortBy":
            this.sortBy = value;
            break;
        }
        this.render();
      });
    });
    this.container.querySelectorAll(".vo-filter-date[data-filter]").forEach((el) => {
      el.addEventListener("change", (e) => {
        const filter = e.currentTarget.getAttribute("data-filter");
        const value = e.currentTarget.value;
        this.currentPage = 0;
        if (filter === "dateStart") this.filterDateStart = value;
        if (filter === "dateEnd") this.filterDateEnd = value;
        this.render();
      });
    });
    const sortBtn = this.container.querySelector('[data-action="toggle-sort"]');
    if (sortBtn) {
      sortBtn.addEventListener("click", () => {
        this.sortDesc = !this.sortDesc;
        this.currentPage = 0;
        this.render();
      });
    }
    const prevBtn = this.container.querySelector('[data-action="page-prev"]');
    const nextBtn = this.container.querySelector('[data-action="page-next"]');
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentPage > 0) {
          this.currentPage--;
          this.render();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.currentPage++;
        this.render();
      });
    }
  }
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/ApprovalQueuePanel.ts
var BASE_URL2 = "http://localhost:4877";
function formatRelativeTime(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(ms / 6e4);
  if (minutes < 2) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
function formatExpiryLabel(expiresAt) {
  const remaining = new Date(expiresAt).getTime() - Date.now();
  if (remaining < 0) return "expired";
  const minutes = Math.floor(remaining / 6e4);
  if (minutes < 5) return `expires in ${minutes}m \u26A0`;
  if (minutes < 60) return `expires in ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `expires in ${hours}h`;
  return `expires in ${Math.floor(hours / 24)}d`;
}
var ApprovalQueuePanel = class {
  container;
  projectId;
  approvals = [];
  selectedIds = /* @__PURE__ */ new Set();
  selectedApprovalId = null;
  selectedVariantId = null;
  metadataDraft = {
    title: "",
    description: "",
    tags: "",
    hashtags: ""
  };
  isLoading = false;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.renderShell();
    await this.loadApprovals();
  }
  renderShell() {
    this.container.innerHTML = `
      <div class="vo-approval-queue bc-aq">
        <div class="bc-aq__header">
          <span class="bc-aq__title">VO Approval Queue</span>
          <div class="bc-aq__header-actions">
            <button class="brain-console__link-button" id="bc-aq-refresh">Refresh</button>
          </div>
        </div>
        <div class="bc-aq__body" id="bc-aq-body">
          <p class="brain-console__detail">Loading approvals...</p>
        </div>
      </div>
    `;
    const refreshBtn = this.container.querySelector("#bc-aq-refresh");
    refreshBtn?.addEventListener("click", () => this.loadApprovals());
  }
  async loadApprovals() {
    if (this.isLoading) return;
    this.isLoading = true;
    const body = this.container.querySelector("#bc-aq-body");
    if (body) body.innerHTML = '<p class="brain-console__detail">Loading...</p>';
    try {
      const qs = this.projectId ? `?projectId=${encodeURIComponent(this.projectId)}` : "";
      const res = await fetch(`${BASE_URL2}/api/video-orchestrator/approvals${qs}`);
      const data = await res.json();
      this.approvals = Array.isArray(data.approvals) ? data.approvals : [];
      this.selectedIds = /* @__PURE__ */ new Set();
      this.renderBody();
    } catch {
      if (body) body.innerHTML = '<p class="brain-console__detail">Failed to load approvals.</p>';
    } finally {
      this.isLoading = false;
    }
  }
  renderBody() {
    const body = this.container.querySelector("#bc-aq-body");
    if (!body) return;
    body.innerHTML = "";
    this.selectedIds = /* @__PURE__ */ new Set();
    const pending = this.approvals.filter((a) => a.status === "pending");
    const decided = this.approvals.filter((a) => a.status !== "pending");
    if (pending.length === 0 && decided.length === 0) {
      body.innerHTML = '<p class="brain-console__detail">No approval records found.</p>';
      return;
    }
    if (pending.length > 0) {
      const toolbar = document.createElement("div");
      toolbar.className = "bc-aq__toolbar";
      const selectAllLabel = document.createElement("label");
      selectAllLabel.className = "bc-aq__select-all-label";
      const selectAllCb = document.createElement("input");
      selectAllCb.type = "checkbox";
      selectAllCb.title = "Select all pending";
      selectAllLabel.appendChild(selectAllCb);
      selectAllLabel.append(" Select all");
      const bulkApproveBtn = document.createElement("button");
      bulkApproveBtn.className = "brain-console__local-app-action is-enabled bc-aq__btn-approve";
      bulkApproveBtn.textContent = "Approve Selected";
      bulkApproveBtn.disabled = true;
      const bulkRejectBtn = document.createElement("button");
      bulkRejectBtn.className = "brain-console__local-app-action bc-aq__btn-reject";
      bulkRejectBtn.textContent = "Reject Selected";
      bulkRejectBtn.disabled = true;
      toolbar.appendChild(selectAllLabel);
      toolbar.appendChild(bulkApproveBtn);
      toolbar.appendChild(bulkRejectBtn);
      body.appendChild(toolbar);
      const updateToolbar = () => {
        const has = this.selectedIds.size > 0;
        bulkApproveBtn.disabled = !has;
        bulkRejectBtn.disabled = !has;
        selectAllCb.indeterminate = this.selectedIds.size > 0 && this.selectedIds.size < pending.length;
        selectAllCb.checked = this.selectedIds.size === pending.length && pending.length > 0;
      };
      selectAllCb.addEventListener("change", () => {
        if (selectAllCb.checked) {
          for (const a of pending) this.selectedIds.add(a.id);
        } else {
          this.selectedIds.clear();
        }
        body.querySelectorAll(".bc-aq__item-cb").forEach((cb) => {
          cb.checked = selectAllCb.checked;
        });
        updateToolbar();
      });
      const handleBulk = (approved) => {
        if (this.selectedIds.size === 0) return;
        const ids = Array.from(this.selectedIds);
        bulkApproveBtn.disabled = true;
        bulkRejectBtn.disabled = true;
        bulkApproveBtn.textContent = approved ? "Approving..." : "Approve Selected";
        bulkRejectBtn.textContent = approved ? "Reject Selected" : "Rejecting...";
        void this.bulkDecide(ids, approved).then((ok) => {
          if (ok) void this.loadApprovals();
          else {
            bulkApproveBtn.textContent = "Approve Selected";
            bulkRejectBtn.textContent = "Reject Selected";
            updateToolbar();
          }
        });
      };
      bulkApproveBtn.addEventListener("click", () => handleBulk(true));
      bulkRejectBtn.addEventListener("click", () => handleBulk(false));
      const section = document.createElement("div");
      section.className = "bc-aq__section";
      const sectionLabel = document.createElement("p");
      sectionLabel.className = "bc-aq__section-label";
      sectionLabel.textContent = `Pending (${pending.length})`;
      section.appendChild(sectionLabel);
      const list = document.createElement("div");
      list.className = "bc-aq__list";
      for (const approval of pending) {
        const item = document.createElement("div");
        item.className = "bc-aq__item bc-aq__item--pending";
        if (approval.id === this.selectedApprovalId) {
          item.classList.add("bc-aq__item--selected");
        }
        const cbLabel = document.createElement("label");
        cbLabel.className = "bc-aq__item-cb-label";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "bc-aq__item-cb";
        cbLabel.appendChild(cb);
        cb.addEventListener("change", () => {
          if (cb.checked) this.selectedIds.add(approval.id);
          else this.selectedIds.delete(approval.id);
          updateToolbar();
        });
        const info = document.createElement("div");
        info.className = "bc-aq__item-info";
        const typeEl = document.createElement("span");
        typeEl.className = "bc-aq__item-type";
        typeEl.textContent = approval.type;
        const projEl = document.createElement("span");
        projEl.className = "bc-aq__item-project brain-console__detail";
        projEl.textContent = approval.projectId;
        const ageEl = document.createElement("span");
        ageEl.className = "bc-aq__item-age brain-console__detail";
        ageEl.textContent = formatRelativeTime(approval.createdAt);
        info.appendChild(typeEl);
        info.appendChild(projEl);
        info.appendChild(ageEl);
        if (approval.expiresAt) {
          const expiryLabel = formatExpiryLabel(approval.expiresAt);
          const expiryEl = document.createElement("span");
          expiryEl.className = "bc-aq__item-expiry brain-console__detail";
          expiryEl.textContent = expiryLabel;
          if (expiryLabel.includes("\u26A0")) {
            expiryEl.style.color = "var(--bc-yellow, orange)";
          }
          info.appendChild(expiryEl);
        }
        const actions = document.createElement("div");
        actions.className = "bc-aq__item-actions";
        const approveBtn = document.createElement("button");
        approveBtn.className = "brain-console__local-app-action is-enabled bc-aq__btn-approve bc-aq__btn-sm";
        approveBtn.textContent = "Approve";
        const rejectBtn = document.createElement("button");
        rejectBtn.className = "brain-console__local-app-action bc-aq__btn-reject bc-aq__btn-sm";
        rejectBtn.textContent = "Reject";
        approveBtn.addEventListener("click", () => {
          approveBtn.disabled = true;
          rejectBtn.disabled = true;
          approveBtn.textContent = "...";
          void this.singleDecide(approval.id, true).then(() => this.loadApprovals());
        });
        rejectBtn.addEventListener("click", () => {
          approveBtn.disabled = true;
          rejectBtn.disabled = true;
          rejectBtn.textContent = "...";
          void this.singleDecide(approval.id, false).then(() => this.loadApprovals());
        });
        actions.appendChild(approveBtn);
        actions.appendChild(rejectBtn);
        item.appendChild(cbLabel);
        item.appendChild(info);
        item.appendChild(actions);
        item.addEventListener("click", (event) => {
          const target = event.target;
          if (target.closest("button") || target.closest("input")) return;
          this.selectedApprovalId = approval.id;
          this.seedDraftFromApproval(approval);
          this.renderBody();
        });
        list.appendChild(item);
      }
      section.appendChild(list);
      body.appendChild(section);
    }
    if (this.selectedApprovalId) {
      const selected = pending.find((a) => a.id === this.selectedApprovalId) ?? null;
      if (selected) {
        body.appendChild(this.renderPreviewPanel(selected));
      }
    }
    if (decided.length > 0) {
      const decidedSection = document.createElement("div");
      decidedSection.className = "bc-aq__section";
      const decidedLabel = document.createElement("p");
      decidedLabel.className = "bc-aq__section-label brain-console__detail";
      decidedLabel.textContent = `Decided (${decided.length})`;
      decidedSection.appendChild(decidedLabel);
      const decidedList = document.createElement("div");
      decidedList.className = "bc-aq__list bc-aq__list--decided";
      for (const approval of decided.slice(0, 10)) {
        const item = document.createElement("div");
        item.className = `bc-aq__item bc-aq__item--${approval.status}`;
        const info = document.createElement("div");
        info.className = "bc-aq__item-info";
        const typeEl = document.createElement("span");
        typeEl.className = "bc-aq__item-type";
        typeEl.textContent = approval.type;
        const projEl = document.createElement("span");
        projEl.className = "bc-aq__item-project brain-console__detail";
        projEl.textContent = approval.projectId;
        const badge = document.createElement("span");
        badge.className = `bc-aq__badge bc-aq__badge--${approval.status}`;
        badge.textContent = approval.status;
        badge.title = approval.decisionReason ?? "";
        info.appendChild(typeEl);
        info.appendChild(projEl);
        info.appendChild(badge);
        item.appendChild(info);
        decidedList.appendChild(item);
      }
      if (decided.length > 10) {
        const more = document.createElement("p");
        more.className = "brain-console__detail";
        more.textContent = `\u2026and ${decided.length - 10} more`;
        decidedSection.appendChild(more);
      }
      decidedSection.appendChild(decidedList);
      body.appendChild(decidedSection);
    }
  }
  seedDraftFromApproval(approval) {
    this.selectedVariantId = null;
    this.metadataDraft = {
      title: "",
      description: "",
      tags: "",
      hashtags: ""
    };
    if (approval.type === "metadata") {
      const payload = approval.requestPayload ?? {};
      this.metadataDraft = {
        title: String(payload.title ?? payload.youtubeTitle ?? ""),
        description: String(payload.description ?? payload.youtubeDescription ?? ""),
        tags: Array.isArray(payload.tags) ? payload.tags.join(", ") : String(payload.tags ?? ""),
        hashtags: Array.isArray(payload.hashtags) ? payload.hashtags.join(" ") : String(payload.hashtags ?? "")
      };
    }
  }
  renderPreviewPanel(approval) {
    const panel = document.createElement("div");
    panel.className = "bc-aq__preview";
    const header = document.createElement("div");
    header.className = "bc-aq__preview-header";
    header.innerHTML = `
      <div>
        <div class="bc-aq__preview-title">Preview: ${approval.type}</div>
        <div class="brain-console__detail">${approval.id}</div>
      </div>
      <button class="brain-console__link-button" id="bc-aq-close-preview">Close</button>
    `;
    panel.appendChild(header);
    const content = document.createElement("div");
    content.className = "bc-aq__preview-content";
    if (approval.type === "thumbnail") {
      content.appendChild(this.renderThumbnailPreview(approval));
    } else if (approval.type === "metadata") {
      content.appendChild(this.renderMetadataPreview(approval));
    } else {
      const empty = document.createElement("div");
      empty.className = "vo-empty-state";
      empty.textContent = "No special preview available for this approval type.";
      content.appendChild(empty);
    }
    panel.appendChild(content);
    const actions = document.createElement("div");
    actions.className = "bc-aq__preview-actions";
    const approveBtn = document.createElement("button");
    approveBtn.className = "brain-console__local-app-action is-enabled bc-aq__btn-approve";
    approveBtn.textContent = "Approve Selected";
    approveBtn.addEventListener("click", () => {
      approveBtn.disabled = true;
      void this.singleDecide(approval.id, true, this.buildDecisionNote(approval)).then(() => this.loadApprovals());
    });
    const rejectBtn = document.createElement("button");
    rejectBtn.className = "brain-console__local-app-action bc-aq__btn-reject";
    rejectBtn.textContent = "Reject";
    rejectBtn.addEventListener("click", () => {
      rejectBtn.disabled = true;
      void this.singleDecide(approval.id, false, this.buildDecisionNote(approval)).then(() => this.loadApprovals());
    });
    actions.appendChild(approveBtn);
    actions.appendChild(rejectBtn);
    panel.appendChild(actions);
    panel.querySelector("#bc-aq-close-preview")?.addEventListener("click", () => {
      this.selectedApprovalId = null;
      this.selectedVariantId = null;
      this.renderBody();
    });
    return panel;
  }
  renderThumbnailPreview(approval) {
    const wrap = document.createElement("div");
    const variants = this.extractVariants(approval);
    wrap.innerHTML = `
      <div class="bc-aq__preview-section">
        <div class="bc-aq__preview-section-label">Thumbnail variants</div>
        <div class="bc-aq__variant-grid" id="bc-aq-thumbnail-variants"></div>
      </div>
    `;
    const grid = wrap.querySelector("#bc-aq-thumbnail-variants");
    if (!grid) return wrap;
    variants.forEach((variant, index) => {
      const card = document.createElement("button");
      const isSelected = this.selectedVariantId === variant.id || !this.selectedVariantId && index === 0;
      if (!this.selectedVariantId && index === 0) {
        this.selectedVariantId = variant.id;
      }
      card.type = "button";
      card.className = `bc-aq__variant-card${isSelected ? " bc-aq__variant-card--selected" : ""}`;
      card.innerHTML = `
        <div class="bc-aq__variant-media">${variant.previewUrl ? `<img src="${variant.previewUrl}" alt="${variant.label} preview" />` : `<div class="bc-aq__variant-placeholder">${variant.label}</div>`}</div>
        <div class="bc-aq__variant-meta">
          <div class="bc-aq__variant-label">${variant.label}</div>
          <div class="brain-console__detail">${variant.id}</div>
        </div>
      `;
      card.addEventListener("click", () => {
        this.selectedVariantId = variant.id;
        this.renderBody();
      });
      grid.appendChild(card);
    });
    return wrap;
  }
  renderMetadataPreview(approval) {
    const wrap = document.createElement("div");
    wrap.className = "bc-aq__metadata-preview";
    wrap.innerHTML = `
      <div class="bc-aq__preview-section">
        <div class="bc-aq__preview-section-label">Edit metadata before approval</div>
        <label class="bc-aq__field">
          <span>Title</span>
          <input id="bc-aq-title" type="text" value="${this.escapeAttr(this.metadataDraft.title)}" />
        </label>
        <label class="bc-aq__field">
          <span>Description</span>
          <textarea id="bc-aq-description" rows="4">${this.metadataDraft.description}</textarea>
        </label>
        <label class="bc-aq__field">
          <span>Tags</span>
          <input id="bc-aq-tags" type="text" value="${this.escapeAttr(this.metadataDraft.tags)}" placeholder="comma-separated" />
        </label>
        <label class="bc-aq__field">
          <span>Hashtags</span>
          <input id="bc-aq-hashtags" type="text" value="${this.escapeAttr(this.metadataDraft.hashtags)}" placeholder="#tag #tag" />
        </label>
      </div>
    `;
    const sync = () => {
      this.metadataDraft = {
        title: wrap.querySelector("#bc-aq-title")?.value ?? "",
        description: wrap.querySelector("#bc-aq-description")?.value ?? "",
        tags: wrap.querySelector("#bc-aq-tags")?.value ?? "",
        hashtags: wrap.querySelector("#bc-aq-hashtags")?.value ?? ""
      };
    };
    wrap.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("input", sync);
    });
    return wrap;
  }
  extractVariants(approval) {
    const payload = approval.requestPayload ?? {};
    const rawVariants = Array.isArray(payload.variants) ? payload.variants : [];
    if (rawVariants.length > 0) {
      return rawVariants.map((variant, index) => ({
        id: String(variant.id ?? `variant-${index + 1}`),
        label: String(variant.label ?? variant.name ?? `Variant ${index + 1}`),
        previewUrl: typeof variant.previewUrl === "string" ? variant.previewUrl : void 0
      }));
    }
    const baseLabel = approval.type === "thumbnail" ? "Thumbnail" : "Variant";
    return [
      { id: "variant-a", label: `${baseLabel} A` },
      { id: "variant-b", label: `${baseLabel} B` }
    ];
  }
  buildDecisionNote(approval) {
    if (approval.type === "thumbnail" && this.selectedVariantId) {
      return `selected_variant:${this.selectedVariantId}`;
    }
    if (approval.type === "metadata") {
      return JSON.stringify(this.metadataDraft);
    }
    return void 0;
  }
  escapeAttr(value) {
    return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  async bulkDecide(ids, approved) {
    try {
      const res = await fetch(`${BASE_URL2}/api/video-orchestrator/approvals/bulk-decide`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ approvalIds: ids, approved })
      });
      const data = await res.json();
      return data.ok === true;
    } catch {
      return false;
    }
  }
  async singleDecide(approvalId, approved, note) {
    const action = approved ? "approve" : "reject";
    try {
      await fetch(`${BASE_URL2}/api/video-orchestrator/approvals/${encodeURIComponent(approvalId)}/${action}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ note })
      });
    } catch {
    }
  }
  destroy() {
    this.container.innerHTML = "";
  }
};

// src/components/VO/DeadLetterReviewPanel.ts
var BASE_URL3 = "http://localhost:4877";
function formatDate(value) {
  if (!value) return "\u2014";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}
var DeadLetterReviewPanel = class {
  container;
  projectId;
  jobs = [];
  isLoading = false;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.renderShell();
    await this.loadJobs();
  }
  renderShell() {
    this.container.innerHTML = `
      <div class="vo-dead-letter">
        <div class="vo-panel-header">
          <h3>Dead Letter Review</h3>
          <button class="vo-btn-secondary" id="dead-letter-refresh">Refresh</button>
        </div>
        <div class="vo-dead-letter__subtitle">Jobs that exhausted worker retries and require operator review before requeueing.</div>
        <div class="vo-dead-letter__list" id="dead-letter-list">
          <div class="vo-empty-state">Loading dead jobs...</div>
        </div>
      </div>
    `;
    this.container.querySelector("#dead-letter-refresh")?.addEventListener("click", () => {
      void this.loadJobs();
    });
  }
  async loadJobs() {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const url = `${BASE_URL3}/api/infra/video-orchestrator/jobs?projectId=${encodeURIComponent(this.projectId)}&status=dead&limit=50`;
      const res = await fetch(url);
      const data = await res.json();
      this.jobs = Array.isArray(data.jobs) ? data.jobs : [];
      this.renderJobs();
    } catch {
      const listEl = this.container.querySelector("#dead-letter-list");
      if (listEl) {
        listEl.innerHTML = '<div class="vo-empty-state">Failed to load dead jobs.</div>';
      }
    } finally {
      this.isLoading = false;
    }
  }
  renderJobs() {
    const listEl = this.container.querySelector("#dead-letter-list");
    if (!listEl) return;
    if (this.jobs.length === 0) {
      listEl.innerHTML = '<div class="vo-empty-state">No dead jobs in the queue.</div>';
      return;
    }
    listEl.innerHTML = this.jobs.map((job) => `
      <article class="vo-dead-letter__card">
        <div class="vo-dead-letter__header">
          <div>
            <div class="vo-dead-letter__title">${this.escapeHtml(job.title ?? `Job ${job.jobId}`)}</div>
            <div class="vo-dead-letter__meta">${this.escapeHtml(job.jobType)}${job.platform ? ` \u2022 ${this.escapeHtml(job.platform)}` : ""}${job.accountHandle ? ` \u2022 ${this.escapeHtml(job.accountHandle)}` : ""}</div>
          </div>
          <span class="vo-status-badge vo-status-failed">Dead</span>
        </div>

        <div class="vo-dead-letter__grid">
          <div><span class="vo-dead-letter__label">Job ID</span><span class="vo-dead-letter__value vo-monospace">${this.escapeHtml(job.jobId)}</span></div>
          <div><span class="vo-dead-letter__label">Pipeline State</span><span class="vo-dead-letter__value">${this.escapeHtml(job.pipelineState)}</span></div>
          <div><span class="vo-dead-letter__label">Adapter</span><span class="vo-dead-letter__value">${this.escapeHtml(job.adapterMode ?? "\u2014")}</span></div>
          <div><span class="vo-dead-letter__label">Created</span><span class="vo-dead-letter__value">${this.escapeHtml(formatDate(job.createdAt))}</span></div>
          <div><span class="vo-dead-letter__label">Completed</span><span class="vo-dead-letter__value">${this.escapeHtml(formatDate(job.completedAt))}</span></div>
        </div>

        <div class="vo-dead-letter__error">
          <div class="vo-dead-letter__label">Error</div>
          <div class="vo-dead-letter__error-text">${this.escapeHtml(job.errorMessage ?? "No error message recorded.")}</div>
        </div>

        <div class="vo-dead-letter__actions">
          <div class="vo-dead-letter__action-note">Review the failure context, fix the underlying cause, then requeue from the package or worker workflow.</div>
        </div>
      </article>
    `).join("");
  }
  escapeHtml(value) {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  destroy() {
    this.container.innerHTML = "";
  }
};

// src/components/VO/PackageStatusPanel.ts
var PackageStatusPanel = class {
  container;
  packages = /* @__PURE__ */ new Map();
  refreshInterval = null;
  constructor(container) {
    this.container = container;
  }
  async initialize() {
    this.render();
    this.startAutoRefresh();
  }
  render() {
    const html = `
      <div class="vo-package-status">
        <div class="vo-panel-header">
          <h3>Package Execution</h3>
          <button class="vo-btn-secondary" id="status-refresh">Refresh</button>
        </div>

        <div class="vo-packages-list" id="packages-list">
          <div class="vo-empty-state">No packages to track</div>
        </div>
      </div>
    `;
    this.container.innerHTML = html;
    const refreshBtn = this.container.querySelector("#status-refresh");
    refreshBtn?.addEventListener("click", () => this.loadPackages());
  }
  async loadPackages() {
    this.renderPackages();
  }
  trackPackage(packageId, status) {
    this.packages.set(packageId, status);
    this.renderPackages();
  }
  renderPackages() {
    const listEl = this.container.querySelector("#packages-list");
    if (!listEl) return;
    if (this.packages.size === 0) {
      listEl.innerHTML = '<div class="vo-empty-state">No packages to track</div>';
      return;
    }
    const packagesHtml = Array.from(this.packages.values()).map((pkg) => this.renderPackageCard(pkg)).join("");
    listEl.innerHTML = packagesHtml;
  }
  renderPackageCard(pkg) {
    const stageBars = this.renderStageProgress(pkg);
    const currentJobInfo = pkg.currentJob ? `<div class="vo-current-job">
           <span>${pkg.currentJob.type}</span>
           <span class="vo-job-status">${pkg.currentJob.status}</span>
         </div>` : "";
    return `
      <div class="vo-package-card" data-package-id="${pkg.id}">
        <div class="vo-package-header">
          <h4>${pkg.contentItemId}</h4>
          <span class="vo-status-badge vo-status-${pkg.status}">${pkg.status}</span>
        </div>

        <div class="vo-progress-section">
          <div class="vo-progress-bar">
            <div class="vo-progress-fill" style="width: ${pkg.progressPercent}%"></div>
          </div>
          <span class="vo-progress-text">${pkg.progressPercent}%</span>
        </div>

        <div class="vo-stages-section">
          ${stageBars}
        </div>

        ${currentJobInfo}

        <div class="vo-package-actions">
          <button class="vo-btn-small" data-package-id="${pkg.id}">View Details</button>
        </div>
      </div>
    `;
  }
  renderStageProgress(pkg) {
    const stages = ["thumbnail", "metadata", "final_review", "publishing"];
    return stages.map((stage) => {
      let stageClass = "vo-stage-pending";
      if (pkg.completedStages.includes(stage)) {
        stageClass = "vo-stage-completed";
      } else if (pkg.failedStages.includes(stage)) {
        stageClass = "vo-stage-failed";
      } else if (pkg.stage === stage) {
        stageClass = "vo-stage-active";
      }
      return `<div class="vo-stage-item ${stageClass}" title="${stage}">${stage.slice(0, 3)}</div>`;
    }).join("");
  }
  startAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.refreshInterval = window.setInterval(() => {
      this.loadPackages();
    }, 3e4);
  }
  destroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/PublishingDashboardPanel.ts
var PublishingDashboardPanel = class {
  container;
  metrics = null;
  jobs = [];
  projectId;
  refreshInterval = null;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.render();
    await this.loadMetrics();
    await this.loadPublishingQueue();
    this.startAutoRefresh();
  }
  render() {
    const html = `
      <div class="vo-publishing-dashboard">
        <div class="vo-panel-header">
          <h3>Publishing Dashboard</h3>
          <button class="vo-btn-secondary" id="publish-refresh">Refresh</button>
        </div>

        <div class="vo-metrics-grid" id="metrics-grid">
          <div class="vo-metric-card">
            <span class="vo-metric-label">Total Published</span>
            <span class="vo-metric-value" id="metric-total">\u2014</span>
          </div>
          <div class="vo-metric-card">
            <span class="vo-metric-label">This Week</span>
            <span class="vo-metric-value" id="metric-week">\u2014</span>
          </div>
          <div class="vo-metric-card">
            <span class="vo-metric-label">Avg Time</span>
            <span class="vo-metric-value" id="metric-avgtime">\u2014</span>
          </div>
          <div class="vo-metric-card">
            <span class="vo-metric-label">Failure Rate</span>
            <span class="vo-metric-value" id="metric-failure">\u2014</span>
          </div>
        </div>

        <div class="vo-section">
          <h4>Platform Breakdown</h4>
          <div class="vo-platform-breakdown" id="platform-breakdown"></div>
        </div>

        <div class="vo-section">
          <h4>Publishing Queue</h4>
          <div class="vo-queue-table" id="queue-table">
            <div class="vo-empty-state">Loading...</div>
          </div>
        </div>
      </div>
    `;
    this.container.innerHTML = html;
    const refreshBtn = this.container.querySelector("#publish-refresh");
    refreshBtn?.addEventListener("click", async () => {
      await this.loadMetrics();
      await this.loadPublishingQueue();
    });
  }
  async loadMetrics() {
    try {
      const response = await fetch(
        `/api/video-orchestrator/analytics/publishing?projectId=${this.projectId}`
      );
      const data = await response.json();
      if (data.ok && data.metrics) {
        this.metrics = data.metrics;
        this.updateMetricsDisplay();
      }
    } catch (error) {
      console.error("Failed to load metrics:", error);
    }
  }
  updateMetricsDisplay() {
    if (!this.metrics) return;
    const updateEl = (id, value) => {
      const el = this.container.querySelector(id);
      if (el) {
        if (typeof value === "number") {
          if (id.includes("avgtime")) {
            el.textContent = value > 0 ? `${Math.round(value)}m` : "\u2014";
          } else if (id.includes("failure")) {
            el.textContent = `${(value * 100).toFixed(1)}%`;
          } else {
            el.textContent = String(value);
          }
        }
      }
    };
    updateEl("#metric-total", this.metrics.totalPublished);
    updateEl("#metric-week", this.metrics.thisWeek);
    updateEl("#metric-avgtime", this.metrics.avgTimeToPublish);
    updateEl("#metric-failure", this.metrics.failureRate);
    this.renderPlatformBreakdown();
  }
  renderPlatformBreakdown() {
    if (!this.metrics) return;
    const breakdownEl = this.container.querySelector("#platform-breakdown");
    if (!breakdownEl) return;
    const platforms = Object.entries(this.metrics.platformBreakdown);
    if (platforms.length === 0) {
      breakdownEl.innerHTML = '<p class="vo-empty-state">No platform data</p>';
      return;
    }
    const maxCount = Math.max(...platforms.map(([, count]) => count), 1);
    const html = platforms.map(
      ([platform, count]) => `
      <div class="vo-platform-item">
        <span class="vo-platform-name">${platform}</span>
        <div class="vo-platform-bar">
          <div class="vo-platform-fill" style="width: ${count / maxCount * 100}%"></div>
        </div>
        <span class="vo-platform-count">${count}</span>
      </div>
    `
    ).join("");
    breakdownEl.innerHTML = html;
  }
  async loadPublishingQueue() {
    try {
      const response = await fetch(
        `/api/video-orchestrator/publishing/queue?projectId=${this.projectId}`
      );
      const data = await response.json();
      if (data.ok) {
        this.jobs = data.jobs || [];
        this.renderQueue();
      }
    } catch (error) {
      console.error("Failed to load publishing queue:", error);
    }
  }
  renderQueue() {
    const tableEl = this.container.querySelector("#queue-table");
    if (!tableEl) return;
    if (this.jobs.length === 0) {
      tableEl.innerHTML = '<div class="vo-empty-state">No publishing jobs</div>';
      return;
    }
    const rows = this.jobs.map(
      (job) => `
      <div class="vo-queue-row">
        <div class="vo-queue-col">${job.packageId}</div>
        <div class="vo-queue-col">${job.platformId}</div>
        <div class="vo-queue-col">
          <span class="vo-status-badge vo-status-${job.status}">${job.status}</span>
        </div>
        <div class="vo-queue-col">${job.publishedAt ? new Date(job.publishedAt).toLocaleDateString() : "\u2014"}</div>
      </div>
    `
    ).join("");
    tableEl.innerHTML = `
      <div class="vo-queue-header">
        <div class="vo-queue-col">Package</div>
        <div class="vo-queue-col">Platform</div>
        <div class="vo-queue-col">Status</div>
        <div class="vo-queue-col">Published</div>
      </div>
      ${rows}
    `;
  }
  startAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.refreshInterval = window.setInterval(async () => {
      await this.loadMetrics();
      await this.loadPublishingQueue();
    }, 6e4);
  }
  destroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/EventLogPanel.ts
var EventLogPanel = class {
  container;
  projectId;
  eventTypeFilter = "";
  refreshInterval = null;
  lastRefreshTime = (/* @__PURE__ */ new Date()).toISOString();
  totalEventCount = 0;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.render();
    await this.loadEvents();
    this.startAutoRefresh();
  }
  render() {
    this.container.innerHTML = `
      <div class="vo-event-log">
        <div class="vo-event-header">
          <h2>Event Log</h2>
          <div class="vo-event-controls">
            <select class="vo-event-filter-select" id="event-filter">
              <option value="">All Events</option>
              <option value="package">Package Events</option>
              <option value="approval">Approval Events</option>
              <option value="publish">Publishing Events</option>
              <option value="webhook">Webhook Events</option>
            </select>
            <button class="vo-event-refresh-btn" id="event-refresh-btn">Refresh</button>
          </div>
        </div>

        <div class="vo-event-metrics">
          <div class="vo-event-metric">
            <span class="vo-metric-label">Total Events</span>
            <span class="vo-metric-value" id="event-total">0</span>
          </div>
          <div class="vo-event-metric">
            <span class="vo-metric-label">Last Event</span>
            <span class="vo-metric-value" id="event-last">\u2014</span>
          </div>
          <div class="vo-event-metric">
            <span class="vo-metric-label">Status</span>
            <span class="vo-metric-value vo-status-ready" id="event-status">Ready</span>
          </div>
        </div>

        <div class="vo-event-table-container" id="event-container">
          <div class="vo-loading">Loading events...</div>
        </div>
      </div>
    `;
    const filterSelect = this.container.querySelector("#event-filter");
    const refreshBtn = this.container.querySelector("#event-refresh-btn");
    filterSelect?.addEventListener("change", (e) => {
      this.eventTypeFilter = e.target.value;
      this.loadEvents();
    });
    refreshBtn?.addEventListener("click", () => {
      this.loadEvents();
    });
  }
  async loadEvents() {
    const container = this.container.querySelector("#event-container");
    if (!container) return;
    try {
      container.innerHTML = '<div class="vo-loading">Loading events...</div>';
      const filterParam = this.eventTypeFilter ? `&eventType=${encodeURIComponent(this.eventTypeFilter)}.*` : "";
      const res = await fetch(`/api/video-orchestrator/events/stream?projectId=${encodeURIComponent(this.projectId)}&limit=50${filterParam}`);
      if (!res.ok) {
        container.innerHTML = '<div class="vo-error">Failed to load events</div>';
        return;
      }
      const data = await res.json();
      if (!data.ok) {
        container.innerHTML = `<div class="vo-error">${data.error ?? "Failed to load events"}</div>`;
        return;
      }
      const events = data.events ?? [];
      this.totalEventCount = data.count ?? 0;
      this.updateMetrics(events);
      if (events.length === 0) {
        container.innerHTML = `
          <div class="vo-empty-state">
            <p>No events recorded${this.eventTypeFilter ? " for this filter" : " yet"}</p>
          </div>
        `;
        return;
      }
      const tableHtml = `
        <table class="vo-event-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Actor</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Payload</th>
            </tr>
          </thead>
          <tbody>
            ${events.map((evt) => this.renderEventRow(evt)).join("")}
          </tbody>
        </table>
      `;
      container.innerHTML = tableHtml;
      this.attachEventRowListeners();
    } catch (error) {
      container.innerHTML = `<div class="vo-error">Error loading events: ${error instanceof Error ? error.message : "Unknown error"}</div>`;
    }
  }
  renderEventRow(event) {
    const typeCategory = event.type.split(".")[0];
    const statusClass = `vo-event-status-${event.status}`;
    const payloadPreview = JSON.stringify(event.payload).slice(0, 50) + (JSON.stringify(event.payload).length > 50 ? "..." : "");
    return `
      <tr data-event-id="${event.id}" class="vo-event-row">
        <td>
          <span class="vo-event-type-badge vo-badge-${typeCategory}">
            ${event.type}
          </span>
        </td>
        <td>${this.escapeHtml(event.actor)}</td>
        <td>${new Date(event.at).toLocaleString()}</td>
        <td>
          <span class="${statusClass}">
            ${event.status}
          </span>
        </td>
        <td>
          <code class="vo-event-payload-preview">${this.escapeHtml(payloadPreview)}</code>
        </td>
      </tr>
    `;
  }
  attachEventRowListeners() {
    const rows = this.container.querySelectorAll(".vo-event-row");
    rows.forEach((row) => {
      row.addEventListener("click", () => {
      });
    });
  }
  updateMetrics(events) {
    const totalEl = this.container.querySelector("#event-total");
    const lastEl = this.container.querySelector("#event-last");
    const statusEl = this.container.querySelector("#event-status");
    if (totalEl) {
      totalEl.textContent = this.totalEventCount.toString();
    }
    if (lastEl && events.length > 0) {
      const lastEvent = events[0];
      const timeDiff = this.getTimeAgo(lastEvent.at);
      lastEl.textContent = timeDiff;
    }
    if (statusEl) {
      statusEl.textContent = "Ready";
      statusEl.className = "vo-metric-value vo-status-ready";
    }
  }
  getTimeAgo(isoTime) {
    const now = /* @__PURE__ */ new Date();
    const then = new Date(isoTime);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1e3);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (c) => map[c]);
  }
  startAutoRefresh() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.refreshInterval = window.setInterval(() => {
      this.loadEvents();
    }, 15e3);
  }
  destroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.container.innerHTML = "";
  }
};

// src/components/VO/StudioDashboardPanel.ts
var StudioDashboardPanel = class {
  container;
  projectId;
  refreshInterval = null;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.render();
    await this.loadAll();
    this.startAutoRefresh();
  }
  render() {
    this.container.innerHTML = `
      <div class="vo-dashboard-panel">
        <div class="vo-panel-header">
          <h2>VO Studio Dashboard</h2>
          <button class="vo-btn-secondary" id="dashboard-refresh">Refresh</button>
        </div>

        <div class="vo-overview-card">
          <div class="vo-overview-title">Pipeline Health</div>
          <div class="vo-health-grid" id="dashboard-health-grid">
            <div class="vo-health-indicator">
              <div class="vo-health-score" id="health-score-value">\u2014</div>
              <div class="vo-health-badge" id="health-status-badge">\u2014</div>
            </div>
          </div>
        </div>

        <div class="vo-overview-card">
          <div class="vo-overview-title">Routing Statistics</div>
          <div class="vo-activity-grid" id="dashboard-routing-grid">
            <div class="vo-activity-stat">
              <span class="vo-stat-label">Platforms</span>
              <span class="vo-stat-value" id="routing-platform-count">\u2014</span>
            </div>
            <div class="vo-activity-stat">
              <span class="vo-stat-label">Mapped Events</span>
              <span class="vo-stat-value" id="routing-event-count">\u2014</span>
            </div>
            <div class="vo-activity-stat">
              <span class="vo-stat-label">Last Route</span>
              <span class="vo-stat-value" id="routing-last-at">\u2014</span>
            </div>
          </div>
        </div>

        <div class="vo-overview-card">
          <div class="vo-overview-title">Webhook Summary</div>
          <div class="vo-stats-table" id="dashboard-webhook-table">
            <div class="vo-stat-row">
              <span class="vo-stat-key">Success</span>
              <span class="vo-stat-value" id="webhook-success">\u2014</span>
            </div>
            <div class="vo-stat-row">
              <span class="vo-stat-key">Failures</span>
              <span class="vo-stat-value" id="webhook-failure">\u2014</span>
            </div>
            <div class="vo-stat-row">
              <span class="vo-stat-key">Rate</span>
              <span class="vo-stat-value" id="webhook-rate">\u2014%</span>
            </div>
          </div>
        </div>

        <div class="vo-overview-card">
          <div class="vo-overview-title">Worker Health</div>
          <div class="vo-stats-table" id="dashboard-worker-health">
            <div class="vo-stat-row">
              <span class="vo-stat-key">Status</span>
              <span class="vo-stat-value" id="worker-health-status">\u2014</span>
            </div>
            <div class="vo-stat-row">
              <span class="vo-stat-key">PID</span>
              <span class="vo-stat-value" id="worker-health-pid">\u2014</span>
            </div>
            <div class="vo-stat-row">
              <span class="vo-stat-key">Detail</span>
              <span class="vo-stat-value" id="worker-health-detail">\u2014</span>
            </div>
          </div>
        </div>

        <div class="vo-overview-card">
          <div class="vo-overview-title">Recent Events</div>
          <div id="dashboard-events-list" class="vo-event-list-preview">
            <!-- Events will be populated here -->
          </div>
        </div>

        <div class="vo-overview-card">
          <div class="vo-overview-title">Quick Actions</div>
          <div class="vo-quick-actions">
            <button class="vo-btn-secondary" data-tab="approvals">Approvals Queue</button>
            <button class="vo-btn-secondary" data-tab="packages">Package Status</button>
            <button class="vo-btn-secondary" data-tab="publishing">Publishing</button>
            <button class="vo-btn-secondary" data-tab="events">Event Log</button>
            <button class="vo-btn-secondary" data-tab="webhooks">Webhooks</button>
          </div>
        </div>
      </div>
    `;
    const refreshBtn = this.container.querySelector("#dashboard-refresh");
    refreshBtn?.addEventListener("click", () => {
      this.loadAll();
    });
  }
  async loadAll() {
    await Promise.allSettled([
      this.loadHealth(),
      this.loadRoutingStats(),
      this.loadWebhookSummary(),
      this.loadWorkerHealth(),
      this.loadRecentEvents()
    ]);
  }
  async loadHealth() {
    try {
      const res = await fetch(`/api/video-orchestrator/analytics/pipeline-health?projectId=${encodeURIComponent(this.projectId)}`);
      const data = await res.json();
      if (data.ok && data.health) {
        const scoreEl = this.container.querySelector("#health-score-value");
        const badgeEl = this.container.querySelector("#health-status-badge");
        if (scoreEl) {
          scoreEl.textContent = data.health.score.toString();
          scoreEl.className = `vo-health-score vo-health-score-${data.health.status}`;
        }
        if (badgeEl) {
          badgeEl.textContent = data.health.status;
          badgeEl.className = `vo-health-badge vo-status-${data.health.status}`;
        }
      }
    } catch (error) {
    }
  }
  async loadRoutingStats() {
    try {
      const res = await fetch(`/api/video-orchestrator/analytics/routing-statistics?projectId=${encodeURIComponent(this.projectId)}`);
      const data = await res.json();
      if (data.ok && data.stats) {
        const stats = data.stats || [];
        const platformCountEl = this.container.querySelector("#routing-platform-count");
        const eventCountEl = this.container.querySelector("#routing-event-count");
        const lastAtEl = this.container.querySelector("#routing-last-at");
        if (platformCountEl) {
          platformCountEl.textContent = stats.length.toString();
        }
        if (eventCountEl) {
          const totalEvents = stats.reduce((sum, s) => sum + (s.mappingCount || 0), 0);
          eventCountEl.textContent = totalEvents.toString();
        }
        if (lastAtEl && stats.length > 0) {
          const lastEntry = stats[0];
          lastAtEl.textContent = new Date(lastEntry.lastRoutedAt).toLocaleTimeString();
        }
      }
    } catch (error) {
    }
  }
  async loadWebhookSummary() {
    try {
      const res = await fetch(`/api/video-orchestrator/analytics/webhook-delivery-rates?projectId=${encodeURIComponent(this.projectId)}`);
      const data = await res.json();
      if (data.ok && data.metrics) {
        const metrics = data.metrics;
        const successEl = this.container.querySelector("#webhook-success");
        const failureEl = this.container.querySelector("#webhook-failure");
        const rateEl = this.container.querySelector("#webhook-rate");
        if (successEl) {
          successEl.textContent = metrics.successCount.toString();
        }
        if (failureEl) {
          failureEl.textContent = metrics.failureCount.toString();
        }
        if (rateEl) {
          rateEl.textContent = `${Math.round(metrics.successRate)}%`;
        }
      }
    } catch (error) {
    }
  }
  async loadWorkerHealth() {
    try {
      const res = await fetch(`/api/infra/video-orchestrator/worker-health`);
      const data = await res.json();
      const statusEl = this.container.querySelector("#worker-health-status");
      const pidEl = this.container.querySelector("#worker-health-pid");
      const detailEl = this.container.querySelector("#worker-health-detail");
      if (statusEl) {
        statusEl.textContent = data.status;
        statusEl.className = `vo-stat-value vo-worker-health-${data.status}`;
      }
      if (pidEl) {
        pidEl.textContent = data.pid ? String(data.pid) : "\u2014";
      }
      if (detailEl) {
        detailEl.textContent = data.detail;
      }
    } catch {
    }
  }
  async loadRecentEvents() {
    try {
      const res = await fetch(`/api/video-orchestrator/events/stream?projectId=${encodeURIComponent(this.projectId)}&limit=5`);
      const data = await res.json();
      if (data.ok && data.events) {
        const events = data.events || [];
        const listEl = this.container.querySelector("#dashboard-events-list");
        if (listEl) {
          if (events.length === 0) {
            listEl.innerHTML = '<div class="vo-empty-state"><p>No events recorded yet</p></div>';
          } else {
            listEl.innerHTML = events.map((evt) => this.renderEventRow(evt)).join("");
          }
        }
      }
    } catch (error) {
    }
  }
  renderEventRow(event) {
    const typeCategory = event.type.split(".")[0];
    const timeAgo = this.getTimeAgo(event.at);
    return `
      <div class="vo-dashboard-event-row">
        <span class="vo-event-type-badge vo-badge-${typeCategory}">
          ${this.escapeHtml(event.type)}
        </span>
        <span class="vo-event-actor">${this.escapeHtml(event.actor)}</span>
        <span class="vo-event-time">${timeAgo}</span>
      </div>
    `;
  }
  getTimeAgo(isoTime) {
    const now = /* @__PURE__ */ new Date();
    const then = new Date(isoTime);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1e3);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (c) => map[c]);
  }
  startAutoRefresh() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.refreshInterval = window.setInterval(() => {
      this.loadAll();
    }, 6e4);
  }
  destroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.container.innerHTML = "";
  }
};

// src/components/VO/AuditLogPanel.ts
var AuditLogPanel = class {
  container;
  projectId;
  allEntries = [];
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.render();
    await this.loadAuditLog();
  }
  render() {
    this.container.innerHTML = `
      <div class="vo-audit-log-panel">
        <div class="vo-panel-header">
          <h3>Approval Audit Log</h3>
          <div class="vo-panel-header-actions">
            <input type="text" id="audit-filter" placeholder="Filter by approval ID..." class="vo-filter-input">
            <button class="vo-btn-secondary" id="audit-refresh">Refresh</button>
          </div>
        </div>

        <div class="vo-audit-table-wrapper">
          <table class="vo-audit-table">
            <thead>
              <tr>
                <th>Approval ID</th>
                <th>Action</th>
                <th>Actor</th>
                <th>Timestamp</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody id="audit-log-tbody">
              <tr><td colspan="5" class="vo-loading-state">Loading audit log...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    const filterInput = this.container.querySelector("#audit-filter");
    filterInput?.addEventListener("input", (e) => {
      const value = e.target.value;
      this.filterLog(value);
    });
    const refreshBtn = this.container.querySelector("#audit-refresh");
    refreshBtn?.addEventListener("click", () => {
      this.loadAuditLog();
    });
  }
  async loadAuditLog() {
    const tbody = this.container.querySelector("#audit-log-tbody");
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="5" class="vo-loading-state">Loading...</td></tr>';
    }
    try {
      const url = `http://localhost:4877/api/video-orchestrator/audit-log?projectId=${encodeURIComponent(this.projectId)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.ok && data.entries) {
        this.allEntries = data.entries;
        this.renderLog(data.entries);
      } else {
        this.showError(data.error ?? "Failed to load audit log");
      }
    } catch (error) {
      this.showError(error instanceof Error ? error.message : "Network error");
    }
  }
  renderLog(entries) {
    const tbody = this.container.querySelector("#audit-log-tbody");
    if (!tbody) return;
    if (entries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="vo-empty-state">No audit log entries</td></tr>';
      return;
    }
    tbody.innerHTML = entries.map(
      (entry) => `
      <tr data-approval-id="${this.escapeAttr(entry.approvalId)}">
        <td class="vo-approval-id">${this.escapeHtml(entry.approvalId)}</td>
        <td><span class="vo-action-badge vo-action-${this.escapeAttr(entry.action)}">${this.escapeHtml(entry.action)}</span></td>
        <td>${this.escapeHtml(entry.actor)}</td>
        <td title="${this.escapeAttr(entry.timestamp)}">${new Date(entry.timestamp).toLocaleString()}</td>
        <td><button class="vo-btn-small vo-btn-details" data-entry-id="${this.escapeAttr(entry.id)}" data-details="${this.escapeAttr(JSON.stringify(entry.details))}">View</button></td>
      </tr>
    `
    ).join("");
    tbody.querySelectorAll(".vo-btn-details").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.target;
        const details = target.getAttribute("data-details") ?? "{}";
        this.showDetails(details);
      });
    });
  }
  filterLog(value) {
    const rows = Array.from(
      this.container.querySelectorAll("#audit-log-tbody tr[data-approval-id]")
    );
    const query = value.toLowerCase().trim();
    for (const row of rows) {
      const approvalId = (row.getAttribute("data-approval-id") ?? "").toLowerCase();
      row.style.display = query === "" || approvalId.includes(query) ? "" : "none";
    }
  }
  showDetails(detailsJson) {
    try {
      const details = JSON.parse(detailsJson);
      const message = Object.entries(details).map(([k, v]) => `${k}: ${String(v)}`).join("\n");
      alert(message || "No details available");
    } catch {
      alert("Could not parse details");
    }
  }
  showError(message) {
    const tbody = this.container.querySelector("#audit-log-tbody");
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="5" class="vo-error">${this.escapeHtml(message)}</td></tr>`;
    }
  }
  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
  }
  escapeAttr(text) {
    return text.replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  destroy() {
    this.allEntries = [];
    this.container.innerHTML = "";
  }
};

// src/components/VO/OperatorDashboardPanel.ts
var OperatorDashboardPanel = class {
  container;
  projectId;
  refreshInterval = null;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.render();
    await this.loadAll();
    this.startAutoRefresh();
  }
  render() {
    this.container.innerHTML = `
      <div class="vo-operator-dashboard">
        <div class="vo-panel-header">
          <h2>Operator Dashboard</h2>
          <button id="dashboard-refresh" class="vo-btn-secondary">Refresh</button>
        </div>

        <div class="vo-stats-grid">
          <div class="vo-stat-card">
            <div class="vo-stat-label">Total Approvals (30d)</div>
            <div class="vo-stat-value" id="stat-total">\u2014</div>
          </div>

          <div class="vo-stat-card">
            <div class="vo-stat-label">Approval Rate</div>
            <div class="vo-stat-value" id="stat-rate">\u2014</div>
          </div>

          <div class="vo-stat-card">
            <div class="vo-stat-label">Avg Decision Time</div>
            <div class="vo-stat-value" id="stat-avg-time">\u2014</div>
          </div>

          <div class="vo-stat-card">
            <div class="vo-stat-label">Pending (Current)</div>
            <div class="vo-stat-value" id="stat-pending">\u2014</div>
          </div>
        </div>

        <div class="vo-charts-grid">
          <div class="vo-chart-card">
            <h3>Approvals by Type</h3>
            <div id="chart-by-type" class="vo-chart-bars"></div>
          </div>

          <div class="vo-chart-card">
            <h3>Top Rejection Reasons</h3>
            <ul id="chart-rejections" class="vo-rejection-list"></ul>
          </div>

          <div class="vo-chart-card">
            <h3>Operator Performance</h3>
            <table id="chart-operators" class="vo-operator-table">
              <thead>
                <tr>
                  <th>Operator</th>
                  <th>Decisions</th>
                  <th>Approval %</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    this.container.querySelector("#dashboard-refresh")?.addEventListener("click", () => {
      this.loadAll();
    });
  }
  async loadAll() {
    await Promise.allSettled([this.loadStats(), this.loadPendingCount()]);
  }
  async loadStats() {
    try {
      const url = `http://localhost:4877/api/video-orchestrator/analytics/approvals?projectId=${encodeURIComponent(this.projectId)}&since=30d`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.ok && data.stats) {
        this.renderStats(data.stats);
      } else {
        console.error("Failed to load operator dashboard stats:", data.error);
      }
    } catch (error) {
      console.error("Error loading operator dashboard stats:", error);
    }
  }
  async loadPendingCount() {
    try {
      const url = `http://localhost:4877/api/video-orchestrator/approvals?projectId=${encodeURIComponent(this.projectId)}`;
      const response = await fetch(url);
      const data = await response.json();
      const pendingEl = this.container.querySelector("#stat-pending");
      if (pendingEl && data.ok) {
        pendingEl.textContent = String(data.count ?? 0);
      }
    } catch (error) {
      console.error("Error loading pending count:", error);
    }
  }
  renderStats(stats) {
    const totalEl = this.container.querySelector("#stat-total");
    if (totalEl) totalEl.textContent = String(stats.totalRequested);
    const rateEl = this.container.querySelector("#stat-rate");
    if (rateEl) rateEl.textContent = `${(stats.approvalRate * 100).toFixed(1)}%`;
    const avgTimeEl = this.container.querySelector("#stat-avg-time");
    if (avgTimeEl) {
      avgTimeEl.textContent = stats.avgDecisionTimeMinutes > 0 ? `${stats.avgDecisionTimeMinutes.toFixed(0)}m` : "\u2014";
    }
    const byTypeContainer = this.container.querySelector("#chart-by-type");
    if (byTypeContainer) {
      const entries = Object.entries(stats.byType);
      if (entries.length === 0) {
        byTypeContainer.innerHTML = '<p class="vo-empty-state">No data</p>';
      } else {
        byTypeContainer.innerHTML = entries.map(([type, data]) => {
          const pct = data.requested > 0 ? Math.round(data.approved / data.requested * 100) : 0;
          return `
            <div class="vo-chart-row">
              <span class="vo-chart-label">${this.escapeHtml(type)}</span>
              <div class="vo-bar-track">
                <div class="vo-bar-fill" style="width: ${pct}%"></div>
              </div>
              <span class="vo-chart-count">${data.approved}/${data.requested}</span>
            </div>
          `;
        }).join("");
      }
    }
    const rejectionsEl = this.container.querySelector("#chart-rejections");
    if (rejectionsEl) {
      const sorted = Object.entries(stats.rejectionReasons).sort(([, a], [, b]) => b - a);
      const top5 = sorted.slice(0, 5);
      if (top5.length === 0) {
        rejectionsEl.innerHTML = '<li class="vo-empty-state">No rejections</li>';
      } else {
        rejectionsEl.innerHTML = top5.map(([reason, count]) => `<li>${this.escapeHtml(reason)}: <strong>${count}</strong></li>`).join("");
      }
    }
    const operatorTbody = this.container.querySelector("#chart-operators tbody");
    if (operatorTbody) {
      const entries = Object.entries(stats.byOperator);
      if (entries.length === 0) {
        operatorTbody.innerHTML = '<tr><td colspan="3" class="vo-empty-state">No operator data</td></tr>';
      } else {
        operatorTbody.innerHTML = entries.sort(([, a], [, b]) => b.decided - a.decided).map(
          ([operator, data]) => `
          <tr>
            <td>${this.escapeHtml(operator)}</td>
            <td>${data.decided}</td>
            <td>${(data.approvalRate * 100).toFixed(1)}%</td>
          </tr>
        `
        ).join("");
      }
    }
  }
  startAutoRefresh() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.refreshInterval = window.setInterval(
      () => {
        this.loadAll();
      },
      5 * 60 * 1e3
    );
  }
  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
  }
  destroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
    this.container.innerHTML = "";
  }
};

// src/components/VO/JobProgressPanel.ts
var BASE_URL4 = "http://localhost:4877";
function formatDate2(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}
function normalizeStatus(job) {
  if (job.jobStatus === "pending") return "pending";
  if (job.jobStatus === "failed" || job.jobStatus === "dead") return "failed";
  if (job.jobStatus === "succeeded") return "done";
  if (job.jobStatus === "running" && job.pipelineState === "awaiting-approval") {
    return "awaiting-approval";
  }
  if (job.pipelineState === "approved" || job.pipelineState === "awaiting-approval") {
    return "awaiting-approval";
  }
  return "processing";
}
function estimateProgress(job) {
  switch (normalizeStatus(job)) {
    case "pending":
      return 0;
    case "awaiting-approval":
      return 55;
    case "processing":
      return 65;
    case "done":
      return 100;
    case "failed":
      return 100;
  }
}
var JobProgressPanel = class {
  container;
  projectId;
  jobs = [];
  refreshInterval = null;
  isLoading = false;
  constructor(container, projectId) {
    this.container = container;
    this.projectId = projectId;
  }
  async initialize() {
    this.renderShell();
    await this.loadJobs();
    this.startAutoRefresh();
  }
  renderShell() {
    this.container.innerHTML = `
      <div class="vo-job-progress">
        <div class="vo-panel-header">
          <h3>Job Progress</h3>
          <button class="vo-btn-secondary" id="job-progress-refresh">Refresh</button>
        </div>
        <div class="vo-job-progress-subtitle">Composition, subtitles, thumbnails, metadata, and publishing jobs.</div>
        <div class="vo-jobs-list" id="jobs-list">
          <div class="vo-empty-state">Loading jobs...</div>
        </div>
      </div>
    `;
    this.container.querySelector("#job-progress-refresh")?.addEventListener("click", () => {
      void this.loadJobs();
    });
  }
  async loadJobs() {
    if (this.isLoading) return;
    this.isLoading = true;
    const listEl = this.container.querySelector("#jobs-list");
    if (listEl && this.jobs.length === 0) {
      listEl.innerHTML = '<div class="vo-empty-state">Loading jobs...</div>';
    }
    try {
      const qs = this.projectId ? `?projectId=${encodeURIComponent(this.projectId)}` : "";
      const res = await fetch(`${BASE_URL4}/api/infra/video-orchestrator/jobs${qs}`);
      const data = await res.json();
      this.jobs = Array.isArray(data.jobs) ? data.jobs : [];
      this.renderJobs();
    } catch {
      if (listEl) {
        listEl.innerHTML = '<div class="vo-empty-state">Failed to load jobs.</div>';
      }
    } finally {
      this.isLoading = false;
    }
  }
  renderJobs() {
    const listEl = this.container.querySelector("#jobs-list");
    if (!listEl) return;
    if (this.jobs.length === 0) {
      listEl.innerHTML = '<div class="vo-empty-state">No jobs found for this project.</div>';
      return;
    }
    listEl.innerHTML = this.jobs.map((job) => this.renderJobCard(job)).join("");
  }
  renderJobCard(job) {
    const normalizedStatus = normalizeStatus(job);
    const progress = estimateProgress(job);
    const approvalLabel = normalizedStatus === "awaiting-approval" ? "Awaiting Operator Decision" : normalizedStatus === "processing" ? "Processing" : normalizedStatus === "done" ? "Completed" : normalizedStatus === "failed" ? "Failed" : "Pending";
    const errorHtml = job.errorMessage ? `<div class="vo-job-error">${job.errorMessage}</div>` : "";
    return `
      <article class="vo-job-card vo-job-card--${normalizedStatus}" data-job-id="${job.jobId}">
        <div class="vo-job-card__header">
          <div>
            <div class="vo-job-card__title">${job.title ?? `Job ${job.jobId}`}</div>
            <div class="vo-job-card__meta">${job.jobType}${job.platform ? ` \u2022 ${job.platform}` : ""}${job.accountHandle ? ` \u2022 @${job.accountHandle}` : ""}</div>
          </div>
          <span class="vo-status-badge vo-status-${normalizedStatus}">${approvalLabel}</span>
        </div>

        <div class="vo-job-card__progress">
          <div class="vo-progress-bar-wrap">
            <div class="vo-progress-bar-fill" style="width: ${progress}%"></div>
          </div>
          <span class="vo-progress-label">${progress}%</span>
        </div>

        <div class="vo-job-card__details">
          <div><span class="vo-job-card__label">Stage</span> ${job.pipelineState}</div>
          <div><span class="vo-job-card__label">Adapter</span> ${job.adapterMode ?? "\u2014"}</div>
          <div><span class="vo-job-card__label">Created</span> ${formatDate2(job.createdAt)}</div>
          <div><span class="vo-job-card__label">Completed</span> ${job.completedAt ? formatDate2(job.completedAt) : "\u2014"}</div>
        </div>

        ${errorHtml}
      </article>
    `;
  }
  startAutoRefresh() {
    if (this.refreshInterval) {
      window.clearInterval(this.refreshInterval);
    }
    this.refreshInterval = window.setInterval(() => {
      void this.loadJobs();
    }, 3e4);
  }
  destroy() {
    if (this.refreshInterval) {
      window.clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    this.container.innerHTML = "";
  }
};

// src/components/VO/AgentConsolePanel.ts
var AgentConsolePanel = class {
  container;
  refreshInterval = null;
  constructor(container) {
    this.container = container;
  }
  async initialize() {
    this.renderShell();
    await this.load();
    this.startAutoRefresh();
  }
  destroy() {
    if (this.refreshInterval !== null) {
      window.clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    this.container.innerHTML = "";
  }
  renderShell() {
    this.container.innerHTML = `
      <div class="vo-agent-panel">
        <div class="vo-panel-header">
          <h2>Agent Console</h2>
          <button class="vo-btn-secondary" id="agent-console-refresh">Refresh</button>
        </div>
        <div id="agent-console-status" class="vo-empty-state">
          <p>Loading agent console...</p>
        </div>
      </div>
    `;
    const refreshButton = this.container.querySelector("#agent-console-refresh");
    refreshButton?.addEventListener("click", () => {
      void this.load();
    });
  }
  startAutoRefresh() {
    this.refreshInterval = window.setInterval(() => {
      void this.load();
    }, 3e4);
  }
  async load() {
    const statusEl = this.container.querySelector("#agent-console-status");
    if (!statusEl) return;
    try {
      const [consoleResponse, costResponse] = await Promise.all([
        fetch("/agent-console"),
        fetch("/agent-cost-summary")
      ]);
      if (!consoleResponse.ok || !costResponse.ok) {
        throw new Error(`Failed to load agent console (${consoleResponse.status}/${costResponse.status})`);
      }
      const consoleSummary = await consoleResponse.json();
      const costSummary = await costResponse.json();
      statusEl.outerHTML = this.renderData(consoleSummary, costSummary);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      statusEl.outerHTML = `
        <div id="agent-console-status" class="vo-empty-state">
          <p>Unable to load agent console.</p>
          <p>${this.escapeHtml(message)}</p>
        </div>
      `;
    }
  }
  renderData(summary, costSummary) {
    const currentStep = summary.taskState.steps.find((step) => step.taskId === summary.taskState.currentTaskId);
    const latestRuns = summary.ledger.runs.slice(0, 4);
    const latestEvents = summary.ledger.events.slice(0, 5);
    const expensiveTasks = costSummary.topExpensiveTasks.slice(0, 4);
    return `
      <div id="agent-console-status" class="vo-agent-console">
        <div class="vo-agent-grid">
          <section class="vo-overview-card">
            <div class="vo-overview-title">Run Summary</div>
            <div class="vo-activity-grid">
              ${this.renderMetric("Active", String(summary.activeRunCount))}
              ${this.renderMetric("Blocked", String(summary.blockedRunCount))}
              ${this.renderMetric("Planned", String(summary.plannedRunCount))}
              ${this.renderMetric("Events", String(summary.ledger.eventCount))}
            </div>
          </section>

          <section class="vo-overview-card">
            <div class="vo-overview-title">Task Graph</div>
            <div class="vo-activity-grid">
              ${this.renderMetric("Tasks", String(summary.taskGraph.taskCount))}
              ${this.renderMetric("Completed", String(summary.taskGraph.completedCount))}
              ${this.renderMetric("Pending", String(summary.taskGraph.pendingCount))}
              ${this.renderMetric("Current", currentStep ? this.escapeHtml(currentStep.taskId) : "\u2014")}
            </div>
          </section>

          <section class="vo-overview-card">
            <div class="vo-overview-title">Approval Gates</div>
            <div class="vo-stats-table">
              ${this.renderStatRow("Store", summary.approvalGates.approvalStoreStatus)}
              ${this.renderStatRow("Pending", String(summary.approvalGates.pendingCount))}
              ${this.renderStatRow("Approved", String(summary.approvalGates.approvedCount))}
              ${this.renderStatRow("Blocked Kinds", summary.approvalGates.blockedApprovalKinds.join(", ") || "None")}
            </div>
          </section>

          <section class="vo-overview-card">
            <div class="vo-overview-title">Cost Snapshot</div>
            <div class="vo-stats-table">
              ${this.renderStatRow("Spent", `$${costSummary.budget.spentUsd.toFixed(4)}`)}
              ${this.renderStatRow("Remaining", `$${costSummary.budget.remainingUsd.toFixed(2)}`)}
              ${this.renderStatRow("Budget", costSummary.budget.status)}
              ${this.renderStatRow("Local Routes", String(costSummary.localRouteCount))}
            </div>
          </section>
        </div>

        <div class="vo-agent-grid vo-agent-grid--detail">
          <section class="vo-overview-card">
            <div class="vo-overview-title">Current Task State</div>
            <div class="vo-stats-table">
              ${this.renderStatRow("Current Task", summary.taskState.currentTaskId || "\u2014")}
              ${this.renderStatRow("Last Completed", summary.taskState.lastCompletedTaskId || "\u2014")}
              ${this.renderStatRow("Executor Selections", String(summary.executorSelectionCount))}
              ${this.renderStatRow("Persistence", summary.persistence.loadedFromDisk ? "Snapshot" : "Derived")}
            </div>
            <p class="vo-agent-next-step">${this.escapeHtml(summary.nextSafeStep)}</p>
          </section>

          <section class="vo-overview-card">
            <div class="vo-overview-title">Executor Plan</div>
            <div class="vo-agent-list">
              ${summary.executorPlan.steps.map((step) => `
                <div class="vo-agent-list-item">
                  <div class="vo-agent-list-header">
                    <strong>${this.escapeHtml(step.taskId)}</strong>
                    <span>${this.escapeHtml(step.providerId)}</span>
                  </div>
                  <div class="vo-agent-list-meta">${this.escapeHtml(step.executorId)}${step.model ? ` \xB7 ${this.escapeHtml(step.model)}` : ""}</div>
                  <div class="vo-agent-list-copy">${this.escapeHtml(step.reason)}</div>
                </div>
              `).join("")}
            </div>
          </section>
        </div>

        <div class="vo-agent-grid vo-agent-grid--detail">
          <section class="vo-overview-card">
            <div class="vo-overview-title">Recent Runs</div>
            <div class="vo-agent-list">
              ${latestRuns.map((run) => `
                <div class="vo-agent-list-item">
                  <div class="vo-agent-list-header">
                    <strong>${this.escapeHtml(run.title)}</strong>
                    <span>${this.escapeHtml(run.status)}</span>
                  </div>
                  <div class="vo-agent-list-meta">${this.escapeHtml(run.id)}</div>
                </div>
              `).join("") || '<div class="vo-agent-list-item">No runs recorded.</div>'}
            </div>
          </section>

          <section class="vo-overview-card">
            <div class="vo-overview-title">Recent Events</div>
            <div class="vo-agent-list">
              ${latestEvents.map((event) => `
                <div class="vo-agent-list-item">
                  <div class="vo-agent-list-header">
                    <strong>${this.escapeHtml(event.type)}</strong>
                    <span>${this.escapeHtml(event.status)}</span>
                  </div>
                  <div class="vo-agent-list-meta">${this.escapeHtml(event.id)}</div>
                  ${event.summary ? `<div class="vo-agent-list-copy">${this.escapeHtml(event.summary)}</div>` : ""}
                </div>
              `).join("") || '<div class="vo-agent-list-item">No events recorded.</div>'}
            </div>
          </section>

          <section class="vo-overview-card">
            <div class="vo-overview-title">Top Costed Tasks</div>
            <div class="vo-agent-list">
              ${expensiveTasks.map((task) => `
                <div class="vo-agent-list-item">
                  <div class="vo-agent-list-header">
                    <strong>${this.escapeHtml(task.taskId)}</strong>
                    <span>$${task.estimatedCostUsd.toFixed(4)}</span>
                  </div>
                  <div class="vo-agent-list-meta">${this.escapeHtml(task.providerId)} \xB7 ${this.escapeHtml(task.taskType)}</div>
                  <div class="vo-agent-list-copy">${this.escapeHtml(task.routingReason)}</div>
                </div>
              `).join("") || '<div class="vo-agent-list-item">No cost entries recorded.</div>'}
            </div>
          </section>
        </div>

        <section class="vo-overview-card">
          <div class="vo-overview-title">Task Detail</div>
          <div class="vo-agent-task-table">
            <div class="vo-agent-task-row vo-agent-task-row--header">
              <span>Task</span>
              <span>Status</span>
              <span>Role</span>
              <span>Depends On</span>
              <span>Approval</span>
            </div>
            ${summary.taskGraph.tasks.map((task) => `
              <div class="vo-agent-task-row">
                <span><strong>${this.escapeHtml(task.taskId)}</strong><br>${this.escapeHtml(task.title)}</span>
                <span>${this.escapeHtml(task.status)}</span>
                <span>${this.escapeHtml(task.role)}</span>
                <span>${this.escapeHtml(task.dependsOn.join(", ") || "\u2014")}</span>
                <span>${task.approvalRequired ? "Required" : "None"}</span>
              </div>
            `).join("")}
          </div>
        </section>
      </div>
    `;
  }
  renderMetric(label, value) {
    return `
      <div class="vo-activity-stat">
        <span class="vo-stat-label">${this.escapeHtml(label)}</span>
        <span class="vo-stat-value">${this.escapeHtml(value)}</span>
      </div>
    `;
  }
  renderStatRow(label, value) {
    return `
      <div class="vo-stat-row">
        <span class="vo-stat-key">${this.escapeHtml(label)}</span>
        <span class="vo-stat-value">${this.escapeHtml(value)}</span>
      </div>
    `;
  }
  escapeHtml(value) {
    return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
};

// src/components/VO/ScriptDraftsPanel.ts
var ScriptDraftsPanel = class {
  container;
  scriptsPayload;
  error;
  constructor(container, data = {}) {
    this.container = container;
    this.scriptsPayload = data.scripts;
    this.error = data.error;
  }
  initialize() {
    this.render();
  }
  render() {
    this.container.innerHTML = "";
    const shell = document.createElement("div");
    shell.className = "vo-script-drafts";
    const header = document.createElement("div");
    header.className = "vo-panel-header";
    header.innerHTML = `
      <div>
        <h3>Script Drafts</h3>
        <div class="vo-script-drafts__subtitle">Read-only Brain Core script review surface. Approval actions are not wired yet.</div>
      </div>
    `;
    shell.appendChild(header);
    if (this.error || !this.scriptsPayload) {
      const errorEl = document.createElement("div");
      errorEl.className = "vo-empty-state vo-script-drafts__error";
      errorEl.textContent = "Brain Core script endpoint unavailable.";
      shell.appendChild(errorEl);
      this.container.appendChild(shell);
      return;
    }
    const drafts = this.normalizeDrafts(this.scriptsPayload);
    if (drafts.length === 0) {
      const empty = document.createElement("div");
      empty.className = "vo-empty-state";
      empty.textContent = "No script drafts found.";
      shell.appendChild(empty);
      this.container.appendChild(shell);
      return;
    }
    const list = document.createElement("div");
    list.className = "vo-script-drafts__list";
    for (const draft of drafts) {
      list.appendChild(this.renderDraftCard(draft));
    }
    shell.appendChild(list);
    this.container.appendChild(shell);
  }
  normalizeDrafts(payload) {
    const candidates = Array.isArray(payload?.scripts) ? payload.scripts : Array.isArray(payload?.drafts) ? payload.drafts : Array.isArray(payload?.plans) ? payload.plans : Array.isArray(payload?.data?.scripts) ? payload.data.scripts : [];
    return candidates.map((item, index) => {
      const draft = item.draft ?? item.script ?? item;
      const channelId = this.resolveChannelId(item, draft);
      const sections = Array.isArray(draft.sections) ? draft.sections : [];
      const preview = this.buildPreview(draft, sections);
      const approval = item.approval ?? draft.approval ?? item.approvalStatus ?? draft.approvalStatus ?? {};
      return {
        jobId: String(item.jobId ?? draft.jobId ?? item.id ?? draft.id ?? `script-draft-${index + 1}`),
        channelId,
        topicTitle: String(item.topicTitle ?? item.title ?? draft.topicTitle ?? draft.title ?? "Untitled script"),
        scriptStatus: String(draft.status ?? item.status ?? "unknown"),
        approvalStatus: typeof approval === "string" ? approval : String(approval.status ?? approval.state ?? (channelId === "says-the-bible" ? "theology_review_required" : "approval_required")),
        wordCount: Number(draft.metadata?.wordCount ?? draft.wordCount ?? item.wordCount ?? 0),
        scriptPreview: preview
      };
    });
  }
  resolveChannelId(item, draft) {
    const explicit = item.channelId ?? draft.channelId;
    if (explicit) return String(explicit);
    const projectId = String(item.projectId ?? draft.projectId ?? "");
    if (projectId.includes("says-the-bible") || projectId.includes("stb")) return "says-the-bible";
    if (projectId.includes("prochat")) return "prochat";
    return projectId || "unknown";
  }
  buildPreview(draft, sections) {
    const direct = draft.preview ?? draft.scriptPreview ?? draft.content ?? draft.markdown ?? draft.text;
    if (typeof direct === "string" && direct.trim()) {
      return direct.trim();
    }
    return sections.map((section) => section.narration ?? section.sampleNarration ?? section.text ?? "").filter(Boolean).join(" ").trim();
  }
  renderDraftCard(draft) {
    const card = document.createElement("article");
    card.className = "vo-script-draft-card";
    const reviewBadge = draft.channelId === "says-the-bible" ? "Theology review required" : draft.channelId === "prochat" ? "Standard approval required" : "Approval required";
    card.innerHTML = `
      <div class="vo-script-draft-card__header">
        <div>
          <h4>${this.escapeHtml(draft.topicTitle)}</h4>
          <div class="vo-script-draft-card__meta">${this.escapeHtml(draft.jobId)} | ${this.escapeHtml(draft.channelId)}</div>
        </div>
        <span class="vo-script-draft-card__badge">${this.escapeHtml(reviewBadge)}</span>
      </div>
      <div class="vo-script-draft-card__stats">
        <div><span>Script</span><strong>${this.escapeHtml(draft.scriptStatus)}</strong></div>
        <div><span>Approval</span><strong>${this.escapeHtml(draft.approvalStatus)}</strong></div>
        <div><span>Words</span><strong>${draft.wordCount > 0 ? String(draft.wordCount) : "Not reported"}</strong></div>
      </div>
      <pre class="vo-script-draft-card__preview">${this.escapeHtml(draft.scriptPreview || "No script preview available.")}</pre>
      <div class="vo-script-draft-card__actions">
        <button class="vo-button vo-button-secondary" disabled>Review - not wired yet</button>
        <button class="vo-button vo-button-secondary" disabled>Approve - not wired yet</button>
        <button class="vo-button vo-button-secondary" disabled>Request changes - not wired yet</button>
      </div>
    `;
    return card;
  }
  escapeHtml(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  destroy() {
    this.container.innerHTML = "";
  }
};

// src/components/VO/VOShell.ts
var VOShell = class {
  container;
  contextBar;
  overviewPanel = null;
  pipelinesPanel = null;
  accountsPanel = null;
  historyPanel = null;
  scriptDraftsPanel = null;
  approvalQueuePanel = null;
  deadLetterReviewPanel = null;
  jobProgressPanel = null;
  agentConsolePanel = null;
  packageStatusPanel = null;
  publishingDashboardPanel = null;
  eventLogPanel = null;
  studioDashboardPanel = null;
  auditLogPanel = null;
  operatorDashboardPanel = null;
  ctx = getVOContextManager();
  unsubscribe = null;
  contentContainer = null;
  currentTab = "overview";
  data;
  constructor(container, data) {
    this.container = container;
    this.container.classList.add("vo-shell");
    this.data = data;
    const barContainer = document.createElement("div");
    this.contextBar = new VOContextBar(barContainer, data);
    this.container.appendChild(barContainer);
    const tabsContainer = document.createElement("div");
    tabsContainer.className = "vo-tabs-container";
    tabsContainer.innerHTML = `
      <div class="vo-tabs">
        <button class="vo-tab vo-tab--active" data-tab="overview">Overview</button>
        <button class="vo-tab" data-tab="pipelines">Pipelines</button>
        <button class="vo-tab" data-tab="accounts">Accounts</button>
        <button class="vo-tab" data-tab="scripts">Scripts</button>
        <button class="vo-tab" data-tab="approvals">Approvals</button>
        <button class="vo-tab" data-tab="jobs">Jobs</button>
        <button class="vo-tab" data-tab="dead-letter">Dead Letter</button>
        <button class="vo-tab" data-tab="agents">Agents</button>
        <button class="vo-tab" data-tab="packages">Packages</button>
        <button class="vo-tab" data-tab="publishing">Publishing</button>
        <button class="vo-tab" data-tab="history">History</button>
        <button class="vo-tab" data-tab="events">Events</button>
        <button class="vo-tab" data-tab="dashboard">Dashboard</button>
        <button class="vo-tab" data-tab="admin">Admin</button>
      </div>
    `;
    this.container.appendChild(tabsContainer);
    this.contentContainer = document.createElement("div");
    this.contentContainer.className = "vo-tab-content";
    this.container.appendChild(this.contentContainer);
    tabsContainer.querySelectorAll(".vo-tab").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.target;
        const tab = target.getAttribute("data-tab");
        if (tab) {
          this.switchTab(tab, tabsContainer);
        }
      });
    });
    this.unsubscribe = this.ctx.subscribe(() => this.renderCurrentTab());
    this.renderCurrentTab();
  }
  switchTab(tabName, tabsContainer) {
    this.currentTab = tabName;
    tabsContainer.querySelectorAll(".vo-tab").forEach((b) => b.classList.remove("vo-tab--active"));
    tabsContainer.querySelector(`[data-tab="${tabName}"]`)?.classList.add("vo-tab--active");
    this.renderCurrentTab();
  }
  renderCurrentTab() {
    if (!this.contentContainer) return;
    if (this.overviewPanel) {
      this.overviewPanel.destroy();
      this.overviewPanel = null;
    }
    if (this.pipelinesPanel) {
      this.pipelinesPanel.destroy();
      this.pipelinesPanel = null;
    }
    if (this.accountsPanel) {
      this.accountsPanel.destroy();
      this.accountsPanel = null;
    }
    if (this.approvalQueuePanel) {
      this.approvalQueuePanel.destroy();
      this.approvalQueuePanel = null;
    }
    if (this.scriptDraftsPanel) {
      this.scriptDraftsPanel.destroy();
      this.scriptDraftsPanel = null;
    }
    if (this.deadLetterReviewPanel) {
      this.deadLetterReviewPanel.destroy();
      this.deadLetterReviewPanel = null;
    }
    if (this.jobProgressPanel) {
      this.jobProgressPanel.destroy();
      this.jobProgressPanel = null;
    }
    if (this.agentConsolePanel) {
      this.agentConsolePanel.destroy();
      this.agentConsolePanel = null;
    }
    if (this.packageStatusPanel) {
      this.packageStatusPanel.destroy();
      this.packageStatusPanel = null;
    }
    if (this.publishingDashboardPanel) {
      this.publishingDashboardPanel.destroy();
      this.publishingDashboardPanel = null;
    }
    if (this.historyPanel) {
      this.historyPanel.destroy();
      this.historyPanel = null;
    }
    if (this.eventLogPanel) {
      this.eventLogPanel.destroy();
      this.eventLogPanel = null;
    }
    if (this.studioDashboardPanel) {
      this.studioDashboardPanel.destroy();
      this.studioDashboardPanel = null;
    }
    if (this.auditLogPanel) {
      this.auditLogPanel.destroy();
      this.auditLogPanel = null;
    }
    if (this.operatorDashboardPanel) {
      this.operatorDashboardPanel.destroy();
      this.operatorDashboardPanel = null;
    }
    const state = this.ctx.getState();
    switch (this.currentTab) {
      case "overview":
        if (state.projectId && state.accountId) {
          this.overviewPanel = new OverviewPanel(this.contentContainer, {
            selector: this.data.selector,
            analytics: this.data.analytics,
            accountStats: this.data.accountStats,
            accounts: this.data.accounts
          });
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project and account to view overview</p>
            </div>
          `;
        }
        break;
      case "pipelines":
        if (state.projectId) {
          this.pipelinesPanel = new PipelinesPanel(this.contentContainer, {
            profiles: this.data.pipelineProfiles,
            contentItems: this.data.contentItems
          });
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view pipelines</p>
            </div>
          `;
        }
        break;
      case "accounts":
        if (state.projectId) {
          this.accountsPanel = new AccountsPanel(this.contentContainer, {
            accounts: this.data.accounts,
            profiles: this.data.pipelineProfiles,
            accountStats: this.data.accountStats?.stats
          });
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view accounts</p>
            </div>
          `;
        }
        break;
      case "scripts":
        this.scriptDraftsPanel = new ScriptDraftsPanel(this.contentContainer, {
          scripts: this.data.scriptDrafts,
          error: this.data.scriptDraftsError
        });
        this.scriptDraftsPanel.initialize();
        break;
      case "approvals":
        if (state.projectId) {
          this.approvalQueuePanel = new ApprovalQueuePanel(this.contentContainer, state.projectId);
          this.approvalQueuePanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view approval queue</p>
            </div>
          `;
        }
        break;
      case "jobs":
        if (state.projectId) {
          this.jobProgressPanel = new JobProgressPanel(this.contentContainer, state.projectId);
          this.jobProgressPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view job progress</p>
            </div>
          `;
        }
        break;
      case "dead-letter":
        if (state.projectId) {
          this.deadLetterReviewPanel = new DeadLetterReviewPanel(this.contentContainer, state.projectId);
          this.deadLetterReviewPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to review dead jobs</p>
            </div>
          `;
        }
        break;
      case "agents":
        this.agentConsolePanel = new AgentConsolePanel(this.contentContainer);
        this.agentConsolePanel.initialize();
        break;
      case "packages":
        if (state.projectId) {
          this.packageStatusPanel = new PackageStatusPanel(this.contentContainer);
          this.packageStatusPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view package status</p>
            </div>
          `;
        }
        break;
      case "publishing":
        if (state.projectId) {
          this.publishingDashboardPanel = new PublishingDashboardPanel(this.contentContainer, state.projectId);
          this.publishingDashboardPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view publishing dashboard</p>
            </div>
          `;
        }
        break;
      case "history":
        if (state.projectId) {
          this.historyPanel = new HistoryPanel(this.contentContainer, {
            contentItems: this.data.contentItems,
            accounts: this.data.accounts
          });
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view history</p>
            </div>
          `;
        }
        break;
      case "events":
        if (state.projectId) {
          this.eventLogPanel = new EventLogPanel(this.contentContainer, state.projectId);
          this.eventLogPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view event log</p>
            </div>
          `;
        }
        break;
      case "dashboard":
        if (state.projectId) {
          this.studioDashboardPanel = new StudioDashboardPanel(this.contentContainer, state.projectId);
          this.studioDashboardPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view dashboard</p>
            </div>
          `;
        }
        break;
      case "admin":
        if (state.projectId) {
          const adminContainer = document.createElement("div");
          adminContainer.className = "vo-admin-tab";
          this.contentContainer.innerHTML = "";
          this.contentContainer.appendChild(adminContainer);
          const dashSection = document.createElement("div");
          dashSection.className = "vo-admin-section";
          adminContainer.appendChild(dashSection);
          const auditSection = document.createElement("div");
          auditSection.className = "vo-admin-section";
          adminContainer.appendChild(auditSection);
          this.operatorDashboardPanel = new OperatorDashboardPanel(dashSection, state.projectId);
          this.operatorDashboardPanel.initialize();
          this.auditLogPanel = new AuditLogPanel(auditSection, state.projectId);
          this.auditLogPanel.initialize();
        } else {
          this.contentContainer.innerHTML = `
            <div class="vo-empty-state">
              <p>Select a project to view admin panel</p>
            </div>
          `;
        }
        break;
    }
  }
  destroy() {
    this.contextBar.destroy();
    if (this.overviewPanel) {
      this.overviewPanel.destroy();
    }
    if (this.pipelinesPanel) {
      this.pipelinesPanel.destroy();
    }
    if (this.accountsPanel) {
      this.accountsPanel.destroy();
    }
    if (this.approvalQueuePanel) {
      this.approvalQueuePanel.destroy();
    }
    if (this.scriptDraftsPanel) {
      this.scriptDraftsPanel.destroy();
    }
    if (this.deadLetterReviewPanel) {
      this.deadLetterReviewPanel.destroy();
    }
    if (this.jobProgressPanel) {
      this.jobProgressPanel.destroy();
    }
    if (this.agentConsolePanel) {
      this.agentConsolePanel.destroy();
    }
    if (this.packageStatusPanel) {
      this.packageStatusPanel.destroy();
    }
    if (this.publishingDashboardPanel) {
      this.publishingDashboardPanel.destroy();
    }
    if (this.historyPanel) {
      this.historyPanel.destroy();
    }
    if (this.eventLogPanel) {
      this.eventLogPanel.destroy();
    }
    if (this.studioDashboardPanel) {
      this.studioDashboardPanel.destroy();
    }
    if (this.auditLogPanel) {
      this.auditLogPanel.destroy();
    }
    if (this.operatorDashboardPanel) {
      this.operatorDashboardPanel.destroy();
    }
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.container.innerHTML = "";
  }
};

// src/client.ts
var REQUEST_TIMEOUT_MS = 1e4;
async function readBrainCoreStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/status");
}
async function readBrainCoreCapabilities(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/capabilities");
}
async function readBrainCoreRuntimeReports(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/runtime/reports");
}
async function readBrainCoreSchedulerStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/scheduler/status");
}
async function readBrainCoreSchedulerJobs(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/scheduler/jobs");
}
async function readBrainCoreSessions(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/sessions");
}
async function readBrainCoreRepos(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/repos");
}
async function readBrainCoreApprovals(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/approvals");
}
async function readBrainCoreApprovalStore(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/approvals/store");
}
async function readBrainCoreExecutionPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/execution/plans");
}
async function readBrainCoreExecutionReadiness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/execution/readiness");
}
async function readBrainCoreMindPreviewPolicy(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/execution/mind-preview-policy");
}
async function readBrainCoreMindPreviews(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/execution/mind-previews");
}
async function readBrainCoreVideoStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video/status");
}
async function readBrainCoreVideoQueue(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video/queue");
}
async function readBrainCoreLocalApps(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps");
}
async function readBrainCoreLocalAppsDashboard(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/dashboard");
}
async function readBrainCoreLocalAppsActionReadiness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/action-readiness");
}
async function readBrainCoreLocalAppsOrchestrator(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/orchestrator");
}
async function readBrainCoreLocalAppsActionEnablementBacklog(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/action-enablement-backlog");
}
async function readBrainCoreLocalAppsOperationalReadiness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/operational-readiness");
}
async function readBrainCoreLocalAppsOperatorSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/operator-summary");
}
async function requestBrainCoreLocalAppAction(baseUrl, appId, action) {
  const url = `${normalizeBaseUrl(baseUrl)}/local-apps/${encodeURIComponent(appId)}/${encodeURIComponent(action)}`;
  const startTime = performance.now();
  if (!requestUrlFn) {
    return {
      error: "Obsidian requestUrl not initialized",
      url
    };
  }
  try {
    const response = await Promise.race([
      requestUrlFn({
        url,
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({ requestedBy: "brain-console", confirmation: true }),
        throw: false
      }),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("request timeout")), REQUEST_TIMEOUT_MS)
      )
    ]);
    const responseTimeMs = Math.round(performance.now() - startTime);
    const parsed = safeParseJson(response.text ?? "{}");
    if (response.status < 200 || response.status >= 300) {
      return {
        error: parsed?.message ?? `HTTP ${response.status}`,
        status: response.status,
        detail: parsed?.error ?? (response.text ? response.text.slice(0, 240) : void 0),
        value: parsed,
        url,
        responseTimeMs
      };
    }
    return {
      status: response.status,
      value: parsed ?? JSON.parse(response.text ?? "{}"),
      url,
      responseTimeMs
    };
  } catch (err) {
    const responseTimeMs = Math.round(performance.now() - startTime);
    return {
      error: err instanceof Error ? err.message : String(err),
      url,
      responseTimeMs
    };
  }
}
async function readBrainCoreOrchestrators(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/orchestrators");
}
async function readBrainCorePipelines(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/pipelines");
}
async function readBrainCoreProjects(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/projects");
}
async function readBrainCorePlatforms(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/platforms");
}
async function readBrainCorePostOrchestratorStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/status");
}
async function readBrainCorePostOrchestratorFlows(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/flows");
}
async function readBrainCorePostOrchestratorDrafts(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/drafts");
}
async function readBrainCorePostOrchestratorEvents(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/events");
}
async function readBrainCorePostOrchestratorContracts(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/contracts");
}
async function readBrainCorePostOrchestratorIntegrations(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/integrations");
}
async function readBrainCorePostOrchestratorRecovery(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/recovery");
}
async function readBrainCorePostOrchestratorDryRun(baseUrl, eventId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/post-orchestrator/dry-run/${encodeURIComponent(eventId)}`);
}
async function readBrainCorePostDraftReviewQueue(baseUrl, eventId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/post-orchestrator/review-queue/${encodeURIComponent(eventId)}`);
}
async function requestBrainCorePostDraftReviewApproval(baseUrl, reviewItemId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/post-orchestrator/review-queue/${encodeURIComponent(reviewItemId)}/request-approval`,
    { method: "POST" }
  );
}
async function readBrainCorePostSchedulePreviewQueue(baseUrl, eventId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/post-orchestrator/schedule-preview/${encodeURIComponent(eventId)}`
  );
}
async function requestBrainCorePostSchedulePreviewApproval(baseUrl, schedulePreviewItemId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/post-orchestrator/schedule-preview/${encodeURIComponent(schedulePreviewItemId)}/request-approval`,
    { method: "POST" }
  );
}
async function readBrainCorePostAnalyticsFixtures(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/analytics");
}
async function readBrainCorePostPipelineSummary(baseUrl, eventId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/post-orchestrator/pipeline/${encodeURIComponent(eventId)}`
  );
}
async function readBrainCorePostReadinessScore(baseUrl, eventId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/post-orchestrator/readiness/${encodeURIComponent(eventId)}`
  );
}
async function readBrainCorePostPlatformPolicies(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/platform-policies");
}
async function readBrainCorePostDecommissionReadiness(baseUrl) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    "/post-orchestrator/decommission-readiness"
  );
}
async function readBrainCorePostOperatorGuidance(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/operator-guidance");
}
async function readBrainCorePostManualExportPackage(baseUrl, eventId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/post-orchestrator/manual-export/${encodeURIComponent(eventId)}`
  );
}
async function readBrainCorePostAcceptanceChecklist(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/acceptance-checklist");
}
async function readBrainCorePostMigrationParityReport(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/migration-parity");
}
async function readBrainCorePostRoadmapCheckpoint(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/roadmap-checkpoint");
}
async function readBrainCorePostOrchestratorOverview(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/overview");
}
async function readBrainCorePostQaStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/post-orchestrator/qa-status");
}
async function readBrainCoreStbStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/stb/status");
}
async function readBrainCoreVideoOrchestratorStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/status");
}
async function readBrainCoreVideoOrchestratorScripts(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/script");
}
async function readBrainCoreVOStudioProjects(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/projects");
}
async function readBrainCoreVOStudioAccounts(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/accounts");
}
async function readBrainCoreVOStudioPipelineProfiles(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/pipeline-profiles");
}
async function readBrainCoreVOStudioContentItems(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/content-items");
}
async function readBrainCoreVOStudioPackage(baseUrl, packageId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/video-orchestrator/packages/${encodeURIComponent(packageId)}`);
}
async function readBrainCoreVOStudioAnalyticsSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/analytics/summary");
}
async function readBrainCoreVideoOrchestratorIntake(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/intake");
}
async function readBrainCoreVideoOrchestratorAssetPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/asset-plan");
}
async function readBrainCoreVideoOrchestratorDesignPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/design-plan");
}
async function readBrainCoreVideoOrchestratorVoiceoverPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/voiceover-plan");
}
async function readBrainCoreVideoOrchestratorVisualsPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/visuals-plan");
}
async function readBrainCoreVideoOrchestratorAssemblyPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/assembly-plan");
}
async function readBrainCoreVideoOrchestratorMetadataPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/metadata-plan");
}
async function readBrainCoreVideoOrchestratorPublishingPrepPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/publishing-prep");
}
async function readBrainCoreVideoOrchestratorManualExportPackages(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/manual-export-package");
}
async function readBrainCoreStbVideoMigrationStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/stb-video-migration/status");
}
async function readBrainCoreStbVideoParityMatrix(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/stb-video/parity-matrix");
}
async function readBrainCoreStbVideoDualRunStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/stb-video/dual-run-status");
}
async function readBrainCoreStbVideoDualRunEvidence(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/stb-video/dual-run-evidence");
}
async function readBrainCoreVideoProductionGate(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/production-gate");
}
async function readBrainCoreVideoRenderExportPolicy(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/render-export-policy");
}
async function readBrainCoreVideoControlledDryRunDesign(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-dry-run-design");
}
async function readBrainCoreVideoProductionCutoverGate(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/production-cutover-gate");
}
async function readBrainCoreVideoReleaseCandidateReadiness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/release-candidate-readiness");
}
async function readBrainCoreVideoOperatorDecisionQueue(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/operator-decision-queue");
}
async function readBrainCoreVideoControlledExecutionPolicyBoundary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-policy-boundary");
}
async function readBrainCoreVideoControlledExecutionReadinessIndex(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-readiness-index");
}
async function readBrainCoreVideoRoadmapCheckpoint(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/roadmap-checkpoint");
}
async function readBrainCoreVideoOperatorReviewPacket(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/operator-review-packet");
}
async function readBrainCoreVideoPreviewCompletionIndex(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/preview-completion-index");
}
async function readBrainCoreVideoControlledExecutionPreflightChecklist(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-preflight-checklist");
}
async function readBrainCoreVideoControlledExecutionRiskRegister(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-risk-register");
}
async function readBrainCoreVideoControlledExecutionApprovalPayloadSchema(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-approval-payload-schema");
}
async function readBrainCoreVideoControlledExecutionPreflightValidatorSchema(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-preflight-validator-schema");
}
async function readBrainCoreVideoControlledExecutionPlanStub(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-plan-stub");
}
async function readBrainCoreVideoControlledExecutionApprovalRequestDesign(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-approval-request-design");
}
async function readBrainCoreVideoControlledExecutionDisabledGate(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-disabled-gate");
}
async function readBrainCoreVideoControlledExecutionSecondApprovalPolicy(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-second-approval-policy");
}
async function readBrainCoreVideoControlledExecutionOperatorIdentityProtocol(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-operator-identity-protocol");
}
async function readBrainCoreVideoControlledExecutionRolePolicy(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/controlled-execution-role-policy");
}
async function readBrainCoreControlledDualRunRequestDesign(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/stb-video/controlled-dual-run-request");
}
async function readBrainCoreAgents(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/agents");
}
async function readBrainCoreActions(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/actions");
}
async function readBrainCoreAgentRuns(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/agent-runs");
}
async function readBrainCoreAgentEvents(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/agent-events");
}
async function readBrainCoreAgentCostSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/agent-cost-summary");
}
async function readBrainCoreRecoveryItems(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/recovery");
}
async function readBrainCoreApprovalDetail(baseUrl, approvalId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/approvals/${approvalId}`);
}
async function readBrainCoreMindStewardReportDetail(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/runtime/reports/mind-steward");
}
async function readBrainCoreAiModelSelectorStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/ai-model-selector");
}
async function controlBrainCoreAiModelSelector(baseUrl, action) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/ai-model-selector/control?action=${action}`, {
    method: "POST"
  });
}
async function requestBrainCoreRestart(baseUrl) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const url = `${normalizedBaseUrl}/ops/brain-core/restart`;
  const startTime = performance.now();
  if (!requestUrlFn) {
    return {
      error: "Obsidian requestUrl not initialized",
      url
    };
  }
  try {
    const response = await Promise.race([
      requestUrlFn({
        url,
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          confirmation: true,
          requestedBy: "brain-console"
        }),
        throw: false
      }),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("request timeout")), REQUEST_TIMEOUT_MS)
      )
    ]);
    const responseTimeMs = Math.round(performance.now() - startTime);
    const parsed = safeParseJson(response.text ?? "{}");
    if (response.status < 200 || response.status >= 300) {
      return {
        error: parsed?.message ?? `HTTP ${response.status}`,
        status: response.status,
        detail: response.text ? response.text.slice(0, 240) : void 0,
        value: parsed,
        url,
        responseTimeMs
      };
    }
    return {
      value: parsed,
      url,
      responseTimeMs
    };
  } catch (error) {
    const responseTimeMs = Math.round(performance.now() - startTime);
    return {
      error: error instanceof Error ? error.message : "request failed",
      url,
      responseTimeMs
    };
  }
}
async function waitForBrainCoreStatus(baseUrl, timeoutMs = 12e4, pollIntervalMs = 1500) {
  const deadline = Date.now() + timeoutMs;
  let lastResult;
  while (Date.now() < deadline) {
    lastResult = await fetchJson(normalizeBaseUrl(baseUrl), "/status", {}, 3e3);
    if (lastResult.value?.ok === true) {
      return lastResult;
    }
    await new Promise((resolve) => {
      window.setTimeout(resolve, pollIntervalMs);
    });
  }
  return {
    ...lastResult,
    error: lastResult?.error ?? "Brain Core did not report ok=true before the restart timeout elapsed.",
    detail: lastResult?.detail ?? "Brain Core restart verification timed out."
  };
}
async function readBrainCoreMaintenancePreviewDetail(baseUrl, previewId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/execution/maintenance-previews/${previewId}`);
}
var requestUrlFn = null;
function setRequestUrl(fn) {
  requestUrlFn = fn;
}
async function fetchJson(baseUrl, pathname, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const url = `${baseUrl}${pathname}`;
  const startTime = performance.now();
  if (!requestUrlFn) {
    return {
      error: "Obsidian requestUrl not initialized",
      url
    };
  }
  try {
    const response = await Promise.race([
      requestUrlFn({
        url,
        method: options.method ?? "GET",
        headers: { accept: "application/json" },
        ...options.body ? { body: options.body } : {},
        throw: false
      }),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("request timeout")), timeoutMs)
      )
    ]);
    const responseTimeMs = Math.round(performance.now() - startTime);
    if (response.status < 200 || response.status >= 300) {
      const detail = response.text ? response.text.slice(0, 200) : void 0;
      return {
        error: `HTTP ${response.status}`,
        status: response.status,
        detail,
        url,
        responseTimeMs
      };
    }
    let parsed;
    try {
      parsed = JSON.parse(response.text);
    } catch {
      return {
        error: "invalid JSON response",
        detail: response.text?.slice(0, 100),
        url,
        responseTimeMs
      };
    }
    return { value: parsed, url, responseTimeMs };
  } catch (error) {
    const responseTimeMs = Math.round(performance.now() - startTime);
    const errorMsg = error instanceof Error ? error.message : "request failed";
    if ((errorMsg.includes("timeout") || errorMsg.includes("connection")) && isLocalTestUrl(baseUrl)) {
      const fallbackUrl = tryGetFallbackLocalUrl(baseUrl);
      if (fallbackUrl && fallbackUrl !== baseUrl) {
        return fetchJsonWithFallback(fallbackUrl, pathname, responseTimeMs, timeoutMs);
      }
    }
    return {
      error: errorMsg,
      url,
      responseTimeMs
    };
  }
}
function safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return void 0;
  }
}
async function fetchJsonWithFallback(fallbackUrl, pathname, firstAttemptMs, timeoutMs = REQUEST_TIMEOUT_MS) {
  try {
    const response = await Promise.race([
      requestUrlFn({
        url: `${fallbackUrl}${pathname}`,
        method: "GET",
        headers: { accept: "application/json" },
        throw: false
      }),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("request timeout")), timeoutMs)
      )
    ]);
    if (response.status < 200 || response.status >= 300) {
      return { error: `HTTP ${response.status}`, url: `${fallbackUrl}${pathname}` };
    }
    const parsed = JSON.parse(response.text);
    return {
      value: parsed,
      url: `${fallbackUrl}${pathname} (fallback)`
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "fallback request failed",
      url: `${fallbackUrl}${pathname}`
    };
  }
}
async function diagnoseBrainCoreConnection(configuredUrl) {
  const attempts = [];
  let selectedUrl = configuredUrl;
  let selectedOk = false;
  const urlsToTry = /* @__PURE__ */ new Set();
  if (configuredUrl) urlsToTry.add(configuredUrl);
  urlsToTry.add("http://127.0.0.1:4877");
  urlsToTry.add("http://localhost:4877");
  for (const url of urlsToTry) {
    const result = await testBrainCoreUrl(url);
    attempts.push(result);
    if (result.ok && !selectedOk) {
      selectedUrl = url;
      selectedOk = true;
    }
  }
  const allFailed = !selectedOk;
  let recommendation = "";
  if (allFailed) {
    recommendation = "Brain Core is unreachable. Check if Brain Core is running on port 4877.";
  } else if (selectedUrl !== configuredUrl) {
    recommendation = `Using fallback URL: ${selectedUrl}`;
  } else {
    recommendation = `Connected to ${selectedUrl}`;
  }
  return {
    configuredUrl,
    selectedUrl,
    attempts,
    allFailed,
    recommendation
  };
}
async function testBrainCoreUrl(url) {
  if (!requestUrlFn) {
    return {
      url,
      ok: false,
      error: "Obsidian requestUrl not initialized"
    };
  }
  const testUrl = `${url}/status`;
  const startTime = performance.now();
  try {
    const response = await Promise.race([
      requestUrlFn({
        url: testUrl,
        method: "GET",
        headers: { accept: "application/json" },
        throw: false
      }),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("timeout")), 3e3)
      )
    ]);
    const responseTimeMs = Math.round(performance.now() - startTime);
    if (response.status === 200) {
      return {
        url,
        ok: true,
        status: response.status,
        responseTimeMs
      };
    } else {
      return {
        url,
        ok: false,
        status: response.status,
        error: `HTTP ${response.status}`,
        responseTimeMs
      };
    }
  } catch (error) {
    const responseTimeMs = Math.round(performance.now() - startTime);
    return {
      url,
      ok: false,
      error: error instanceof Error ? error.message : "unknown error",
      responseTimeMs
    };
  }
}
function isLocalTestUrl(url) {
  return url.includes("localhost:4877") || url.includes("127.0.0.1:4877") || url.includes("localhost:4878") || url.includes("127.0.0.1:4878");
}
function tryGetFallbackLocalUrl(baseUrl) {
  if (baseUrl.includes("localhost:")) {
    return baseUrl.replace("localhost:", "127.0.0.1:");
  }
  if (baseUrl.includes("127.0.0.1:")) {
    return baseUrl.replace("127.0.0.1:", "localhost:");
  }
  return null;
}
function normalizeBaseUrl(rawValue) {
  return rawValue.replace(/\/+$/g, "");
}
async function readBrainCoreVideoOrchestratorThumbnailDesignPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/thumbnail-design");
}
async function readBrainCoreVideoOrchestratorArchiveLoggingPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/archive-logging-plan");
}
async function readBrainCoreVideoOrchestratorDesignProviderBoundaryPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/design-provider-boundary-plan");
}
async function readBrainCoreVideoOrchestratorDesignProviderCredentialIsolationPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/design-provider-credential-isolation-plan");
}
async function readBrainCoreVideoOrchestratorDesignProviderPromptReviewPolicyPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/design-provider-prompt-review-policy-plan");
}
async function readBrainCoreVideoOrchestratorArtifactSandboxProviderHandoffPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/artifact-sandbox-provider-handoff-plan");
}
async function readBrainCoreVideoOrchestratorProviderOutputRedactionPolicyPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-output-redaction-policy-plan");
}
async function readBrainCoreVideoOrchestratorDesignProviderComplianceChecklistPlans(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/design-provider-compliance-checklist-plan");
}
async function readBrainCoreVideoOrchestratorDesignProviderEnablementReadinessIndex(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/design-provider-enablement-readiness-index");
}
async function readBrainCoreVideoOrchestratorProviderIntegrationFinalPlanningCheckpoint(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-integration-final-planning-checkpoint");
}
async function readBrainCoreVideoOrchestratorCredentialStoreImplementationBoundaryPlan(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/credential-store-implementation-boundary-plan");
}
async function readBrainCoreVideoOrchestratorPromptReviewUxImplementationPlan(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/prompt-review-ux-implementation-plan");
}
async function readBrainCoreVideoOrchestratorProviderAuditPersistenceBoundaryPlan(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-audit-persistence-boundary-plan");
}
async function readBrainCoreVideoOrchestratorProviderWrapperSecurityReviewPlan(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-wrapper-security-review-plan");
}
async function readBrainCoreVideoOrchestratorProviderImplementationPhaseStartGate(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-implementation-phase-start-gate");
}
async function readBrainCoreVideoOrchestratorProviderImplementationReadinessDashboardSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-implementation-readiness-dashboard-summary");
}
async function readBrainCoreVideoOrchestratorProviderImplementationApprovalPacket(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-implementation-approval-packet");
}
async function readBrainCoreVideoOrchestratorProviderApprovalPacketConsoleReviewSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-approval-packet-console-review-summary");
}
async function readBrainCoreVideoOrchestratorProviderPlanningSurfaceIndex(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-planning-surface-index");
}
async function readBrainCoreVideoOrchestratorProviderRequestWrapperScaffold(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-request-wrapper-scaffold");
}
async function readBrainCoreVideoOrchestratorProviderWrapperValidationHarness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-wrapper-validation-harness");
}
async function readBrainCoreVideoOrchestratorCredentialReferenceScaffold(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/credential-reference-scaffold");
}
async function readBrainCoreVideoOrchestratorProviderRequestEnvelopeScaffold(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-request-envelope-scaffold");
}
async function readBrainCoreVideoOrchestratorProviderResponseEnvelopeScaffold(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-response-envelope-scaffold");
}
async function readBrainCoreVideoOrchestratorProviderScaffoldingIntegrationSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-scaffolding-integration-summary");
}
async function readBrainCoreVideoOrchestratorProviderRequestWrapperInertShell(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-request-wrapper-inert-shell");
}
async function readBrainCoreVideoOrchestratorCredentialReferenceValidator(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/credential-reference-validator");
}
async function readBrainCoreVideoOrchestratorProviderResponseRedactionSkeleton(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-response-redaction-skeleton");
}
async function readBrainCoreVideoOrchestratorProviderAuditEventTypes(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-audit-event-types");
}
async function readBrainCoreVideoOrchestratorProviderDisabledOrchestrationFacade(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-disabled-orchestration-facade");
}
async function readBrainCoreVideoOrchestratorProviderCapabilityPolicyEvaluator(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-capability-policy-evaluator");
}
async function readBrainCoreVideoOrchestratorProviderBlockedActionLedgerTypes(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-blocked-action-ledger-types");
}
async function readBrainCoreVideoOrchestratorProviderDisabledOrchestrationIntegrationSummary(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/video-orchestrator/provider-disabled-orchestration-integration-summary");
}
async function readBrainCoreProBotSessionsParity(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/sessions-parity");
}
async function readBrainCoreProBotLocalAppsParity(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/local-apps-parity");
}
async function readBrainCoreProBotSchedulerParity(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/scheduler-parity");
}
async function readBrainCoreProBotStudioParity(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/studio-parity");
}
async function readBrainCoreProBotExternalAdminParity(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/external-admin-parity");
}
async function readBrainCoreProBotDecommissionReadiness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/decommission-readiness");
}
async function readBrainCoreProBotExternalAdminSafeMetadata(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/external-admin-safe-metadata");
}
async function readBrainCoreProBotFeatureParityMatrix(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/feature-parity-matrix");
}
async function readBrainCoreProBotPhaseOutChecklist(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/probot/phase-out-checklist");
}
async function readBrainCoreLocalAppsActionsStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/local-apps/actions/status");
}
async function readBrainCoreInfraDokploy(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/dokploy");
}
async function readBrainCoreInfraTunnels(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/tunnels");
}
async function readBrainCoreInfraDomains(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/domains");
}
async function readBrainCoreInfraNewRelic(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/monitoring");
}
async function readBrainCoreInfraUmami(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/analytics");
}
async function readBrainCoreInfraGoogleAds(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/google-ads");
}
async function readBrainCoreInfraStripe(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/stripe");
}
async function readBrainCoreInfraStudio(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/studio");
}
async function readBrainCoreInfraVOStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/status");
}
async function readBrainCoreInfraPipelinesStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/pipelines/status");
}
async function readBrainCoreVOAccounts(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/accounts");
}
async function readBrainCoreVOAuthStatus(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/auth-status");
}
async function readBrainCoreVOJobs(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/jobs?limit=20");
}
function readBrainCoreSystemMetrics(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/system/metrics");
}
function readBrainCoreCredentials(baseUrl, projectId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/credentials/${encodeURIComponent(projectId)}`);
}
function readBrainCoreCredentialCatalog(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/credentials/catalog");
}
async function setInfraPlistCredential(baseUrl, key, value) {
  const url = `${normalizeBaseUrl(baseUrl)}/credentials/infra/set?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
  try {
    const res = await fetch(url, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, key, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function getYouTubeOAuthUrl(baseUrl, account) {
  const url = `${normalizeBaseUrl(baseUrl)}/credentials/infra/youtube/auth-url?account=${encodeURIComponent(account)}`;
  try {
    const res = await fetch(url, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, account, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function exchangeYouTubeOAuthCode(baseUrl, account, code) {
  const url = `${normalizeBaseUrl(baseUrl)}/credentials/infra/youtube/auth-exchange?account=${encodeURIComponent(account)}&code=${encodeURIComponent(code)}`;
  try {
    const res = await fetch(url, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, account, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function openBrowserUrl(baseUrl, target) {
  const url = `${normalizeBaseUrl(baseUrl)}/open-url?url=${encodeURIComponent(target)}`;
  try {
    const res = await fetch(url, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function registerBrainCoreProject(baseUrl, entry) {
  const params = new URLSearchParams({
    projectId: entry.projectId,
    displayName: entry.displayName,
    repoPath: entry.repoPath,
    envFileName: entry.envFileName,
    platforms: entry.platforms.join(",")
  });
  try {
    const res = await fetch(`${normalizeBaseUrl(baseUrl)}/credentials/projects/register?${params.toString()}`, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function setBrainCoreCredential(baseUrl, projectId, key, value) {
  const url = `${normalizeBaseUrl(baseUrl)}/credentials/${encodeURIComponent(projectId)}/set?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;
  try {
    const res = await fetch(url, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, projectId, key, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function revokeBrainCoreCredential(baseUrl, projectId, key) {
  const url = `${normalizeBaseUrl(baseUrl)}/credentials/${encodeURIComponent(projectId)}/revoke?key=${encodeURIComponent(key)}`;
  try {
    const res = await fetch(url, { method: "POST" });
    return await res.json();
  } catch (err) {
    return { ok: false, projectId, key, error: err instanceof Error ? err.message : "fetch_failed" };
  }
}
async function readBrainCoreVONormalizeHistory(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/normalize-history?limit=10");
}
async function readBrainCoreVOManualQueue(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/manual-queue?limit=10");
}
async function readBrainCoreVOWorkerConfig(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/worker-config");
}
async function readBrainCoreVOAccountStats(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/accounts-stats");
}
async function readBrainCoreVOReadiness(baseUrl) {
  return fetchJson(normalizeBaseUrl(baseUrl), "/infra/video-orchestrator/readiness");
}

// src/dashboard.ts
function deriveDashboardSnapshot(state, brainCoreUrl) {
  const brainCoreOnline = state.status?.ok === true;
  const offline = state.offline === true || !brainCoreOnline;
  const localAppsDashboardOk = state.localAppsDashboard?.id === "local-apps-dashboard" && Array.isArray(state.localAppsDashboard.apps) && state.localAppsDashboard.appCount === state.localAppsDashboard.apps.length && state.localAppsDashboard.appCount > 0;
  const connectionStatus = offline ? "offline" : localAppsDashboardOk ? "online" : "degraded";
  const mindStewardReport = state.runtimeReports?.find((r) => r.id === "mind-steward");
  const wikiHealth = mindStewardReport?.wikiHealth;
  const wikiHealthOk = wikiHealth?.ok === true;
  const wikiHealthWarnings = wikiHealth?.warningCount ?? 0;
  const wikiHealthErrors = wikiHealth?.errorCount ?? 0;
  const maintenanceCount = (state.mindPreviews ?? []).filter((p) => !p.expired).length;
  const approvalsCount = state.approvals?.length ?? 0;
  const schedulerHealthy = state.schedulerStatus?.latestRunStatus !== "failed";
  const localAppManagedProcessCount = state.localAppsActionStatus?.managedProcesses?.length ?? 0;
  const orchestratorCount = (state.orchestrators ?? []).length;
  const pipelineCount = (state.pipelines ?? []).length;
  const projectCount = (state.projects ?? []).length;
  const platformCount = (state.platforms ?? []).length;
  const legacyOrchestratorCount = (state.orchestrators ?? []).filter((o) => o.lifecycle === "legacy").length;
  const legacySystemCount = legacyOrchestratorCount;
  const migrationBlockedCount = (state.pipelines ?? []).filter((p) => p.migration?.decommissionBlocked === true).length;
  const postOrchestratorStatus = state.postOrchestratorStatus?.status;
  const postOrchestratorModuleCount = state.postOrchestratorStatus?.modules?.length ?? 0;
  const postOrchestratorBlockedCount = (state.postOrchestratorStatus?.modules ?? []).filter((module2) => module2.status === "blocked").length;
  const postOrchestratorContractCount = state.postOrchestratorStatus ? 8 : 0;
  const postOrchestratorIntegrationCount = state.postOrchestratorStatus ? 3 : 0;
  const postOverviewStatus = state.postOrchestratorOverview?.overview?.status;
  const postOverviewFlowCount = state.postOrchestratorOverview?.overview?.counts.flows ?? 0;
  const postOverviewBlockerCount = state.postOrchestratorOverview?.overview?.blockers?.length ?? 0;
  const postOverviewNextSafeStep = state.postOrchestratorOverview?.overview?.nextSafeStep ?? "Review the overview.";
  const postOverviewPublishingEnabled = Boolean(state.postOrchestratorOverview?.overview?.keyStates.publishingEnabled);
  const postOverviewSchedulingEnabled = Boolean(state.postOrchestratorOverview?.overview?.keyStates.schedulingEnabled);
  const postOverviewExecutionEnabled = Boolean(state.postOrchestratorOverview?.overview?.keyStates.executionEnabled);
  const postOverviewDecommissionStarted = Boolean(state.postOrchestratorOverview?.overview?.keyStates.decommissionStarted);
  const postFlowCount = state.postOrchestratorStatus ? 8 : 0;
  const postDraftFixtureCount = state.postOrchestratorDrafts?.drafts?.length ?? 0;
  const postEventFixtureCount = state.postOrchestratorEvents?.events?.length ?? 0;
  const postDryRunDraftCount = state.postOrchestratorDryRun?.plan?.drafts?.length ?? 0;
  const postDryRunStatus = state.postOrchestratorDryRun?.plan?.status;
  const postDryRunBlockedCount = (state.postOrchestratorDryRun?.plan?.blockers ?? []).length;
  const postDryRunNextSafeStep = state.postOrchestratorDryRun?.plan?.nextSafeStep ?? "Select an event fixture to preview.";
  const postDryRunPublishingEnabled = Boolean(state.postOrchestratorDryRun?.plan?.safety.publishingEnabled);
  const postDryRunSchedulingEnabled = Boolean(state.postOrchestratorDryRun?.plan?.safety.schedulingEnabled);
  const postDryRunExecutionEnabled = Boolean(state.postOrchestratorDryRun?.plan?.safety.executionEnabled);
  const postReviewQueueItemCount = state.postOrchestratorReviewQueue?.queue?.itemCount ?? 0;
  const postReviewQueueApprovalRequestedCount = state.postOrchestratorReviewQueue?.queue?.approvalRequestedCount ?? 0;
  const postReviewQueueBlockedCount = state.postOrchestratorReviewQueue?.queue?.blockedCount ?? 0;
  const postReviewQueueStatus = state.postOrchestratorReviewQueue?.queue?.status;
  const postReviewQueueNextSafeStep = state.postOrchestratorReviewQueue?.queue?.items.find((item) => item.canRequestApproval)?.nextSafeStep ?? "Select a review item to request approval.";
  const postReviewQueuePublishingEnabled = Boolean(state.postOrchestratorReviewQueue?.queue?.safety.publishingEnabled);
  const postReviewQueueSchedulingEnabled = Boolean(state.postOrchestratorReviewQueue?.queue?.safety.schedulingEnabled);
  const postReviewQueueExecutionEnabled = Boolean(state.postOrchestratorReviewQueue?.queue?.safety.executionEnabled);
  const postSchedulePreviewItemCount = state.postOrchestratorSchedulePreview?.queue?.itemCount ?? 0;
  const postSchedulePreviewApprovalRequestedCount = state.postOrchestratorSchedulePreview?.queue?.approvalRequestedCount ?? 0;
  const postSchedulePreviewBlockedCount = state.postOrchestratorSchedulePreview?.queue?.blockedCount ?? 0;
  const postSchedulePreviewStatus = state.postOrchestratorSchedulePreview?.queue?.status;
  const postSchedulePreviewNextSafeStep = state.postOrchestratorSchedulePreview?.queue?.items.find((item) => item.canRequestApproval)?.nextSafeStep ?? "Select a schedule preview item to request review.";
  const postSchedulePreviewPublishingEnabled = Boolean(state.postOrchestratorSchedulePreview?.queue?.safety.publishingEnabled);
  const postSchedulePreviewSchedulingEnabled = Boolean(state.postOrchestratorSchedulePreview?.queue?.safety.schedulingEnabled);
  const postSchedulePreviewExecutionEnabled = Boolean(state.postOrchestratorSchedulePreview?.queue?.safety.executionEnabled);
  const postAnalyticsFixtureCount = state.postOrchestratorAnalytics?.analytics?.length ?? 0;
  const postAnalyticsPlatformCount = new Set(state.postOrchestratorAnalytics?.analytics?.map((item) => item.platform) ?? []).size;
  const postAnalyticsExternalApiCallsEnabled = Boolean(state.postOrchestratorAnalytics?.analytics?.some((item) => item.safety.callsExternalAnalyticsApi));
  const postAnalyticsNextSafeStep = postAnalyticsFixtureCount > 0 ? "Review fixture analytics and keep all external analytics calls disabled." : "Add fixture analytics summaries before extending feedback loops.";
  const postPipelineStepCount = state.postOrchestratorPipeline?.pipeline?.steps?.length ?? 0;
  const postPipelineBlockerCount = state.postOrchestratorPipeline?.pipeline?.totals.blockerCount ?? 0;
  const postPipelineApprovalRequiredCount = state.postOrchestratorPipeline?.pipeline?.totals.approvalRequiredCount ?? 0;
  const postPipelineNextSafeStep = state.postOrchestratorPipeline?.pipeline?.nextSafeStep ?? "Review the pipeline summary.";
  const postReadinessScore = state.postOrchestratorReadiness?.readiness?.score ?? 0;
  const postReadinessGrade = state.postOrchestratorReadiness?.readiness?.grade;
  const postReadinessBlockerCount = state.postOrchestratorReadiness?.readiness?.blockers?.length ?? 0;
  const postReadinessStatus = state.postOrchestratorReadiness?.readiness?.status;
  const postReadinessNextSafeStep = state.postOrchestratorReadiness?.readiness?.nextSafeStep ?? "Review the readiness score.";
  const postPlatformPolicyCount = state.postOrchestratorPlatformPolicies?.policies?.length ?? 0;
  const postPlatformPolicyBlockedCount = state.postOrchestratorPlatformPolicies?.policies?.filter((policy) => policy.status === "blocked" || policy.riskLevel === "blocked")?.length ?? 0;
  const postPlatformPolicyHighRiskCount = state.postOrchestratorPlatformPolicies?.policies?.filter((policy) => policy.riskLevel === "high")?.length ?? 0;
  const postDecommissionItemCount = state.postOrchestratorDecommissionReadiness?.items?.length ?? 0;
  const postDecommissionBlockedCount = state.postOrchestratorDecommissionReadiness?.items?.filter((item) => item.status === "blocked")?.length ?? 0;
  const postDecommissionReadyCount = state.postOrchestratorDecommissionReadiness?.items?.filter((item) => item.status === "ready-for-review" || item.status === "approved")?.length ?? 0;
  const postDecommissionOverallStatus = state.postOrchestratorDecommissionReadiness?.overall?.status;
  const postDecommissionStarted = state.postOrchestratorDecommissionReadiness?.overall?.decommissionStarted ?? false;
  const postOperatorGuidanceItemCount = state.postOrchestratorOperatorGuidance?.items?.length ?? 0;
  const postOperatorGuidanceBlockedCount = state.postOrchestratorOperatorGuidance?.items?.filter((item) => item.severity === "blocked").length ?? 0;
  const postOperatorGuidanceWarningCount = state.postOrchestratorOperatorGuidance?.items?.filter((item) => item.severity === "warning").length ?? 0;
  const postOperatorGuidanceNextSafeStep = state.postOrchestratorOperatorGuidance?.summary?.nextSafeStep ?? "Review operator guidance.";
  const postAcceptancePassedCount = state.postOrchestratorAcceptanceChecklist?.checklist?.passedCount ?? 0;
  const postAcceptanceBlockedCount = state.postOrchestratorAcceptanceChecklist?.checklist?.blockedCount ?? 0;
  const postAcceptanceFailedCount = state.postOrchestratorAcceptanceChecklist?.checklist?.failedCount ?? 0;
  const postMigrationParityScore = state.postOrchestratorMigrationParity?.report?.overallParityScore ?? 0;
  const postMigrationBlockedCapabilities = state.postOrchestratorMigrationParity?.report?.blockers?.length ?? 0;
  const postRoadmapCompletedPhaseCount = state.postOrchestratorRoadmapCheckpoint?.checkpoint?.completedPhaseCount ?? 0;
  const postRoadmapBlockedPhaseCount = state.postOrchestratorRoadmapCheckpoint?.checkpoint?.blockedPhaseCount ?? 0;
  const postNextRecommendedPhase = state.postOrchestratorRoadmapCheckpoint?.checkpoint?.nextRecommendedPhase ?? "Review the roadmap checkpoint.";
  const postNextPhaseRequiresUserApproval = state.postOrchestratorRoadmapCheckpoint?.checkpoint?.nextPhaseRequiresUserApproval ?? true;
  const postManualExportItemCount = state.postOrchestratorManualExportPackage?.package?.itemCount ?? 0;
  const postManualExportStatus = state.postOrchestratorManualExportPackage?.package?.status;
  const postManualExportWritesFiles = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.writesFiles);
  const postManualExportWritesExternalPlatform = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.writesExternalPlatform);
  const postManualExportWritesToMind = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.writesToMind);
  const postManualExportDownloadsFile = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.downloadsFile);
  const postManualExportCopiesToClipboard = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.copiesToClipboard);
  const postManualExportPublishingEnabled = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.publishingEnabled);
  const postManualExportSchedulingEnabled = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.schedulingEnabled);
  const postManualExportExecutionEnabled = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.executionEnabled);
  const postManualExportNextSafeStep = state.postOrchestratorManualExportPackage?.package?.nextSafeStep ?? "Review manual export preview.";
  const postManualExportTitle = state.postOrchestratorManualExportPackage?.package?.title;
  const postManualExportPreviewOnly = Boolean(state.postOrchestratorManualExportPackage?.package?.safety.previewOnly);
  const postManualExportItemPreviewCount = state.postOrchestratorManualExportPackage?.package?.items?.length ?? 0;
  const postManualExportPackageStatus = state.postOrchestratorManualExportPackage?.package?.status;
  const postManualExportPackageId = state.postOrchestratorManualExportPackage?.package?.id;
  const postPlatformCount = (state.postOrchestratorFlows?.flows ?? []).filter((flow) => flow.platform !== "internal").length;
  const postPublishingDisabledCount = (state.postOrchestratorFlows?.flows ?? []).filter((flow) => flow.publishingEnabled === false).length;
  const postPublishingEnabled = Boolean(state.postOrchestratorStatus?.publishingEnabled);
  const postSchedulingEnabled = Boolean(state.postOrchestratorStatus?.schedulingEnabled);
  const postNextSafeStep = state.postOrchestratorStatus?.nextSafeStep ?? "Review the read-only Post Orchestrator scaffold.";
  const postRecoveryCount = state.recoveryItems?.filter((item) => item.id.startsWith("post-") || item.id.includes("proofly") || item.id.includes("xgrow")).length ?? 0;
  const socialProofFlowStatus = "contract-defined";
  const growthOptimizationFlowStatus = "contract-defined";
  const xPostFlowStatus = "stubbed";
  const githubPostFlowStatus = "planned";
  const linkedinPostFlowStatus = "stubbed";
  const stbPipeline = (state.pipelines ?? []).find((p) => p.id === "stb-daily-pipeline");
  const stbPipelineSummary = stbPipeline ? {
    status: stbPipeline.status,
    health: stbPipeline.health,
    daysStale: 8
  } : void 0;
  const videoOrchestrator = (state.orchestrators ?? []).find((o) => o.id === "video-orchestrator");
  const videoOrchestratorSummary = videoOrchestrator ? {
    status: videoOrchestrator.lifecycle,
    health: videoOrchestrator.health ?? "unknown"
  } : void 0;
  const migrationPipeline = (state.pipelines ?? []).find((p) => p.id === "stb-to-video-migration");
  const stbToVideoMigrationSummary = migrationPipeline ? {
    parityStatus: migrationPipeline.migration?.parityStatus ?? "unknown",
    blocked: migrationPipeline.migration?.decommissionBlocked === true
  } : void 0;
  const stbProject = (state.projects ?? []).find((p) => p.id === "says-the-bible");
  const saysTheBibleProjectSummary = stbProject ? {
    status: stbProject.status,
    health: stbProject.health,
    platformCount: stbProject.platformIds?.length ?? 0
  } : void 0;
  const probotOrchestrator = (state.orchestrators ?? []).find((o) => o.id === "probot-dashboard");
  const probotLegacySummary = probotOrchestrator ? {
    status: probotOrchestrator.lifecycle,
    health: probotOrchestrator.health ?? "unknown"
  } : void 0;
  let attentionScore = 0;
  if (offline) attentionScore = 100;
  else if (wikiHealthErrors > 0) attentionScore = 85;
  else if (stbPipeline?.health === "error") attentionScore = 80;
  else if (migrationBlockedCount > 0) attentionScore = 70;
  else if (approvalsCount > 0 || maintenanceCount > 0) attentionScore = 50;
  else if (wikiHealthWarnings > 0 || stbPipeline?.health === "warning") attentionScore = 30;
  else attentionScore = 10;
  const attentionLevel = offline ? "blocked" : attentionScore >= 70 ? "review" : attentionScore >= 40 ? "watch" : "clear";
  const nextAction = deriveNextAction(state, attentionLevel);
  const stbLiveStatusSummary = state.stbStatus ? {
    source: state.stbStatus.source,
    status: state.stbStatus.status,
    health: state.stbStatus.health,
    ageHours: state.stbStatus.lastRunAgeHours
  } : void 0;
  const videoModuleProgressSummary = state.videoOrchestratorStatus ? {
    percent: state.videoOrchestratorStatus.moduleProgress.percent,
    implemented: state.videoOrchestratorStatus.moduleProgress.implemented,
    partial: state.videoOrchestratorStatus.moduleProgress.partial,
    planned: state.videoOrchestratorStatus.moduleProgress.planned
  } : void 0;
  const migrationParitySummary = state.stbVideoMigrationStatus ? {
    percent: state.stbVideoMigrationStatus.parityPercent,
    mappedCount: (state.stbVideoMigrationStatus.modules ?? []).filter((m) => m.status === "mapped").length,
    totalCount: state.stbVideoMigrationStatus.modules?.length ?? 0
  } : void 0;
  const agentCount = (state.agents ?? []).length;
  const externalExecutorCount = (state.agents ?? []).filter((a) => a.owner === "external-tool").length;
  const plannedAgentCount = (state.agents ?? []).filter((a) => a.status === "planned").length;
  const blockedAgentCount = (state.agents ?? []).filter((a) => a.status === "blocked").length;
  const mindStewardAgent = (state.agents ?? []).find((a) => a.id === "mind-steward-agent");
  const mindStewardAgentSummary = mindStewardAgent ? {
    status: mindStewardAgent.status,
    health: mindStewardAgent.health
  } : void 0;
  const claudeCodexCount = (state.agents ?? []).filter((a) => ["claude-code-executor", "codex-executor"].includes(a.id)).length;
  const claudeCodexExecutorSummary = claudeCodexCount > 0 ? { count: claudeCodexCount } : void 0;
  const actionCount = (state.actions ?? []).length;
  const requestableActionCount = (state.actions ?? []).filter((a) => a.canRequestApproval && a.status === "approval-required").length;
  const blockedActionCount = (state.actions ?? []).filter((a) => a.status === "blocked").length;
  const plannedActionCount = (state.actions ?? []).filter((a) => a.status === "planned").length;
  const approvalRequiredActionCount = (state.actions ?? []).filter((a) => a.requiresApproval).length;
  const agentRunCount = (state.agentRuns ?? []).length;
  const agentRunBlockedCount = (state.agentRuns ?? []).filter((r) => r.status === "blocked").length;
  const agentRunPlannedCount = (state.agentRuns ?? []).filter((r) => r.status === "planned").length;
  const recoveryItemCount = (state.recoveryItems ?? []).length;
  const recoveryItemErrorCount = (state.recoveryItems ?? []).filter((i) => i.severity === "error").length;
  const recoveryItemWarningCount = (state.recoveryItems ?? []).filter((i) => i.severity === "warning").length;
  return {
    connectionStatus,
    attentionLevel,
    attentionScore,
    brainCoreOnline,
    wikiHealthOk,
    wikiHealthWarnings,
    wikiHealthErrors,
    maintenanceCount,
    approvalsCount,
    schedulerHealthy,
    localAppManagedProcessCount,
    nextAction,
    refreshedAt: /* @__PURE__ */ new Date(),
    brainCoreUrl,
    orchestratorCount,
    pipelineCount,
    projectCount,
    platformCount,
    legacySystemCount,
    migrationBlockedCount,
    postOrchestratorStatus,
    postOrchestratorModuleCount,
    postOrchestratorBlockedCount,
    postOrchestratorContractCount,
    postOrchestratorIntegrationCount,
    postOverviewStatus,
    postOverviewFlowCount,
    postOverviewBlockerCount,
    postOverviewNextSafeStep,
    postOverviewPublishingEnabled,
    postOverviewSchedulingEnabled,
    postOverviewExecutionEnabled,
    postOverviewDecommissionStarted,
    postFlowCount,
    postDraftFixtureCount,
    postEventFixtureCount,
    postDryRunDraftCount,
    postDryRunStatus,
    postDryRunBlockedCount,
    postDryRunNextSafeStep,
    postDryRunPublishingEnabled,
    postDryRunSchedulingEnabled,
    postDryRunExecutionEnabled,
    postReviewQueueItemCount,
    postReviewQueueApprovalRequestedCount,
    postReviewQueueBlockedCount,
    postReviewQueueStatus,
    postReviewQueueNextSafeStep,
    postReviewQueuePublishingEnabled,
    postReviewQueueSchedulingEnabled,
    postReviewQueueExecutionEnabled,
    postSchedulePreviewItemCount,
    postSchedulePreviewApprovalRequestedCount,
    postSchedulePreviewBlockedCount,
    postSchedulePreviewStatus,
    postSchedulePreviewNextSafeStep,
    postSchedulePreviewPublishingEnabled,
    postSchedulePreviewSchedulingEnabled,
    postSchedulePreviewExecutionEnabled,
    postAnalyticsFixtureCount,
    postAnalyticsPlatformCount,
    postAnalyticsExternalApiCallsEnabled,
    postAnalyticsNextSafeStep,
    postPipelineStepCount,
    postPipelineBlockerCount,
    postPipelineApprovalRequiredCount,
    postPipelineNextSafeStep,
    postReadinessScore,
    postReadinessGrade,
    postReadinessBlockerCount,
    postReadinessStatus,
    postReadinessNextSafeStep,
    postPlatformPolicyCount,
    postPlatformPolicyBlockedCount,
    postPlatformPolicyHighRiskCount,
    postDecommissionItemCount,
    postDecommissionBlockedCount,
    postDecommissionReadyCount,
    postDecommissionOverallStatus,
    postDecommissionStarted,
    postOperatorGuidanceItemCount,
    postOperatorGuidanceBlockedCount,
    postOperatorGuidanceWarningCount,
    postOperatorGuidanceNextSafeStep,
    postAcceptancePassedCount,
    postAcceptanceBlockedCount,
    postAcceptanceFailedCount,
    postMigrationParityScore,
    postMigrationBlockedCapabilities,
    postRoadmapCompletedPhaseCount,
    postRoadmapBlockedPhaseCount,
    postNextRecommendedPhase,
    postNextPhaseRequiresUserApproval,
    postManualExportItemCount,
    postManualExportStatus,
    postManualExportWritesFiles,
    postManualExportWritesExternalPlatform,
    postManualExportWritesToMind,
    postManualExportDownloadsFile,
    postManualExportCopiesToClipboard,
    postManualExportPublishingEnabled,
    postManualExportSchedulingEnabled,
    postManualExportExecutionEnabled,
    postManualExportNextSafeStep,
    postManualExportTitle,
    postManualExportPreviewOnly,
    postManualExportItemPreviewCount,
    postManualExportPackageStatus,
    postManualExportPackageId,
    postPlatformCount,
    postPublishingDisabledCount,
    socialProofFlowStatus,
    growthOptimizationFlowStatus,
    xPostFlowStatus,
    githubPostFlowStatus,
    linkedinPostFlowStatus,
    postPublishingEnabled,
    postSchedulingEnabled,
    postNextSafeStep,
    postRecoveryCount,
    stbPipelineSummary,
    videoOrchestratorSummary,
    stbToVideoMigrationSummary,
    saysTheBibleProjectSummary,
    probotLegacySummary,
    stbLiveStatusSummary,
    videoModuleProgressSummary,
    migrationParitySummary,
    agentCount,
    externalExecutorCount,
    plannedAgentCount,
    blockedAgentCount,
    mindStewardAgentSummary,
    claudeCodexExecutorSummary,
    actionCount,
    requestableActionCount,
    blockedActionCount,
    plannedActionCount,
    approvalRequiredActionCount,
    agentRunCount,
    agentRunBlockedCount,
    agentRunPlannedCount,
    recoveryItemCount,
    recoveryItemErrorCount,
    recoveryItemWarningCount
  };
}
function deriveNextAction(state, level) {
  if (state.offline) return "Start Brain Core to load live data";
  const blockers = state.executionReadiness?.blockers ?? [];
  if (blockers.length > 0) return `Blocked: ${blockers[0]}`;
  const readyCount = state.executionReadiness?.readyCandidateCount ?? 0;
  if (readyCount > 0) return `${readyCount} candidate(s) ready`;
  if ((state.approvals ?? []).length > 0) return "Review pending approvals";
  if ((state.mindPreviews ?? []).filter((p) => !p.expired).length > 0) return "Review maintenance queue";
  const managedProcessCount = state.localAppsActionStatus?.managedProcesses?.length ?? 0;
  if (managedProcessCount > 0) {
    return `${managedProcessCount} Brain Core-managed local app process${managedProcessCount === 1 ? "" : "es"} active`;
  }
  return "System healthy, all clear";
}
function formatRelativeTime2(date) {
  if (!date) return "never";
  const d = typeof date === "string" ? new Date(date) : date;
  const now = Date.now();
  const ms = now - d.getTime();
  const seconds = Math.floor(ms / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// src/view.ts
var localAppPendingActions = /* @__PURE__ */ new Map();
async function loadBrainConsoleViewState(settings = DEFAULT_BRAIN_CONSOLE_SETTINGS) {
  const normalized = normalizeBrainCoreUrl(settings.brainCoreUrl);
  const baseUrl = normalized.value;
  const results = await Promise.allSettled([
    readBrainCoreStatus(baseUrl),
    readBrainCoreCapabilities(baseUrl),
    readBrainCoreRuntimeReports(baseUrl),
    readBrainCoreVideoStatus(baseUrl),
    readBrainCoreVideoQueue(baseUrl),
    readBrainCoreLocalApps(baseUrl),
    readBrainCoreLocalAppsDashboard(baseUrl),
    readBrainCoreLocalAppsActionReadiness(baseUrl),
    readBrainCoreLocalAppsActionEnablementBacklog(baseUrl),
    readBrainCoreLocalAppsActionsStatus(baseUrl),
    readBrainCoreSchedulerStatus(baseUrl),
    readBrainCoreSchedulerJobs(baseUrl),
    readBrainCoreSessions(baseUrl),
    readBrainCoreRepos(baseUrl),
    readBrainCoreApprovals(baseUrl),
    readBrainCoreApprovalStore(baseUrl),
    readBrainCoreExecutionPlans(baseUrl),
    readBrainCoreExecutionReadiness(baseUrl),
    readBrainCoreMindPreviewPolicy(baseUrl),
    readBrainCoreMindPreviews(baseUrl),
    readBrainCoreOrchestrators(baseUrl),
    readBrainCorePipelines(baseUrl),
    readBrainCoreProjects(baseUrl),
    readBrainCorePlatforms(baseUrl),
    readBrainCoreProBotDashboardParity(baseUrl),
    readBrainCoreProBotSessionsParity(baseUrl),
    readBrainCoreProBotLocalAppsParity(baseUrl),
    readBrainCoreProBotSchedulerParity(baseUrl),
    readBrainCoreProBotStudioParity(baseUrl),
    readBrainCoreProBotExternalAdminParity(baseUrl),
    readBrainCoreProBotDecommissionReadiness(baseUrl),
    readBrainCoreProBotExternalAdminSafeMetadata(baseUrl),
    readBrainCoreProBotFeatureParityMatrix(baseUrl),
    readBrainCoreProBotPhaseOutChecklist(baseUrl),
    readBrainCorePostOrchestratorStatus(baseUrl),
    readBrainCorePostOrchestratorOverview(baseUrl),
    readBrainCorePostOrchestratorFlows(baseUrl),
    readBrainCorePostOrchestratorDrafts(baseUrl),
    readBrainCorePostOrchestratorEvents(baseUrl),
    readBrainCorePostOrchestratorDryRun(baseUrl, "github-release-event-fixture"),
    readBrainCorePostDraftReviewQueue(baseUrl, "github-release-event-fixture"),
    readBrainCorePostSchedulePreviewQueue(baseUrl, "github-release-event-fixture"),
    readBrainCorePostAnalyticsFixtures(baseUrl),
    readBrainCorePostPipelineSummary(baseUrl, "github-release-event-fixture"),
    readBrainCorePostReadinessScore(baseUrl, "github-release-event-fixture"),
    readBrainCorePostPlatformPolicies(baseUrl),
    readBrainCorePostDecommissionReadiness(baseUrl),
    readBrainCorePostOperatorGuidance(baseUrl),
    readBrainCorePostManualExportPackage(baseUrl, "github-release-event-fixture"),
    readBrainCorePostAcceptanceChecklist(baseUrl),
    readBrainCorePostMigrationParityReport(baseUrl),
    readBrainCorePostRoadmapCheckpoint(baseUrl),
    readBrainCorePostOrchestratorContracts(baseUrl),
    readBrainCorePostOrchestratorIntegrations(baseUrl),
    readBrainCorePostOrchestratorRecovery(baseUrl),
    readBrainCorePostQaStatus(baseUrl),
    readBrainCoreStbStatus(baseUrl),
    readBrainCoreVideoOrchestratorStatus(baseUrl),
    readBrainCoreVideoOrchestratorScripts(baseUrl),
    readBrainCoreVOStudioProjects(baseUrl),
    readBrainCoreVOStudioAccounts(baseUrl),
    readBrainCoreVOStudioPipelineProfiles(baseUrl),
    readBrainCoreVOStudioContentItems(baseUrl),
    readBrainCoreVOStudioPackage(baseUrl, "pkg-stb-story-052"),
    readBrainCoreVOStudioAnalyticsSummary(baseUrl),
    readBrainCoreVideoOrchestratorIntake(baseUrl),
    readBrainCoreVideoOrchestratorAssetPlans(baseUrl),
    readBrainCoreVideoOrchestratorDesignPlans(baseUrl),
    readBrainCoreVideoOrchestratorVoiceoverPlans(baseUrl),
    readBrainCoreVideoOrchestratorVisualsPlans(baseUrl),
    readBrainCoreVideoOrchestratorAssemblyPlans(baseUrl),
    readBrainCoreVideoOrchestratorMetadataPlans(baseUrl),
    readBrainCoreVideoOrchestratorPublishingPrepPlans(baseUrl),
    readBrainCoreVideoOrchestratorManualExportPackages(baseUrl),
    readBrainCoreVideoOrchestratorThumbnailDesignPlans(baseUrl),
    readBrainCoreVideoOrchestratorArchiveLoggingPlans(baseUrl),
    readBrainCoreVideoOrchestratorDesignProviderBoundaryPlans(baseUrl),
    readBrainCoreVideoOrchestratorDesignProviderCredentialIsolationPlans(baseUrl),
    readBrainCoreVideoOrchestratorDesignProviderPromptReviewPolicyPlans(baseUrl),
    readBrainCoreVideoOrchestratorArtifactSandboxProviderHandoffPlans(baseUrl),
    readBrainCoreVideoOrchestratorProviderOutputRedactionPolicyPlans(baseUrl),
    readBrainCoreVideoOrchestratorDesignProviderComplianceChecklistPlans(baseUrl),
    readBrainCoreVideoOrchestratorDesignProviderEnablementReadinessIndex(baseUrl),
    readBrainCoreVideoOrchestratorProviderIntegrationFinalPlanningCheckpoint(baseUrl),
    readBrainCoreVideoOrchestratorCredentialStoreImplementationBoundaryPlan(baseUrl),
    readBrainCoreVideoOrchestratorPromptReviewUxImplementationPlan(baseUrl),
    readBrainCoreVideoOrchestratorProviderAuditPersistenceBoundaryPlan(baseUrl),
    readBrainCoreVideoOrchestratorProviderWrapperSecurityReviewPlan(baseUrl),
    readBrainCoreVideoOrchestratorProviderImplementationPhaseStartGate(baseUrl),
    readBrainCoreVideoOrchestratorProviderImplementationReadinessDashboardSummary(baseUrl),
    readBrainCoreVideoOrchestratorProviderImplementationApprovalPacket(baseUrl),
    readBrainCoreVideoOrchestratorProviderApprovalPacketConsoleReviewSummary(baseUrl),
    readBrainCoreVideoOrchestratorProviderPlanningSurfaceIndex(baseUrl),
    readBrainCoreVideoOrchestratorCredentialReferenceScaffold(baseUrl),
    readBrainCoreVideoOrchestratorProviderRequestWrapperScaffold(baseUrl),
    readBrainCoreVideoOrchestratorProviderWrapperValidationHarness(baseUrl),
    readBrainCoreVideoOrchestratorProviderRequestEnvelopeScaffold(baseUrl),
    readBrainCoreVideoOrchestratorProviderResponseEnvelopeScaffold(baseUrl),
    readBrainCoreVideoOrchestratorProviderScaffoldingIntegrationSummary(baseUrl),
    readBrainCoreVideoOrchestratorProviderRequestWrapperInertShell(baseUrl),
    readBrainCoreVideoOrchestratorCredentialReferenceValidator(baseUrl),
    readBrainCoreVideoOrchestratorProviderResponseRedactionSkeleton(baseUrl),
    readBrainCoreVideoOrchestratorProviderAuditEventTypes(baseUrl),
    readBrainCoreVideoOrchestratorProviderDisabledOrchestrationFacade(baseUrl),
    readBrainCoreVideoOrchestratorProviderCapabilityPolicyEvaluator(baseUrl),
    readBrainCoreVideoOrchestratorProviderBlockedActionLedgerTypes(baseUrl),
    readBrainCoreVideoOrchestratorProviderDisabledOrchestrationIntegrationSummary(baseUrl),
    readBrainCoreStbVideoMigrationStatus(baseUrl),
    readBrainCoreStbVideoParityMatrix(baseUrl),
    readBrainCoreStbVideoDualRunStatus(baseUrl),
    readBrainCoreStbVideoDualRunEvidence(baseUrl),
    readBrainCoreVideoProductionGate(baseUrl),
    readBrainCoreVideoRenderExportPolicy(baseUrl),
    readBrainCoreVideoControlledDryRunDesign(baseUrl),
    readBrainCoreVideoProductionCutoverGate(baseUrl),
    readBrainCoreVideoReleaseCandidateReadiness(baseUrl),
    readBrainCoreVideoOperatorDecisionQueue(baseUrl),
    readBrainCoreVideoControlledExecutionPolicyBoundary(baseUrl),
    readBrainCoreVideoControlledExecutionReadinessIndex(baseUrl),
    readBrainCoreVideoRoadmapCheckpoint(baseUrl),
    readBrainCoreVideoOperatorReviewPacket(baseUrl),
    readBrainCoreVideoControlledExecutionApprovalPayloadSchema(baseUrl),
    readBrainCoreVideoPreviewCompletionIndex(baseUrl),
    readBrainCoreVideoControlledExecutionPreflightChecklist(baseUrl),
    readBrainCoreVideoControlledExecutionRiskRegister(baseUrl),
    readBrainCoreVideoControlledExecutionPreflightValidatorSchema(baseUrl),
    readBrainCoreVideoControlledExecutionPlanStub(baseUrl),
    readBrainCoreVideoControlledExecutionApprovalRequestDesign(baseUrl),
    readBrainCoreVideoControlledExecutionDisabledGate(baseUrl),
    readBrainCoreVideoControlledExecutionSecondApprovalPolicy(baseUrl),
    readBrainCoreVideoControlledExecutionOperatorIdentityProtocol(baseUrl),
    readBrainCoreVideoControlledExecutionRolePolicy(baseUrl),
    readBrainCoreControlledDualRunRequestDesign(baseUrl),
    readBrainCoreAgents(baseUrl),
    readBrainCoreActions(baseUrl),
    readBrainCoreMindStewardReportDetail(baseUrl),
    readBrainCoreAgentRuns(baseUrl),
    readBrainCoreAgentEvents(baseUrl),
    readBrainCoreAgentCostSummary(baseUrl),
    readBrainCoreRecoveryItems(baseUrl),
    readBrainCoreLocalAppsOperationalReadiness(baseUrl),
    readBrainCoreLocalAppsOperatorSummary(baseUrl),
    readBrainCoreLocalAppsOrchestrator(baseUrl),
    readBrainCoreInfraDokploy(baseUrl),
    readBrainCoreInfraTunnels(baseUrl),
    readBrainCoreInfraDomains(baseUrl),
    readBrainCoreInfraNewRelic(baseUrl),
    readBrainCoreInfraUmami(baseUrl),
    readBrainCoreInfraGoogleAds(baseUrl),
    readBrainCoreInfraStripe(baseUrl),
    readBrainCoreInfraStudio(baseUrl),
    readBrainCoreInfraVOStatus(baseUrl),
    readBrainCoreInfraPipelinesStatus(baseUrl),
    readBrainCoreVOAccounts(baseUrl),
    // 146
    readBrainCoreVOAuthStatus(baseUrl),
    // 147
    readBrainCoreVOJobs(baseUrl),
    // 148
    readBrainCoreSystemMetrics(baseUrl),
    // 149
    readBrainCoreCredentials(baseUrl, "says-the-bible"),
    // 150
    readBrainCoreVONormalizeHistory(baseUrl),
    // 151
    readBrainCoreVOManualQueue(baseUrl),
    // 152
    readBrainCoreVOWorkerConfig(baseUrl),
    // 153
    readBrainCoreVOAccountStats(baseUrl),
    // 154
    readBrainCoreVOReadiness(baseUrl),
    // 155
    readBrainCoreCredentialCatalog(baseUrl),
    // 156
    readBrainCoreAiModelSelectorStatus(baseUrl)
    // 163
  ]);
  const settledValues = withSafeEndpointPadding(
    results.map((result) => result.status === "fulfilled" ? result.value : { value: void 0, error: result.reason }),
    165
  );
  const [status, capabilities, runtimeReports, videoStatus, videoQueue, localApps, localAppsDashboard, localAppsActionReadiness, localAppsActionEnablementBacklog, localAppsActionStatus, schedulerStatus, schedulerJobs, sessions, repos, approvals, approvalStore, executionPlans, executionReadiness, mindPreviewPolicy, mindPreviews, orchestrators, pipelines, projects, platforms, probotDashboardParity, probotSessionsParity, probotLocalAppsParity, probotSchedulerParity, probotStudioParity, probotExternalAdminParity, probotDecommissionReadiness, probotExternalAdminSafeMetadata, probotFeatureParityMatrix, probotPhaseOutChecklist, postOrchestratorStatus, postOrchestratorOverview, postOrchestratorFlows, postOrchestratorDrafts, postOrchestratorEvents, postOrchestratorDryRun, postOrchestratorReviewQueue, postOrchestratorSchedulePreview, postOrchestratorAnalytics, postOrchestratorPipeline, postOrchestratorReadiness, postOrchestratorPlatformPolicies, postOrchestratorDecommissionReadiness, postOrchestratorOperatorGuidance, postOrchestratorManualExportPackage, postOrchestratorAcceptanceChecklist, postOrchestratorMigrationParity, postOrchestratorRoadmapCheckpoint, postOrchestratorContracts, postOrchestratorIntegrations, postOrchestratorRecovery, postOrchestratorQaStatus, stbStatus, videoOrchestratorStatus, videoOrchestratorScriptsResult, voStudioProjectsResult, voStudioAccountsResult, voStudioPipelineProfilesResult, voStudioContentItemsResult, voStudioPackageResult, voStudioAnalyticsResult, videoOrchestratorIntake, videoAssetPlans, videoDesignPlans, videoVoiceoverPlans, videoVisualPlans, videoAssemblyPlans, videoMetadataPlans, videoPublishingPrepPlans, videoManualExportPackages, videoThumbnailDesignPlans, videoArchiveLoggingPlans, videoDesignProviderBoundaryPlans, videoDesignProviderCredentialIsolationPlans, videoDesignProviderPromptReviewPolicyPlans, videoArtifactSandboxProviderHandoffPlans, videoProviderOutputRedactionPolicyPlans, videoDesignProviderComplianceChecklistPlans, videoDesignProviderEnablementReadinessIndex, videoProviderIntegrationFinalPlanningCheckpoint, videoCredentialStoreImplementationBoundaryPlan, videoPromptReviewUxImplementationPlan, videoProviderAuditPersistenceBoundaryPlan, videoProviderWrapperSecurityReviewPlan, videoProviderImplementationPhaseStartGate, videoProviderImplementationReadinessDashboardSummary, videoProviderImplementationApprovalPacket, videoProviderApprovalPacketConsoleReviewSummary, videoProviderPlanningSurfaceIndex, videoCredentialReferenceScaffold, videoProviderRequestWrapperScaffold, videoProviderWrapperValidationHarness, videoProviderRequestEnvelopeScaffold, videoProviderResponseEnvelopeScaffold, videoProviderScaffoldingIntegrationSummary, videoProviderRequestWrapperInertShell, videoCredentialReferenceValidator, videoProviderResponseRedactionSkeleton, videoProviderAuditEventTypes, videoProviderDisabledOrchestrationFacade, videoProviderCapabilityPolicyEvaluator, videoProviderBlockedActionLedgerTypes, videoProviderDisabledOrchestrationIntegrationSummary, stbVideoMigrationStatus, stbVideoParityMatrix, stbVideoDualRunStatus, stbVideoDualRunEvidence, videoProductionGate, videoRenderExportPolicy, videoControlledDryRunDesign, videoProductionCutoverGate, videoReleaseCandidateReadiness, videoOperatorDecisionQueue, videoControlledExecutionPolicyBoundary, videoControlledExecutionReadinessIndex, videoRoadmapCheckpoint, videoOperatorReviewPacket, videoControlledExecutionApprovalPayloadSchema, videoPreviewCompletionIndex, videoControlledExecutionPreflightChecklist, videoControlledExecutionRiskRegister, videoControlledExecutionPreflightValidatorSchema, videoControlledExecutionPlanStub, videoControlledExecutionApprovalRequestDesign, videoControlledExecutionDisabledGate, videoControlledExecutionSecondApprovalPolicy, videoControlledExecutionOperatorIdentityProtocol, videoControlledExecutionRolePolicy, controlledDualRunRequestDesign, agents, actions, mindStewardReportDetail, agentRuns, agentEvents, agentCostSummary, recoveryItems, localAppsOperationalReadiness, localAppsOperatorSummary, localAppsOrchestratorDef, infraDokploy, infraTunnels, infraDomains, infraNewRelic, infraUmami, infraGoogleAds, infraStripe, infraStudio, voLiveStatus, pipelinesLiveStatus, voAccountsResult, voAuthStatusResult, voJobsResult, systemMetricsResult, stbCredentialsResult, voNormalizeHistoryResult, voManualQueueResult, voWorkerConfigResult, voAccountStatsResult, voReadinessResult, credentialCatalogResult, aiModelSelectorResult] = settledValues;
  let approvalDetail;
  const latestApprovalId = approvals.value?.approvals?.[0]?.id;
  if (latestApprovalId) {
    const approvalDetailResult = await readBrainCoreApprovalDetail(baseUrl, latestApprovalId);
    approvalDetail = approvalDetailResult.value?.approval;
  }
  let maintenancePreviewDetail;
  const latestMaintenanceId = mindPreviews.value?.previews?.[0]?.id;
  if (latestMaintenanceId) {
    const maintenanceDetailResult = await readBrainCoreMaintenancePreviewDetail(baseUrl, latestMaintenanceId);
    maintenancePreviewDetail = maintenanceDetailResult.value?.preview;
  }
  const offline = [status, capabilities, runtimeReports, videoStatus, videoQueue, localApps, schedulerStatus, schedulerJobs, sessions, repos, approvals, approvalStore, executionPlans, executionReadiness, mindPreviewPolicy, mindPreviews, orchestrators, pipelines, projects, platforms, probotDashboardParity, probotSessionsParity, probotLocalAppsParity, probotSchedulerParity, probotStudioParity, probotExternalAdminParity, probotDecommissionReadiness, probotExternalAdminSafeMetadata, probotFeatureParityMatrix, probotPhaseOutChecklist, postOrchestratorStatus, postOrchestratorOverview, postOrchestratorFlows, postOrchestratorDrafts, postOrchestratorEvents, postOrchestratorDryRun, postOrchestratorReviewQueue, postOrchestratorSchedulePreview, postOrchestratorAnalytics, postOrchestratorPipeline, postOrchestratorReadiness, postOrchestratorPlatformPolicies, postOrchestratorDecommissionReadiness, postOrchestratorOperatorGuidance, postOrchestratorManualExportPackage, postOrchestratorAcceptanceChecklist, postOrchestratorMigrationParity, postOrchestratorRoadmapCheckpoint, postOrchestratorContracts, postOrchestratorIntegrations, postOrchestratorRecovery, postOrchestratorQaStatus, stbStatus, videoOrchestratorStatus, videoOrchestratorIntake, videoAssetPlans, videoDesignPlans, videoVoiceoverPlans, videoVisualPlans, videoAssemblyPlans, videoMetadataPlans, videoPublishingPrepPlans, videoManualExportPackages, videoThumbnailDesignPlans, videoArchiveLoggingPlans, videoDesignProviderBoundaryPlans, stbVideoMigrationStatus, stbVideoParityMatrix, stbVideoDualRunStatus, stbVideoDualRunEvidence, videoProductionGate, videoRenderExportPolicy, videoControlledDryRunDesign, videoProductionCutoverGate, videoReleaseCandidateReadiness, videoOperatorDecisionQueue, videoControlledExecutionPolicyBoundary, videoControlledExecutionReadinessIndex, videoRoadmapCheckpoint, videoOperatorReviewPacket, videoControlledExecutionApprovalPayloadSchema, videoPreviewCompletionIndex, videoControlledExecutionPreflightChecklist, videoControlledExecutionRiskRegister, videoControlledExecutionPreflightValidatorSchema, videoControlledExecutionPlanStub, videoControlledExecutionSecondApprovalPolicy, videoControlledExecutionOperatorIdentityProtocol, videoControlledExecutionRolePolicy, controlledDualRunRequestDesign, agents, actions, agentRuns, agentEvents, recoveryItems].every(
    (result) => result.value === void 0
  );
  const endpointErrors = [];
  [
    { name: "/status", result: status },
    { name: "/runtime/reports", result: runtimeReports },
    { name: "/scheduler/status", result: schedulerStatus }
  ].forEach(({ name, result }) => {
    if (result.error) {
      endpointErrors.push({
        pathname: name,
        error: result.error,
        detail: result.detail,
        status: result.status,
        url: result.url
      });
    }
  });
  const connectionDiagnostics = status.value?.ok === true ? {
    configuredUrl: baseUrl,
    selectedUrl: baseUrl,
    attempts: [
      {
        url: baseUrl,
        ok: true,
        status: 200
      }
    ],
    allFailed: false,
    recommendation: `Connected to ${baseUrl}`
  } : await diagnoseBrainCoreConnection(baseUrl);
  return {
    status: status.value,
    capabilities: capabilities.value,
    runtimeReports: runtimeReports.value?.reports,
    videoStatus: videoStatus.value,
    videoQueue: videoQueue.value?.queue,
    localApps: localApps.value?.apps,
    localAppsDashboard: localAppsDashboard.value,
    localAppsActionReadiness: localAppsActionReadiness.value,
    localAppsActionEnablementBacklog: localAppsActionEnablementBacklog.value,
    localAppsActionStatus: localAppsActionStatus.value,
    localAppsOperationalReadiness: localAppsOperationalReadiness.value,
    localAppsOperatorSummary: localAppsOperatorSummary.value,
    localAppsOrchestrator: localAppsOrchestratorDef.value,
    schedulerStatus: schedulerStatus.value,
    schedulerJobs: schedulerJobs.value?.jobs,
    sessions: sessions.value?.sessions,
    repos: repos.value?.repos,
    approvals: approvals.value?.approvals,
    approvalDetail,
    approvalStore: approvalStore.value,
    executionPlans: executionPlans.value?.plans,
    executionReadiness: executionReadiness.value,
    mindPreviewPolicy: mindPreviewPolicy.value,
    mindPreviews: mindPreviews.value?.previews,
    mindStewardReportDetail: mindStewardReportDetail.value?.report,
    aiModelSelectorStatus: aiModelSelectorResult.value?.selector,
    maintenancePreviewDetail,
    orchestrators: orchestrators.value?.orchestrators,
    pipelines: pipelines.value?.pipelines,
    projects: projects.value?.projects,
    platforms: platforms.value?.platforms,
    probotDashboardParity: probotDashboardParity.value,
    probotSessionsParity: probotSessionsParity.value,
    probotLocalAppsParity: probotLocalAppsParity.value,
    probotSchedulerParity: probotSchedulerParity.value,
    probotStudioParity: probotStudioParity.value,
    probotExternalAdminParity: probotExternalAdminParity.value,
    probotDecommissionReadiness: probotDecommissionReadiness.value,
    probotExternalAdminSafeMetadata: probotExternalAdminSafeMetadata.value,
    probotFeatureParityMatrix: probotFeatureParityMatrix.value,
    probotPhaseOutChecklist: probotPhaseOutChecklist.value,
    postOrchestratorStatus: postOrchestratorStatus.value,
    postOrchestratorOverview: postOrchestratorOverview.value,
    postOrchestratorFlows: postOrchestratorFlows.value,
    postOrchestratorDrafts: postOrchestratorDrafts.value,
    postOrchestratorEvents: postOrchestratorEvents.value,
    postOrchestratorDryRun: postOrchestratorDryRun.value,
    postOrchestratorReviewQueue: postOrchestratorReviewQueue.value,
    postOrchestratorSchedulePreview: postOrchestratorSchedulePreview.value,
    postOrchestratorAnalytics: postOrchestratorAnalytics.value,
    postOrchestratorPipeline: postOrchestratorPipeline.value,
    postOrchestratorReadiness: postOrchestratorReadiness.value,
    postOrchestratorPlatformPolicies: postOrchestratorPlatformPolicies.value,
    postOrchestratorDecommissionReadiness: postOrchestratorDecommissionReadiness.value,
    postOrchestratorOperatorGuidance: postOrchestratorOperatorGuidance.value,
    postOrchestratorManualExportPackage: postOrchestratorManualExportPackage.value,
    postOrchestratorAcceptanceChecklist: postOrchestratorAcceptanceChecklist.value,
    postOrchestratorMigrationParity: postOrchestratorMigrationParity.value,
    postOrchestratorRoadmapCheckpoint: postOrchestratorRoadmapCheckpoint.value,
    postOrchestratorQaStatus: postOrchestratorQaStatus.value,
    postOrchestratorContracts: postOrchestratorContracts.value,
    postOrchestratorIntegrations: postOrchestratorIntegrations.value,
    postOrchestratorRecovery: postOrchestratorRecovery.value,
    stbStatus: stbStatus.value,
    videoOrchestratorStatus: videoOrchestratorStatus.value,
    videoOrchestratorScripts: videoOrchestratorScriptsResult.value,
    videoOrchestratorScriptsError: videoOrchestratorScriptsResult.error,
    voStudioProjects: voStudioProjectsResult.value,
    voStudioAccounts: voStudioAccountsResult.value,
    voStudioPipelineProfiles: voStudioPipelineProfilesResult.value,
    voStudioContentItems: voStudioContentItemsResult.value,
    voStudioPackage: voStudioPackageResult.value,
    voStudioAnalytics: voStudioAnalyticsResult.value,
    videoOrchestratorIntake: videoOrchestratorIntake.value,
    videoAssetPlans: videoAssetPlans.value,
    videoDesignPlans: videoDesignPlans.value,
    videoVoiceoverPlans: videoVoiceoverPlans.value,
    videoVisualPlans: videoVisualPlans.value,
    videoAssemblyPlans: videoAssemblyPlans.value,
    videoMetadataPlans: videoMetadataPlans.value,
    videoPublishingPrepPlans: videoPublishingPrepPlans.value,
    videoManualExportPackages: videoManualExportPackages.value,
    videoThumbnailDesignPlans: videoThumbnailDesignPlans.value,
    videoArchiveLoggingPlans: videoArchiveLoggingPlans.value,
    videoDesignProviderBoundaryPlans: videoDesignProviderBoundaryPlans.value,
    videoDesignProviderCredentialIsolationPlans: videoDesignProviderCredentialIsolationPlans.value,
    videoDesignProviderPromptReviewPolicyPlans: videoDesignProviderPromptReviewPolicyPlans.value,
    videoArtifactSandboxProviderHandoffPlans: videoArtifactSandboxProviderHandoffPlans.value,
    videoProviderOutputRedactionPolicyPlans: videoProviderOutputRedactionPolicyPlans.value,
    videoDesignProviderComplianceChecklistPlans: videoDesignProviderComplianceChecklistPlans.value,
    videoDesignProviderEnablementReadinessIndex: videoDesignProviderEnablementReadinessIndex.value,
    videoProviderIntegrationFinalPlanningCheckpoint: videoProviderIntegrationFinalPlanningCheckpoint.value,
    videoCredentialStoreImplementationBoundaryPlan: videoCredentialStoreImplementationBoundaryPlan.value,
    videoPromptReviewUxImplementationPlan: videoPromptReviewUxImplementationPlan.value,
    videoProviderAuditPersistenceBoundaryPlan: videoProviderAuditPersistenceBoundaryPlan.value,
    videoProviderWrapperSecurityReviewPlan: videoProviderWrapperSecurityReviewPlan.value,
    videoProviderImplementationPhaseStartGate: videoProviderImplementationPhaseStartGate.value,
    videoProviderImplementationReadinessDashboardSummary: videoProviderImplementationReadinessDashboardSummary.value,
    videoProviderImplementationApprovalPacket: videoProviderImplementationApprovalPacket.value,
    videoProviderApprovalPacketConsoleReviewSummary: videoProviderApprovalPacketConsoleReviewSummary.value,
    videoProviderPlanningSurfaceIndex: videoProviderPlanningSurfaceIndex.value,
    videoCredentialReferenceScaffold: videoCredentialReferenceScaffold.value,
    videoProviderRequestWrapperScaffold: videoProviderRequestWrapperScaffold.value,
    videoProviderWrapperValidationHarness: videoProviderWrapperValidationHarness.value,
    videoProviderRequestEnvelopeScaffold: videoProviderRequestEnvelopeScaffold.value,
    videoProviderResponseEnvelopeScaffold: videoProviderResponseEnvelopeScaffold.value,
    videoProviderScaffoldingIntegrationSummary: videoProviderScaffoldingIntegrationSummary.value,
    videoProviderRequestWrapperInertShell: videoProviderRequestWrapperInertShell.value,
    videoCredentialReferenceValidator: videoCredentialReferenceValidator.value,
    videoProviderResponseRedactionSkeleton: videoProviderResponseRedactionSkeleton.value,
    videoProviderAuditEventTypes: videoProviderAuditEventTypes.value,
    videoProviderDisabledOrchestrationFacade: videoProviderDisabledOrchestrationFacade.value,
    videoProviderCapabilityPolicyEvaluator: videoProviderCapabilityPolicyEvaluator.value,
    videoProviderBlockedActionLedgerTypes: videoProviderBlockedActionLedgerTypes.value,
    videoProviderDisabledOrchestrationIntegrationSummary: videoProviderDisabledOrchestrationIntegrationSummary.value,
    stbVideoMigrationStatus: stbVideoMigrationStatus.value,
    stbVideoParityMatrix: stbVideoParityMatrix.value,
    stbVideoDualRunStatus: stbVideoDualRunStatus.value,
    stbVideoDualRunEvidence: stbVideoDualRunEvidence.value,
    videoProductionGate: videoProductionGate.value,
    videoRenderExportPolicy: videoRenderExportPolicy.value,
    videoControlledDryRunDesign: videoControlledDryRunDesign.value,
    videoProductionCutoverGate: videoProductionCutoverGate.value,
    videoReleaseCandidateReadiness: videoReleaseCandidateReadiness.value,
    videoOperatorDecisionQueue: videoOperatorDecisionQueue.value,
    videoControlledExecutionPolicyBoundary: videoControlledExecutionPolicyBoundary.value,
    videoControlledExecutionReadinessIndex: videoControlledExecutionReadinessIndex.value,
    videoRoadmapCheckpoint: videoRoadmapCheckpoint.value,
    videoOperatorReviewPacket: videoOperatorReviewPacket.value,
    videoControlledExecutionApprovalPayloadSchema: videoControlledExecutionApprovalPayloadSchema.value,
    videoPreviewCompletionIndex: videoPreviewCompletionIndex.value,
    videoControlledExecutionPreflightChecklist: videoControlledExecutionPreflightChecklist.value,
    videoControlledExecutionRiskRegister: videoControlledExecutionRiskRegister.value,
    videoControlledExecutionPreflightValidatorSchema: videoControlledExecutionPreflightValidatorSchema.value,
    videoControlledExecutionPlanStub: videoControlledExecutionPlanStub.value,
    videoControlledExecutionApprovalRequestDesign: videoControlledExecutionApprovalRequestDesign.value,
    videoControlledExecutionDisabledGate: videoControlledExecutionDisabledGate.value,
    videoControlledExecutionSecondApprovalPolicy: videoControlledExecutionSecondApprovalPolicy.value,
    videoControlledExecutionOperatorIdentityProtocol: videoControlledExecutionOperatorIdentityProtocol.value,
    videoControlledExecutionRolePolicy: videoControlledExecutionRolePolicy.value,
    controlledDualRunRequestDesign: controlledDualRunRequestDesign.value,
    agents: agents.value?.agents,
    agentCostSummary: agentCostSummary.value,
    actions: actions.value?.actions,
    agentRuns: agentRuns.value?.runs,
    agentEvents: agentEvents.value?.events,
    recoveryItems: recoveryItems.value?.items,
    infraDokploy: infraDokploy.value,
    infraTunnels: infraTunnels.value,
    infraDomains: infraDomains.value,
    infraNewRelic: infraNewRelic.value,
    infraUmami: infraUmami.value,
    infraGoogleAds: infraGoogleAds.value,
    infraStripe: infraStripe.value,
    infraStudio: infraStudio.value,
    voLiveStatus: voLiveStatus.value,
    pipelinesLiveStatus: pipelinesLiveStatus.value,
    voAccounts: voAccountsResult.value,
    voAuthStatus: voAuthStatusResult.value,
    voJobs: voJobsResult.value,
    systemMetrics: systemMetricsResult.value,
    credentialsByProject: stbCredentialsResult.value ? { "says-the-bible": stbCredentialsResult.value } : void 0,
    credentialCatalog: credentialCatalogResult.value,
    voNormalizeHistory: voNormalizeHistoryResult.value,
    voManualQueue: voManualQueueResult.value,
    voWorkerConfig: voWorkerConfigResult.value,
    voAccountStats: voAccountStatsResult.value,
    voReadiness: voReadinessResult.value,
    warning: normalized.warning ?? normalized.error,
    offline,
    refreshedAt: /* @__PURE__ */ new Date(),
    brainCoreUrl: baseUrl,
    statusError: status.error,
    endpointErrors: endpointErrors.length > 0 ? endpointErrors : void 0,
    connectionDiagnostics
  };
}
function withSafeEndpointPadding(values, minimumLength) {
  const padded = [...values];
  while (padded.length < minimumLength) {
    padded.push({ value: void 0 });
  }
  return padded;
}
var SECTION_TABS = [
  { id: "overview", label: "Overview", icon: "\u25C6" },
  { id: "apps", label: "Apps", icon: "\u25A0" },
  { id: "sessions", label: "Sessions", icon: "\u2299" },
  { id: "infra", label: "Infra", icon: "\u25E7" },
  { id: "analytics", label: "Analytics", icon: "\u25A3" },
  { id: "stripe", label: "Stripe", icon: "$" },
  { id: "monitoring", label: "Monitoring", icon: "\u25CE" },
  { id: "orchestrators", label: "Orchestrators", icon: "\u25EB" },
  { id: "pipelines", label: "Pipelines", icon: "\u25A4" },
  { id: "video-orchestrator", label: "Video Orchestrator", icon: "\u25C8" },
  { id: "projects", label: "Projects", icon: "\u25C9" },
  { id: "reports", label: "Reports", icon: "\u{1F4CB}" },
  { id: "posts", label: "Posts", icon: "\u2726" },
  { id: "agents", label: "Agents", icon: "\u25C8" },
  { id: "accounts", label: "Accounts", icon: "\u{1F511}" }
];
function metricsSeverityColor(pct) {
  if (pct < 50) return "#22c55e";
  if (pct < 75) return "#eab308";
  return "#ef4444";
}
function metricsCodexColor(remainingPct) {
  if (remainingPct > 50) return "#22c55e";
  if (remainingPct > 25) return "#eab308";
  return "#ef4444";
}
function formatMetricsUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor(seconds % 86400 / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
function formatMetricsCountdown(resetsAt) {
  if (!resetsAt) return "\u2013";
  const ms = new Date(resetsAt).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "now";
  const totalMinutes = Math.floor(ms / 6e4);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
function formatMetricsResetExact(resetsAt) {
  if (!resetsAt) return "No data";
  try {
    const d = new Date(resetsAt);
    return d.toLocaleString(void 0, { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return resetsAt;
  }
}
function renderSystemMetricsBanner(state) {
  const m = state.systemMetrics;
  if (!m) {
    return `<div class="bc-metrics-banner bc-metrics-offline"><span>System metrics unavailable</span></div>`;
  }
  const cpuPct = Math.min(100, Math.round(m.loadAvg1 / Math.max(m.cpuCount, 1) * 100));
  const cpuColor = metricsSeverityColor(cpuPct);
  const memBarPct = m.memFreePercent === null ? 0 : Math.round(100 - m.memFreePercent);
  const memColor = m.memFreePercent === null ? "var(--text-muted)" : metricsSeverityColor(memBarPct);
  const gpuPct = typeof m.gpuUtilizationPercent === "number" ? Math.max(0, Math.min(100, Math.round(m.gpuUtilizationPercent))) : null;
  const gpuColor = gpuPct === null ? "var(--text-muted)" : metricsSeverityColor(gpuPct);
  const c5 = m.codex.fiveHour;
  const c7 = m.codex.sevenDay;
  const gm = m.gemini;
  const ca = m.claudeApi;
  const claudeCostPercent = (cost, maxMonthCost = 1e3) => {
    return Math.min(100, Math.round(cost / maxMonthCost * 100));
  };
  const cpuCard = `<div class="bc-mc">
    <div class="bc-mc-label">CPU LOAD</div>
    <div class="bc-mc-value">${m.loadAvg1.toFixed(2)} core</div>
    <div class="bc-mc-sub">${m.cpuCount} cores \xB7 ${cpuPct}% load</div>
    <div class="bc-bar"><div class="bc-bar-fill" style="width:${cpuPct}%;background:${cpuColor}"></div></div>
  </div>`;
  const memCard = m.memFreePercent === null ? `<div class="bc-mc">
        <div class="bc-mc-label">MEMORY PRESSURE</div>
        <div class="bc-mc-value" style="color:var(--text-muted)">\u2013</div>
        <div class="bc-mc-sub">memory_pressure unavailable</div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">MEMORY PRESSURE</div>
        <div class="bc-mc-value">${m.memUsedGb} GB</div>
        <div class="bc-mc-sub">${m.memTotalGb} GB \xB7 ${m.memFreePercent}% free</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${memBarPct}%;background:${memColor}"></div></div>
      </div>`;
  const gpuCard = gpuPct === null ? `<div class="bc-mc">
        <div class="bc-mc-label">GPU LOAD</div>
        <div class="bc-mc-value" style="color:var(--text-muted)">\u2013</div>
        <div class="bc-mc-sub">gpu stats unavailable</div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">GPU LOAD</div>
        <div class="bc-mc-value">${m.gpuCoreCount} core</div>
        <div class="bc-mc-sub">${gpuPct}% load \xB7 ${m.gpuCoreCount} GPU cores</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${gpuPct}%;background:${gpuColor}"></div></div>
      </div>`;
  const uptimeCard = `<div class="bc-mc">
    <div class="bc-mc-label">UPTIME</div>
    <div class="bc-mc-value">${formatMetricsUptime(m.uptimeSeconds)}</div>
    <div class="bc-mc-sub">Brain Core</div>
  </div>`;
  const codex5Card = c5.resetsAt ? `<div class="bc-mc">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div class="bc-mc-label">CODEX \xB7 5H</div>
          <div class="bc-mc-badge">RESETS IN ${formatMetricsCountdown(c5.resetsAt)}</div>
        </div>
        <div class="bc-mc-value" style="color:${metricsCodexColor(c5.remainingPercent)}">${c5.remainingPercent}%</div>
        <div class="bc-mc-sub">${formatMetricsResetExact(c5.resetsAt)}</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${c5.remainingPercent}%;background:${metricsCodexColor(c5.remainingPercent)}"></div></div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">CODEX \xB7 5H</div>
        <div class="bc-mc-value" style="color:var(--text-muted);font-size:14px">\u2013</div>
        <div class="bc-mc-sub">No data yet</div>
      </div>`;
  const codex7Card = c7.resetsAt ? `<div class="bc-mc">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div class="bc-mc-label">CODEX \xB7 7D</div>
          <div class="bc-mc-badge">RESETS IN ${formatMetricsCountdown(c7.resetsAt)}</div>
        </div>
        <div class="bc-mc-value" style="color:${metricsCodexColor(c7.remainingPercent)}">${c7.remainingPercent}%</div>
        <div class="bc-mc-sub">${formatMetricsResetExact(c7.resetsAt)}</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${c7.remainingPercent}%;background:${metricsCodexColor(c7.remainingPercent)}"></div></div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">CODEX \xB7 7D</div>
        <div class="bc-mc-value" style="color:var(--text-muted);font-size:14px">\u2013</div>
        <div class="bc-mc-sub">No data yet</div>
      </div>`;
  const geminiCard = gm ? `<div class="bc-mc">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div class="bc-mc-label">GEMINI \xB7 FREE</div>
          <div class="bc-mc-badge">RESETS IN ${formatMetricsCountdown(gm.resetsAt)}</div>
        </div>
        <div class="bc-mc-value" style="color:${metricsCodexColor(gm.remainingPercent)}">${gm.remainingPercent}%</div>
        <div class="bc-mc-sub">${gm.callsRemaining}/${gm.callsToday} calls \xB7 ${formatMetricsResetExact(gm.resetsAt)}</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${gm.remainingPercent}%;background:${metricsCodexColor(gm.remainingPercent)}"></div></div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">GEMINI \xB7 FREE</div>
        <div class="bc-mc-value" style="color:var(--text-muted);font-size:14px">\u2013</div>
        <div class="bc-mc-sub">No data yet</div>
      </div>`;
  const claudeHaikuCard = ca ? `<div class="bc-mc">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div class="bc-mc-label">CLAUDE \xB7 HAIKU</div>
          <div class="bc-mc-badge">RESETS IN ${ca.daysUntilReset}d</div>
        </div>
        <div class="bc-mc-value" style="color:${metricsCodexColor(claudeCostPercent(ca.haiku.costUsd))}">$${ca.haiku.costUsd.toFixed(2)}</div>
        <div class="bc-mc-sub">${ca.haiku.inputTokens.toLocaleString()} in \xB7 ${ca.haiku.outputTokens.toLocaleString()} out \xB7 ${ca.haiku.callCount} calls</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${claudeCostPercent(ca.haiku.costUsd)}%;background:${metricsCodexColor(claudeCostPercent(ca.haiku.costUsd))}"></div></div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">CLAUDE \xB7 HAIKU</div>
        <div class="bc-mc-value" style="color:var(--text-muted);font-size:14px">\u2013</div>
        <div class="bc-mc-sub">No data yet</div>
      </div>`;
  const claudeSonnetCard = ca ? `<div class="bc-mc">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div class="bc-mc-label">CLAUDE \xB7 SONNET</div>
          <div class="bc-mc-badge">RESETS IN ${ca.daysUntilReset}d</div>
        </div>
        <div class="bc-mc-value" style="color:${metricsCodexColor(claudeCostPercent(ca.sonnet.costUsd))}">$${ca.sonnet.costUsd.toFixed(2)}</div>
        <div class="bc-mc-sub">${ca.sonnet.inputTokens.toLocaleString()} in \xB7 ${ca.sonnet.outputTokens.toLocaleString()} out \xB7 ${ca.sonnet.callCount} calls</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${claudeCostPercent(ca.sonnet.costUsd)}%;background:${metricsCodexColor(claudeCostPercent(ca.sonnet.costUsd))}"></div></div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">CLAUDE \xB7 SONNET</div>
        <div class="bc-mc-value" style="color:var(--text-muted);font-size:14px">\u2013</div>
        <div class="bc-mc-sub">No data yet</div>
      </div>`;
  const claudeOpusCard = ca ? `<div class="bc-mc">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div class="bc-mc-label">CLAUDE \xB7 OPUS</div>
          <div class="bc-mc-badge">RESETS IN ${ca.daysUntilReset}d</div>
        </div>
        <div class="bc-mc-value" style="color:${metricsCodexColor(claudeCostPercent(ca.opus.costUsd))}">$${ca.opus.costUsd.toFixed(2)}</div>
        <div class="bc-mc-sub">${ca.opus.inputTokens.toLocaleString()} in \xB7 ${ca.opus.outputTokens.toLocaleString()} out \xB7 ${ca.opus.callCount} calls</div>
        <div class="bc-bar"><div class="bc-bar-fill" style="width:${claudeCostPercent(ca.opus.costUsd)}%;background:${metricsCodexColor(claudeCostPercent(ca.opus.costUsd))}"></div></div>
      </div>` : `<div class="bc-mc">
        <div class="bc-mc-label">CLAUDE \xB7 OPUS</div>
        <div class="bc-mc-value" style="color:var(--text-muted);font-size:14px">\u2013</div>
        <div class="bc-mc-sub">No data yet</div>
      </div>`;
  return `<div class="bc-metrics-banner">${cpuCard}${memCard}${gpuCard}${uptimeCard}${codex5Card}${codex7Card}${geminiCard}${claudeHaikuCard}${claudeSonnetCard}${claudeOpusCard}</div>`;
}
function renderBrainConsoleView(container, state, settings, onRefresh, onBrainCoreRestart) {
  container.empty();
  container.addClass("brain-console");
  try {
    const snapshot = deriveDashboardSnapshot(state, settings.brainCoreUrl);
    const activeSection = state.activeSection ?? "overview";
    const shell = container.createDiv({ cls: "brain-console__shell" });
    renderCommandBar(shell, state, activeSection, onRefresh, onBrainCoreRestart);
    const metricsBanner = shell.createDiv({ cls: "bc-metrics-wrapper" });
    metricsBanner.innerHTML = renderSystemMetricsBanner(state);
    const scrollArea = shell.createDiv({ cls: "brain-console__scroll-area" });
    if (snapshot.connectionStatus === "offline") {
      renderOfflineState(
        scrollArea,
        state.brainCoreUrl || settings.brainCoreUrl,
        state.statusError,
        state.endpointErrors,
        onRefresh,
        onBrainCoreRestart
      );
    } else {
      renderActiveSectionContent(scrollArea, activeSection, state, snapshot, settings, onRefresh, onBrainCoreRestart);
      renderDiagnosticsPanel(scrollArea, state);
    }
  } catch (error) {
    container.empty();
    const fallback = container.createDiv({ cls: "brain-console__emergency-fallback" });
    fallback.createEl("h2", { text: "Brain Console Error" });
    fallback.createEl("p", { text: `Build: ${window.BRAIN_CONSOLE_BUILD_ID || "unknown"}` });
    fallback.createEl("p", { text: `Dashboard render failed. Click Manual refresh after Brain Core starts.` });
    if (state.brainCoreUrl || settings.brainCoreUrl) {
      fallback.createEl("p", { text: `Brain Core URL: ${state.brainCoreUrl || settings.brainCoreUrl}` });
    }
    if (error instanceof Error) {
      fallback.createEl("p", { cls: "brain-console__error-detail", text: `Details: ${error.message}` });
    }
  }
}
function renderCommandBar(shell, state, activeSection, onRefresh, onBrainCoreRestart) {
  const topRow = shell.createDiv({ cls: "bc-cmd-top" });
  const left = topRow.createDiv({ cls: "bc-cmd-left" });
  left.createEl("span", { cls: "bc-cmd-wordmark", text: "Brain Console" });
  const online = state.status?.ok === true;
  const dot = left.createEl("span", { cls: `bc-cmd-dot ${online ? "bc-cmd-dot--online" : "bc-cmd-dot--offline"}` });
  dot.setAttribute("aria-label", online ? "Brain Core online" : "Brain Core offline");
  const right = topRow.createDiv({ cls: "bc-cmd-right" });
  right.createEl("span", { cls: "bc-cmd-build", text: window.BRAIN_CONSOLE_BUILD_ID || "unknown" });
  const refreshBtn = right.createEl("button", { cls: "bc-cmd-action" });
  refreshBtn.setAttribute("type", "button");
  refreshBtn.setAttribute("aria-label", onBrainCoreRestart ? "Restart Brain Core" : "Manual refresh");
  refreshBtn.setAttribute("title", onBrainCoreRestart ? "Restart Brain Core and re-verify the service" : "Manual refresh");
  refreshBtn.textContent = "\u21BB";
  if (onBrainCoreRestart) {
    refreshBtn.addEventListener("click", () => {
      if (refreshBtn.disabled) return;
      refreshBtn.disabled = true;
      refreshBtn.setAttribute("aria-busy", "true");
      const originalText = refreshBtn.textContent || "\u21BB";
      refreshBtn.textContent = "\u2026";
      void (async () => {
        try {
          await onBrainCoreRestart();
        } catch (error) {
          console.error("Brain Core restart button failed", error);
        } finally {
          refreshBtn.disabled = false;
          refreshBtn.removeAttribute("aria-busy");
          refreshBtn.textContent = originalText;
        }
      })();
    });
  } else if (onRefresh) {
    refreshBtn.addEventListener("click", () => onRefresh());
  }
  const nav = shell.createDiv({ cls: "bc-cmd-nav" });
  for (const tab of SECTION_TABS) {
    const btn = nav.createEl("button", { cls: "bc-cmd-tab" });
    if (tab.id === activeSection) btn.addClass("active");
    btn.setAttribute("data-section-id", tab.id);
    btn.setAttribute("aria-label", tab.label);
    btn.setAttribute("type", "button");
    btn.createEl("span", { cls: "bc-cmd-tab-label", text: tab.label });
  }
}
function renderActiveSectionContent(shell, activeSection, state, snapshot, settings, onRefresh, onBrainCoreRestart) {
  const content = shell.createDiv({ cls: "brain-console__section-content" });
  try {
    switch (activeSection) {
      case "overview":
        renderOverviewSection(content, state, snapshot);
        break;
      case "apps":
        renderAppsSection(content, state, snapshot, settings, onRefresh);
        break;
      case "sessions":
        renderSessionsSection(content, state);
        break;
      case "infra":
        renderInfraSection(content, state);
        break;
      case "analytics":
        renderAnalyticsSection(content, state);
        break;
      case "stripe":
        renderStripeSection(content, state);
        break;
      case "monitoring":
        renderMonitoringSection(content, state);
        break;
      case "orchestrators":
        renderOrchestratorsSection(content, state, snapshot);
        break;
      case "pipelines":
        renderPipelinesSection(content, state, snapshot);
        break;
      case "video-orchestrator":
        renderVideoOrchestratorSection(content, state);
        break;
      case "projects":
        renderProjectsSection(content, state, snapshot);
        break;
      case "reports":
        renderReportsSection(content, state, snapshot, settings, onRefresh);
        break;
      case "posts":
        renderPostOrchestratorSection(content, state, snapshot);
        break;
      case "agents":
        renderAgentsSection(content, state, snapshot);
        break;
      case "accounts":
        renderAccountsSection(content, state, settings);
        break;
    }
  } catch (error) {
    console.error(`Brain Console section ${activeSection} failed to render`, error);
    content.empty();
    const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
    renderCard(grid, `${activeSection} unavailable`, renderSectionFallbackCard(activeSection, error));
  }
}
function renderSectionFallbackCard(sectionId, error) {
  const container = document.createElement("div");
  container.addClass("brain-console__card-content");
  container.createEl("p", { text: `The ${sectionId} section could not render, so Brain Console kept the dashboard alive instead of crashing.` });
  container.createEl("p", { cls: "brain-console__detail", text: `Build: ${window.BRAIN_CONSOLE_BUILD_ID || "unknown"}` });
  container.createEl("p", { cls: "brain-console__detail", text: "Use Refresh after Brain Core is online. This section is read-only and no actions were executed." });
  if (error instanceof Error) {
    container.createEl("p", { cls: "brain-console__error-detail", text: error.message });
  }
  return container;
}
function safeText(value, fallback = "Unavailable") {
  return typeof value === "string" ? value : fallback;
}
function safeArray(value) {
  return Array.isArray(value) ? value : [];
}
function renderOverviewSection(content, state, snapshot) {
  const kpiRow = content.createDiv({ cls: "bc-kpi-row" });
  const online = snapshot.brainCoreOnline;
  const kpiCore = createStatCard(kpiRow, "Brain Core", online ? "Online" : "Offline", state.status?.version ?? void 0, online ? "ok" : "danger");
  kpiCore.setAttribute("data-section-id", "apps");
  kpiCore.style.cursor = "pointer";
  const kpiApprovals = createStatCard(kpiRow, "Approvals", String(snapshot.approvalsCount), snapshot.approvalsCount > 0 ? "need attention" : "all clear", snapshot.approvalsCount > 0 ? "warn" : "ok");
  kpiApprovals.setAttribute("data-section-id", "recovery");
  kpiApprovals.style.cursor = "pointer";
  createStatCard(kpiRow, "Scheduler", snapshot.schedulerHealthy ? "Healthy" : "Check", void 0, snapshot.schedulerHealthy ? "ok" : "warn");
  const kpiPipelines = createStatCard(kpiRow, "Pipelines", String(snapshot.pipelineCount), `${snapshot.pipelineCount} tracked`, "muted");
  kpiPipelines.setAttribute("data-section-id", "pipelines");
  kpiPipelines.style.cursor = "pointer";
  createStatCard(kpiRow, "Attention", snapshot.attentionLevel, `score ${snapshot.attentionScore}`, snapshot.attentionLevel === "clear" ? "ok" : snapshot.attentionLevel === "watch" ? "warn" : "danger");
  const kpiOrch = createStatCard(kpiRow, "Orchestrators", String(snapshot.orchestratorCount), `${snapshot.orchestratorCount} registered`, "muted");
  kpiOrch.setAttribute("data-section-id", "orchestrators");
  kpiOrch.style.cursor = "pointer";
  const focusGrid = content.createDiv({ cls: "bc-overview-focus-grid" });
  const attCard = focusGrid.createDiv({ cls: "bc-overview-card" });
  attCard.createEl("div", { cls: "bc-overview-card-title", text: "What Needs Attention" });
  const attBody = attCard.createDiv({ cls: "bc-overview-card-body" });
  if (snapshot.attentionLevel === "clear") {
    createStatusChip(attBody, "System clear", "ok");
  } else {
    const items = [];
    if (snapshot.approvalsCount > 0) items.push(`${snapshot.approvalsCount} approval${snapshot.approvalsCount > 1 ? "s" : ""} pending`);
    if (!snapshot.schedulerHealthy) items.push("Scheduler needs check");
    if (snapshot.migrationBlockedCount > 0) items.push(`${snapshot.migrationBlockedCount} migration blocker${snapshot.migrationBlockedCount > 1 ? "s" : ""}`);
    if (snapshot.postOrchestratorBlockedCount > 0) items.push(`${snapshot.postOrchestratorBlockedCount} post orchestrator blocked`);
    const show = items.slice(0, 5);
    for (const item of show) {
      const row = attBody.createDiv({ cls: "bc-overview-attention-item" });
      row.createEl("span", { cls: "bc-overview-bullet", text: "\u25B8" });
      row.createEl("span", { text: item });
    }
    if (items.length > 5) createStatusChip(attBody, `+${items.length - 5} more`, "muted");
  }
  const prodCard = focusGrid.createDiv({ cls: "bc-overview-card" });
  prodCard.createEl("div", { cls: "bc-overview-card-title", text: "Production State" });
  const prodBody = prodCard.createDiv({ cls: "bc-overview-card-body" });
  const stbHealth = snapshot.stbLiveStatusSummary?.health ?? snapshot.stbPipelineSummary?.health ?? "unknown";
  const stbStatus = snapshot.stbLiveStatusSummary?.status ?? snapshot.stbPipelineSummary?.status ?? "unknown";
  const stbAge = snapshot.stbLiveStatusSummary?.ageHours;
  const stbRow = prodBody.createDiv({ cls: "bc-overview-prod-row" });
  stbRow.createEl("span", { cls: "bc-overview-prod-label", text: "STB Pipeline" });
  createStatusChip(stbRow, stbStatus, stbHealth === "ok" ? "ok" : stbHealth === "warning" ? "warn" : "danger");
  if (stbAge !== void 0) stbRow.createEl("span", { cls: "bc-overview-prod-age", text: `${Math.round(stbAge)}h ago` });
  const voHealth = snapshot.videoOrchestratorSummary?.health ?? "unknown";
  const voStatus = snapshot.videoOrchestratorSummary?.status ?? "unknown";
  const voRow = prodBody.createDiv({ cls: "bc-overview-prod-row" });
  voRow.createEl("span", { cls: "bc-overview-prod-label", text: "Video Orchestrator" });
  createStatusChip(voRow, voStatus, voHealth === "ok" ? "ok" : voHealth === "warning" ? "warn" : "muted");
  if (snapshot.videoModuleProgressSummary) {
    const { percent, implemented, planned } = snapshot.videoModuleProgressSummary;
    createProgressBar(prodBody, percent, percent >= 80 ? "ok" : percent >= 40 ? "warn" : "danger");
    prodBody.createEl("span", { cls: "bc-overview-prod-age", text: `${implemented} impl \xB7 ${planned} planned` });
  }
  const nextStep = snapshot.postNextSafeStep || snapshot.nextAction;
  if (nextStep) {
    const nsRow = prodBody.createDiv({ cls: "bc-overview-prod-row bc-overview-prod-row--next" });
    nsRow.createEl("span", { cls: "bc-overview-prod-label", text: "Next step" });
    nsRow.createEl("span", { cls: "bc-overview-next-step", text: nextStep });
  }
  const migGrid = content.createDiv({ cls: "bc-overview-mig-grid" });
  const stbCard = migGrid.createDiv({ cls: "bc-overview-card" });
  stbCard.createEl("div", { cls: "bc-overview-card-title", text: "STB Daily Pipeline" });
  const stbBody = stbCard.createDiv({ cls: "bc-overview-card-body" });
  createStatusChip(stbBody, stbStatus, stbHealth === "ok" ? "ok" : stbHealth === "warning" ? "warn" : "danger");
  if (snapshot.stbPipelineSummary?.daysStale !== void 0 && snapshot.stbPipelineSummary.daysStale > 0) {
    stbBody.createEl("span", { cls: "bc-overview-prod-age", text: `${snapshot.stbPipelineSummary.daysStale}d stale` });
  }
  stbBody.createEl("div", { cls: "bc-overview-card-sub", text: "Legacy production pipeline \xB7 says-the-bible" });
  const voCard = migGrid.createDiv({ cls: "bc-overview-card" });
  voCard.createEl("div", { cls: "bc-overview-card-title", text: "Video Orchestrator" });
  const voBody = voCard.createDiv({ cls: "bc-overview-card-body" });
  createStatusChip(voBody, voStatus, voHealth === "ok" ? "ok" : "muted");
  if (snapshot.videoModuleProgressSummary) {
    const { percent, implemented, partial, planned } = snapshot.videoModuleProgressSummary;
    createProgressBar(voBody, percent, "ok");
    voBody.createEl("div", { cls: "bc-overview-card-sub", text: `${implemented} impl \xB7 ${partial} partial \xB7 ${planned} planned` });
  }
  const migCard = migGrid.createDiv({ cls: "bc-overview-card" });
  migCard.createEl("div", { cls: "bc-overview-card-title", text: "STB \u2192 Video Migration" });
  const migBody = migCard.createDiv({ cls: "bc-overview-card-body" });
  if (snapshot.stbToVideoMigrationSummary) {
    const { parityStatus, blocked } = snapshot.stbToVideoMigrationSummary;
    createStatusChip(migBody, parityStatus ?? "unknown", blocked ? "danger" : "ok");
  }
  if (snapshot.migrationParitySummary) {
    const { percent, mappedCount, totalCount } = snapshot.migrationParitySummary;
    createProgressBar(migBody, percent, percent >= 80 ? "ok" : "warn");
    migBody.createEl("div", { cls: "bc-overview-card-sub", text: `${mappedCount}/${totalCount} mapped` });
  }
  if (snapshot.migrationBlockedCount > 0) {
    createStatusChip(migBody, `${snapshot.migrationBlockedCount} blocker${snapshot.migrationBlockedCount > 1 ? "s" : ""}`, "danger");
  }
}
function renderAppsSection(content, state, snapshot, settings, onRefresh) {
  const page = content.createDiv({ cls: "brain-console__apps-page" });
  page.appendChild(renderLocalAppsCard(state, settings, onRefresh));
}
function renderSessionsSection(content, state) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  const sessionsCard = document.createElement("div");
  sessionsCard.addClass("brain-console__card-content");
  const sessions = safeArray(state.sessions);
  if (!sessions.length) {
    sessionsCard.createEl("p", { text: "No sessions found." });
    sessionsCard.createEl("p", { cls: "brain-console__detail", text: "Sessions appear once Brain Core has recorded at least one AI agent session." });
  } else {
    const list = sessionsCard.createDiv({ cls: "brain-console__list" });
    for (const s of sessions.slice(0, 20)) {
      const row = list.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: s.id ?? "unknown" });
      row.createEl("span", { cls: "brain-console__list-value", text: s.status ?? "" });
      row.createEl("span", { cls: "brain-console__detail", text: s.startedAt ? formatRelativeTime2(s.startedAt) : "" });
    }
    if (sessions.length > 20) {
      sessionsCard.createEl("p", { cls: "brain-console__detail", text: `${sessions.length - 20} more session(s) not shown.` });
    }
  }
  renderCard(grid, `Sessions (${sessions.length})`, sessionsCard);
  const schedulerCard = document.createElement("div");
  schedulerCard.addClass("brain-console__card-content");
  const jobs = safeArray(state.schedulerJobs);
  const sched = state.schedulerStatus;
  if (!sched) {
    schedulerCard.createEl("p", { text: "Scheduler status unavailable." });
  } else {
    renderCompactStatGrid(schedulerCard, [
      { label: "Scheduler", value: sched.running ? "Running" : "Stopped" },
      { label: "Jobs", value: String(jobs.length) },
      { label: "Last run", value: sched.lastRunAt ? formatRelativeTime2(sched.lastRunAt) : "never" }
    ]);
    for (const job of jobs.slice(0, 10)) {
      const row = schedulerCard.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: job.id ?? "unknown" });
      row.createEl("span", { cls: "brain-console__list-value", text: job.schedule ?? "" });
      row.createEl("span", { cls: "brain-console__detail", text: job.lastRunAt ? formatRelativeTime2(job.lastRunAt) : "never" });
    }
  }
  renderCard(grid, `Scheduler (${jobs.length} jobs)`, schedulerCard);
}
function renderInfraSection(content, state) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  const dokployCard = document.createElement("div");
  dokployCard.addClass("brain-console__card-content");
  const dok = state.infraDokploy;
  if (!dok || dok.status === "not-configured") {
    dokployCard.createEl("p", { text: dok?.error ?? "Dokploy not configured." });
    dokployCard.createEl("p", { cls: "brain-console__detail", text: "Set DOKPLOY_URL and DOKPLOY_API_KEY in ~/.config/dokploy/.env" });
  } else if (dok.status === "error") {
    dokployCard.createEl("p", { cls: "brain-console__error-detail", text: dok.error ?? "Dokploy error." });
  } else {
    renderCompactStatGrid(dokployCard, [
      { label: "Apps", value: String(dok.totalApps ?? 0) },
      { label: "Compose", value: String(dok.totalCompose ?? 0) }
    ]);
    const list = dokployCard.createDiv({ cls: "brain-console__list" });
    for (const app of safeArray(dok.apps).slice(0, 15)) {
      const row = list.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: app.name ?? "unknown" });
      row.createEl("span", { cls: "brain-console__list-value", text: app.status ?? "" });
      row.createEl("span", { cls: "brain-console__detail", text: app.type ?? "" });
    }
    if ((dok.apps?.length ?? 0) > 15) {
      dokployCard.createEl("p", { cls: "brain-console__detail", text: `${(dok.apps?.length ?? 0) - 15} more app(s).` });
    }
  }
  renderCard(grid, "Dokploy", dokployCard);
  const tunnelsCard = document.createElement("div");
  tunnelsCard.addClass("brain-console__card-content");
  const tun = state.infraTunnels;
  if (!tun || tun.status === "not-configured") {
    tunnelsCard.createEl("p", { text: tun?.error ?? "Cloudflare tunnels not configured." });
    tunnelsCard.createEl("p", { cls: "brain-console__detail", text: "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID." });
  } else if (tun.status === "error") {
    tunnelsCard.createEl("p", { cls: "brain-console__error-detail", text: tun.error ?? "Tunnels error." });
  } else {
    const tunnels = safeArray(tun.tunnels);
    tunnelsCard.createEl("p", { cls: "brain-console__detail", text: `${tunnels.length} active tunnel(s)` });
    const list = tunnelsCard.createDiv({ cls: "brain-console__list" });
    for (const t of tunnels.slice(0, 15)) {
      const row = list.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: t.name ?? "unknown" });
      row.createEl("span", { cls: "brain-console__list-value", text: t.status ?? "" });
    }
  }
  renderCard(grid, "Cloudflare Tunnels", tunnelsCard);
  const domainsCard = document.createElement("div");
  domainsCard.addClass("brain-console__card-content");
  const dom = state.infraDomains;
  if (!dom || dom.status === "not-configured") {
    domainsCard.createEl("p", { text: dom?.error ?? "Cloudflare domains not configured." });
    domainsCard.createEl("p", { cls: "brain-console__detail", text: "Set CLOUDFLARE_API_TOKEN." });
  } else if (dom.status === "error") {
    domainsCard.createEl("p", { cls: "brain-console__error-detail", text: dom.error ?? "Domains error." });
  } else {
    const domains = safeArray(dom.domains);
    domainsCard.createEl("p", { cls: "brain-console__detail", text: `${domains.length} domain(s) \xB7 sorted by soonest expiry` });
    const list = domainsCard.createDiv({ cls: "brain-console__list" });
    for (const d of domains.slice(0, 20)) {
      const row = list.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: d.name ?? "unknown" });
      row.createEl("span", { cls: "brain-console__list-value", text: d.status ?? "" });
      if (d.expiresAt) {
        row.createEl("span", { cls: "brain-console__detail", text: `expires ${formatRelativeTime2(d.expiresAt)}` });
      }
    }
    if (domains.length > 20) {
      domainsCard.createEl("p", { cls: "brain-console__detail", text: `${domains.length - 20} more domain(s).` });
    }
  }
  renderCard(grid, "Cloudflare Domains", domainsCard);
}
function renderAnalyticsSection(content, state) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  const umamiCard = document.createElement("div");
  umamiCard.addClass("brain-console__card-content");
  const umami = state.infraUmami;
  if (!umami || umami.status === "not-configured") {
    umamiCard.createEl("p", { text: umami?.error ?? "Umami analytics not configured." });
    umamiCard.createEl("p", { cls: "brain-console__detail", text: "Set UMAMI_URL and UMAMI_API_KEY (or UMAMI_USERNAME + UMAMI_PASSWORD)." });
  } else if (umami.status === "error") {
    umamiCard.createEl("p", { cls: "brain-console__error-detail", text: umami.error ?? "Umami error." });
  } else {
    const websites = safeArray(umami.websites);
    renderCompactStatGrid(umamiCard, [
      { label: "Sites", value: String(websites.length) }
    ]);
    const list = umamiCard.createDiv({ cls: "brain-console__list" });
    for (const site of websites.slice(0, 20)) {
      const row = list.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: site.name ?? "unknown" });
      const visitors = site.stats?.visitors ?? site.visitors;
      if (visitors != null) {
        row.createEl("span", { cls: "brain-console__list-value", text: `${visitors} visitors` });
      }
      const domain = site.domain;
      if (domain) {
        row.createEl("span", { cls: "brain-console__detail", text: domain });
      }
    }
    if (websites.length > 20) {
      umamiCard.createEl("p", { cls: "brain-console__detail", text: `${websites.length - 20} more site(s).` });
    }
  }
  renderCard(grid, "Umami Analytics", umamiCard);
  const adsCard = document.createElement("div");
  adsCard.addClass("brain-console__card-content");
  const ads = state.infraGoogleAds;
  if (!ads || ads.status === "not-configured") {
    adsCard.createEl("p", { text: ads?.error ?? "Google Ads data not configured." });
    adsCard.createEl("p", { cls: "brain-console__detail", text: "Google Ads SQLite DB expected at ~/Repos/stevewesthoek/brain/operations/google-ads/data/google_ads.sqlite3" });
  } else if (ads.status === "error") {
    adsCard.createEl("p", { cls: "brain-console__error-detail", text: ads.error ?? "Google Ads error." });
  } else {
    renderCompactStatGrid(adsCard, [
      { label: "Daily budget", value: ads.dailyBudgetUSD != null ? `$${ads.dailyBudgetUSD.toFixed(2)}` : "n/a" },
      { label: "Target budget", value: ads.targetBudgetUSD != null ? `$${ads.targetBudgetUSD.toFixed(2)}` : "n/a" },
      { label: "% of target", value: ads.percentOfTarget != null ? `${ads.percentOfTarget.toFixed(1)}%` : "n/a" },
      { label: "Day", value: ads.dayOfMonth != null ? `${ads.dayOfMonth}/${ads.daysInMonth}` : "n/a" },
      { label: "Pending mutations", value: String(ads.pendingMutations ?? 0) },
      { label: "Last sync", value: ads.lastSync ? formatRelativeTime2(ads.lastSync) : "never" },
      { label: "Last metrics", value: ads.lastMetricsDate ?? "n/a" }
    ]);
    if (ads.mutationStatsByStatus) {
      const stats = ads.mutationStatsByStatus;
      const list = adsCard.createDiv({ cls: "brain-console__list" });
      list.createEl("div", { cls: "brain-console__list-label", text: "Mutations by status" });
      for (const [k, v] of Object.entries(stats)) {
        const row = list.createDiv({ cls: "brain-console__list-row" });
        row.createEl("span", { cls: "brain-console__list-label", text: k });
        row.createEl("span", { cls: "brain-console__list-value", text: String(v) });
      }
    }
  }
  renderCard(grid, "Google Ads", adsCard);
  const costCard = document.createElement("div");
  costCard.addClass("brain-console__card-content");
  const cost = state.agentCostSummary;
  if (!cost) {
    costCard.createEl("p", { text: "Agent cost summary unavailable." });
    costCard.createEl("p", { cls: "brain-console__detail", text: "Check /agent-cost-summary on Brain Core." });
  } else {
    renderCompactStatGrid(costCard, [
      { label: "Today", value: `$${cost.todayEstimatedUsd.toFixed(2)}` },
      { label: "Week", value: `$${cost.weekEstimatedUsd.toFixed(2)}` },
      { label: "Month", value: `$${cost.monthEstimatedUsd.toFixed(2)}` },
      { label: "Local routes", value: String(cost.localRouteCount) },
      { label: "Escalations", value: String(cost.escalatedRouteCount) },
      { label: "Budget", value: cost.budget.status }
    ]);
    const list = costCard.createDiv({ cls: "brain-console__list" });
    for (const item of cost.topExpensiveTasks.slice(0, 10)) {
      const row = list.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: item.taskType });
      row.createEl("span", { cls: "brain-console__list-value", text: `${item.surface} \xB7 $${item.estimatedCostUsd.toFixed(4)}` });
      row.createEl("span", { cls: "brain-console__detail", text: item.routingReason });
    }
  }
  renderCard(grid, "Agent Cost Summary", costCard);
}
function renderStripeSection(content, state) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  const stripe = state.infraStripe;
  if (!stripe || stripe.status === "not-configured") {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    card.createEl("p", { text: stripe?.error ?? "Stripe not configured." });
    card.createEl("p", { cls: "brain-console__detail", text: "Create ~/.config/stripe/config.toml with profile sections." });
    renderCard(grid, "Stripe", card);
    return;
  }
  if (stripe.status === "error") {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    card.createEl("p", { cls: "brain-console__error-detail", text: stripe.error ?? "Stripe error." });
    renderCard(grid, "Stripe", card);
    return;
  }
  for (const account of safeArray(stripe.accounts)) {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    const rows = [];
    if (account.liveAvailableAmount != null) {
      const currency = (account.liveCurrency ?? "usd").toUpperCase();
      rows.push({ label: "Live available", value: `${account.liveAvailableAmount.toFixed(2)} ${currency}` });
      if (account.livePendingAmount != null) {
        rows.push({ label: "Live pending", value: `${account.livePendingAmount.toFixed(2)} ${currency}` });
      }
    } else {
      rows.push({ label: "Live balance", value: "n/a" });
    }
    if (account.testAvailableAmount != null) {
      rows.push({ label: "Test available", value: `${account.testAvailableAmount.toFixed(2)} (test)` });
    }
    if (account.error) {
      card.createEl("p", { cls: "brain-console__error-detail", text: account.error });
    }
    renderCompactStatGrid(card, rows);
    renderCard(grid, account.displayName || account.profileName, card);
  }
}
function renderMonitoringSection(content, state) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  const nr = state.infraNewRelic;
  if (!nr || nr.status === "not-configured") {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    card.createEl("p", { text: nr?.error ?? "New Relic not configured." });
    card.createEl("p", { cls: "brain-console__detail", text: "Use ~/.config/newrelic/.env or set NEW_RELIC_USER_API_KEY and NEW_RELIC_ACCOUNT_ID in the process env." });
    renderCard(grid, "New Relic", card);
    return;
  }
  if (nr.status === "error") {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    card.createEl("p", { cls: "brain-console__error-detail", text: nr.error ?? "New Relic error." });
    renderCard(grid, "New Relic", card);
    return;
  }
  const hostsCard = document.createElement("div");
  hostsCard.addClass("brain-console__card-content");
  const hosts = safeArray(nr.hosts);
  renderCompactStatGrid(hostsCard, [
    { label: "Hosts", value: String(hosts.length) }
  ]);
  const hostList = hostsCard.createDiv({ cls: "brain-console__list" });
  for (const h of hosts.slice(0, 20)) {
    const row = hostList.createDiv({ cls: "brain-console__list-row" });
    row.createEl("span", { cls: "brain-console__list-label", text: h.name ?? "unknown" });
    row.createEl("span", { cls: "brain-console__list-value", text: h.alertSeverity ?? "ok" });
    if (h.reportingStatus) {
      row.createEl("span", { cls: "brain-console__detail", text: h.reportingStatus });
    }
  }
  if (hosts.length > 20) {
    hostsCard.createEl("p", { cls: "brain-console__detail", text: `${hosts.length - 20} more host(s).` });
  }
  renderCard(grid, `Hosts (${hosts.length})`, hostsCard);
  const syntheticsCard = document.createElement("div");
  syntheticsCard.addClass("brain-console__card-content");
  const synthetics = safeArray(nr.synthetics);
  renderCompactStatGrid(syntheticsCard, [
    { label: "Monitors", value: String(synthetics.length) }
  ]);
  const synList = syntheticsCard.createDiv({ cls: "brain-console__list" });
  for (const s of synthetics.slice(0, 20)) {
    const row = synList.createDiv({ cls: "brain-console__list-row" });
    row.createEl("span", { cls: "brain-console__list-label", text: s.name ?? "unknown" });
    row.createEl("span", { cls: "brain-console__list-value", text: s.status ?? "" });
    if (s.type) {
      row.createEl("span", { cls: "brain-console__detail", text: s.type });
    }
  }
  if (synthetics.length > 20) {
    syntheticsCard.createEl("p", { cls: "brain-console__detail", text: `${synthetics.length - 20} more monitor(s).` });
  }
  renderCard(grid, `Synthetic Monitors (${synthetics.length})`, syntheticsCard);
}
function renderVideoOrchestratorSection(content, state) {
  const container = content.createDiv({ cls: "vo-studio-container" });
  const voShell = new VOShell(container, {
    projects: state.voStudioProjects?.items,
    accounts: state.voStudioAccounts?.items,
    pipelineProfiles: state.voStudioPipelineProfiles?.items,
    contentItems: state.voStudioContentItems?.items,
    scriptDrafts: state.videoOrchestratorScripts,
    scriptDraftsError: state.videoOrchestratorScriptsError,
    selector: state.aiModelSelectorStatus,
    analytics: state.voStudioAnalytics,
    accountStats: state.voAccountStats
  });
}
function renderVOContextBar(parent, state) {
  const project = state.voStudioProjects?.items?.[0];
  const profile = state.voStudioPipelineProfiles?.items?.find((item) => item.id === project?.defaultPipelineProfileId) ?? state.voStudioPipelineProfiles?.items?.[0];
  const accountCount = state.voStudioAccounts?.items?.length ?? 0;
  const targetText = profile?.targetPlatforms?.join(", ") ?? "not configured";
  const bar = parent.createDiv({ cls: "bc-vo-context-bar" });
  [
    ["Project", project?.name ?? "Unavailable"],
    ["Account", accountCount > 0 ? `${accountCount} configured` : "Unavailable"],
    ["Platform targets", targetText],
    ["Pipeline profile", profile?.name ?? "Unavailable"],
    ["Date range", "7d read-only"]
  ].forEach(([label, value]) => {
    const item = bar.createDiv({ cls: "bc-vo-context-item" });
    item.createEl("span", { cls: "bc-vo-context-label", text: label });
    item.createEl("span", { cls: "bc-vo-context-value", text: value });
  });
}
function renderVOPipelineProfileCard(state) {
  const card = document.createElement("div");
  card.addClass("brain-console__card-content");
  const profile = state.voStudioPipelineProfiles?.items?.[0];
  if (!profile) {
    card.createEl("p", { cls: "brain-console__empty", text: "No pipeline profile available." });
    return card;
  }
  const stageMap = card.createDiv({ cls: "bc-vo-stage-map" });
  for (const stage of profile.enabledStages) {
    const stageEl = stageMap.createDiv({ cls: `bc-vo-stage bc-vo-stage--${stage.status}` });
    stageEl.createEl("span", { text: stage.label });
  }
  renderCompactStatGrid(card, [
    { label: "Profile", value: profile.name },
    { label: "Targets", value: profile.targetPlatforms.join(", ") },
    { label: "Stages", value: String(profile.enabledStages.length) },
    { label: "Fallback", value: "manual package" }
  ]);
  card.createEl("p", { cls: "brain-console__detail", text: profile.fallbackBehavior });
  return card;
}
function renderVOAccountsRegistryCard(state) {
  const card = document.createElement("div");
  card.addClass("brain-console__card-content");
  const list = card.createDiv({ cls: "brain-console__list" });
  for (const account of state.voStudioAccounts?.items ?? []) {
    const row = list.createDiv({ cls: "brain-console__list-row" });
    row.createEl("span", { cls: "brain-console__list-label", text: `${account.handle} (${account.platform})` });
    row.createEl("span", { cls: "brain-console__list-value", text: account.adapterStatus });
    row.createEl("span", { cls: "brain-console__detail", text: `${account.credentialState} \xB7 quota ${account.quotaState}` });
  }
  if ((state.voStudioAccounts?.items?.length ?? 0) === 0) {
    card.createEl("p", { cls: "brain-console__empty", text: "No normalized VO accounts available." });
  }
  return card;
}
var _orchResearchState = { url: "", focus: "", result: null, error: null, running: false, phase: "idle", startedAt: 0, timerInterval: null };
var RESEARCH_HISTORY_KEY = "bc-orch-research-history";
function bcOrchLoadHistory() {
  try {
    return JSON.parse(localStorage.getItem(RESEARCH_HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function bcOrchSaveToHistory(result) {
  const entries = bcOrchLoadHistory();
  const entry = {
    title: result.title || result.url || "Untitled",
    url: result.url ?? "",
    savedAt: Date.now(),
    result
  };
  localStorage.setItem(RESEARCH_HISTORY_KEY, JSON.stringify([entry, ...entries].slice(0, 5)));
}
function renderOrchestratorsSection(content, state, _snapshot) {
  const styleId = "bc-orch-styles";
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = `
.bc-orch-section { display: flex; gap: 0; background: #1a1a1a; min-height: 400px; position: relative; }
.bc-orch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; width: 100%; transition: width 0.2s ease; box-sizing: border-box; }
.bc-orch-section--drawer-open .bc-orch-grid { width: 35%; }
.bc-orch-drawer-container { width: 0; overflow: hidden; transition: width 0.2s ease; background: #242424; border-left: 1px solid #3a3a3a; display: flex; flex-direction: column; }
.bc-orch-section--drawer-open .bc-orch-drawer-container { width: 65%; }
.bc-orch-drawer { display: none; flex-direction: column; height: 100%; overflow: hidden; }
.bc-orch-drawer--active { display: flex; }
.bc-orch-card { background: #2a2a2a; border: 1px solid #3a3a3a; border-radius: 6px; padding: 12px; display: flex; flex-direction: column; gap: 6px; font-family: monospace; transition: border-color 0.15s; }
.bc-orch-card:hover { border-color: #4a4a4a; }
.bc-orch-card-header { display: flex; align-items: center; gap: 6px; }
.bc-orch-card-title { font-size: 11px; font-weight: bold; color: #fff; letter-spacing: 0.5px; }
.bc-orch-card-stat { font-size: 11px; color: #888; }
.bc-orch-card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 6px; }
.bc-orch-health { display: flex; gap: 3px; align-items: center; }
.bc-orch-dot { width: 8px; height: 8px; border-radius: 50%; background: #555; display: inline-block; }
.bc-orch-dot--running { background: #3b82f6; animation: bc-orch-pulse 1.5s ease-in-out infinite; }
.bc-orch-dot--done { background: #2ecc71; }
.bc-orch-dot--partial { background: #e67e22; }
.bc-orch-dot--error { background: #e74c3c; }
@keyframes bc-orch-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
.bc-orch-open-btn { font-size: 10px; color: #888; background: none; border: 1px solid #3a3a3a; border-radius: 3px; padding: 2px 8px; cursor: pointer; font-family: monospace; }
.bc-orch-open-btn:hover { color: #fff; border-color: #888; }
.bc-orch-open-btn--active { color: #3b82f6; border-color: #3b82f6; }
.bc-orch-drawer-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1px solid #3a3a3a; flex-shrink: 0; }
.bc-orch-drawer-title { font-size: 12px; font-weight: bold; color: #fff; font-family: monospace; }
.bc-orch-drawer-close { background: none; border: none; color: #666; cursor: pointer; font-size: 16px; line-height: 1; padding: 0 4px; }
.bc-orch-drawer-close:hover { color: #fff; }
.bc-orch-drawer-body { padding: 14px; flex: 1; overflow-y: auto; font-family: monospace; font-size: 11px; color: #888; }
.bc-orch-split { display: flex; gap: 0; height: 100%; overflow: hidden; }
.bc-orch-split-left { padding: 14px; border-right: 1px solid #3a3a3a; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; flex-shrink: 0; }
.bc-orch-split-right { padding: 14px; flex: 1; overflow-y: auto; }
.bc-orch-label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
.bc-orch-input { width: 100%; background: #1a1a1a; border: 1px solid #3a3a3a; border-radius: 3px; color: #fff; font-family: monospace; font-size: 11px; padding: 6px 8px; box-sizing: border-box; resize: vertical; }
.bc-orch-input:focus { outline: none; border-color: #3b82f6; }
.bc-orch-btn { font-family: monospace; font-size: 11px; padding: 5px 12px; border-radius: 3px; cursor: pointer; border: 1px solid #3a3a3a; background: #333; color: #fff; }
.bc-orch-btn:hover { background: #3a3a3a; }
.bc-orch-btn--primary { background: #1d4ed8; border-color: #2563eb; }
.bc-orch-btn--primary:hover { background: #2563eb; }
.bc-orch-btn:disabled { opacity: 0.4; cursor: default; }
.bc-orch-output-empty { color: #555; font-style: italic; padding: 20px 0; }
.bc-orch-phase-grid { width: 100%; border-collapse: collapse; font-size: 10px; }
.bc-orch-phase-grid th { color: #666; font-weight: normal; padding: 4px 6px; text-align: center; border-bottom: 1px solid #3a3a3a; white-space: nowrap; }
.bc-orch-phase-grid td { padding: 4px 6px; text-align: center; border-bottom: 1px solid #2a2a2a; color: #888; }
.bc-orch-badge { display: inline-block; background: #333; border: 1px solid #3a3a3a; border-radius: 3px; padding: 2px 6px; font-size: 10px; color: #888; margin: 2px; }
.bc-orch-result-title { font-size: 13px; color: #fff; font-weight: bold; margin-bottom: 4px; }
.bc-orch-result-meta { color: #666; font-size: 10px; margin-bottom: 10px; }
.bc-orch-result-section { margin-bottom: 12px; }
.bc-orch-result-section-title { font-size: 10px; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.bc-orch-pre { background: #1a1a1a; border: 1px solid #3a3a3a; border-radius: 3px; padding: 8px; max-height: 200px; overflow-y: auto; white-space: pre-wrap; word-break: break-word; font-size: 10px; color: #aaa; line-height: 1.5; }
.bc-orch-claim { color: #aaa; padding: 2px 0; border-bottom: 1px solid #2a2a2a; }
.bc-orch-skeleton { background: #333; border-radius: 3px; height: 10px; margin: 4px 0; animation: bc-orch-shimmer 1.5s infinite; }
@keyframes bc-orch-shimmer { 0%{opacity:0.4;width:20%}50%{opacity:0.8;width:80%}100%{opacity:0.4;width:20%} }
.bc-orch-section-header { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.5px; padding: 6px 0; border-bottom: 1px solid #2a2a2a; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
    `;
    document.head.appendChild(styleEl);
  }
  const section = content.createDiv({ cls: "bc-orch-section" });
  const grid = section.createDiv({ cls: "bc-orch-grid" });
  const drawerContainer = section.createDiv({ cls: "bc-orch-drawer-container" });
  const DRAWER_KEY = "bc-orch-active-drawer";
  const openBtns = {};
  const drawers = {};
  function openDrawer(id) {
    localStorage.setItem(DRAWER_KEY, id);
    section.addClass("bc-orch-section--drawer-open");
    Object.keys(drawers).forEach((k) => {
      drawers[k].toggleClass("bc-orch-drawer--active", k === id);
    });
    Object.keys(openBtns).forEach((k) => {
      openBtns[k].toggleClass("bc-orch-open-btn--active", k === id);
    });
  }
  function closeDrawer() {
    localStorage.removeItem(DRAWER_KEY);
    section.removeClass("bc-orch-section--drawer-open");
    Object.keys(drawers).forEach((k) => {
      drawers[k].removeClass("bc-orch-drawer--active");
    });
    Object.keys(openBtns).forEach((k) => {
      openBtns[k].removeClass("bc-orch-open-btn--active");
    });
  }
  const vol = state.pipelinesLiveStatus?.videoOrchestrator;
  const biblePipelines = getBiblePipelineSummaries(state);
  function voStatus() {
    if (!vol) return "IDLE";
    if (vol.status === "active") return "RUNNING";
    if (vol.status === "error") return "ERROR";
    return "IDLE";
  }
  const videoBtn = bcOrchBuildCard(grid, {
    id: "video",
    title: "VIDEO ORCHESTRATOR",
    status: voStatus(),
    stats: [
      `Running jobs: ${vol?.queueDepth?.running ?? 0}`,
      `Active accounts: ${vol?.activeAccounts ?? 0}`
    ],
    healthDots: bcOrchHealthDots(voStatus()),
    onOpen: () => openDrawer("video")
  });
  openBtns["video"] = videoBtn;
  const researchBtn = bcOrchBuildCard(grid, {
    id: "research",
    title: "RESEARCH ORCHESTRATOR",
    status: "IDLE",
    stats: ["YouTube transcript: ready", "Video analysis: local Brain Core"],
    healthDots: [null, null, null, null, null],
    onOpen: () => openDrawer("research")
  });
  openBtns["research"] = researchBtn;
  const bibleBtn = bcOrchBuildCard(grid, {
    id: "bible",
    title: "BIBLE RESEARCH",
    status: "IDLE",
    stats: [`Pipelines: ${biblePipelines.length}`, `Primary: ${biblePipelines[0]?.name ?? "\u2014"}`],
    healthDots: [null, null, null, null, null],
    onOpen: () => openDrawer("bible")
  });
  openBtns["bible"] = bibleBtn;
  const designBtn = bcOrchBuildCard(grid, {
    id: "design",
    title: "DESIGN ORCHESTRATOR",
    status: "IDLE",
    stats: ["Skills ready: 8", "Last PRD: \u2014"],
    healthDots: [null, null, null, null, null],
    onOpen: () => openDrawer("design")
  });
  openBtns["design"] = designBtn;
  drawers["video"] = bcOrchBuildVideoDrawer(drawerContainer, vol, closeDrawer);
  drawers["research"] = bcOrchBuildResearchDrawer(drawerContainer, closeDrawer);
  drawers["bible"] = bcOrchBuildBibleDrawer(drawerContainer, state, closeDrawer);
  drawers["design"] = bcOrchBuildDesignDrawer(drawerContainer, closeDrawer);
  try {
    const saved = localStorage.getItem(DRAWER_KEY);
    if (saved && drawers[saved]) {
      openDrawer(saved);
    }
  } catch {
  }
}
function bcOrchBuildCard(parent, opts) {
  const card = parent.createDiv({ cls: "bc-orch-card" });
  const header = card.createDiv({ cls: "bc-orch-card-header" });
  const dot = header.createEl("span", { cls: "bc-orch-dot" });
  bcOrchApplyDotStatus(dot, opts.status);
  header.createEl("span", { cls: "bc-orch-card-title", text: opts.title });
  card.createEl("div", { cls: "bc-orch-card-stat", text: opts.stats[0] });
  card.createEl("div", { cls: "bc-orch-card-stat", text: opts.stats[1] });
  const footer = card.createDiv({ cls: "bc-orch-card-footer" });
  const health = footer.createDiv({ cls: "bc-orch-health" });
  opts.healthDots.forEach((s) => {
    const d = health.createEl("span", { cls: "bc-orch-dot" });
    bcOrchApplyDotStatus(d, s ?? "IDLE");
  });
  const btn = footer.createEl("button", { cls: "bc-orch-open-btn", text: "Open \u2192" });
  btn.addEventListener("click", opts.onOpen);
  return btn;
}
function bcOrchApplyDotStatus(el, status) {
  el.removeClass("bc-orch-dot--running");
  el.removeClass("bc-orch-dot--done");
  el.removeClass("bc-orch-dot--partial");
  el.removeClass("bc-orch-dot--error");
  if (status === "RUNNING") el.addClass("bc-orch-dot--running");
  else if (status === "DONE") el.addClass("bc-orch-dot--done");
  else if (status === "PARTIAL") el.addClass("bc-orch-dot--partial");
  else if (status === "ERROR") el.addClass("bc-orch-dot--error");
}
function bcOrchHealthDots(status) {
  if (status === "RUNNING") return ["DONE", "DONE", "RUNNING", null, null];
  if (status === "ERROR") return ["DONE", "ERROR", null, null, null];
  if (status === "PARTIAL") return ["DONE", "PARTIAL", null, null, null];
  return [null, null, null, null, null];
}
function getBiblePipelineSummaries(state) {
  return (state.pipelines ?? []).filter((pipeline) => {
    const searchable = [
      pipeline.id,
      pipeline.name,
      pipeline.description,
      ...pipeline.stages ?? [],
      pipeline.migration?.sourcePipelineId,
      pipeline.migration?.targetPipelineId
    ].filter(Boolean).join(" ").toLowerCase();
    return searchable.includes("bible") || searchable.includes("says the bible") || searchable.includes("stb");
  });
}
function bcOrchBuildDrawerShell(container, id, title, onClose) {
  const drawer = container.createDiv({ cls: "bc-orch-drawer" });
  drawer.dataset["orchId"] = id;
  const hdr = drawer.createDiv({ cls: "bc-orch-drawer-header" });
  hdr.createEl("span", { cls: "bc-orch-drawer-title", text: title });
  const closeBtn = hdr.createEl("button", { cls: "bc-orch-drawer-close", text: "\u2715" });
  closeBtn.addEventListener("click", onClose);
  const body = drawer.createDiv({ cls: "bc-orch-drawer-body" });
  body.style.padding = "0";
  body.style.overflow = "hidden";
  body.style.flex = "1";
  body.style.display = "flex";
  body.style.flexDirection = "column";
  return { drawer, body };
}
function bcOrchBuildVideoDrawer(container, vol, onClose) {
  const { drawer, body } = bcOrchBuildDrawerShell(container, "video", "VIDEO ORCHESTRATOR", onClose);
  const phases = ["\u{1F509} Audio", "\u{1F3AC} Comp", "CC", "\u{1F5BC} Thumb", "\u{1F50D} SEO", "\u{1F4E4} Pub", "\u{1F4CA} Analytics"];
  const wrap = body.createDiv();
  wrap.style.padding = "14px";
  wrap.style.overflowY = "auto";
  wrap.style.flex = "1";
  wrap.style.fontFamily = "monospace";
  wrap.style.fontSize = "11px";
  const statusLine = wrap.createDiv({ cls: "bc-orch-card-stat" });
  const voSt = vol?.status ?? "unknown";
  statusLine.textContent = `Status: ${voSt === "active" ? "RUNNING" : voSt === "error" ? "ERROR" : "IDLE"} \xB7 Running: ${vol?.queueDepth?.running ?? 0} \xB7 Pending: ${vol?.queueDepth?.pending ?? 0} \xB7 Accounts: ${vol?.activeAccounts ?? 0}`;
  statusLine.style.marginBottom = "12px";
  const table = wrap.createEl("table", { cls: "bc-orch-phase-grid" });
  const thead = table.createEl("thead");
  const headerRow = thead.createEl("tr");
  phases.forEach((ph) => headerRow.createEl("th", { text: ph }));
  const tbody = table.createEl("tbody");
  const dataRow = tbody.createEl("tr");
  phases.forEach((_ph) => {
    const td = dataRow.createEl("td");
    const dot = td.createEl("span", { cls: "bc-orch-dot", text: "" });
    dot.style.display = "inline-block";
    void dot;
  });
  return drawer;
}
function bcOrchBuildResearchDrawer(container, onClose) {
  const { drawer, body } = bcOrchBuildDrawerShell(container, "research", "RESEARCH ORCHESTRATOR", onClose);
  const split = body.createDiv({ cls: "bc-orch-split" });
  const left = split.createDiv({ cls: "bc-orch-split-left" });
  left.style.width = "25%";
  left.style.minWidth = "180px";
  left.createEl("div", { cls: "bc-orch-label", text: "YouTube URL" });
  const urlInput = left.createEl("input", { cls: "bc-orch-input" });
  urlInput.type = "text";
  urlInput.placeholder = "Click to paste\u2026";
  urlInput.value = _orchResearchState.url;
  urlInput.addEventListener("input", () => {
    _orchResearchState.url = urlInput.value;
  });
  urlInput.addEventListener("focus", async () => {
    if (!urlInput.value) {
      try {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          urlInput.value = text.trim();
          _orchResearchState.url = urlInput.value;
        }
      } catch {
      }
    }
  });
  left.createEl("div", { cls: "bc-orch-label", text: "Focus (optional)" });
  const focusInput = left.createEl("textarea", { cls: "bc-orch-input" });
  focusInput.rows = 3;
  focusInput.value = _orchResearchState.focus;
  focusInput.addEventListener("input", () => {
    _orchResearchState.focus = focusInput.value;
  });
  const modeRow = left.createDiv();
  modeRow.style.cssText = "display:flex;flex-direction:column;gap:4px;";
  left.createEl("div", { cls: "bc-orch-label", text: "Mode" });
  const modeVideoRow = modeRow.createDiv();
  modeVideoRow.style.cssText = "display:flex;align-items:center;gap:6px;font-size:11px;color:#ccc;cursor:pointer;";
  const modeVideoCb = modeVideoRow.createEl("input");
  modeVideoCb.type = "radio";
  modeVideoCb.name = "bc-orch-mode";
  modeVideoCb.value = "full";
  modeVideoCb.checked = true;
  modeVideoRow.createEl("span", { text: "\u{1F3AC} Video & Transcript" });
  modeVideoRow.addEventListener("click", () => {
    modeVideoCb.checked = true;
  });
  const modeTranscriptRow = modeRow.createDiv();
  modeTranscriptRow.style.cssText = "display:flex;align-items:center;gap:6px;font-size:11px;color:#888;cursor:pointer;";
  const modeTranscriptCb = modeTranscriptRow.createEl("input");
  modeTranscriptCb.type = "radio";
  modeTranscriptCb.name = "bc-orch-mode";
  modeTranscriptCb.value = "transcript";
  modeTranscriptRow.createEl("span", { text: "\u{1F4DD} Transcript only" });
  modeTranscriptRow.addEventListener("click", () => {
    modeTranscriptCb.checked = true;
  });
  left.appendChild(modeRow);
  const processBtn = left.createEl("button", { cls: "bc-orch-btn bc-orch-btn--primary", text: "\u25B6 Process" });
  processBtn.disabled = _orchResearchState.running;
  const right = split.createDiv({ cls: "bc-orch-split-right" });
  const historyBar = right.createDiv();
  historyBar.style.cssText = "border-bottom:1px solid #2a2a2a;padding-bottom:6px;margin-bottom:10px;";
  function renderHistoryBar() {
    historyBar.empty();
    const entries = bcOrchLoadHistory();
    if (entries.length === 0) return;
    const histHeader = historyBar.createDiv();
    histHeader.style.cssText = "font-size:10px;color:#555;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;";
    histHeader.textContent = "Recent";
    const list = historyBar.createDiv();
    list.style.cssText = "display:flex;flex-direction:column;gap:3px;";
    entries.forEach((entry) => {
      const row = list.createDiv();
      row.style.cssText = "display:flex;align-items:center;gap:8px;padding:4px 6px;border-radius:4px;cursor:pointer;transition:background 0.15s;";
      row.onmouseenter = () => {
        row.style.background = "#2a2a2a";
      };
      row.onmouseleave = () => {
        row.style.background = "transparent";
      };
      const label = row.createEl("span");
      label.style.cssText = "flex:1;font-size:11px;color:#aaa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
      label.textContent = entry.title;
      const ts = row.createEl("span");
      ts.style.cssText = "font-size:10px;color:#555;white-space:nowrap;font-family:monospace;";
      const d = new Date(entry.savedAt);
      ts.textContent = `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
      row.addEventListener("click", () => {
        _orchResearchState.result = entry.result;
        _orchResearchState.error = null;
        _orchResearchState.running = false;
        urlInput.value = entry.url;
        _orchResearchState.url = entry.url;
        renderOutput();
        renderHistoryBar();
      });
    });
  }
  renderHistoryBar();
  const outputArea = right.createDiv();
  function renderOutput() {
    outputArea.empty();
    if (_orchResearchState.running) {
      bcOrchRenderSkeletons(outputArea);
      return;
    }
    if (_orchResearchState.error) {
      outputArea.createEl("div", { cls: "bc-orch-output-empty", text: _orchResearchState.error });
      return;
    }
    if (_orchResearchState.result) {
      bcOrchRenderResult(outputArea, _orchResearchState.result);
      return;
    }
    outputArea.createEl("div", { cls: "bc-orch-output-empty", text: "Submit a YouTube URL to analyze" });
  }
  renderOutput();
  processBtn.addEventListener("click", async () => {
    const url = urlInput.value.trim();
    if (!url) {
      _orchResearchState.error = "Please enter a YouTube URL.";
      _orchResearchState.result = null;
      renderOutput();
      return;
    }
    _orchResearchState.running = true;
    _orchResearchState.phase = "call1";
    _orchResearchState.startedAt = Date.now();
    _orchResearchState.error = null;
    _orchResearchState.result = null;
    processBtn.disabled = true;
    if (_orchResearchState.timerInterval) {
      clearInterval(_orchResearchState.timerInterval);
      _orchResearchState.timerInterval = null;
    }
    renderOutput();
    _orchResearchState.timerInterval = setInterval(() => {
      if (_orchResearchState.running) {
        renderOutput();
      } else {
        if (_orchResearchState.timerInterval) {
          clearInterval(_orchResearchState.timerInterval);
          _orchResearchState.timerInterval = null;
        }
      }
    }, 1e3);
    try {
      const resp = await fetch("http://localhost:4877/research/video-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, focus: focusInput.value.trim() })
      });
      const data = await resp.json();
      if (!data.ok) {
        const errField = data.error;
        const errMsg = typeof errField === "string" ? errField : typeof errField === "object" && errField !== null ? errField.message ?? JSON.stringify(errField) : "Unknown error";
        _orchResearchState.error = `Error: ${errMsg}`;
        _orchResearchState.result = null;
      } else {
        _orchResearchState.result = data;
        _orchResearchState.error = null;
        bcOrchSaveToHistory(data);
      }
    } catch (_err) {
      _orchResearchState.error = "Brain Core offline or request failed.";
      _orchResearchState.result = null;
    } finally {
      _orchResearchState.running = false;
      _orchResearchState.phase = "done";
      if (_orchResearchState.timerInterval) {
        clearInterval(_orchResearchState.timerInterval);
        _orchResearchState.timerInterval = null;
      }
      processBtn.disabled = false;
      renderHistoryBar();
      renderOutput();
    }
  });
  return drawer;
}
function bcOrchRenderSkeletons(outputArea) {
  const elapsed = Math.floor((Date.now() - _orchResearchState.startedAt) / 1e3);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const elapsedStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  const estimatedTotal = 150;
  const pct = Math.min(95, Math.round(elapsed / estimatedTotal * 100));
  const phaseLabel = elapsed < 90 ? "Analyzing video structure, chapters & key moments\u2026" : "Transcribing speech\u2026";
  const statusRow = outputArea.createDiv();
  statusRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;";
  const statusLeft = statusRow.createEl("span");
  statusLeft.style.cssText = "font-size:11px;color:#3b82f6;";
  statusLeft.textContent = `\u27F3 ${phaseLabel}`;
  const statusRight = statusRow.createEl("span");
  statusRight.style.cssText = "font-size:11px;color:#888;font-family:monospace;";
  statusRight.textContent = `${elapsedStr} elapsed`;
  const barWrap = outputArea.createDiv();
  barWrap.style.cssText = "background:#1a1a1a;border-radius:3px;height:6px;margin-bottom:16px;overflow:hidden;border:1px solid #3a3a3a;";
  const barFill = barWrap.createDiv();
  barFill.style.cssText = `height:100%;background:#3b82f6;border-radius:3px;transition:width 1s linear;width:${pct}%;`;
  const phases = [
    { label: "STRUCTURE ANALYSIS", active: elapsed < 90, done: elapsed >= 90 },
    { label: "TRANSCRIPTION", active: elapsed >= 90, done: false },
    { label: "HUMAN SUMMARY", active: false, done: false },
    { label: "ACTIONS", active: false, done: false }
  ];
  phases.forEach((p) => {
    const sec = outputArea.createDiv({ cls: "bc-orch-result-section" });
    const hdr = sec.createDiv({ cls: "bc-orch-section-header" });
    hdr.createEl("span", { text: p.label });
    const badge = hdr.createEl("span", { cls: "bc-orch-badge" });
    if (p.done) {
      badge.textContent = "\u2713 done";
      badge.style.color = "#2ecc71";
      badge.style.borderColor = "#2ecc71";
    } else if (p.active) {
      badge.textContent = "\u27F3 running";
      badge.style.color = "#3b82f6";
      badge.style.borderColor = "#3b82f6";
    } else {
      badge.textContent = "pending";
    }
    const skelWrap = sec.createDiv();
    skelWrap.style.cssText = "background:#1a1a1a;border-radius:3px;height:4px;margin:6px 0;overflow:hidden;";
    if (p.active) {
      const skelFill = skelWrap.createDiv();
      skelFill.style.cssText = "height:100%;background:#3b82f6;opacity:0.5;animation:bc-orch-shimmer 2s infinite;width:60%;";
    }
  });
  const remaining = Math.max(0, estimatedTotal - elapsed);
  const remMins = Math.floor(remaining / 60);
  const remSecs = remaining % 60;
  const remStr = remaining > 5 ? `~${remMins > 0 ? remMins + "m " : ""}${remSecs}s remaining (estimate)` : "Almost done\u2026";
  const etaEl = outputArea.createEl("div");
  etaEl.style.cssText = "font-size:10px;color:#555;margin-top:8px;font-style:italic;";
  etaEl.textContent = remStr;
}
function bcOrchFoldableSection(parent, label, defaultOpen, buildContent) {
  const sec = parent.createDiv({ cls: "bc-orch-result-section" });
  sec.style.cssText = "border:1px solid #2a2a2a;border-radius:4px;margin-bottom:8px;overflow:hidden;";
  const hdr = sec.createDiv();
  hdr.style.cssText = "display:flex;align-items:center;justify-content:space-between;padding:7px 10px;cursor:pointer;background:#1e1e1e;user-select:none;";
  const hdrLeft = hdr.createDiv();
  hdrLeft.style.cssText = "display:flex;align-items:center;gap:6px;";
  const arrow = hdrLeft.createEl("span");
  arrow.style.cssText = "font-size:9px;color:#555;width:10px;display:inline-block;";
  arrow.textContent = defaultOpen ? "\u25BC" : "\u25B6";
  hdrLeft.createEl("span", { cls: "bc-orch-result-section-title", text: label });
  const copyBtn = hdr.createEl("button");
  copyBtn.style.cssText = "font-size:10px;color:#555;background:none;border:none;cursor:pointer;padding:2px 5px;border-radius:3px;transition:color 0.15s;";
  copyBtn.textContent = "copy";
  copyBtn.setAttribute("type", "button");
  copyBtn.onmouseenter = () => {
    copyBtn.style.color = "#aaa";
  };
  copyBtn.onmouseleave = () => {
    copyBtn.style.color = "#555";
  };
  const body = sec.createDiv();
  body.style.cssText = `padding:10px;background:#1a1a1a;${defaultOpen ? "" : "display:none;"}`;
  const copyText = buildContent(body);
  copyBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      copyBtn.textContent = "\u2713";
      setTimeout(() => {
        copyBtn.textContent = "copy";
      }, 1500);
    } catch {
    }
  });
  hdr.addEventListener("click", () => {
    const open = body.style.display !== "none";
    body.style.display = open ? "none" : "block";
    arrow.textContent = open ? "\u25B6" : "\u25BC";
  });
}
function bcOrchRenderResult(outputArea, data) {
  outputArea.createEl("div", { cls: "bc-orch-result-title", text: data.title ?? "Untitled" });
  const meta = outputArea.createEl("div", { cls: "bc-orch-result-meta" });
  const durSec = data.duration_seconds;
  const durStr = durSec ? `${Math.floor(durSec / 60)}m ${durSec % 60}s` : null;
  meta.textContent = [data.channel ?? null, durStr].filter(Boolean).join(" \xB7 ");
  const humanSummary = data.human_summary ?? data.humanSummary;
  if (humanSummary) {
    bcOrchFoldableSection(outputArea, "HUMAN SUMMARY", true, (body) => {
      body.createEl("div", { text: humanSummary });
      return humanSummary;
    });
  }
  const aiSummary = data.ai_summary ?? data.aiSummary;
  if (aiSummary) {
    const structured = aiSummary;
    let copyLines = [];
    bcOrchFoldableSection(outputArea, "AI SUMMARY", false, (body) => {
      if (structured.topic) {
        body.createEl("div", { cls: "bc-orch-claim", text: `Topic: ${structured.topic}` });
        copyLines.push(`Topic: ${structured.topic}`);
      }
      if (structured.speaker) {
        body.createEl("div", { cls: "bc-orch-claim", text: `Speaker: ${structured.speaker}` });
        copyLines.push(`Speaker: ${structured.speaker}`);
      }
      if (structured.evidence_type) {
        body.createEl("div", { cls: "bc-orch-claim", text: `Evidence: ${structured.evidence_type} \xB7 Confidence: ${structured.confidence ?? "\u2014"}` });
        copyLines.push(`Evidence: ${structured.evidence_type} \xB7 Confidence: ${structured.confidence ?? "\u2014"}`);
      }
      if (Array.isArray(structured.key_claims)) {
        const claimsWrap = body.createDiv();
        claimsWrap.style.marginTop = "6px";
        claimsWrap.createEl("div", { cls: "bc-orch-label", text: "Key claims" });
        structured.key_claims.forEach((c) => {
          claimsWrap.createEl("div", { cls: "bc-orch-claim", text: `\u2022 ${c}` });
          copyLines.push(`\u2022 ${c}`);
        });
      }
      if (Array.isArray(structured.research_hooks)) {
        const hooksWrap = body.createDiv();
        hooksWrap.style.marginTop = "6px";
        hooksWrap.createEl("div", { cls: "bc-orch-label", text: "Research hooks" });
        structured.research_hooks.forEach((h) => {
          hooksWrap.createEl("div", { cls: "bc-orch-claim", text: `\u2192 ${h}` });
          copyLines.push(`\u2192 ${h}`);
        });
      }
      const keyTs = data.key_timestamps;
      if (keyTs && Object.keys(keyTs).length > 0) {
        const tsWrap = body.createDiv();
        tsWrap.style.marginTop = "6px";
        tsWrap.createEl("div", { cls: "bc-orch-label", text: "Key timestamps" });
        Object.entries(keyTs).forEach(([desc, ts]) => {
          tsWrap.createEl("div", { cls: "bc-orch-claim", text: `[${ts}] ${desc}` });
          copyLines.push(`[${ts}] ${desc}`);
        });
      }
      return copyLines.join("\n") || null;
    });
  }
  const transcript = data.transcript_excerpt ?? data.transcript;
  if (transcript) {
    bcOrchFoldableSection(outputArea, "TRANSCRIPTION", false, (body) => {
      const pre = body.createEl("pre", { cls: "bc-orch-pre" });
      pre.style.maxHeight = "none";
      pre.textContent = transcript;
      return transcript;
    });
  }
  const usage = data.rate_limit_usage;
  if (usage) {
    const usageEl = outputArea.createEl("div", { cls: "bc-orch-result-meta" });
    usageEl.style.marginTop = "6px";
    usageEl.textContent = `Quota: ${usage.calls_today} calls today \xB7 ${usage.video_minutes_today} min used \xB7 ${usage.calls_remaining} remaining`;
  }
}
function bcOrchBuildBibleDrawer(container, state, onClose) {
  const { drawer, body } = bcOrchBuildDrawerShell(container, "bible", "BIBLE RESEARCH", onClose);
  const split = body.createDiv({ cls: "bc-orch-split" });
  const left = split.createDiv({ cls: "bc-orch-split-left" });
  left.style.width = "40%";
  const pipelines = getBiblePipelineSummaries(state);
  left.createEl("div", { cls: "bc-orch-section-header" }).createEl("span", { text: "PIPELINES" });
  if (pipelines.length === 0) {
    left.createEl("div", { cls: "bc-orch-output-empty", text: "No pipelines configured" });
  } else {
    pipelines.forEach((p) => {
      const row = left.createDiv({ cls: "bc-orch-card-stat" });
      row.textContent = `\u25B6 ${p.name ?? p.id}`;
      if (p.health || p.status) {
        row.title = [p.status, p.health].filter(Boolean).join(" \xB7 ");
      }
    });
  }
  const addBtn = left.createEl("button", { cls: "bc-orch-btn", text: "+ Add pipeline" });
  addBtn.style.marginTop = "auto";
  const right = split.createDiv({ cls: "bc-orch-split-right" });
  const histHdr = right.createDiv({ cls: "bc-orch-section-header" });
  histHdr.createEl("span", { text: "DOCUMENT HISTORY" });
  right.createEl("div", { cls: "bc-orch-output-empty", text: "No history yet" });
  const newHdr = right.createDiv({ cls: "bc-orch-section-header" });
  newHdr.style.marginTop = "12px";
  newHdr.createEl("span", { text: "NEW RESEARCH" });
  right.createEl("div", { cls: "bc-orch-label", text: "Pipeline" });
  const pipelineSelect = right.createEl("select", { cls: "bc-orch-input" });
  pipelineSelect.createEl("option", { text: "\u2014 select pipeline \u2014" });
  pipelines.forEach((p) => {
    const opt = pipelineSelect.createEl("option", { text: p.name ?? p.id });
    opt.value = p.id;
  });
  right.createEl("div", { cls: "bc-orch-label", text: "Prompt" });
  const promptArea = right.createEl("textarea", { cls: "bc-orch-input" });
  promptArea.rows = 4;
  const actionRow = right.createDiv();
  actionRow.style.display = "flex";
  actionRow.style.gap = "8px";
  actionRow.style.marginTop = "8px";
  const runBtn = actionRow.createEl("button", { cls: "bc-orch-btn bc-orch-btn--primary", text: "\u25B6 Run Pipeline" });
  const stopBtn = actionRow.createEl("button", { cls: "bc-orch-btn", text: "\u23F9 Stop current" });
  stopBtn.disabled = true;
  void addBtn;
  void runBtn;
  void stopBtn;
  void promptArea;
  void pipelineSelect;
  return drawer;
}
function bcOrchBuildDesignDrawer(container, onClose) {
  const { drawer, body } = bcOrchBuildDrawerShell(container, "design", "DESIGN ORCHESTRATOR", onClose);
  const split = body.createDiv({ cls: "bc-orch-split" });
  const left = split.createDiv({ cls: "bc-orch-split-left" });
  left.style.width = "40%";
  left.createEl("div", { cls: "bc-orch-section-header" }).createEl("span", { text: "CONVERSATION" });
  const botBubble = left.createDiv();
  botBubble.style.background = "#333";
  botBubble.style.border = "1px solid #3a3a3a";
  botBubble.style.borderRadius = "6px";
  botBubble.style.padding = "8px";
  botBubble.style.fontSize = "11px";
  botBubble.style.color = "#aaa";
  botBubble.textContent = "\u{1F916} What are you building?";
  const inputArea = left.createEl("textarea", { cls: "bc-orch-input" });
  inputArea.rows = 3;
  inputArea.placeholder = "Your answer\u2026";
  const sendBtn = left.createEl("button", { cls: "bc-orch-btn bc-orch-btn--primary", text: "Send \u21B5" });
  void sendBtn;
  const right = split.createDiv({ cls: "bc-orch-split-right" });
  const skillsHdr = right.createDiv({ cls: "bc-orch-section-header" });
  skillsHdr.createEl("span", { text: "ACTIVE SKILLS" });
  const badgeRow = right.createDiv();
  badgeRow.style.marginBottom = "12px";
  ["/design-system", "/web-design", "/taste-skill"].forEach((s) => {
    badgeRow.createEl("span", { cls: "bc-orch-badge", text: s });
  });
  const prdHdr = right.createDiv({ cls: "bc-orch-section-header" });
  prdHdr.createEl("span", { text: "PRD" });
  const fields = [
    ["Project type", "(pending)"],
    ["Scenario", "(pending)"],
    ["Audience", "(pending)"],
    ["Tone", "(pending)"],
    ["Goal", "(pending)"]
  ];
  fields.forEach(([label, val]) => {
    const row = right.createDiv();
    row.style.display = "flex";
    row.style.gap = "8px";
    row.style.marginBottom = "4px";
    row.style.fontSize = "11px";
    row.createEl("span", { text: label + ":" }).style.color = "#666";
    row.createEl("span", { text: val }).style.color = "#555";
  });
  const exportRow = right.createDiv();
  exportRow.style.display = "flex";
  exportRow.style.gap = "8px";
  exportRow.style.marginTop = "16px";
  const exportBtn = exportRow.createEl("button", { cls: "bc-orch-btn", text: "\u2197 Export PRD" });
  const genBtn = exportRow.createEl("button", { cls: "bc-orch-btn bc-orch-btn--primary", text: "\u25B6 Generate DESIGN.md" });
  exportBtn.disabled = true;
  genBtn.disabled = true;
  void inputArea;
  void exportBtn;
  void genBtn;
  return drawer;
}
function renderPipelinesSection(content, state, snapshot) {
  renderVOContextBar(content, state);
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(grid, "Pipeline Profile", renderVOPipelineProfileCard(state), { wide: true });
  const ps = state.pipelinesLiveStatus;
  if (ps) {
    renderGroupedSummary(grid, "Live Pipeline Status", [
      { title: "STB \u2014 Says the Bible", render: renderStbLiveCard(ps.stb) },
      { title: "Video Orchestrator Live", render: renderVOLivePipelineCard(ps.videoOrchestrator) }
    ]);
  }
  renderGroupedSummary(grid, "Pipeline Overview", [
    { title: "Pipeline Overview", render: renderPipelineOverviewCard(state) },
    { title: "Video Orchestrator", render: renderVideoOrchestratorPipelineCard(state) },
    { title: "Provider Planning", render: renderProviderPlanningPipelineCard(state) },
    { title: "Controlled Execution", render: renderControlledExecutionPipelineCard(state) },
    { title: "STB / Video Migration", render: renderStbVideoMigrationPipelineCard(state) },
    { title: "Safety Summary", render: renderSafetySummaryCard() }
  ]);
  const accounts = state.voAccounts;
  if (accounts?.ok && accounts.accounts.length > 0) {
    const accContent = document.createElement("div");
    accContent.addClass("brain-console__card-content");
    const accList = accContent.createDiv({ cls: "brain-console__list" });
    for (const acc of accounts.accounts) {
      const row = accList.createDiv({ cls: "brain-console__list-row" });
      const statusDot = acc.accountStatus === "active" ? "\u{1F7E2}" : "\u{1F534}";
      const authBadge = acc.authMethod === "oauth2" ? "\u{1F511}" : acc.authMethod === "api_key" ? "\u{1F5DD}\uFE0F" : "\u270F\uFE0F";
      row.createEl("span", { cls: "brain-console__list-label", text: `${statusDot} ${acc.accountHandle} (${acc.platform})` });
      row.createEl("span", { cls: "brain-console__list-value", text: authBadge });
    }
    renderCard(grid, `VO Accounts (${accounts.accounts.length})`, accContent);
  }
  const authStatus = state.voAuthStatus;
  if (authStatus?.ok && authStatus.accounts.length > 0) {
    const authContent = document.createElement("div");
    authContent.addClass("brain-console__card-content");
    const authList = authContent.createDiv({ cls: "brain-console__list" });
    for (const account of authStatus.accounts) {
      const row = authList.createDiv({ cls: "brain-console__list-row" });
      const badge = account.authMethod === "oauth2" ? "\u{1F511}" : "\u270F\uFE0F";
      const readiness = account.authMethod === "oauth2" ? account.oauthReady ? `ready${account.tokenExpiry ? ` \xB7 ${formatRelativeTime2(account.tokenExpiry)}` : ""}` : "token missing" : account.authMethod;
      row.createEl("span", { cls: "brain-console__list-label", text: `${badge} ${account.handle} (${account.platform})` });
      row.createEl("span", { cls: "brain-console__list-value", text: readiness });
    }
    if (authStatus.accounts.some((account) => account.authMethod === "manual")) {
      authContent.createEl("p", {
        cls: "brain-console__detail",
        text: "Run vo accounts auth-url --account <handle> to connect OAuth2."
      });
    }
    renderCard(grid, "VO Auth Status", authContent);
  }
}
function renderStbLiveCard(stb) {
  const el = document.createElement("div");
  el.className = "brain-console__card-content";
  if (!stb) {
    el.createEl("div", { cls: "brain-console__list-sub", text: "Status unavailable" });
    return el;
  }
  const statusText = stb.status === "running" ? "\u{1F7E2} running" : stb.status === "stopped" ? "\u{1F534} stopped" : "\u26AA unknown";
  renderCompactStatGrid(el, [
    { label: "Status", value: statusText },
    { label: "Health", value: stb.health },
    { label: "Port", value: String(stb.port) }
  ]);
  el.createEl("div", { cls: "brain-console__list-sub", text: "\u26A0 Stage 0 \u2014 read-only visibility. STB is unchanged." });
  el.createEl("div", { cls: "brain-console__list-sub", text: `Checked: ${stb.lastChecked?.slice(0, 19) ?? "\u2014"}` });
  return el;
}
function renderVOLivePipelineCard(vo) {
  const el = document.createElement("div");
  el.className = "brain-console__card-content";
  if (!vo) {
    el.createEl("div", { cls: "brain-console__list-sub", text: "Status unavailable" });
    return el;
  }
  const dead = vo.queueDepth?.dead ?? 0;
  renderCompactStatGrid(el, [
    { label: "Status", value: vo.status },
    { label: "Pending", value: String(vo.queueDepth?.pending ?? 0) },
    { label: "Running", value: String(vo.queueDepth?.running ?? 0) },
    { label: "Failed", value: String(vo.queueDepth?.failed ?? 0) },
    { label: "Dead", value: String(dead) },
    { label: "Active accounts", value: String(vo.activeAccounts ?? 0) },
    { label: "Last job", value: vo.lastJobAt ? formatRelativeTime2(vo.lastJobAt) : "\u2014" }
  ]);
  if (dead > 0) {
    el.createEl("div", { cls: "brain-console__warning", text: `${dead} dead jobs \u2014 run: vo jobs to inspect` });
  }
  return el;
}
function renderProjectsSection(content, state, snapshot) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(grid, "Projects & Roadmaps", renderBrainnOSRoadmapsCard());
  renderCard(grid, "Projects", renderProjectsCard(state, snapshot));
  renderCard(grid, "Platforms", renderPlatformsCard(state, snapshot));
}
function renderReportsSection(content, state, snapshot, settings, onRefresh) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(grid, "Reports & System Health", renderReportsSectionIntro(state), { wide: true, subtitle: "Runtime diagnostics, AI model selector, local app health, and wiki availability." });
  renderCard(grid, "Runtime Reports", renderRuntimeReportsCard(state), { status: runtimeReportsStatus(state), tone: runtimeReportsTone(state), subtitle: "What the Brain Core payload exposed in this refresh." });
  renderCard(grid, "AI Model Selector", renderAiModelSelectorCard(state, settings, onRefresh), { status: aiModelSelectorDisplayStatus(state), tone: aiModelSelectorTone(state), subtitle: "AI routing service at localhost:4890. Start, stop, and monitor provider health." });
  renderCard(grid, "Wiki Health", renderWikiHealthCard(state), { status: wikiHealthStatus(state), tone: wikiHealthTone(state), subtitle: "Wiki availability and warning counts." });
  renderCard(grid, "Diagnostics", renderReportsDiagnosticsCard(state), { wide: true, subtitle: "Connection and payload verification." });
  if (state.maintenancePreviewDetail) {
    renderCard(grid, "Maintenance Preview", renderMaintenancePreviewDetailCard(state.maintenancePreviewDetail), { subtitle: "Read-only maintenance data." });
  }
  if (state.approvalDetail) {
    renderCard(grid, "Approval Details", renderApprovalDetailCard(state.approvalDetail), { subtitle: "Latest approval record in payload." });
  }
}
function renderPostOrchestratorSection(content, state, snapshot) {
  const grid = content.createDiv({ cls: "brain-console__post-section" });
  renderPostGroup(grid, "Status", [
    { title: "Overview", render: renderPostOrchestratorOverviewCard(state) },
    { title: "Post Orchestrator Status", render: renderPostOrchestratorStatusCard(state) },
    { title: "Brain Console QA Status", render: renderBrainConsoleQaStatusCard(state) },
    { title: "Visual QA Checklist", render: renderVisualQaChecklistCard(state) }
  ]);
  renderPostGroup(grid, "Flow Preview", [
    { title: "Platform / Post Flows", render: renderPlatformPostFlowsCard(state) },
    { title: "Event Fixtures", render: renderPostEventFixturesCard(state) },
    { title: "Dry-Run Plan", render: renderPostDryRunPlanCard(state) },
    { title: "Draft Plan Rows", render: renderPostDryRunDraftRowsCard(state) },
    { title: "Draft Fixtures / Preview Examples", render: renderDraftFixturesCard(state) }
  ]);
  renderPostGroup(grid, "Review / Schedule", [
    { title: "Draft Review Queue", render: renderPostDraftReviewQueueCard(state) },
    { title: "Schedule Preview Queue", render: renderPostSchedulePreviewQueueCard(state) },
    { title: "Manual Export Preview", render: renderPostManualExportCard(state) }
  ]);
  renderPostGroup(grid, "Safety / Policy", [
    { title: "Readiness / Quality Score", render: renderPostReadinessScoreCard(state) },
    { title: "Platform Policy / Security Review", render: renderPostPlatformPolicyCard(state) },
    { title: "Operator Guidance", render: renderPostOperatorGuidanceCard(state) },
    { title: "Acceptance Checklist", render: renderPostAcceptanceChecklistCard(state) },
    { title: "Safety State", render: renderSafetyStateCard(state) }
  ]);
  renderPostGroup(grid, "Migration / Checkpoint", [
    { title: "Migration Parity Report", render: renderPostMigrationParityReportCard(state) },
    { title: "Decommission Readiness Matrix", render: renderPostDecommissionReadinessCard(state) },
    { title: "Roadmap Checkpoint", render: renderPostRoadmapCheckpointCard(state) },
    { title: "Contracts", render: renderPostContractsCard(state) },
    { title: "Recovery / Blockers", render: renderPostRecoveryCard(state) },
    { title: "Analytics Feedback Fixtures", render: renderPostAnalyticsFixturesCard(state) },
    { title: "End-to-End Pipeline Summary", render: renderPostPipelineSummaryCard(state) }
  ]);
  renderCard(grid, "Publishing Disabled", renderPublishingDisabledCard());
}
function renderPostGroup(parent, title, cards) {
  const section = parent.createDiv({ cls: "brain-console__post-group" });
  section.createEl("h4", { cls: "brain-console__post-group-title", text: title });
  const grid = section.createDiv({ cls: "brain-console__post-group-grid" });
  for (const card of cards) {
    renderCard(grid, card.title, card.render);
  }
}
function renderAgentsSection(content, state, snapshot) {
  const intro = content.createDiv({ cls: "brain-console__section-intro" });
  intro.createEl("p", {
    cls: "brain-console__detail",
    text: "Agent orchestration, task graph, approval gates, and cost tracking."
  });
  if (state.agentConsole) {
    const kpiDiv = content.createDiv({ cls: "bc-kpi-row" });
    renderCompactStatGrid(kpiDiv, [
      { label: "Active Runs", value: String(state.agentConsole.activeRunCount ?? 0) },
      { label: "Blocked Runs", value: String(state.agentConsole.blockedRunCount ?? 0) },
      { label: "Pending Approvals", value: String(state.agentConsole.approvalPendingCount ?? 0) },
      {
        label: "Tasks Done",
        value: `${state.agentConsole.taskGraph?.completedCount ?? 0}/${state.agentConsole.taskGraph?.taskCount ?? 0}`
      },
      { label: "Cost Today", value: formatCostUsd(state.agentCostSummary?.todayEstimatedUsd ?? 0) }
    ]);
  }
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(grid, "Task Graph", renderAgentTaskGraphCard(state));
  renderCard(grid, "Approval Gates", renderApprovalGatesCard(state));
  renderCard(grid, "Agent Registry", renderAgentViewCard(state, snapshot));
  renderCard(grid, "Run History", renderAgentViewLedgerCard(state));
  renderCard(grid, "Cost Summary", renderAgentCostCard(state));
  renderCard(grid, "Recovery / Blockers", renderRecoveryPanelCard(state));
}
function renderReportsSectionIntro(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  container.createEl("p", {
    cls: "brain-console__detail",
    text: "Runtime diagnostics, Mind Steward state, local app health, and wiki availability."
  });
  renderCompactStatGrid(container, [
    { label: "Build", value: safeText(window.BRAIN_CONSOLE_BUILD_ID, "unknown") },
    { label: "View mode", value: "Main workspace dashboard" },
    { label: "Connection", value: state.status?.ok ? "Connected" : "Offline" }
  ]);
  return container;
}
function renderPipelineOverviewCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  const available = countAvailable(state.pipelines, state.videoOrchestratorStatus, state.stbStatus, state.videoProductionGate);
  const unavailable = 4 - available;
  renderCompactStatGrid(container, [
    { label: "Brain Core", value: state.status?.ok === true ? "Connected" : "Offline" },
    { label: "Available", value: String(available) },
    { label: "Unavailable", value: String(Math.max(unavailable, 0)) },
    { label: "Status", value: statValue(state.pipelines?.[0]?.status, "Not reported") }
  ]);
  return container;
}
function renderVideoOrchestratorPipelineCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  const summary = state.videoOrchestratorStatus?.moduleProgress;
  renderCompactStatGrid(container, [
    { label: "Status", value: statValue(state.videoOrchestratorStatus?.status, "Unavailable") },
    { label: "Readiness", value: summary?.percent !== void 0 ? `${summary.percent}%` : "Not reported" },
    { label: "Blockers", value: String(state.videoOrchestratorStatus?.modules?.filter((module2) => module2?.status === "blocked").length ?? 0) },
    { label: "Next safe step", value: statValue(state.videoProductionGate?.gate?.summary?.nextSafeStep, "Not reported") }
  ]);
  return container;
}
function renderProviderPlanningPipelineCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  renderCompactStatGrid(container, [
    { label: "Planning surface", value: statValue(state.videoProviderPlanningSurfaceIndex?.index?.status, "Unavailable") },
    { label: "Wrapper status", value: statValue(state.videoProviderWrapperSecurityReviewPlan?.plan?.status, "Unavailable") },
    { label: "Approval packet", value: statValue(state.videoProviderImplementationApprovalPacket?.packet?.status, "Unavailable") },
    { label: "Readiness", value: statValue(state.videoProviderImplementationReadinessDashboardSummary?.dashboard?.status, "Not reported") }
  ]);
  return container;
}
function renderControlledExecutionPipelineCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  renderCompactStatGrid(container, [
    { label: "Policy boundary", value: statValue(state.videoControlledExecutionPolicyBoundary?.boundary?.status, "Unavailable") },
    { label: "Disabled gate", value: statValue(state.videoControlledExecutionDisabledGate?.gate?.status, "Unavailable") },
    { label: "Readiness index", value: statValue(state.videoControlledExecutionReadinessIndex?.index?.status, "Unavailable") },
    { label: "Second approval", value: statValue(state.videoControlledExecutionSecondApprovalPolicy?.policy?.status, "Unavailable") }
  ]);
  return container;
}
function renderStbVideoMigrationPipelineCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  renderCompactStatGrid(container, [
    { label: "Migration", value: statValue(state.stbVideoMigrationStatus?.status, "Unavailable") },
    { label: "Parity", value: state.stbVideoParityMatrix?.summary ? `${state.stbVideoParityMatrix.summary.parityPercent}%` : "Unavailable" },
    { label: "Dual-run", value: statValue(state.stbVideoDualRunStatus?.status, "Unavailable") },
    { label: "Production gate", value: statValue(state.videoProductionGate?.gate?.status, "Unavailable") }
  ]);
  return container;
}
function renderSafetySummaryCard() {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  renderCompactStatGrid(container, [
    { label: "Execution", value: "Disabled" },
    { label: "Writes", value: "Blocked" },
    { label: "Publishing", value: "Disabled" },
    { label: "Decommission", value: "Not active" }
  ]);
  container.createEl("p", { cls: "brain-console__detail", text: "Read-only dashboard only. No mutation controls or POST routes." });
  return container;
}
function renderReportsDiagnosticsCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  renderCompactStatGrid(container, [
    { label: "Brain Core URL", value: statValue(state.brainCoreUrl, "Unknown") },
    { label: "Selected URL", value: statValue(window.BRAIN_CONSOLE_SELECTED_URL, statValue(state.brainCoreUrl, "Unknown")) },
    { label: "Online", value: state.status?.ok ? "yes" : "no" },
    { label: "Build marker", value: safeText(window.BRAIN_CONSOLE_BUILD_ID, "unknown") }
  ]);
  container.appendChild(renderSafetyLabel("Read-only \xB7 no writes \xB7 no mutations \xB7 no publishing"));
  return container;
}
function renderCard(parent, title, content, options) {
  const card = parent.createDiv({ cls: "brain-console__card" });
  if (options?.wide) card.addClass("brain-console__card--wide");
  const header = card.createDiv({ cls: "brain-console__card-header" });
  const titleWrap = header.createDiv({ cls: "brain-console__card-title-wrap" });
  titleWrap.createEl("h3", { cls: "brain-console__card-title", text: title });
  if (options?.subtitle) {
    titleWrap.createEl("p", { cls: "brain-console__card-subtitle", text: options.subtitle });
  }
  if (options?.status) {
    const badge = header.createEl("span", { cls: "brain-console__badge", text: options.status });
    if (options.tone) badge.addClass(`brain-console__badge--${options.tone}`);
  }
  const body = card.createDiv({ cls: "brain-console__card-body" });
  body.appendChild(content);
}
function renderCompactStatGrid(container, rows) {
  const grid = container.createDiv({ cls: "brain-console__stat-grid" });
  rows.forEach(({ label, value }) => {
    const stat = grid.createDiv({ cls: "brain-console__stat" });
    stat.createEl("span", { cls: "brain-console__stat-label", text: label });
    stat.createEl("span", { cls: "brain-console__stat-value", text: value });
  });
}
function renderCardSectionHeading(container, title, subtitle) {
  const heading = container.createDiv({ cls: "brain-console__section-heading-wrap" });
  heading.createEl("div", { cls: "brain-console__section-heading", text: title });
  heading.createEl("div", { cls: "brain-console__section-subheading", text: subtitle });
}
function renderGroupedSummary(parent, title, cards) {
  const card = parent.createDiv({ cls: "brain-console__card brain-console__card--grouped" });
  const header = card.createDiv({ cls: "brain-console__card-header" });
  header.createEl("h3", { text: title });
  const grid = card.createDiv({ cls: "brain-console__grouped-grid" });
  for (const entry of cards) {
    renderCard(grid, entry.title, entry.render);
  }
}
function statValue(value, fallback = "Unavailable") {
  if (value === void 0 || value === null || value === "") return fallback;
  return String(value);
}
function countAvailable(...values) {
  return values.filter((value) => value !== void 0 && value !== null).length;
}
function renderStatusBadge(label, tone = "muted") {
  const badge = document.createElement("span");
  badge.className = `brain-console__badge brain-console__badge--${tone}`;
  badge.textContent = label;
  return badge;
}
function createStatCard(parent, label, value, sub, tone) {
  const card = parent.createDiv({ cls: "bc-stat-card" });
  if (tone) card.addClass(`bc-stat-card--${tone}`);
  card.createEl("div", { cls: "bc-stat-label", text: label });
  card.createEl("div", { cls: "bc-stat-value", text: value });
  if (sub) card.createEl("div", { cls: "bc-stat-sub", text: sub });
  return card;
}
function createStatusChip(parent, label, tone) {
  const chip = parent.createEl("span", { cls: `bc-chip bc-chip--${tone}`, text: label });
  return chip;
}
function createProgressBar(parent, pct, tone) {
  const bar = parent.createDiv({ cls: "bc-bar" });
  const fill = bar.createDiv({ cls: "bc-bar-fill" });
  fill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  if (tone) fill.style.backgroundColor = tone === "ok" ? "var(--bc-green)" : tone === "warn" ? "var(--bc-yellow)" : "var(--bc-red)";
  return bar;
}
function reportLabel(id) {
  switch (id) {
    case "mind-steward":
      return "Mind Steward";
    case "approval-audit":
      return "Approval audit";
    case "local-apps":
      return "Local apps";
    case "video":
      return "Video";
    default:
      return id;
  }
}
function runtimeReportsStatus(state) {
  const total = state.runtimeReports?.length ?? 0;
  const available = state.runtimeReports?.filter((report) => report.status === "available").length ?? 0;
  if (total === 0) return "Not reported";
  if (available === total) return "available";
  if (available > 0) return "partial";
  return "not reported";
}
function runtimeReportsTone(state) {
  const status = runtimeReportsStatus(state);
  if (status === "available") return "ok";
  if (status === "partial") return "warn";
  return "muted";
}
function aiModelSelectorDisplayStatus(state) {
  const s = state.aiModelSelectorStatus;
  if (!s) return "Not checked";
  if (s.running && s.healthy) return "Running";
  if (s.running && !s.healthy) return "Degraded";
  return "Stopped";
}
function aiModelSelectorTone(state) {
  const s = state.aiModelSelectorStatus;
  if (!s) return "muted";
  if (s.running && s.healthy) return "ok";
  if (s.running && !s.healthy) return "warn";
  return "danger";
}
function wikiHealthStatus(state) {
  const report = state.runtimeReports?.find((r) => r.id === "mind-steward");
  if (!report?.wikiHealth) return "Not reported";
  return report.wikiHealth.ok ? "healthy" : "needs attention";
}
function wikiHealthTone(state) {
  const report = state.runtimeReports?.find((r) => r.id === "mind-steward");
  if (!report?.wikiHealth) return "muted";
  return report.wikiHealth.ok ? "ok" : "warn";
}
function renderSafetyLabel(text) {
  const label = document.createElement("div");
  label.className = "brain-console__post-safe-note";
  label.textContent = text;
  return label;
}
function renderEmptyState(message, detail) {
  const el = document.createElement("div");
  el.createEl("div", { cls: "brain-console__list-note", text: message });
  if (detail) {
    el.createEl("div", { cls: "brain-console__list-sub", text: detail });
  }
  return el;
}
function renderWikiHealthCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  const mrReport = state.runtimeReports?.find((r) => r.id === "mind-steward");
  if (!mrReport?.wikiHealth) {
    container.appendChild(renderEmptyState("Wiki health is not reported in the current dashboard payload.", "Check Brain Core route wiring."));
    return container;
  }
  const health = mrReport.wikiHealth;
  const badgeTone = health.ok ? "ok" : "warn";
  container.appendChild(renderStatusBadge(health.ok ? "Healthy" : "Needs attention", badgeTone));
  renderCompactStatGrid(container, [
    { label: "Warnings", value: String(health.warningCount ?? 0) },
    { label: "Errors", value: String(health.errorCount ?? 0) }
  ]);
  container.createEl("p", {
    cls: "brain-console__detail",
    text: health.ok ? "Wiki is available." : "Wiki has warnings or errors in the current payload."
  });
  return container;
}
function renderRuntimeReportsCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  if (!state.runtimeReports || state.runtimeReports.length === 0) {
    container.appendChild(renderEmptyState("Not reported in dashboard data.", "Brain Core did not include runtime reports in this refresh."));
    return container;
  }
  const available = state.runtimeReports.filter((r) => r.status === "available").length;
  const missing = state.runtimeReports.length - available;
  const mindSteward = state.runtimeReports.find((r) => r.id === "mind-steward");
  renderCompactStatGrid(container, [
    { label: "Reports available", value: String(available) },
    { label: "Missing reports", value: String(Math.max(missing, 0)) },
    { label: "Last refresh", value: state.refreshedAt ? new Date(state.refreshedAt).toLocaleTimeString() : "Unknown" }
  ]);
  container.appendChild(renderStatusBadge(available > 0 ? "Partial" : "Not reported", available > 0 ? "info" : "muted"));
  const list = container.createEl("div", { cls: "brain-console__list" });
  for (const id of ["mind-steward", "approval-audit", "local-apps", "video"]) {
    const report = state.runtimeReports.find((entry) => entry.id === id);
    const row = list.createDiv({ cls: "brain-console__list-row" });
    row.createEl("span", { cls: "brain-console__list-label", text: reportLabel(id) });
    row.createEl("span", { cls: "brain-console__list-value", text: report ? statValue(report.status, "Unavailable") : "Not reported in dashboard data" });
  }
  if (mindSteward?.message) {
    container.createEl("p", { cls: "brain-console__detail", text: mindSteward.message });
  }
  return container;
}
function renderAiModelSelectorCard(state, settings, onRefresh) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  const selector = state.aiModelSelectorStatus;
  if (!selector) {
    container.appendChild(renderEmptyState("AI Model Selector status not available.", "Brain Core endpoint /ai-model-selector may not be responding."));
    return container;
  }
  const statusLabel = selector.running && selector.healthy ? "Running" : selector.running ? "Degraded" : "Stopped";
  const statusTone = selector.running && selector.healthy ? "ok" : selector.running ? "warn" : "danger";
  container.appendChild(renderStatusBadge(statusLabel, statusTone));
  const stats = [
    { label: "Service", value: selector.running ? "Active" : "Inactive" },
    { label: "Health", value: selector.healthy ? "Healthy" : selector.error ?? "Unhealthy" }
  ];
  if (selector.uptime) {
    stats.push({ label: "Uptime", value: selector.uptime });
  }
  if (selector.providers) {
    const healthyCount = selector.providers.filter((p) => p.healthy).length;
    stats.push({ label: "Providers", value: `${healthyCount}/${selector.providers.length} healthy` });
  }
  renderCompactStatGrid(container, stats);
  if (selector.providers && selector.providers.length > 0) {
    const providerList = container.createDiv({ cls: "brain-console__list" });
    for (const provider of selector.providers) {
      const row = providerList.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: provider.id });
      const val = row.createEl("span", { cls: "brain-console__list-value" });
      val.textContent = `${provider.healthy ? "OK" : provider.circuitState} | $${provider.costPer1kTokens}/1k`;
      if (!provider.healthy) val.style.color = "var(--bc-yellow)";
    }
  }
  const bedrockModels = selector.providers?.flatMap((provider) => provider.bedrockModels ?? []) ?? [];
  if (bedrockModels.length > 0) {
    const enabled = bedrockModels.filter((model) => model.enabled);
    const accessible = enabled.filter((model) => model.access?.available).length;
    container.createEl("p", {
      cls: "brain-console__detail",
      text: `Bedrock portfolio: ${accessible}/${enabled.length} enabled models access-checked`
    });
    const bedrockList = container.createDiv({ cls: "brain-console__list" });
    for (const model of enabled.slice(0, 5)) {
      const row = bedrockList.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: model.id ?? model.modelId ?? "unknown-model" });
      const value = row.createEl("span", { cls: "brain-console__list-value" });
      const access = model.access?.available ? "OK" : model.access ? "blocked" : "unknown";
      const price = typeof model.priceInputPer1m === "number" && typeof model.priceOutputPer1m === "number" ? `$${model.priceInputPer1m}/$${model.priceOutputPer1m}/1M` : "price n/a";
      value.textContent = `${access} | ${price}`;
      if (access === "blocked") value.style.color = "var(--bc-yellow)";
    }
  }
  if (settings) {
    const actions = container.createDiv({ cls: "brain-console__local-app-actions" });
    const brainCoreUrl = settings.brainCoreUrl;
    if (!selector.running) {
      const startBtn = actions.createEl("button", { text: "Start", cls: "brain-console__local-app-action is-enabled" });
      startBtn.title = "Start AI Model Selector service via launchctl";
      startBtn.addEventListener("click", () => {
        startBtn.textContent = "Starting...";
        startBtn.disabled = true;
        void controlBrainCoreAiModelSelector(brainCoreUrl, "start").then(() => {
          new import_obsidian.Notice("AI Model Selector started.");
          if (onRefresh) onRefresh();
        });
      });
    } else {
      const stopBtn = actions.createEl("button", { text: "Stop", cls: "brain-console__local-app-action is-enabled" });
      stopBtn.title = "Stop AI Model Selector service via launchctl";
      stopBtn.addEventListener("click", () => {
        stopBtn.textContent = "Stopping...";
        stopBtn.disabled = true;
        void controlBrainCoreAiModelSelector(brainCoreUrl, "stop").then(() => {
          new import_obsidian.Notice("AI Model Selector stopped.");
          if (onRefresh) onRefresh();
        });
      });
    }
  }
  container.createEl("p", { cls: "brain-console__detail", text: `Last checked: ${new Date(selector.lastChecked).toLocaleTimeString()}` });
  return container;
}
function renderLocalAppsCard(state, settings, onRefresh) {
  const container = document.createElement("div");
  container.className = "brain-console__apps-page";
  const dashboard = state.localAppsDashboard;
  const readiness = state.localAppsActionReadiness;
  const actionStatus = state.localAppsActionStatus;
  const orchestrator = state.localAppsOrchestrator;
  const onboarding = state.localAppsOnboardingChecklist;
  const operatorSummary = state.localAppsOperatorSummary;
  const apps = dashboard?.apps ?? (state.localApps ?? []).map((app) => ({
    id: app.id,
    name: app.name,
    label: app.name,
    category: "other",
    status: app.status === "running" || app.status === "stopped" ? app.status : "unknown",
    health: app.status === "running" ? "healthy" : app.status === "stopped" ? "warning" : "unknown",
    url: void 0,
    port: void 0,
    source: "unknown",
    managed: Boolean(app.actionsSupported),
    startSupported: Boolean(app.actionsSupported),
    stopSupported: Boolean(app.actionsSupported),
    restartSupported: Boolean(app.actionsSupported),
    actionEnabled: Boolean(app.actionsSupported),
    actionDisabledReason: app.actionsSupported ? "" : "App does not support managed actions.",
    actionDisabledReasons: void 0,
    lastCheckedAt: (/* @__PURE__ */ new Date()).toISOString(),
    notes: ""
  }));
  const visibleApps = apps.filter((app) => app.id !== "mind-steward");
  const header = container.createDiv({ cls: "brain-console__apps-header" });
  renderCardSectionHeading(header, "Local Apps", "Compact operations inventory with controlled Brain Core actions.");
  if (dashboard) {
    const strip = container.createDiv({ cls: "brain-console__apps-summary-strip" });
    renderMicroStat(strip, "Apps", String(dashboard.appCount));
    renderMicroStat(strip, "Running", String(dashboard.runningCount));
    renderMicroStat(strip, "Stopped", String(dashboard.stoppedCount));
    renderMicroStat(strip, "Unknown", String(dashboard.unknownCount));
    renderMicroStat(strip, "Managed", String(dashboard.managedCount));
    renderMicroStat(strip, "Controls", dashboard.safety.startStopControlsEnabled ? "Enabled" : "Disabled");
  } else {
    const strip = container.createDiv({ cls: "brain-console__apps-summary-strip" });
    renderMicroStat(strip, "Apps", String(visibleApps.length));
    renderMicroStat(strip, "Controls", "Unknown");
  }
  if (visibleApps.length === 0) {
    container.appendChild(renderEmptyState("No local apps available", "Check the canonical inventory source."));
    return container;
  }
  const definitionsById = new Map((orchestrator?.definitions ?? []).map((definition) => [definition.id, definition]));
  const controlsEnabled = dashboard?.actionPolicy.status === "enabled" || readiness?.ready === true || readiness != null && readiness.criteria?.every((c) => c.satisfied || c.id === "audit-logging");
  const list = container.createDiv({ cls: "brain-console__apps-operations-grid" });
  visibleApps.forEach((app) => {
    const definition = definitionsById.get(app.id);
    const pendingAction = localAppPendingActions.get(app.id);
    const item = list.createDiv({ cls: "brain-console__local-app-card brain-console__local-app-card--micro" });
    item.title = app.url || app.notes || app.name;
    const top = item.createDiv({ cls: "brain-console__app-card-top" });
    top.createEl("h4", { cls: "brain-console__app-card-title", text: app.name });
    const statusBadgeLabel = pendingAction === "starting" ? "starting" : pendingAction === "stopping" ? "stopping" : pendingAction === "restarting" ? "starting" : app.status;
    const statusBadgeTone = pendingAction === "starting" || pendingAction === "restarting" ? "ok" : pendingAction === "stopping" ? "warn" : app.status === "running" ? "ok" : app.status === "stopped" ? "warn" : app.status === "unavailable" ? "danger" : "muted";
    const statusBadge = renderStatusBadge(statusBadgeLabel, statusBadgeTone);
    if (pendingAction === "starting" || pendingAction === "restarting") {
      statusBadge.classList.add("brain-console__badge--starting");
    } else if (pendingAction === "stopping") {
      statusBadge.classList.add("brain-console__badge--stopping");
    }
    top.appendChild(statusBadge);
    const meta = item.createDiv({ cls: "brain-console__app-card-meta" });
    const svcCount = definition?.services.length;
    const svcPorts = definition?.services.map((s) => s.port).filter(Boolean);
    const portDisplay = svcPorts && svcPorts.length > 1 ? svcPorts.join("/") : app.port ? String(app.port) : "-";
    meta.createEl("span", { text: `port ${portDisplay}` });
    meta.createEl("span", { text: `svc ${svcCount ?? "?"}` });
    meta.createEl("span", { text: `db ${definition?.database ? "yes" : definition ? "no" : "?"}` });
    const actions = item.createDiv({ cls: "brain-console__local-app-actions" });
    if (app.startSupported || app.restartSupported) {
      const isRunning = app.status === "running";
      const startLabel = isRunning ? "Restart" : "Start";
      const startAction = isRunning ? "restart" : "start";
      const startEnabled = !pendingAction && controlsEnabled && (isRunning ? app.restartSupported : app.startSupported);
      const startBtn = actions.createEl("button", { text: startLabel, cls: "brain-console__local-app-action brain-console__local-app-action--start" });
      startBtn.addClass(startEnabled ? "is-enabled" : "is-disabled");
      if (pendingAction) startBtn.addClass("is-pending");
      startBtn.disabled = !startEnabled;
      startBtn.title = startEnabled ? `${startLabel} ${app.name} through Brain Core controlled orchestration` : app.actionDisabledReasons?.[startAction] || app.actionDisabledReason || readiness?.nextSafeStep || "Action not supported.";
      if (startEnabled && settings) {
        startBtn.addEventListener("click", () => {
          void requestLocalAppActionFromCard(settings.brainCoreUrl, app.id, app.label || app.name, startAction, item, onRefresh);
        });
      }
    }
    if (app.stopSupported) {
      const stopEnabled = !pendingAction && controlsEnabled && app.stopSupported;
      const stopBtn = actions.createEl("button", { text: "Stop", cls: "brain-console__local-app-action brain-console__local-app-action--stop" });
      stopBtn.addClass(stopEnabled ? "is-enabled" : "is-disabled");
      if (pendingAction) stopBtn.addClass("is-pending");
      stopBtn.disabled = !stopEnabled;
      stopBtn.title = stopEnabled ? `Stop ${app.name} through Brain Core controlled orchestration` : app.actionDisabledReasons?.stop || app.actionDisabledReason || readiness?.nextSafeStep || "Action not supported.";
      if (stopEnabled && settings) {
        stopBtn.addEventListener("click", () => {
          void requestLocalAppActionFromCard(settings.brainCoreUrl, app.id, app.label || app.name, "stop", item, onRefresh);
        });
      }
    }
    if (app.url) {
      const openBtn = actions.createEl("button", { text: "Open", cls: "brain-console__local-app-action brain-console__local-app-action--open is-enabled" });
      openBtn.title = `Open ${app.name} in browser (${app.url})`;
      openBtn.addEventListener("click", () => {
        window.open(app.url);
      });
    }
  });
  return container;
}
function renderMicroStat(parent, label, value) {
  const stat = parent.createDiv({ cls: "brain-console__apps-summary-stat" });
  stat.createEl("span", { cls: "brain-console__stat-label", text: label });
  stat.createEl("span", { cls: "brain-console__stat-value", text: value });
}
async function requestLocalAppActionFromCard(brainCoreUrl, appId, appLabel, action, card, onRefresh) {
  const verb = action === "restart" ? "Restart" : action.charAt(0).toUpperCase() + action.slice(1);
  if (!window.confirm(`${verb} ${appLabel}? This uses Brain Core controlled local-app orchestration.`)) return;
  const pendingVerb = action === "stop" ? "stopping" : action === "restart" ? "restarting" : "starting";
  localAppPendingActions.set(appId, pendingVerb);
  new import_obsidian.Notice(`${verb}ing ${appLabel}...`);
  card.querySelectorAll(".brain-console__local-app-action").forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("is-pending");
    btn.classList.remove("is-enabled");
  });
  const statusBadge = card.querySelector(".brain-console__badge");
  if (statusBadge) {
    statusBadge.textContent = pendingVerb === "stopping" ? "stopping" : "starting";
    statusBadge.className = `brain-console__badge brain-console__badge--${pendingVerb === "stopping" ? "warn" : "ok"} brain-console__badge--${pendingVerb === "stopping" ? "stopping" : "starting"}`;
  }
  const result = await requestBrainCoreLocalAppAction(brainCoreUrl, appId, action);
  localAppPendingActions.delete(appId);
  if (result.error || !result.value) {
    const message = result.value?.message ?? result.detail ?? result.error ?? "No response";
    new import_obsidian.Notice(`${verb} ${appLabel} failed: ${message}`);
  } else {
    const message = result.value.message || result.value.status;
    new import_obsidian.Notice(`${appLabel}: ${message}`);
  }
  await onRefresh?.();
  const nextPoll = result.value?.nextPollMs ?? 2e3;
  window.setTimeout(() => {
    void onRefresh?.();
  }, nextPoll);
}
function renderOfflineState(shell, brainCoreUrl, statusError, endpointErrors, onRefresh, onBrainCoreRestart) {
  const offline = shell.createDiv({ cls: "brain-console__offline-panel" });
  offline.createEl("h2", { text: "Connection lost" });
  offline.createEl("p", { text: "Brain Core is not responding. Trying to reach:" });
  const urlEl = offline.createEl("code", { text: brainCoreUrl });
  urlEl.addClass("brain-console__url-display");
  if (statusError) {
    offline.createEl("p", { text: `Error: ${statusError}` });
  }
  if (endpointErrors && endpointErrors.length > 0) {
    const errorsDiv = offline.createDiv();
    errorsDiv.createEl("p", { text: "Endpoint errors:" });
    const list = errorsDiv.createEl("ul");
    endpointErrors.slice(0, 3).forEach((err) => {
      const item = list.createEl("li");
      item.createEl("code", { text: err.pathname });
      item.appendText(` \u2014 ${err.error || "no response"}`);
      if (err.detail) {
        item.appendText(` (${err.detail.slice(0, 50)})`);
      }
    });
  }
  offline.createEl("h3", { text: "To recover:" });
  const steps = offline.createEl("ol");
  steps.createEl("li", { text: "Verify Brain Core terminal is still running" });
  steps.createEl("li", { text: "Test: curl http://localhost:4877/status" });
  steps.createEl("li", { text: "If still offline, try: Settings \u2192 Brain Core URL \u2192 http://127.0.0.1:4877" });
  steps.createEl("li", { text: "If Brain Core still responds, use the top-right \u21BB control to request a verified restart" });
  const refreshBtn = offline.createEl("button", { text: "Refresh" });
  refreshBtn.addClass("brain-console__btn-main");
  refreshBtn.setAttribute("type", "button");
  if (onRefresh) {
    refreshBtn.addEventListener("click", () => onRefresh());
  }
  if (onBrainCoreRestart) {
    const restartBtn = offline.createEl("button", { text: "Restart Brain Core" });
    restartBtn.addClass("brain-console__btn-main");
    restartBtn.setAttribute("type", "button");
    restartBtn.addEventListener("click", () => {
      void onBrainCoreRestart();
    });
  }
}
function renderBrainnOSRoadmapsCard() {
  const card = document.createElement("div");
  const heading = card.createEl("div", { cls: "brain-console__roadmaps-heading" });
  heading.createEl("h4", { text: "BrainOS Projects & Roadmaps", cls: "brain-console__roadmaps-title" });
  heading.createEl("p", { text: "Unified repo-agnostic project tracking", cls: "brain-console__roadmaps-subtitle" });
  const content = card.createEl("div", { cls: "brain-console__roadmaps-content" });
  const standardSection = content.createEl("div", { cls: "brain-console__roadmaps-section" });
  standardSection.createEl("h5", { text: "Repo Roadmap Standard", cls: "brain-console__roadmaps-section-title" });
  const standardList = standardSection.createEl("ul", { cls: "brain-console__roadmaps-list" });
  standardList.createEl("li", { text: "JSON schema for project-state.json" });
  standardList.createEl("li", { text: "Markdown templates for roadmap.md, implementation-plan.md, tasks.md" });
  standardList.createEl("li", { text: "Safety: read-only indexing, no auto-commits, no cross-repo writes" });
  const statusSection = content.createEl("div", { cls: "brain-console__roadmaps-section" });
  statusSection.createEl("h5", { text: "Current Status", cls: "brain-console__roadmaps-section-title" });
  const statusList = statusSection.createEl("ul", { cls: "brain-console__roadmaps-list" });
  statusList.createEl("li", { text: "Phase R1 (2026-05): Standard definition \u2014 in progress" });
  statusList.createEl("li", { text: "Phase R2 (2026-06): Repo indexer & Brain Core API \u2014 planned" });
  statusList.createEl("li", { text: "Phase R3 (2026-07): BuildFlow status sync \u2014 planned" });
  statusList.createEl("li", { text: "Phase R4 (2026-08+): Optional dashboard controls \u2014 planned" });
  const prioritySection = content.createEl("div", { cls: "brain-console__roadmaps-section" });
  prioritySection.createEl("h5", { text: "Priority", cls: "brain-console__roadmaps-section-title" });
  const priorityList = prioritySection.createEl("ul", { cls: "brain-console__roadmaps-list" });
  priorityList.createEl("li", { text: "LOW: Does not block production pipeline work" });
  priorityList.createEl("li", { text: "Additive and optional for each repo" });
  priorityList.createEl("li", { text: "See docs/system/brainos-project-roadmap-standard-2026-05-18.md" });
  const futureSection = content.createEl("div", { cls: "brain-console__roadmaps-section" });
  futureSection.createEl("h5", { text: "Future Capabilities", cls: "brain-console__roadmaps-section-title" });
  const futureList = futureSection.createEl("ul", { cls: "brain-console__roadmaps-list" });
  futureList.createEl("li", { text: "Query project state across repos (R2+)" });
  futureList.createEl("li", { text: "Visualize roadmap timelines and blockers (R3+)" });
  futureList.createEl("li", { text: "Approval-gated task updates (R4+)" });
  futureList.createEl("li", { text: "BuildFlow integration for controlled operations" });
  return card;
}
function renderProjectsCard(state, snapshot) {
  const card = document.createElement("div");
  if (!state.projects) {
    card.textContent = "No data";
    return card;
  }
  const list = card.createEl("ul");
  list.createEl("li", { text: `Total: ${snapshot.projectCount}` });
  const stbProject = state.projects.find((p) => p.id === "says-the-bible");
  if (stbProject) {
    const item = list.createEl("li", { text: `Says the Bible: ${stbProject.health}` });
    if (stbProject.health === "error") {
      item.addClass("brain-console__list-error");
    }
  }
  const categories = new Set(state.projects.map((p) => p.category));
  list.createEl("li", { text: `Categories: ${categories.size}` });
  return card;
}
function renderPlatformsCard(state, snapshot) {
  const card = document.createElement("div");
  if (!state.platforms) {
    card.textContent = "No data";
    return card;
  }
  const list = card.createEl("ul");
  list.createEl("li", { text: `Total: ${snapshot.platformCount}` });
  const socialCount = state.platforms.filter((p) => p.category === "social").length;
  const localCount = state.platforms.filter((p) => p.category === "local").length;
  list.createEl("li", { text: `Social: ${socialCount}` });
  list.createEl("li", { text: `Local: ${localCount}` });
  return card;
}
function mapStatusToTone(status) {
  const statusLower = (status || "").toLowerCase();
  if (["running", "ok", "completed", "available"].includes(statusLower)) return "ok";
  if (["blocked", "error", "failed", "rejected"].includes(statusLower)) return "error";
  if (["pending", "planned", "waiting_approval"].includes(statusLower)) return "warn";
  return "neutral";
}
function formatCostUsd(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars === "0.00" ? "-" : `$${dollars}`;
}
function renderAgentViewCard(state, snapshot) {
  const card = document.createElement("div");
  if (!state.agents || state.agents.length === 0) {
    card.createEl("div", { cls: "brain-console__list-note", text: "No agents available." });
    return card;
  }
  renderCompactStatGrid(card, [
    { label: "Total Agents", value: String(state.agents.length) },
    { label: "Available", value: String(state.agents.filter((a) => a.status === "available").length) },
    { label: "Planned", value: String(state.agents.filter((a) => a.status === "planned").length) }
  ]);
  const list = card.createEl("ul", { cls: "brain-console__list" });
  for (const agent of state.agents.slice(0, 10)) {
    const li = list.createEl("li");
    const healthDot = li.createEl("span", { cls: "brain-console__stat-label" });
    healthDot.textContent = agent.health === "ok" ? "\u25CF " : agent.health === "warning" ? "\u25D0 " : "\u25CB ";
    li.createEl("strong", { text: agent.name });
    li.appendText(` (${agent.role})`);
    const statusBadge = li.createEl("span", { cls: "bc-badge" });
    statusBadge.textContent = agent.status;
    statusBadge.classList.add(`bc-badge--${mapStatusToTone(agent.status)}`);
  }
  return card;
}
function renderApprovalDetailCard(detail) {
  const el = document.createElement("div");
  const rows = [
    { label: "ID", value: detail.id },
    { label: "Kind", value: detail.kind },
    { label: "Status", value: detail.status },
    { label: "Age", value: detail.ageMinutes !== void 0 ? `${detail.ageMinutes}m` : "unknown" },
    { label: "Expires", value: detail.expired ? "\u2717 expired" : detail.expiresAt ? "pending" : "never" },
    { label: "WritesToMind", value: "false" },
    { label: "ApplyEnabled", value: "false" }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  return el;
}
function renderMaintenancePreviewDetailCard(detail) {
  const el = document.createElement("div");
  const rows = [
    { label: "Queue ID", value: detail.queueId },
    { label: "Actions", value: String(detail.actionCount) },
    { label: "Risk", value: `L:${detail.lowRiskCount} M:${detail.mediumRiskCount} H:${detail.highRiskCount}` },
    { label: "Approval Required", value: String(detail.approvalRequiredCount) },
    { label: "Expired", value: detail.expired ? "\u2717 yes" : "\u25CB no" },
    { label: "WritesToMind", value: "false" }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  if (detail.topActions && detail.topActions.length > 0) {
    const actionsDiv = el.createDiv({ cls: "brain-console__section" });
    actionsDiv.createEl("strong", { text: "Top Actions:" });
    const list = actionsDiv.createEl("ul", { cls: "brain-console__list" });
    detail.topActions.forEach((action) => {
      list.createEl("li", { text: `${action.title} (${action.risk})` });
    });
  }
  return el;
}
function renderAgentViewLedgerCard(state) {
  const el = document.createElement("div");
  if (!state.agentRuns || state.agentRuns.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No agent runs available yet." });
    return el;
  }
  renderCompactStatGrid(el, [
    { label: "Total Runs", value: String(state.agentRuns.length) },
    { label: "Blocked", value: String(state.agentRuns.filter((r) => r.status === "blocked").length) },
    { label: "Completed", value: String(state.agentRuns.filter((r) => r.status === "completed").length) }
  ]);
  const list = el.createEl("ul", { cls: "brain-console__list" });
  const maxRuns = Math.min(8, state.agentRuns.length);
  for (let i = 0; i < maxRuns; i++) {
    const run = state.agentRuns[i];
    const li = list.createEl("li");
    const badge = li.createEl("span", { cls: "bc-badge" });
    badge.textContent = run.status.toUpperCase();
    badge.classList.add(`bc-badge--${mapStatusToTone(run.status)}`);
    li.createEl("strong", { text: run.title });
    li.appendText(` (${run.agentId})`);
    const details = li.createEl("div", { cls: "brain-console__list-note" });
    const parts = [];
    if (run.ageMinutes !== void 0) parts.push(`${run.ageMinutes}m old`);
    if (run.targetId) parts.push(`\u2192 ${run.targetId}`);
    if (parts.length > 0) details.textContent = parts.join(" \xB7 ");
    if (run.blockers.length > 0) {
      const blockerSpan = li.createEl("div", { cls: "brain-console__list-error", text: `\u26A0 ${run.blockers[0]}` });
    }
  }
  return el;
}
function renderRecoveryPanelCard(state) {
  const el = document.createElement("div");
  if (!state.recoveryItems || state.recoveryItems.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No recovery blockers detected." });
    return el;
  }
  const errorCount = state.recoveryItems.filter((i) => i.severity === "error").length;
  const warningCount = state.recoveryItems.filter((i) => i.severity === "warning").length;
  if (errorCount > 0 || warningCount > 0) {
    const summary = el.createDiv({ cls: "brain-console__row" });
    if (errorCount > 0) {
      const errRow = el.createDiv({ cls: "brain-console__row" });
      errRow.createEl("dt", { text: "Errors" });
      errRow.createEl("dd", { text: `${errorCount}`, cls: "brain-console__list-error" });
    }
    if (warningCount > 0) {
      const warnRow = el.createDiv({ cls: "brain-console__row" });
      warnRow.createEl("dt", { text: "Warnings" });
      warnRow.createEl("dd", { text: `${warningCount}`, cls: "brain-console__list-warning" });
    }
  }
  el.createEl("hr");
  const list = el.createEl("ul", { cls: "brain-console__list" });
  const maxItems = Math.min(8, state.recoveryItems.length);
  for (let i = 0; i < maxItems; i++) {
    const item = state.recoveryItems[i];
    const li = list.createEl("li");
    if (item.severity === "error") {
      li.classList.add("brain-console__list-error");
    } else if (item.severity === "warning") {
      li.classList.add("brain-console__list-warning");
    }
    const titleSpan = li.createEl("strong", { text: item.title });
    const badge = li.createEl("span", { cls: "brain-console__list-note" });
    badge.textContent = ` [${item.source}]`;
    if (item.blocker) {
      const blockerDiv = li.createEl("div", { cls: "brain-console__list-sub", text: `\u26A0 ${item.blocker}` });
    }
    if (item.nextSafeStep) {
      const stepDiv = li.createEl("div", { cls: "brain-console__list-sub", text: `\u2192 ${item.nextSafeStep}` });
    }
    const safetyDiv = li.createEl("div", { cls: "brain-console__list-note" });
    const safetyChips = [];
    if (!item.safety.canAutoFix) safetyChips.push("no auto-fix");
    if (!item.safety.writesToMind) safetyChips.push("no Mind write");
    safetyDiv.textContent = safetyChips.join(" \xB7 ");
  }
  return el;
}
function renderAgentTaskGraphCard(state) {
  const el = document.createElement("div");
  const taskGraph = state.agentConsole?.taskGraph;
  if (!taskGraph || !taskGraph.tasks || taskGraph.tasks.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No task graph available." });
    return el;
  }
  renderCompactStatGrid(el, [
    { label: "Total Tasks", value: String(taskGraph.taskCount ?? 0) },
    { label: "Done", value: String(taskGraph.completedCount ?? 0) },
    { label: "Blocked", value: String(taskGraph.blockedCount ?? 0) },
    { label: "Pending", value: String(taskGraph.pendingCount ?? 0) }
  ]);
  const list = el.createEl("ul", { cls: "brain-console__list" });
  const maxTasks = Math.min(8, taskGraph.tasks.length);
  for (let i = 0; i < maxTasks; i++) {
    const task = taskGraph.tasks[i];
    const li = list.createEl("li");
    const badge = li.createEl("span", { cls: "bc-badge" });
    badge.textContent = task.status.toUpperCase();
    badge.classList.add(`bc-badge--${mapStatusToTone(task.status)}`);
    li.createEl("strong", { text: task.title });
    li.appendText(` (${task.taskId})`);
    if (task.approvalRequired) {
      li.appendText(" [approval]");
    }
    if (task.dependsOn && task.dependsOn.length > 0) {
      const depDiv = li.createEl("div", { cls: "brain-console__list-note", text: `depends on: ${task.dependsOn.join(", ")}` });
    }
  }
  if (taskGraph.nextSafeStep) {
    el.createEl("div", { cls: "brain-console__list-note", text: `\u2192 Next: ${taskGraph.nextSafeStep}` });
  }
  return el;
}
function renderApprovalGatesCard(state) {
  const el = document.createElement("div");
  const gates = state.agentConsole?.approvalGates;
  if (!gates) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No approval gate data available." });
    return el;
  }
  renderCompactStatGrid(el, [
    { label: "Pending", value: String(gates.pendingCount ?? 0) },
    { label: "Approved", value: String(gates.approvedCount ?? 0) },
    { label: "Rejected", value: String(gates.rejectedCount ?? 0) },
    { label: "Expired", value: String(gates.expiredCount ?? 0) }
  ]);
  if (gates.supportedApprovalKinds && gates.supportedApprovalKinds.length > 0) {
    el.createEl("strong", { text: "Supported kinds:" });
    const kindList = el.createEl("ul", { cls: "brain-console__list" });
    for (const kind of gates.supportedApprovalKinds) {
      kindList.createEl("li", { text: kind });
    }
  }
  if (gates.blockedApprovalKinds && gates.blockedApprovalKinds.length > 0) {
    el.createEl("strong", { text: "Blocked kinds:" });
    const blockedList = el.createEl("ul", { cls: "brain-console__list" });
    for (const kind of gates.blockedApprovalKinds) {
      const li = blockedList.createEl("li", { text: kind });
      li.classList.add("brain-console__list-error");
    }
  }
  return el;
}
function renderAgentCostCard(state) {
  const el = document.createElement("div");
  const cost = state.agentCostSummary;
  if (!cost) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No cost data available." });
    return el;
  }
  const budgetDiv = el.createDiv();
  const budgetBadge = budgetDiv.createEl("span", { cls: "bc-badge" });
  budgetBadge.textContent = cost.budget?.status?.toUpperCase() ?? "UNKNOWN";
  budgetBadge.classList.add(`bc-badge--${mapStatusToTone(cost.budget?.status ?? "unknown")}`);
  if (cost.budget) {
    renderCompactStatGrid(el, [
      { label: "Today", value: formatCostUsd(cost.todayEstimatedUsd) },
      { label: "Week", value: formatCostUsd(cost.weekEstimatedUsd) },
      { label: "Month", value: formatCostUsd(cost.monthEstimatedUsd) },
      { label: "Total", value: formatCostUsd(cost.totalEstimatedUsd) }
    ]);
    el.createEl("strong", { text: "Budget Status:" });
    const budgetList = el.createEl("ul", { cls: "brain-console__list" });
    budgetList.createEl("li", { text: `Spent: ${formatCostUsd(cost.budget.spentUsd)}` });
    budgetList.createEl("li", { text: `Threshold: ${formatCostUsd(cost.budget.thresholdUsd)}` });
    budgetList.createEl("li", { text: `Remaining: ${formatCostUsd(cost.budget.remainingUsd)}` });
  }
  if (cost.topExpensiveTasks && cost.topExpensiveTasks.length > 0) {
    el.createEl("strong", { text: "Top Expenses:" });
    const topList = el.createEl("ul", { cls: "brain-console__list" });
    for (const task of cost.topExpensiveTasks.slice(0, 3)) {
      topList.createEl("li", { text: `${task.taskId}: ${formatCostUsd(task.estimatedCostUsd)}` });
    }
  }
  return el;
}
function renderPostOrchestratorStatusCard(state) {
  const el = document.createElement("div");
  const status = state.postOrchestratorStatus;
  const overview = state.postOrchestratorOverview?.overview;
  if (!status && !overview) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No post orchestrator status available." });
    return el;
  }
  const rows = overview ? [
    { label: "Overview status", value: overview.status },
    { label: "Flows", value: String(overview.counts.flows) },
    { label: "Events", value: String(overview.counts.eventFixtures) },
    { label: "Blockers", value: String(overview.blockers.length) },
    { label: "Next safe step", value: overview.nextSafeStep }
  ] : [
    { label: "Status", value: status?.status ?? "unknown" },
    { label: "Phase", value: status?.phase ?? "unknown" },
    { label: "Publishing", value: status?.publishingEnabled ? "enabled" : "disabled" },
    { label: "Scheduling", value: status?.schedulingEnabled ? "enabled" : "disabled" },
    { label: "Execution", value: status?.executionEnabled ? "enabled" : "disabled" },
    { label: "Next safe step", value: status?.nextSafeStep ?? "unknown" }
  ];
  renderCompactStatGrid(el, rows);
  el.appendChild(renderSafetyLabel("Publishing disabled \xB7 Scheduling disabled \xB7 Execution disabled"));
  return el;
}
function renderPostOrchestratorOverviewCard(state) {
  const el = document.createElement("div");
  const overview = state.postOrchestratorOverview?.overview;
  if (!overview) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No post orchestrator overview available." });
    return el;
  }
  const rows = [
    { label: "Flows", value: String(overview.counts.flows) },
    { label: "Events", value: String(overview.counts.eventFixtures) },
    { label: "Drafts", value: String(overview.counts.draftFixtures) },
    { label: "Reviews", value: String(overview.counts.reviewItems) },
    { label: "Schedules", value: String(overview.counts.schedulePreviewItems) },
    { label: "Blockers", value: String(overview.blockers.length) }
  ];
  renderCompactStatGrid(el, rows);
  el.appendChild(renderSafetyLabel("Preview only \xB7 Publishing disabled \xB7 Scheduling disabled"));
  if (overview.blockers.length > 0) {
    const blockerList = el.createEl("ul", { cls: "brain-console__list brain-console__blocker-list" });
    overview.blockers.slice(0, 5).forEach((blocker) => {
      blockerList.createEl("li", { text: `${blocker.label} \xB7 ${blocker.source} \xB7 ${blocker.severity}` });
      blockerList.createEl("li", { cls: "brain-console__list-sub", text: blocker.nextSafeStep });
    });
  }
  return el;
}
function renderPlatformPostFlowsCard(state) {
  const el = document.createElement("div");
  const status = state.postOrchestratorStatus;
  const flows = state.postOrchestratorFlows?.flows ?? [];
  if (flows.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No post flow fixtures available." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  flows.forEach((flow) => {
    list.createEl("li", { text: `${flow.name}: ${flow.status} \xB7 ${flow.platform} \xB7 pub:${flow.publishingEnabled ? "on" : "off"} \xB7 sched:${flow.schedulingEnabled ? "on" : "off"} \xB7 exec:${flow.executionEnabled ? "on" : "off"}` });
  });
  if (status?.socialProofFlowLabel) {
    el.createEl("div", { cls: "brain-console__list-note", text: `Asset flow label: ${status.socialProofFlowLabel}` });
  }
  if (status?.growthOptimizationFlowLabel) {
    el.createEl("div", { cls: "brain-console__list-note", text: `Optimization flow label: ${status.growthOptimizationFlowLabel}` });
  }
  return el;
}
function renderDraftFixturesCard(state) {
  const el = document.createElement("div");
  const drafts = state.postOrchestratorDrafts?.drafts ?? [];
  if (drafts.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No draft fixtures available." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  drafts.slice(0, 5).forEach((draft) => {
    list.createEl("li", {
      text: `${draft.title} \xB7 ${draft.platform} \xB7 ${draft.sourceEventType} \xB7 ${draft.format} \xB7 approval:${draft.approvalRequired ? "yes" : "no"} \xB7 pub:${draft.publishingEnabled ? "on" : "off"}`
    });
  });
  return el;
}
function renderPostEventFixturesCard(state) {
  const el = document.createElement("div");
  const events = state.postOrchestratorEvents?.events ?? [];
  if (events.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No event fixtures available." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  events.slice(0, 5).forEach((event) => {
    list.createEl("li", {
      text: `${event.title} \xB7 ${event.source} \xB7 ${event.eventType} \xB7 platforms:${event.suggestedPlatforms.join(", ")} \xB7 fixture-only:${event.safety.fixtureOnly ? "yes" : "no"} \xB7 external-writes:${event.safety.writesExternalPlatform ? "yes" : "no"}`
    });
  });
  return el;
}
function renderPostDryRunPlanCard(state) {
  const el = document.createElement("div");
  const dryRun = state.postOrchestratorDryRun?.plan;
  if (!dryRun) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No dry-run plan available." });
    return el;
  }
  const rows = [
    { label: "Event", value: dryRun.event.title },
    { label: "Status", value: dryRun.status },
    { label: "Draft count", value: String(dryRun.drafts.length) },
    { label: "Unsupported flows", value: String(dryRun.unsupportedFlowIds.length) },
    { label: "Blockers", value: dryRun.blockers.length > 0 ? dryRun.blockers.join(" \xB7 ") : "none" },
    { label: "Next safe step", value: dryRun.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Preview only \xB7 Publishing disabled \xB7 Scheduling disabled \xB7 Execution disabled"));
  return el;
}
function renderPostDryRunDraftRowsCard(state) {
  const el = document.createElement("div");
  const drafts = state.postOrchestratorDryRun?.plan?.drafts ?? [];
  if (drafts.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No dry-run draft rows available." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  drafts.slice(0, 5).forEach((draft) => {
    list.createEl("li", {
      text: `${draft.platform} \xB7 ${draft.flowId} \xB7 ${draft.title} \xB7 ${draft.format} \xB7 ${draft.copyPreview.slice(0, 80)}${draft.copyPreview.length > 80 ? "\u2026" : ""} \xB7 approval:${draft.approvalRequired ? "yes" : "no"} \xB7 pub:off \xB7 sched:off \xB7 exec:off`
    });
  });
  return el;
}
function renderPostDraftReviewQueueCard(state) {
  const el = document.createElement("div");
  const queue = state.postOrchestratorReviewQueue?.queue;
  if (!queue) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No review queue available." });
    return el;
  }
  const rows = [
    { label: "Event", value: queue.eventId },
    { label: "Status", value: queue.status },
    { label: "Items", value: String(queue.itemCount) },
    { label: "Approval requested", value: String(queue.approvalRequestedCount) },
    { label: "Blocked", value: String(queue.blockedCount) }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Review only \xB7 Publishing disabled \xB7 Scheduling disabled \xB7 Execution disabled"));
  const list = el.createEl("ul", { cls: "brain-console__list" });
  queue.items.slice(0, 5).forEach((item) => {
    const li = list.createEl("li");
    li.createEl("div", {
      text: `${item.title} \xB7 ${item.platform} \xB7 ${item.flowId} \xB7 ${item.format} \xB7 risk:${item.risk} \xB7 status:${item.status}`
    });
    li.createEl("div", { cls: "brain-console__list-sub", text: `${item.copyPreview.slice(0, 96)}${item.copyPreview.length > 96 ? "\u2026" : ""}` });
    li.createEl("div", { cls: "brain-console__list-note", text: `approval required: ${item.approvalRequired ? "yes" : "no"} \xB7 next: ${item.nextSafeStep}` });
    if (item.canRequestApproval) {
      const btn = li.createEl("button", { text: "Request review approval", cls: "brain-console__btn-mini" });
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        const result = await requestBrainCorePostDraftReviewApproval(state.brainCoreUrl ?? "", item.id);
        const message = li.createDiv({ cls: "brain-console__list-note" });
        if (result.value?.status === "requested") {
          message.textContent = `approval requested \xB7 execution did not run \xB7 approvalId: ${result.value.approvalId ?? "n/a"}`;
        } else {
          message.textContent = `blocked: ${result.value?.summary ?? result.error ?? "unknown"}`;
        }
      });
    }
  });
  return el;
}
function renderPostSchedulePreviewQueueCard(state) {
  const el = document.createElement("div");
  const queue = state.postOrchestratorSchedulePreview?.queue;
  if (!queue) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No schedule preview queue available." });
    return el;
  }
  const rows = [
    { label: "Event", value: queue.eventId },
    { label: "Status", value: queue.status },
    { label: "Items", value: String(queue.itemCount) },
    { label: "Approval requested", value: String(queue.approvalRequestedCount) },
    { label: "Blocked", value: String(queue.blockedCount) }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Preview only \xB7 No scheduler job \xB7 Publishing disabled \xB7 Execution disabled"));
  const list = el.createEl("ul", { cls: "brain-console__list" });
  queue.items.slice(0, 5).forEach((item) => {
    const li = list.createEl("li");
    li.createEl("div", {
      text: `${item.title} \xB7 ${item.platform} \xB7 ${item.scheduledWindow} \xB7 ${item.suggestedLocalTime} ${item.timezone} \xB7 status:${item.status}`
    });
    li.createEl("div", { cls: "brain-console__list-sub", text: item.rationale });
    li.createEl("div", { cls: "brain-console__list-note", text: `approval required: ${item.approvalRequired ? "yes" : "no"} \xB7 next: ${item.nextSafeStep}` });
    if (item.canRequestApproval) {
      const btn = li.createEl("button", { text: "Request schedule review", cls: "brain-console__btn-mini" });
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        const result = await requestBrainCorePostSchedulePreviewApproval(state.brainCoreUrl ?? "", item.id);
        const message = li.createDiv({ cls: "brain-console__list-note" });
        if (result.value?.status === "requested") {
          message.textContent = `approval requested \xB7 execution did not run \xB7 approvalId: ${result.value.approvalId ?? "n/a"}`;
        } else {
          message.textContent = `blocked: ${result.value?.summary ?? result.error ?? "unknown"}`;
        }
      });
    }
  });
  return el;
}
function renderPostAnalyticsFixturesCard(state) {
  const el = document.createElement("div");
  const analytics = state.postOrchestratorAnalytics?.analytics ?? [];
  if (analytics.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No analytics fixtures available." });
    return el;
  }
  const rows = [
    { label: "Fixtures", value: String(analytics.length) },
    { label: "Platforms", value: String(new Set(analytics.map((item) => item.platform)).size) },
    { label: "External API", value: analytics.some((item) => item.safety.callsExternalAnalyticsApi) ? "enabled" : "disabled" },
    { label: "Next safe step", value: "Review fixture analytics and keep external analytics calls disabled." }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Fixture only \xB7 No external analytics \xB7 No external writes \xB7 No Mind writes"));
  const list = el.createEl("ul", { cls: "brain-console__list" });
  analytics.slice(0, 5).forEach((item) => {
    const li = list.createEl("li");
    li.createEl("div", {
      text: `${item.title} \xB7 ${item.platform} \xB7 ${item.flowId} \xB7 impressions:${item.metrics.impressions} \xB7 clicks:${item.metrics.clicks} \xB7 ctr:${item.metrics.ctr}`
    });
    li.createEl("div", { cls: "brain-console__list-sub", text: item.interpretation });
    li.createEl("div", { cls: "brain-console__list-note", text: item.feedbackForFlow });
  });
  return el;
}
function renderPostPipelineSummaryCard(state) {
  const el = document.createElement("div");
  const pipeline = state.postOrchestratorPipeline?.pipeline;
  if (!pipeline) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No pipeline summary available." });
    return el;
  }
  const rows = [
    { label: "Event", value: pipeline.title },
    { label: "Status", value: pipeline.status },
    { label: "Drafts", value: String(pipeline.totals.draftCount) },
    { label: "Review items", value: String(pipeline.totals.reviewItemCount) },
    { label: "Schedule previews", value: String(pipeline.totals.schedulePreviewItemCount) },
    { label: "Analytics fixtures", value: String(pipeline.totals.analyticsFixtureCount) },
    { label: "Blockers", value: String(pipeline.totals.blockerCount) },
    { label: "Approval required", value: String(pipeline.totals.approvalRequiredCount) },
    { label: "Next safe step", value: pipeline.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Preview only \xB7 Publishing disabled \xB7 Scheduling disabled \xB7 Execution disabled"));
  const list = el.createEl("ul", { cls: "brain-console__list" });
  pipeline.steps.forEach((step) => {
    const li = list.createEl("li");
    li.createEl("div", { text: `${step.label} \xB7 ${step.status} \xB7 items:${step.itemCount} \xB7 blocked:${step.blockedCount} \xB7 approvals:${step.approvalRequiredCount}` });
    li.createEl("div", { cls: "brain-console__list-sub", text: step.summary });
    li.createEl("div", { cls: "brain-console__list-note", text: step.nextSafeStep });
  });
  return el;
}
function renderPostReadinessScoreCard(state) {
  const el = document.createElement("div");
  const readiness = state.postOrchestratorReadiness?.readiness;
  if (!readiness) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No readiness score available." });
    return el;
  }
  const rows = [
    { label: "Score", value: String(readiness.score) },
    { label: "Grade", value: readiness.grade },
    { label: "Status", value: readiness.status },
    { label: "Blockers", value: String(readiness.blockers.length) },
    { label: "Next safe step", value: readiness.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Review only \xB7 Publishing disabled \xB7 Scheduling disabled"));
  if (readiness.blockers.length > 0) {
    const blockList = el.createEl("ul", { cls: "brain-console__list" });
    readiness.blockers.slice(0, 5).forEach((blocker) => {
      blockList.createEl("li", { text: `${blocker.title} \xB7 ${blocker.summary}` });
    });
  }
  if (readiness.checks.length > 0) {
    const checkList = el.createEl("ul", { cls: "brain-console__list" });
    readiness.checks.slice(0, 8).forEach((check) => {
      checkList.createEl("li", { text: `${check.label}: ${check.passed ? "pass" : "fail"} \xB7 ${check.summary}` });
    });
  }
  return el;
}
function renderPostPlatformPolicyCard(state) {
  const el = document.createElement("div");
  const policies = state.postOrchestratorPlatformPolicies?.policies ?? [];
  if (policies.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No platform policies available." });
    return el;
  }
  const rows = [
    { label: "Policies", value: String(policies.length) },
    { label: "Blocked / high-risk", value: String(policies.filter((policy) => policy.status === "blocked" || policy.riskLevel === "blocked" || policy.riskLevel === "high").length) },
    { label: "Next safe step", value: policies.find((policy) => policy.status === "review-required" || policy.status === "blocked")?.nextSafeStep ?? "Keep platform policies review-only." }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("No cookies \xB7 No Playwright \xB7 No external writes \xB7 Publishing disabled"));
  const list = el.createEl("ul", { cls: "brain-console__list" });
  policies.slice(0, 7).forEach((policy) => {
    list.createEl("li", {
      text: `${policy.label} \xB7 mode:${policy.publishingMode} \xB7 risk:${policy.riskLevel} \xB7 status:${policy.status} \xB7 next:${policy.nextSafeStep}`
    });
  });
  return el;
}
function renderPostDecommissionReadinessCard(state) {
  const el = document.createElement("div");
  const readiness = state.postOrchestratorDecommissionReadiness;
  if (!readiness) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No decommission readiness data available." });
    return el;
  }
  const rows = [
    { label: "Overall status", value: readiness.overall.status },
    { label: "Items", value: String(readiness.items.length) },
    { label: "Blocked", value: String(readiness.overall.blockedCount) },
    { label: "Ready", value: String(readiness.overall.readyCount) },
    { label: "Next safe step", value: readiness.overall.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Decommission not started \xB7 Approval required \xB7 No file deletes"));
  if (readiness.items.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    readiness.items.forEach((item) => {
      const passed = item.gates.filter((gate) => gate.passed).length;
      list.createEl("li", {
        text: `${item.label} \xB7 ${item.status} \xB7 gates:${passed}/${item.gates.length} \xB7 blockers:${item.blockerCount} \xB7 next:${item.nextSafeStep}`
      });
    });
  }
  return el;
}
function renderPostOperatorGuidanceCard(state) {
  const el = document.createElement("div");
  const guidance = state.postOrchestratorOperatorGuidance;
  if (!guidance) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No operator guidance available." });
    return el;
  }
  const rows = [
    { label: "Items", value: String(guidance.summary.itemCount) },
    { label: "Blocked", value: String(guidance.summary.blockedCount) },
    { label: "Warnings", value: String(guidance.summary.warningCount) },
    { label: "Next safe step", value: guidance.summary.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Read only \xB7 No auto-fix \xB7 Publishing disabled \xB7 No external writes"));
  if (guidance.items.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    guidance.items.slice(0, 6).forEach((item) => {
      const li = list.createEl("li");
      li.createEl("div", { text: `${item.title} \xB7 ${item.category} \xB7 ${item.severity}` });
      li.createEl("div", { cls: "brain-console__list-sub", text: item.summary });
      li.createEl("div", { cls: "brain-console__list-note", text: item.nextSafeStep });
      li.createEl("div", { cls: "brain-console__list-note", text: item.steps.slice(0, 2).map((step) => step.label).join(" \xB7 ") });
    });
  }
  return el;
}
function renderPostManualExportCard(state) {
  const el = document.createElement("div");
  const packagePreview = state.postOrchestratorManualExportPackage?.package;
  if (!packagePreview) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No manual export preview available." });
    return el;
  }
  const rows = [
    { label: "Package", value: packagePreview.title },
    { label: "Items", value: String(packagePreview.itemCount) },
    { label: "Status", value: packagePreview.status },
    { label: "Next safe step", value: packagePreview.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Preview only \xB7 No file writes \xB7 No clipboard \xB7 No publishing"));
  if (packagePreview.items.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    packagePreview.items.slice(0, 5).forEach((item) => {
      const li = list.createEl("li");
      li.createEl("div", { text: `${item.platform} \xB7 ${item.title} \xB7 ${item.format}` });
      li.createEl("div", { cls: "brain-console__list-sub", text: `${item.contentPreview.slice(0, 96)}${item.contentPreview.length > 96 ? "\u2026" : ""}` });
      li.createEl("div", { cls: "brain-console__list-note", text: item.checklist.slice(0, 3).join(" \xB7 ") });
    });
  }
  return el;
}
function renderPostAcceptanceChecklistCard(state) {
  const el = document.createElement("div");
  const checklist = state.postOrchestratorAcceptanceChecklist?.checklist;
  if (!checklist) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No acceptance checklist available." });
    return el;
  }
  const rows = [
    { label: "Passed", value: String(checklist.passedCount) },
    { label: "Blocked", value: String(checklist.blockedCount) },
    { label: "Failed", value: String(checklist.failedCount) },
    { label: "Required", value: String(checklist.requiredCount) },
    { label: "Next safe step", value: checklist.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Read only \xB7 Publishing disabled \xB7 Scheduling disabled \xB7 No decommission"));
  if (checklist.checks.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    checklist.checks.slice(0, 8).forEach((check) => {
      list.createEl("li", {
        text: `${check.label} \xB7 ${check.status} \xB7 required:${check.required ? "yes" : "no"} \xB7 ${check.summary}`
      });
      const details = list.createEl("li", { cls: "brain-console__list-sub", text: `evidence: ${check.evidence.slice(0, 2).join(" \xB7 ")}` });
      details.createEl("div", { cls: "brain-console__list-note", text: check.nextSafeStep });
    });
  }
  return el;
}
function renderPostMigrationParityReportCard(state) {
  const el = document.createElement("div");
  const report = state.postOrchestratorMigrationParity?.report;
  if (!report) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No migration parity report available." });
    return el;
  }
  const rows = [
    { label: "Overall score", value: String(report.overallParityScore) },
    { label: "Status", value: report.status },
    { label: "Blocked capabilities", value: String(report.blockers.length) },
    { label: "Next safe step", value: report.nextSafeStep }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("No legacy repo changes \xB7 No decommission \xB7 Approval required"));
  if (report.capabilities.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    report.capabilities.slice(0, 9).forEach((capability) => {
      list.createEl("li", {
        text: `${capability.label} \xB7 ${capability.status} \xB7 score:${capability.parityScore} \xB7 ${capability.summary}`
      });
      list.createEl("li", { cls: "brain-console__list-sub", text: `gaps: ${capability.remainingGaps.slice(0, 2).join(" \xB7 ") || "none"} \xB7 next: ${capability.nextSafeStep}` });
    });
  }
  return el;
}
function renderPostRoadmapCheckpointCard(state) {
  const el = document.createElement("div");
  const checkpoint = state.postOrchestratorRoadmapCheckpoint?.checkpoint;
  if (!checkpoint) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No roadmap checkpoint available." });
    return el;
  }
  const rows = [
    { label: "Current phase", value: checkpoint.currentPhase },
    { label: "Completed phases", value: String(checkpoint.completedPhaseCount) },
    { label: "Blocked phases", value: String(checkpoint.blockedPhaseCount) },
    { label: "Next recommended phase", value: checkpoint.nextRecommendedPhase }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Read only \xB7 Future publishing/scheduling design requires approval"));
  if (checkpoint.phases.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    checkpoint.phases.slice(0, 15).forEach((phase) => {
      list.createEl("li", {
        text: `${phase.id} \xB7 ${phase.label} \xB7 ${phase.status} \xB7 ${phase.summary}`
      });
      list.createEl("li", { cls: "brain-console__list-sub", text: phase.evidence.slice(0, 2).join(" \xB7 ") });
    });
  }
  return el;
}
function renderSafetyStateCard(state) {
  const el = document.createElement("div");
  const flows = state.postOrchestratorFlows?.flows ?? [];
  const drafts = state.postOrchestratorDrafts?.drafts ?? [];
  const dryRun = state.postOrchestratorDryRun?.plan;
  const rows = [
    { label: "Dry-run only", value: dryRun?.safety.dryRunOnly ? "yes" : "no" },
    { label: "Publishing disabled", value: flows.every((flow) => flow.publishingEnabled === false) && dryRun?.safety.publishingEnabled === false ? "yes" : "no" },
    { label: "Scheduling disabled", value: flows.every((flow) => flow.schedulingEnabled === false) && dryRun?.safety.schedulingEnabled === false ? "yes" : "no" },
    { label: "Execution disabled", value: flows.every((flow) => flow.executionEnabled === false) && dryRun?.safety.executionEnabled === false ? "yes" : "no" },
    { label: "No platform writes", value: drafts.every((draft) => draft.safety.writesExternalPlatform === false) ? "yes" : "no" },
    { label: "No Mind writes", value: drafts.every((draft) => draft.safety.writesToMind === false) && dryRun?.safety.writesToMind === false ? "yes" : "no" },
    { label: "No Playwright/cookies", value: drafts.every((draft) => draft.safety.usesPlaywright === false) && dryRun?.safety.usesPlaywright === false && dryRun?.safety.usesCookies === false ? "yes" : "no" }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  return el;
}
function renderBrainConsoleQaStatusCard(state) {
  const el = document.createElement("div");
  const qa = state.postOrchestratorQaStatus?.qaStatus;
  if (!qa) {
    el.createEl("div", { cls: "brain-console__list-note", text: "QA status not available." });
    return el;
  }
  const coveragePercent = qa.endpointCount > 0 ? Math.round(qa.coveredCount / qa.endpointCount * 100) : 0;
  const rows = [
    { label: "Status", value: qa.status },
    { label: "Endpoints", value: `${qa.coveredCount}/${qa.endpointCount}` },
    { label: "Coverage", value: `${coveragePercent}%` },
    { label: "Manual checks", value: String(qa.manualCheckCount) },
    { label: "Next safe step", value: qa.nextSafeStep || "ready for manual QA" }
  ];
  rows.forEach(({ label, value }) => {
    const row = el.createDiv({ cls: "brain-console__row" });
    row.createEl("dt", { text: label });
    row.createEl("dd", { text: value });
  });
  el.appendChild(renderSafetyLabel("Preview only \xB7 Publishing disabled \xB7 Scheduling disabled \xB7 Execution disabled \xB7 No external writes \xB7 No Mind writes"));
  return el;
}
function renderVisualQaChecklistCard(state) {
  const el = document.createElement("div");
  const qa = state.postOrchestratorQaStatus?.qaStatus;
  const fallbackChecklist = [
    "Overview card visible",
    "Flow Preview group visible",
    "Review / Schedule group visible",
    "Safety / Policy group visible",
    "Migration / Checkpoint group visible",
    "Publishing disabled label visible",
    "Scheduling disabled label visible",
    "No publish/schedule/run buttons visible",
    "No legacy provider labels visible",
    "Next safe step visible"
  ];
  if (qa?.checklist && qa.checklist.length > 0) {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    qa.checklist.slice(0, 10).forEach((item) => {
      const statusIcon = item.status === "manual-check" ? "\u25D0" : "?";
      list.createEl("li", { text: `${statusIcon} ${item.label}` });
      if (item.summary) {
        list.createEl("li", { cls: "brain-console__list-sub", text: item.summary });
      }
    });
  } else {
    const list = el.createEl("ul", { cls: "brain-console__list" });
    fallbackChecklist.forEach((item) => {
      list.createEl("li", { text: `\u25D0 ${item}` });
    });
  }
  return el;
}
function renderPostContractsCard(state) {
  const el = document.createElement("div");
  const contracts = state.postOrchestratorContracts?.contracts ?? [];
  if (contracts.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No post contracts available." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  contracts.forEach((contract) => {
    list.createEl("li", {
      text: `${contract.id}: ${contract.status} \xB7 brain=${contract.implementedInBrain ? "yes" : "no"} \xB7 provider=${contract.implementedInProvider ? "yes" : "no"}`
    });
  });
  return el;
}
function renderPostRecoveryCard(state) {
  const el = document.createElement("div");
  const recovery = state.postOrchestratorRecovery?.items ?? [];
  if (recovery.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No post recovery items available." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  recovery.forEach((item) => {
    list.createEl("li", { text: `${item.id}: ${item.blocker}` });
  });
  return el;
}
function renderPublishingDisabledCard() {
  const el = document.createElement("div");
  el.createEl("div", {
    cls: "brain-console__post-disabled",
    text: "Publishing is disabled. No post is scheduled or published from Brain in Phase P1."
  });
  return el;
}
async function readBrainCoreProBotDashboardParity(baseUrl) {
  const url = `${baseUrl.replace(/\/$/, "")}/probot/dashboard-parity`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { error: `HTTP ${response.status}`, status: response.status, url };
    }
    const value = await response.json();
    return { value };
  } catch (error) {
    return { error: "request_failed", detail: error instanceof Error ? error.message : String(error), url };
  }
}
function renderDiagnosticsPanel(shell, state) {
  if (!state.endpointErrors || state.endpointErrors.length === 0) {
    return;
  }
  const panel = shell.createDiv({ cls: "brain-console__diagnostics" });
  panel.createEl("div", { cls: "brain-console__diagnostics-title", text: "Diagnostics" });
  for (const error of state.endpointErrors) {
    const item = panel.createDiv({ cls: "brain-console__diagnostics-item" });
    item.createEl("div", { cls: "brain-console__diagnostics-endpoint", text: error.pathname });
    item.createEl("div", { cls: "brain-console__diagnostics-error", text: error.error });
  }
}
async function openExternalUrl(brainCoreUrl, url) {
  const result = await openBrowserUrl(brainCoreUrl, url);
  if (!result.ok) {
    new import_obsidian.Notice(`Could not open browser: ${result.error ?? "unknown error"}`);
  }
}
var credBus = /* @__PURE__ */ (() => {
  const listeners = [];
  return {
    emit(key, delta) {
      listeners.forEach((h) => h(key, delta));
    },
    subscribe(handler) {
      listeners.push(handler);
    },
    unsubscribe(handler) {
      const i = listeners.indexOf(handler);
      if (i !== -1) listeners.splice(i, 1);
    }
  };
})();
var ACCOUNTS_COLLAPSE_KEY = (groupKey) => `brain-console-accounts-collapsed-${groupKey}`;
function isGroupCollapsed(groupKey) {
  try {
    return localStorage.getItem(ACCOUNTS_COLLAPSE_KEY(groupKey)) === "1";
  } catch {
    return false;
  }
}
function setGroupCollapsed(groupKey, collapsed) {
  try {
    collapsed ? localStorage.setItem(ACCOUNTS_COLLAPSE_KEY(groupKey), "1") : localStorage.removeItem(ACCOUNTS_COLLAPSE_KEY(groupKey));
  } catch {
  }
}
function makeCollapsibleGroup(parent, groupKey, groupCls, renderHeader, renderBody) {
  const block = parent.createDiv({ cls: `bc-accounts-group ${groupCls}` });
  const headerRow = block.createDiv({ cls: "bc-accounts-group-header bc-accounts-group-header--collapsible" });
  const toggle = headerRow.createEl("span", { cls: "bc-accounts-toggle", text: isGroupCollapsed(groupKey) ? "\u25B6" : "\u25BC" });
  renderHeader(headerRow);
  const body = block.createDiv({ cls: `bc-accounts-group-body${isGroupCollapsed(groupKey) ? " bc-accounts-group-body--collapsed" : ""}` });
  renderBody(body);
  headerRow.addEventListener("click", () => {
    const nowCollapsed = !isGroupCollapsed(groupKey);
    setGroupCollapsed(groupKey, nowCollapsed);
    toggle.textContent = nowCollapsed ? "\u25B6" : "\u25BC";
    body.toggleClass("bc-accounts-group-body--collapsed", nowCollapsed);
  });
}
function renderAccountsSection(content, state, settings) {
  const brainCoreUrl = state.brainCoreUrl ?? settings.brainCoreUrl ?? "";
  const catalog = state.credentialCatalog;
  const header = content.createDiv({ cls: "bc-accounts-header" });
  header.createEl("h2", { cls: "bc-accounts-title", text: "Accounts & Credentials" });
  renderVOContextBar(content, state);
  const voGrid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(voGrid, "VO Account Registry", renderVOAccountsRegistryCard(state), { wide: true });
  if (!catalog) {
    content.createEl("p", { cls: "brain-console__empty", text: "Credential catalog unavailable \u2014 Brain Core must be online." });
    return;
  }
  const infraAllOk = catalog.infra.every((g) => g.allRequiredSet);
  const infraReadyCount = catalog.infra.filter((g) => g.allRequiredSet).length;
  makeCollapsibleGroup(
    content,
    "infra",
    "bc-accounts-group--infra",
    (headerRow) => {
      headerRow.createEl("span", { cls: "bc-accounts-group-name", text: "Infrastructure" });
      createStatusChip(headerRow, `${infraReadyCount}/${catalog.infra.length} ready`, infraAllOk ? "ok" : "warn");
    },
    (body) => {
      for (const infraGroup of catalog.infra) {
        renderInfraCredentialGroup(body, infraGroup, brainCoreUrl);
      }
    }
  );
  for (const project of catalog.projects) {
    const allPlatforms = project.platforms;
    const requiredTotal = allPlatforms.flatMap((p) => p.credentials.filter((c) => c.required)).length;
    const allRequiredKeys = new Set(allPlatforms.flatMap((p) => p.credentials.filter((c) => c.required).map((c) => c.key)));
    let groupSetCount = allPlatforms.flatMap((p) => p.credentials.filter((c) => c.required && c.isSet && !c.hasPlaceholder)).length;
    let groupChip;
    const groupChipHandler = (key, delta) => {
      if (!allRequiredKeys.has(key)) return;
      groupSetCount = Math.max(0, Math.min(requiredTotal, groupSetCount + delta));
      const tone = requiredTotal > 0 && groupSetCount === requiredTotal ? "ok" : groupSetCount > 0 ? "warn" : "danger";
      groupChip.textContent = `${groupSetCount}/${requiredTotal} required`;
      groupChip.className = `bc-chip bc-chip--${tone}`;
    };
    credBus.subscribe(groupChipHandler);
    makeCollapsibleGroup(
      content,
      project.projectId,
      "bc-accounts-group--project",
      (headerRow) => {
        headerRow.createEl("span", { cls: "bc-accounts-group-name", text: project.displayName });
        const tone = requiredTotal > 0 && groupSetCount === requiredTotal ? "ok" : groupSetCount > 0 ? "warn" : "danger";
        groupChip = createStatusChip(headerRow, `${groupSetCount}/${requiredTotal} required`, tone);
        headerRow.addEventListener("remove", () => credBus.unsubscribe(groupChipHandler));
      },
      (body) => {
        const socialPlatforms = allPlatforms.filter((p) => p.platformCategory === "social");
        const infraPlatforms = allPlatforms.filter((p) => p.platformCategory === "infra");
        for (const platform of [...socialPlatforms, ...infraPlatforms]) {
          renderProjectPlatformCard(body, platform, project.projectId, brainCoreUrl);
        }
      }
    );
  }
  const addArea = content.createDiv({ cls: "bc-accounts-add-area" });
  const addBtn = addArea.createEl("button", { cls: "bc-accounts-add-project-btn", text: "\uFF0B Add Project" });
  addBtn.addEventListener("click", () => {
    addBtn.style.display = "none";
    renderAddProjectForm(addArea, brainCoreUrl, catalog.availablePlatforms, () => {
      addBtn.style.display = "";
    });
  });
}
function renderAddProjectForm(parent, brainCoreUrl, availablePlatforms, onCancel) {
  const form = parent.createDiv({ cls: "bc-accounts-add-form" });
  form.createEl("p", { cls: "bc-accounts-add-form-title", text: "New Project" });
  const nameInput = form.createEl("input", { cls: "bc-accounts-input" });
  nameInput.type = "text";
  nameInput.placeholder = "Project name (e.g. Yeshua Academy)";
  const repoInput = form.createEl("input", { cls: "bc-accounts-input" });
  repoInput.type = "text";
  repoInput.placeholder = "Repo path (e.g. /Users/Office/Repos/yeshuaacademy/web)";
  const envInput = form.createEl("input", { cls: "bc-accounts-input" });
  envInput.type = "text";
  envInput.placeholder = ".env file (e.g. .env.production)";
  envInput.value = ".env";
  form.createEl("p", { cls: "bc-accounts-add-platform-label", text: "Platforms:" });
  const platformGrid = form.createDiv({ cls: "bc-accounts-platform-chips" });
  const selectedPlatforms = /* @__PURE__ */ new Set();
  for (const p of availablePlatforms) {
    const chip = platformGrid.createEl("label", { cls: "bc-accounts-platform-chip" });
    const checkbox = chip.createEl("input");
    checkbox.type = "checkbox";
    checkbox.value = p.platformId;
    chip.createEl("span", { text: p.platformName });
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedPlatforms.add(p.platformId);
        chip.addClass("bc-accounts-platform-chip--selected");
      } else {
        selectedPlatforms.delete(p.platformId);
        chip.removeClass("bc-accounts-platform-chip--selected");
      }
    });
  }
  const btnRow = form.createDiv({ cls: "bc-accounts-add-btn-row" });
  const createBtn = btnRow.createEl("button", { cls: "bc-accounts-save-btn", text: "Create Project" });
  const cancelBtn = btnRow.createEl("button", { cls: "bc-accounts-cancel-btn", text: "Cancel" });
  const feedbackEl = form.createEl("span", { cls: "bc-accounts-feedback" });
  cancelBtn.addEventListener("click", () => {
    form.remove();
    onCancel();
  });
  createBtn.addEventListener("click", async () => {
    const displayName = nameInput.value.trim();
    const repoPath = repoInput.value.trim();
    const envFileName = envInput.value.trim() || ".env";
    const platforms = [...selectedPlatforms];
    if (!displayName) {
      feedbackEl.textContent = "Enter a project name.";
      feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--warn";
      return;
    }
    if (!repoPath) {
      feedbackEl.textContent = "Enter the repo path.";
      feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--warn";
      return;
    }
    if (platforms.length === 0) {
      feedbackEl.textContent = "Select at least one platform.";
      feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--warn";
      return;
    }
    const projectId = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    createBtn.disabled = true;
    createBtn.textContent = "\u2026";
    feedbackEl.textContent = "";
    try {
      const result = await registerBrainCoreProject(brainCoreUrl, { projectId, displayName, repoPath, envFileName, platforms });
      if (result.ok) {
        form.empty();
        form.createEl("p", { cls: "bc-accounts-feedback bc-accounts-feedback--ok", text: `Project "${displayName}" added. Refresh to see credentials.` });
      } else {
        feedbackEl.textContent = result.error === "duplicate_id" ? "A project with that name already exists." : result.error ?? "Failed to create project.";
        feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
        createBtn.disabled = false;
        createBtn.textContent = "Create Project";
      }
    } catch (err) {
      feedbackEl.textContent = err instanceof Error ? err.message : "Network error.";
      feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
      createBtn.disabled = false;
      createBtn.textContent = "Create Project";
    }
  });
}
function renderCredStatusDot(parent, isSet, hasPlaceholder) {
  if (isSet && !hasPlaceholder) {
    const dot = parent.createEl("span", { cls: "bc-accounts-set-dot bc-accounts-set-dot--ok" });
    dot.title = "Set";
  } else if (hasPlaceholder) {
    const dot = parent.createEl("span", { cls: "bc-accounts-set-dot bc-accounts-set-dot--placeholder" });
    dot.title = "Placeholder value \u2014 needs real value";
  } else {
    const dot = parent.createEl("span", { cls: "bc-accounts-set-dot bc-accounts-set-dot--unset" });
    dot.title = "Not set";
  }
}
function renderInfraCredentialGroup(parent, group, brainCoreUrl) {
  const card = parent.createDiv({ cls: "bc-accounts-platform bc-accounts-platform--infra" });
  const top = card.createDiv({ cls: "bc-accounts-platform-top" });
  top.createEl("span", { cls: "bc-accounts-platform-name", text: group.platformName });
  const statusChip = createStatusChip(top, group.allRequiredSet ? "Ready" : "Action required", group.allRequiredSet ? "ok" : "danger");
  const requiredKeys = new Set(group.credentials.filter((c) => c.required).map((c) => c.key));
  let setCount = group.credentials.filter((c) => c.required && c.isSet && !c.hasPlaceholder).length;
  const requiredCount = requiredKeys.size;
  const infraChipHandler = (key, delta) => {
    if (!requiredKeys.has(key)) return;
    setCount = Math.max(0, Math.min(requiredCount, setCount + delta));
    const allSet = setCount >= requiredCount;
    statusChip.textContent = allSet ? "Ready" : "Action required";
    statusChip.className = `bc-chip bc-chip--${allSet ? "ok" : "danger"}`;
  };
  credBus.subscribe(infraChipHandler);
  card.addEventListener("remove", () => credBus.unsubscribe(infraChipHandler));
  const table = card.createEl("table", { cls: "bc-accounts-table" });
  const tbody = table.createEl("tbody");
  for (const cred of group.credentials) {
    if (cred.storage === "keychain") {
      renderYouTubeOAuthRow(tbody, cred, brainCoreUrl);
      continue;
    }
    const tr = tbody.createEl("tr", { cls: `bc-accounts-row${cred.isSet && !cred.hasPlaceholder ? " bc-accounts-row--set" : ""}` });
    const labelTd = tr.createEl("td", { cls: "bc-accounts-label-cell" });
    labelTd.createEl("span", { cls: "bc-accounts-key-label", text: cred.label });
    if (cred.required) labelTd.createEl("span", { cls: "bc-accounts-required-badge", text: "required" });
    if (cred.hint) {
      const hintSpan = labelTd.createEl("span", { cls: "bc-accounts-hint" });
      hintSpan.createEl("span", { text: cred.hint });
      if (cred.deeplink) {
        const dlBtn = hintSpan.createEl("button", { cls: "bc-accounts-deeplink-btn", text: "\u2197 Open" });
        dlBtn.addEventListener("click", () => {
          void openExternalUrl(brainCoreUrl, cred.deeplink);
        });
      }
    }
    const statusTd = tr.createEl("td", { cls: "bc-accounts-status-cell" });
    renderCredStatusDot(statusTd, cred.isSet, cred.hasPlaceholder);
    const inputTd = tr.createEl("td", { cls: "bc-accounts-input-cell" });
    const inputWrap = inputTd.createDiv({ cls: "bc-accounts-input-wrap" });
    const input = inputWrap.createEl("input", { cls: "bc-accounts-input" });
    input.type = cred.type === "secret" || cred.type === "token" || cred.type === "api_key" ? "password" : "text";
    input.placeholder = cred.isSet && !cred.hasPlaceholder ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (set \u2014 enter new value to update)" : `Enter ${cred.label}`;
    input.setAttribute("autocomplete", "off");
    const saveBtn = inputWrap.createEl("button", { cls: "bc-accounts-save-btn", text: "Save" });
    const feedbackEl = inputWrap.createEl("span", { cls: "bc-accounts-feedback" });
    saveBtn.addEventListener("click", async () => {
      const val = input.value.trim();
      if (!val) {
        feedbackEl.textContent = "Enter a value first.";
        feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--warn";
        return;
      }
      saveBtn.disabled = true;
      saveBtn.textContent = "\u2026";
      feedbackEl.textContent = "";
      try {
        const result = await setInfraPlistCredential(brainCoreUrl, cred.key, val);
        if (result.ok) {
          input.value = "";
          input.placeholder = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (set \u2014 enter new value to update)";
          if (!tr.hasClass("bc-accounts-row--set") && cred.required) credBus.emit(cred.key, 1);
          tr.addClass("bc-accounts-row--set");
          statusTd.empty();
          renderCredStatusDot(statusTd, true, false);
          feedbackEl.textContent = result.action === "created" ? "Saved." : "Updated.";
          feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--ok";
        } else {
          feedbackEl.textContent = result.error === "key_not_allowed" ? "Key not permitted." : result.error ?? "Save failed.";
          feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
        }
      } catch (err) {
        feedbackEl.textContent = err instanceof Error ? err.message : "Network error.";
        feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save";
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") saveBtn.click();
    });
  }
}
function renderYouTubeOAuthRow(tbody, cred, brainCoreUrl) {
  const account = cred.key.replace("yt-oauth-", "");
  const tr = tbody.createEl("tr", { cls: `bc-accounts-row${cred.isSet ? " bc-accounts-row--set" : ""}` });
  const labelTd = tr.createEl("td", { cls: "bc-accounts-label-cell" });
  labelTd.createEl("span", { cls: "bc-accounts-key-label", text: cred.label });
  if (cred.required) labelTd.createEl("span", { cls: "bc-accounts-required-badge", text: "required" });
  const statusTd = tr.createEl("td", { cls: "bc-accounts-status-cell" });
  renderCredStatusDot(statusTd, cred.isSet, cred.hasPlaceholder);
  const inputTd = tr.createEl("td", { cls: "bc-accounts-input-cell" });
  if (cred.isSet) {
    const wrap2 = inputTd.createDiv({ cls: "bc-accounts-input-wrap" });
    wrap2.createEl("span", { cls: "bc-accounts-feedback bc-accounts-feedback--ok", text: "Connected" });
    const reconnectBtn = wrap2.createEl("button", { cls: "bc-accounts-save-btn", text: "Reconnect" });
    reconnectBtn.addEventListener("click", () => startYouTubeOAuthFlow(inputTd, account, cred.key, brainCoreUrl, tr, statusTd, true));
    return;
  }
  const wrap = inputTd.createDiv({ cls: "bc-accounts-input-wrap" });
  const connectBtn = wrap.createEl("button", { cls: "bc-accounts-save-btn", text: "Connect" });
  connectBtn.addEventListener("click", () => startYouTubeOAuthFlow(inputTd, account, cred.key, brainCoreUrl, tr, statusTd, false));
}
function startYouTubeOAuthFlow(inputTd, account, credKey, brainCoreUrl, tr, statusTd, isReconnect) {
  inputTd.empty();
  const flow = inputTd.createDiv({ cls: "bc-accounts-oauth-flow" });
  const statusMsg = flow.createEl("div", { cls: "bc-accounts-feedback" });
  const openBtn = flow.createEl("button", {
    cls: "bc-accounts-save-btn",
    text: isReconnect ? "Open Google Auth (reconnect)" : "Open Google Auth"
  });
  const codeRow = flow.createDiv({ cls: "bc-accounts-oauth-code-row bc-accounts-oauth-flow--hidden" });
  const codeInput = codeRow.createEl("input", { cls: "bc-accounts-input bc-accounts-oauth-code-input" });
  codeInput.type = "text";
  codeInput.placeholder = "Paste authorization code from Google\u2026";
  codeInput.setAttribute("autocomplete", "off");
  const authorizeBtn = codeRow.createEl("button", { cls: "bc-accounts-save-btn", text: "Authorize" });
  const codeFeedback = flow.createEl("div", { cls: "bc-accounts-feedback" });
  openBtn.addEventListener("click", async () => {
    openBtn.disabled = true;
    openBtn.textContent = "Opening\u2026";
    statusMsg.textContent = "";
    statusMsg.className = "bc-accounts-feedback";
    try {
      const result = await getYouTubeOAuthUrl(brainCoreUrl, account);
      if (result.ok && result.url) {
        await openExternalUrl(brainCoreUrl, result.url);
        statusMsg.textContent = "Browser opened \u2014 authorize, then paste the code below.";
        statusMsg.className = "bc-accounts-feedback bc-accounts-feedback--ok";
        codeRow.removeClass("bc-accounts-oauth-flow--hidden");
        codeInput.focus();
        openBtn.textContent = "Reopen browser";
        openBtn.disabled = false;
        openBtn.onclick = () => {
          void openExternalUrl(brainCoreUrl, result.url);
        };
      } else {
        statusMsg.textContent = result.error ?? "Failed to generate URL.";
        statusMsg.className = "bc-accounts-feedback bc-accounts-feedback--error";
        openBtn.disabled = false;
        openBtn.textContent = isReconnect ? "Open Google Auth (reconnect)" : "Open Google Auth";
      }
    } catch (err) {
      statusMsg.textContent = err instanceof Error ? err.message : "Network error.";
      statusMsg.className = "bc-accounts-feedback bc-accounts-feedback--error";
      openBtn.disabled = false;
      openBtn.textContent = isReconnect ? "Open Google Auth (reconnect)" : "Open Google Auth";
    }
  });
  authorizeBtn.addEventListener("click", async () => {
    const code = codeInput.value.trim();
    if (!code) {
      codeFeedback.textContent = "Paste the code first.";
      codeFeedback.className = "bc-accounts-feedback bc-accounts-feedback--warn";
      return;
    }
    authorizeBtn.disabled = true;
    authorizeBtn.textContent = "\u2026";
    codeFeedback.textContent = "";
    try {
      const result = await exchangeYouTubeOAuthCode(brainCoreUrl, account, code);
      if (result.ok) {
        if (!tr.hasClass("bc-accounts-row--set")) credBus.emit(credKey, 1);
        tr.addClass("bc-accounts-row--set");
        statusTd.empty();
        renderCredStatusDot(statusTd, true, false);
        inputTd.empty();
        const wrap = inputTd.createDiv({ cls: "bc-accounts-input-wrap" });
        wrap.createEl("span", { cls: "bc-accounts-feedback bc-accounts-feedback--ok", text: "Connected" });
        const reconnectBtn = wrap.createEl("button", { cls: "bc-accounts-save-btn", text: "Reconnect" });
        reconnectBtn.addEventListener("click", () => startYouTubeOAuthFlow(inputTd, account, credKey, brainCoreUrl, tr, statusTd, true));
      } else {
        codeFeedback.textContent = result.error ?? "Authorization failed.";
        codeFeedback.className = "bc-accounts-feedback bc-accounts-feedback--error";
        authorizeBtn.disabled = false;
        authorizeBtn.textContent = "Authorize";
      }
    } catch (err) {
      codeFeedback.textContent = err instanceof Error ? err.message : "Network error.";
      codeFeedback.className = "bc-accounts-feedback bc-accounts-feedback--error";
      authorizeBtn.disabled = false;
      authorizeBtn.textContent = "Authorize";
    }
  });
  codeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") authorizeBtn.click();
  });
}
function renderProjectPlatformCard(parent, platform, projectId, brainCoreUrl) {
  const card = parent.createDiv({ cls: `bc-accounts-platform${platform.platformCategory === "infra" ? " bc-accounts-platform--secondary" : ""}` });
  const top = card.createDiv({ cls: "bc-accounts-platform-top" });
  const platformIcons = {
    youtube: "\u25B6",
    pinterest: "\u25C8",
    facebook: "\u25C9",
    instagram: "\u25CE",
    tiktok: "\u25C6",
    twitter: "\u25E7",
    linkedin: "\u25EB",
    azure: "\u25E7"
  };
  const icon = platformIcons[platform.platformId] ?? "\u25C8";
  top.createEl("span", { cls: "bc-accounts-platform-icon", text: icon });
  top.createEl("span", { cls: "bc-accounts-platform-name", text: platform.platformName });
  const platformStatusChip = createStatusChip(top, platform.allRequiredSet ? "Ready" : "Incomplete", platform.allRequiredSet ? "ok" : "warn");
  const platformRequiredKeys = new Set(platform.credentials.filter((c) => c.required).map((c) => c.key));
  let platformSetCount = platform.credentials.filter((c) => c.required && c.isSet && !c.hasPlaceholder).length;
  const platformRequiredCount = platformRequiredKeys.size;
  const platformChipHandler = (key, delta) => {
    if (!platformRequiredKeys.has(key)) return;
    platformSetCount = Math.max(0, Math.min(platformRequiredCount, platformSetCount + delta));
    const allSet = platformSetCount >= platformRequiredCount;
    platformStatusChip.textContent = allSet ? "Ready" : "Incomplete";
    platformStatusChip.className = `bc-chip bc-chip--${allSet ? "ok" : "warn"}`;
  };
  credBus.subscribe(platformChipHandler);
  card.addEventListener("remove", () => credBus.unsubscribe(platformChipHandler));
  const table = card.createEl("table", { cls: "bc-accounts-table" });
  const tbody = table.createEl("tbody");
  for (const cred of platform.credentials) {
    if (cred.storage === "keychain") {
      renderYouTubeOAuthRow(tbody, cred, brainCoreUrl);
      continue;
    }
    const tr = tbody.createEl("tr", { cls: `bc-accounts-row${cred.isSet && !cred.hasPlaceholder ? " bc-accounts-row--set" : ""}` });
    const labelTd = tr.createEl("td", { cls: "bc-accounts-label-cell" });
    labelTd.createEl("span", { cls: "bc-accounts-key-label", text: cred.label });
    if (cred.required) labelTd.createEl("span", { cls: "bc-accounts-required-badge", text: "required" });
    if (cred.hint) {
      const hintSpan = labelTd.createEl("span", { cls: "bc-accounts-hint" });
      hintSpan.createEl("span", { text: cred.hint });
      if (cred.deeplink) {
        const dlBtn = hintSpan.createEl("button", { cls: "bc-accounts-deeplink-btn", text: "\u2197 Open" });
        dlBtn.addEventListener("click", () => {
          void openExternalUrl(brainCoreUrl, cred.deeplink);
        });
      }
    }
    const statusTd = tr.createEl("td", { cls: "bc-accounts-status-cell" });
    renderCredStatusDot(statusTd, cred.isSet, cred.hasPlaceholder);
    const inputTd = tr.createEl("td", { cls: "bc-accounts-input-cell" });
    const inputWrap = inputTd.createDiv({ cls: "bc-accounts-input-wrap" });
    const input = inputWrap.createEl("input", { cls: "bc-accounts-input" });
    input.type = cred.type === "secret" || cred.type === "token" || cred.type === "api_key" ? "password" : "text";
    input.placeholder = cred.isSet && !cred.hasPlaceholder ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (set \u2014 enter new value to update)" : `Enter ${cred.label}`;
    input.setAttribute("autocomplete", "off");
    input.setAttribute("data-key", cred.key);
    input.setAttribute("data-project", projectId);
    const saveBtn = inputWrap.createEl("button", { cls: "bc-accounts-save-btn", text: "Save" });
    const feedbackEl = inputWrap.createEl("span", { cls: "bc-accounts-feedback" });
    if (cred.isSet && !cred.hasPlaceholder) {
      const revokeBtn = inputWrap.createEl("button", { cls: "bc-accounts-revoke-btn", text: "Revoke" });
      revokeBtn.setAttribute("title", `Remove ${cred.key} from .env`);
      revokeBtn.addEventListener("click", async () => {
        if (!confirm(`Revoke ${cred.label} for ${projectId}? This removes the key from the .env file.`)) return;
        revokeBtn.disabled = true;
        revokeBtn.textContent = "\u2026";
        feedbackEl.textContent = "";
        try {
          const result = await revokeBrainCoreCredential(brainCoreUrl, projectId, cred.key);
          if (result.ok) {
            if (cred.required) credBus.emit(cred.key, -1);
            tr.removeClass("bc-accounts-row--set");
            statusTd.empty();
            renderCredStatusDot(statusTd, false, false);
            input.placeholder = `Enter ${cred.label}`;
            feedbackEl.textContent = "Revoked.";
            feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--ok";
            revokeBtn.remove();
          } else {
            feedbackEl.textContent = result.error ?? "Revoke failed.";
            feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
            revokeBtn.disabled = false;
            revokeBtn.textContent = "Revoke";
          }
        } catch (err) {
          feedbackEl.textContent = err instanceof Error ? err.message : "Network error.";
          feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
          revokeBtn.disabled = false;
          revokeBtn.textContent = "Revoke";
        }
      });
    }
    saveBtn.addEventListener("click", async () => {
      const val = input.value.trim();
      if (!val) {
        feedbackEl.textContent = "Enter a value first.";
        feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--warn";
        return;
      }
      saveBtn.disabled = true;
      saveBtn.textContent = "\u2026";
      feedbackEl.textContent = "";
      try {
        const result = await setBrainCoreCredential(brainCoreUrl, projectId, cred.key, val);
        if (result.ok) {
          input.value = "";
          input.placeholder = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (set \u2014 enter new value to update)";
          if (!tr.hasClass("bc-accounts-row--set") && cred.required) credBus.emit(cred.key, 1);
          tr.addClass("bc-accounts-row--set");
          statusTd.empty();
          renderCredStatusDot(statusTd, true, false);
          feedbackEl.textContent = result.action === "created" ? "Saved." : "Updated.";
          feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--ok";
        } else {
          feedbackEl.textContent = result.error === "key_not_allowed" ? "Key not permitted." : result.error ?? "Save failed.";
          feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
        }
      } catch (err) {
        feedbackEl.textContent = err instanceof Error ? err.message : "Network error.";
        feedbackEl.className = "bc-accounts-feedback bc-accounts-feedback--error";
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = "Save";
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") saveBtn.click();
    });
  }
}

// src/main.ts
var VIEW_TYPE = "brain-console-view";
var BRAIN_CONSOLE_BUILD_ID = "v2.18";
var BrainConsolePlugin = class extends import_obsidian2.Plugin {
  settings = DEFAULT_BRAIN_CONSOLE_SETTINGS;
  async onload() {
    setRequestUrl(import_obsidian2.requestUrl);
    window.BRAIN_CONSOLE_BUILD_ID = BRAIN_CONSOLE_BUILD_ID;
    this.settings = sanitizeSettings(await this.loadData());
    this.addRibbonIcon("brain-circuit", "Open Brain Console", () => {
      void this.reopenConsoleFresh();
    });
    this.addCommand({
      id: "open-brain-console-main",
      name: "Open Brain Console dashboard",
      callback: () => {
        void this.openConsole();
      }
    });
    this.addCommand({
      id: "reopen-brain-console-dashboard",
      name: "Reopen Brain Console dashboard",
      callback: () => {
        void this.reopenConsoleFresh();
      }
    });
    this.addSettingTab(new BrainConsoleSettingTab(this.app, this));
    this.registerView(VIEW_TYPE, (leaf) => new BrainConsoleView(leaf, this));
  }
  async getSettings() {
    return this.settings;
  }
  async updateSettings(next) {
    this.settings = next;
    await this.saveData(next);
  }
  async openConsole() {
    try {
      let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
      if (!leaf) {
        leaf = this.app.workspace.getLeaf(false);
        await leaf.setViewState({ type: VIEW_TYPE, active: true });
      }
      await this.app.workspace.revealLeaf(leaf);
      const view = leaf.view instanceof BrainConsoleView ? leaf.view : this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]?.view;
      if (view instanceof BrainConsoleView) {
        await view.refresh();
      }
    } catch (error) {
      console.error("Brain Console failed to open", error);
      new import_obsidian2.Notice(`Brain Console failed to open: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  async reopenConsoleFresh() {
    try {
      const leaves = [...this.app.workspace.getLeavesOfType(VIEW_TYPE)];
      for (const leaf2 of leaves) {
        await leaf2.detach();
      }
      const leaf = this.app.workspace.getLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
      await this.app.workspace.revealLeaf(leaf);
      const view = leaf.view instanceof BrainConsoleView ? leaf.view : this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]?.view;
      if (view instanceof BrainConsoleView) {
        await view.refresh();
      }
    } catch (error) {
      console.error("Brain Console failed to reopen fresh", error);
      new import_obsidian2.Notice(`Brain Console failed to reopen fresh: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};
var REPO_ROOT = "/Users/Office/Repos/stevewesthoek/brain";
var BRAIN_CORE_RESTART_HELPER = "/Users/Office/Repos/stevewesthoek/brain/projects/brain-core/scripts/dev/restart-brain-core.mjs";
var BrainConsoleSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  plugin;
  display() {
    this.containerEl.empty();
    this.containerEl.createEl("h2", { text: "Brain Console" });
    new import_obsidian2.Setting(this.containerEl).setName("Brain Core URL").setDesc("Read-only Brain Core endpoint. Default: http://localhost:4877. If offline, try http://127.0.0.1:4877").addText((text) => {
      text.setValue(this.plugin.settings.brainCoreUrl);
      text.onChange(async (value) => {
        const normalized = normalizeBrainCoreUrl(value);
        if (normalized.error) {
          new import_obsidian2.Notice(normalized.error);
          return;
        }
        if (normalized.warning) {
          new import_obsidian2.Notice(normalized.warning);
        }
        await this.plugin.updateSettings({ brainCoreUrl: normalized.value });
      });
    });
  }
};
var BrainConsoleView = class extends import_obsidian2.ItemView {
  plugin;
  activeSection = "overview";
  cachedState = null;
  isRefreshing = false;
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return "Brain Console";
  }
  async onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("brain-console");
    const state = this.contentEl.createDiv({ cls: "brain-console__state" });
    const header = state.createDiv({ cls: "brain-console__header" });
    header.createEl("h2", { text: "Brain Console" });
    header.createEl("span", { cls: "brain-console__build-marker", text: `build ${BRAIN_CONSOLE_BUILD_ID}` });
    state.createDiv({ cls: "brain-console__status-line", text: "Manual refresh + Brain Core restart verification + allowlisted local app actions \xB7 plugin never executes shell" });
    state.createDiv({ cls: "brain-console__install-check", text: "If build marker above is not visible, the installed plugin bundle may be stale." });
    const actions = state.createDiv({ cls: "brain-console__actions" });
    const refreshButton = actions.createEl("button", { text: "Manual refresh", cls: "brain-console__refresh-btn" });
    refreshButton.setAttribute("type", "button");
    const refreshTimestamp = actions.createEl("span", { cls: "brain-console__refresh-time", text: "Never" });
    refreshButton.addEventListener("click", async () => {
      if (this.isRefreshing) return;
      this.isRefreshing = true;
      refreshButton.disabled = true;
      refreshButton.setAttribute("aria-busy", "true");
      refreshButton.textContent = "Refreshing...";
      try {
        await this.fullRefresh();
        const now = /* @__PURE__ */ new Date();
        refreshTimestamp.textContent = `Last: ${now.toLocaleTimeString()}`;
      } finally {
        this.isRefreshing = false;
        refreshButton.disabled = false;
        refreshButton.removeAttribute("aria-busy");
        refreshButton.textContent = "Manual refresh";
      }
    });
    this.registerDomEvent(this.contentEl, "click", (e) => {
      const target = e.target;
      const tab = target.closest("[data-section-id]");
      if (tab) {
        const sectionId = tab.getAttribute("data-section-id");
        if (sectionId && sectionId !== this.activeSection) {
          this.activeSection = sectionId;
          this.rerenderWithCachedState();
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });
    this.startHeartbeat();
    try {
      await this.fullRefresh();
    } catch (error) {
      this.renderOpenFallback(error);
    }
  }
  startHeartbeat() {
  }
  /** Full refresh: reload all Brain Core data and re-render */
  async fullRefresh() {
    const settings = await this.plugin.getSettings();
    try {
      this.cachedState = await loadBrainConsoleViewState(settings);
      this.rerenderWithCachedState();
    } catch (error) {
      console.error("Brain Console refresh failed", error);
      if (!this.cachedState) {
        throw error;
      }
    }
  }
  /** Re-render using cached state (instant tab switch) */
  rerenderWithCachedState() {
    if (!this.cachedState) return;
    const settings = this.plugin.settings;
    this.cachedState.activeSection = this.activeSection;
    const scrollArea = this.contentEl.querySelector(".brain-console__scroll-area");
    const savedScrollTop = scrollArea?.scrollTop ?? 0;
    renderBrainConsoleView(
      this.contentEl,
      this.cachedState,
      settings,
      () => {
        void this.fullRefresh();
      },
      () => this.restartBrainCore()
    );
    if (savedScrollTop > 0) {
      const newScrollArea = this.contentEl.querySelector(".brain-console__scroll-area");
      if (newScrollArea) newScrollArea.scrollTop = savedScrollTop;
    }
  }
  async refresh() {
    try {
      await this.fullRefresh();
    } catch (error) {
      this.renderOpenFallback(error);
    }
  }
  async restartBrainCore() {
    if (this.isRefreshing) return;
    this.isRefreshing = true;
    try {
      const settings = await this.plugin.getSettings();
      const normalizedBaseUrl = normalizeBrainCoreUrl(settings.brainCoreUrl).value;
      new import_obsidian2.Notice("Brain Core restart requested. Waiting for stop, port-free, and restart verification...");
      const request = await requestBrainCoreRestart(normalizedBaseUrl);
      if (request.error || !request.value) {
        const fallback = await this.restartBrainCoreLocally(normalizedBaseUrl, request.detail ?? request.error);
        if (!fallback.ok) {
          new import_obsidian2.Notice(`Brain Core restart failed: ${fallback.error}`);
          return;
        }
        await this.plugin.reopenConsoleFresh();
        await this.fullRefresh();
        new import_obsidian2.Notice("Brain Core restart verified: service is back online.");
        return;
      }
      if (!request.value.accepted) {
        new import_obsidian2.Notice(`Brain Core restart was not accepted: ${request.value.message}`);
        return;
      }
      const verified = await waitForBrainCoreStatus(normalizedBaseUrl);
      if (verified.error || !verified.value?.ok) {
        const message = verified.error ?? verified.detail ?? "Brain Core did not return an ok status.";
        new import_obsidian2.Notice(`Brain Core restart did not verify: ${message}`);
        return;
      }
      new import_obsidian2.Notice("Brain Core restart verified: service is back online.");
      await this.recoverConsoleAfterRestart(normalizedBaseUrl);
    } catch (error) {
      console.error("Brain Core restart failed", error);
      new import_obsidian2.Notice(`Brain Core restart failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      this.isRefreshing = false;
    }
  }
  async recoverConsoleAfterRestart(baseUrl) {
    const recoveryAttempts = 3;
    for (let attempt = 1; attempt <= recoveryAttempts; attempt += 1) {
      await this.plugin.reopenConsoleFresh();
      try {
        await this.fullRefresh();
        const currentStatus = await waitForBrainCoreStatus(baseUrl, 15e3, 1e3);
        if (!currentStatus.error && currentStatus.value?.ok) {
          return;
        }
      } catch (error) {
        console.error(`Brain Console recovery refresh attempt ${attempt} failed`, error);
      }
    }
    throw new Error("Brain Console did not recover after verified Brain Core restart.");
  }
  async restartBrainCoreLocally(baseUrl, reason) {
    try {
      const requireFn = globalThis.require ?? (0, eval)("require");
      const { execFile } = requireFn("child_process");
      const { promisify } = requireFn("util");
      const execFileAsync = promisify(execFile);
      const processEnv = globalThis.process?.env ?? {};
      const result = await execFileAsync("/opt/homebrew/bin/node", [BRAIN_CORE_RESTART_HELPER, "restart"], {
        cwd: REPO_ROOT,
        env: {
          ...processEnv,
          BRAIN_CORE_HOST: normalizeBrainCoreUrl(baseUrl).value.replace(/^https?:\/\//, "").split(":")[0] ?? "127.0.0.1",
          BRAIN_CORE_PORT: "4877"
        },
        maxBuffer: 10 * 1024 * 1024,
        timeout: 18e4
      });
      console.log("Brain Core local restart output", result.stdout);
      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Brain Core local restart failed", reason, error);
      return { ok: false, error: message };
    }
  }
  renderOpenFallback(error) {
    this.contentEl.empty();
    this.contentEl.addClass("brain-console");
    const state = this.contentEl.createDiv({ cls: "brain-console__state brain-console__state--fallback" });
    const header = state.createDiv({ cls: "brain-console__header" });
    header.createEl("h2", { text: "Brain Console" });
    header.createEl("span", { cls: "brain-console__build-marker", text: `build ${BRAIN_CONSOLE_BUILD_ID}` });
    state.createDiv({ cls: "brain-console__status-line", text: "The Brain Console view opened, but the first data refresh failed." });
    state.createDiv({ cls: "brain-console__install-check", text: error instanceof Error ? error.message : String(error) });
    state.createDiv({ cls: "brain-console__status-line", text: `Brain Core URL: ${this.plugin.settings.brainCoreUrl}` });
    const actions = state.createDiv({ cls: "brain-console__actions" });
    const retry = actions.createEl("button", { text: "Retry refresh", cls: "brain-console__refresh-btn" });
    retry.setAttribute("type", "button");
    retry.addEventListener("click", () => {
      void this.refresh();
    });
  }
  async onClose() {
  }
};
function sanitizeSettings(data) {
  const maybeData = data;
  const normalized = normalizeBrainCoreUrl(maybeData?.brainCoreUrl ?? DEFAULT_BRAIN_CONSOLE_SETTINGS.brainCoreUrl);
  return { brainCoreUrl: normalized.value };
}
