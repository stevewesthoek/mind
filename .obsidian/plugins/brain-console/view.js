"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBrainConsoleViewState = loadBrainConsoleViewState;
exports.renderBrainConsoleView = renderBrainConsoleView;
const settings_js_1 = require("./settings.js");
const client_js_1 = require("./client.js");
async function loadBrainConsoleViewState(settings = settings_js_1.DEFAULT_BRAIN_CONSOLE_SETTINGS) {
    const normalized = (0, settings_js_1.normalizeBrainCoreUrl)(settings.brainCoreUrl);
    const baseUrl = normalized.value;
    const [status, capabilities, runtimeReports, videoStatus, videoQueue, localApps, schedulerStatus, schedulerJobs, sessions, repos, approvals, approvalStore, executionPlans, executionReadiness, mindPreviewPolicy, mindPreviews] = await Promise.all([
        (0, client_js_1.readBrainCoreStatus)(baseUrl),
        (0, client_js_1.readBrainCoreCapabilities)(baseUrl),
        (0, client_js_1.readBrainCoreRuntimeReports)(baseUrl),
        (0, client_js_1.readBrainCoreVideoStatus)(baseUrl),
        (0, client_js_1.readBrainCoreVideoQueue)(baseUrl),
        (0, client_js_1.readBrainCoreLocalApps)(baseUrl),
        (0, client_js_1.readBrainCoreSchedulerStatus)(baseUrl),
        (0, client_js_1.readBrainCoreSchedulerJobs)(baseUrl),
        (0, client_js_1.readBrainCoreSessions)(baseUrl),
        (0, client_js_1.readBrainCoreRepos)(baseUrl),
        (0, client_js_1.readBrainCoreApprovals)(baseUrl),
        (0, client_js_1.readBrainCoreApprovalStore)(baseUrl),
        (0, client_js_1.readBrainCoreExecutionPlans)(baseUrl),
        (0, client_js_1.readBrainCoreExecutionReadiness)(baseUrl),
        (0, client_js_1.readBrainCoreMindPreviewPolicy)(baseUrl),
        (0, client_js_1.readBrainCoreMindPreviews)(baseUrl),
    ]);
    const offline = [status, capabilities, runtimeReports, videoStatus, videoQueue, localApps, schedulerStatus, schedulerJobs, sessions, repos, approvals, approvalStore, executionPlans, executionReadiness, mindPreviewPolicy, mindPreviews].every((result) => result.value === undefined);
    return {
        status: status.value,
        capabilities: capabilities.value,
        runtimeReports: runtimeReports.value?.reports,
        videoStatus: videoStatus.value,
        videoQueue: videoQueue.value?.queue,
        localApps: localApps.value?.apps,
        schedulerStatus: schedulerStatus.value,
        schedulerJobs: schedulerJobs.value?.jobs,
        sessions: sessions.value?.sessions,
        repos: repos.value?.repos,
        approvals: approvals.value?.approvals,
        approvalStore: approvalStore.value,
        executionPlans: executionPlans.value?.plans,
        executionReadiness: executionReadiness.value,
        mindPreviewPolicy: mindPreviewPolicy.value,
        mindPreviews: mindPreviews.value?.previews,
        warning: normalized.warning ?? normalized.error,
        offline,
    };
}
function renderBrainConsoleView(container, state, onRefresh) {
    container.empty();
    container.addClass('brain-console');
    container.addClass('brain-console--dashboard');
    const shell = container.createDiv({ cls: 'brain-console__shell' });
    // Status strip (6 pills)
    const statusStrip = shell.createDiv({ cls: 'brain-console__status-strip' });
    renderStatusPills(statusStrip, state);
    // Header
    const header = shell.createDiv({ cls: 'brain-console__header' });
    header.createEl('h1', { text: 'Brain Cockpit' });
    header.createEl('p', { text: 'System status, maintenance queue, and next safe action' });
    // Safety banner
    const safety = header.createDiv({ cls: 'brain-console__banner' });
    safety.setText('Read-only. Manual refresh. No automatic POST calls.');
    if (state.warning) {
        header.createDiv({ cls: 'brain-console__warning' }).setText(state.warning);
    }
    if (state.offline) {
        const offline = shell.createDiv({ cls: 'brain-console__offline' });
        offline.createEl('h3', { text: 'Brain Core offline' });
        offline.createEl('p', { text: 'Start Brain Core to load live summaries.' });
        return;
    }
    // Action row
    const actions = header.createDiv({ cls: 'brain-console__actions' });
    renderActionButtons(actions, onRefresh);
    // Dashboard grid (6 core cards + 2 optional)
    const dashboard = shell.createDiv({ cls: 'brain-console__dashboard' });
    // MVP cards (6 must-have)
    renderCard(dashboard, 'Wiki Health', renderWikiHealthCard(state));
    renderCard(dashboard, 'Maintenance Previews', renderMaintenancePreviewsCard(state));
    renderCard(dashboard, 'Approvals', renderApprovalsCard(state));
    renderCard(dashboard, 'Scheduler Status', renderSchedulerCard(state));
    renderCard(dashboard, 'Brain Core', renderBrainCoreCard(state));
    renderCard(dashboard, 'Next Safe Action', renderNextActionCard(state));
    // Activity panel at the bottom
    const activity = shell.createDiv({ cls: 'brain-console__activity' });
    renderActivityPanel(activity, state);
}
function renderStatusPills(container, state) {
    const pills = container.createDiv({ cls: 'brain-console__pills' });
    // Brain Core pill
    const brainCorePill = pills.createDiv({ cls: 'brain-console__pill' });
    brainCorePill.createEl('span', {
        text: `Brain Core: ${state.status?.ok === true ? '●' : '○'} ${state.status?.mode ?? 'unknown'}`,
    });
    // Model Router pill
    const mrReport = (state.runtimeReports ?? []).find((r) => r.id === 'model-router');
    const mrPill = pills.createDiv({ cls: 'brain-console__pill' });
    mrPill.createEl('span', { text: `Model Router: ${mrReport?.status ?? 'unknown'}` });
    // Scheduler pill
    const schedPill = pills.createDiv({ cls: 'brain-console__pill' });
    schedPill.createEl('span', { text: `Scheduler: ${state.schedulerStatus?.status ?? 'unknown'}` });
    // Save-to-Mind pill
    const capturePill = pills.createDiv({ cls: 'brain-console__pill' });
    capturePill.createEl('span', { text: 'Save-to-Mind: live' });
    // Approvals pill
    const approvalsCount = state.approvals?.length ?? 0;
    const approvalsPill = pills.createDiv({ cls: 'brain-console__pill' });
    approvalsPill.createEl('span', { text: `Approvals: ${approvalsCount}` });
    // Maintenance pill
    const maintenanceCount = (state.mindPreviews ?? []).filter((p) => !p.expired).length;
    const maintenancePill = pills.createDiv({ cls: 'brain-console__pill' });
    maintenancePill.createEl('span', { text: `Maintenance: ${maintenanceCount} pending` });
}
function renderActionButtons(container, onRefresh) {
    const buttonGroup = container.createDiv({ cls: 'brain-console__button-group' });
    const refreshBtn = buttonGroup.createEl('button', { text: 'Refresh' });
    refreshBtn.addClass('brain-console__btn');
    if (onRefresh) {
        refreshBtn.addEventListener('click', () => onRefresh());
    }
    const dryRunBtn = buttonGroup.createEl('button', { text: 'Request Dry Run' });
    dryRunBtn.addClass('brain-console__btn');
    dryRunBtn.disabled = true;
    const viewBtn = buttonGroup.createEl('button', { text: 'View Latest' });
    viewBtn.addClass('brain-console__btn');
    viewBtn.disabled = true;
    const mindBtn = buttonGroup.createEl('button', { text: 'Open Mind' });
    mindBtn.addClass('brain-console__btn');
    mindBtn.disabled = true;
    const logBtn = buttonGroup.createEl('button', { text: 'Wiki Log' });
    logBtn.addClass('brain-console__btn');
    logBtn.disabled = true;
}
function renderCard(parent, title, content) {
    const card = parent.createDiv({ cls: 'brain-console__card' });
    const cardHeader = card.createDiv({ cls: 'brain-console__card-header' });
    cardHeader.createEl('h3', { text: title });
    card.appendChild(content);
}
function renderWikiHealthCard(state) {
    const container = document.createElement('div');
    container.className = 'brain-console__card-content';
    const mrReport = (state.runtimeReports ?? []).find((r) => r.id === 'model-router');
    if (!mrReport?.wikiHealth) {
        container.createEl('p', { text: 'Wiki health data unavailable' });
        return container;
    }
    const health = mrReport.wikiHealth;
    const status = health.ok ? '✓ OK' : `⚠ Issues`;
    container.createEl('div', { cls: 'brain-console__metric', text: status });
    if (!health.ok) {
        container.createEl('p', {
            text: `Warnings: ${health.warningCount} · Errors: ${health.errorCount}`,
            cls: 'brain-console__detail',
        });
    }
    return container;
}
function renderMaintenancePreviewsCard(state) {
    const container = document.createElement('div');
    container.className = 'brain-console__card-content';
    const previews = state.mindPreviews ?? [];
    const pending = previews.filter((p) => !p.expired);
    if (pending.length === 0) {
        container.createEl('p', { text: 'No maintenance queued' });
        return container;
    }
    container.createEl('div', { cls: 'brain-console__metric', text: `${pending.length} pending` });
    if (pending[0]) {
        container.createEl('p', {
            text: `Latest: ${new Date(pending[0].createdAt).toLocaleDateString()}`,
            cls: 'brain-console__detail',
        });
    }
    return container;
}
function renderApprovalsCard(state) {
    const container = document.createElement('div');
    container.className = 'brain-console__card-content';
    const approvals = state.approvals ?? [];
    if (approvals.length === 0) {
        container.createEl('p', { text: 'No approvals pending' });
        return container;
    }
    container.createEl('div', { cls: 'brain-console__metric', text: `${approvals.length} pending` });
    const sample = approvals.slice(0, 2);
    const list = container.createEl('ul', { cls: 'brain-console__list' });
    sample.forEach((a) => {
        list.createEl('li', { text: `${a.kind}: ${a.status}` });
    });
    return container;
}
function renderSchedulerCard(state) {
    const container = document.createElement('div');
    container.className = 'brain-console__card-content';
    container.createEl('div', { cls: 'brain-console__metric', text: state.schedulerStatus?.status ?? 'unknown' });
    container.createEl('p', {
        text: `Latest: ${state.schedulerStatus?.latestRunStatus ?? 'never'}`,
        cls: 'brain-console__detail',
    });
    const jobs = state.schedulerJobs ?? [];
    if (jobs.length > 0) {
        const jobSummary = jobs.slice(0, 2).map((j) => `${j.id}: ${j.status}`).join(' · ');
        container.createEl('p', { text: jobSummary, cls: 'brain-console__detail' });
    }
    return container;
}
function renderBrainCoreCard(state) {
    const container = document.createElement('div');
    container.className = 'brain-console__card-content';
    const online = state.status?.ok === true ? 'online' : 'offline';
    container.createEl('div', { cls: 'brain-console__metric', text: online });
    container.createEl('p', {
        text: `Host: ${state.status?.host ?? 'localhost'} · v${state.status?.version ?? '?'}`,
        cls: 'brain-console__detail',
    });
    container.createEl('p', {
        text: `Execution: ${state.executionReadiness?.executionEnabled ? 'enabled' : 'disabled'}`,
        cls: 'brain-console__detail',
    });
    return container;
}
function renderNextActionCard(state) {
    const container = document.createElement('div');
    container.className = 'brain-console__card-content';
    const readiness = state.executionReadiness;
    if (!readiness) {
        container.createEl('p', { text: 'Readiness unavailable' });
        return container;
    }
    const nextAction = readiness.blockers.length > 0 ? `Blocked: ${readiness.blockers[0]}` : `Ready: ${readiness.readyCandidateCount}`;
    container.createEl('div', { cls: 'brain-console__metric', text: nextAction });
    if (readiness.readyCandidateCount > 0) {
        container.createEl('p', { text: 'Candidates available for execution', cls: 'brain-console__detail' });
    }
    return container;
}
function renderActivityPanel(container, state) {
    const panel = container.createDiv({ cls: 'brain-console__activity-panel' });
    panel.createEl('h4', { text: 'Recent Activity' });
    const activity = panel.createEl('ul', { cls: 'brain-console__activity-list' });
    // Sample activity items (in real implementation, would come from Brain Core)
    if (state.sessions && state.sessions.length > 0) {
        activity.createEl('li', { text: `Latest session: ${state.sessions[0]?.title ?? 'unknown'}` });
    }
    if (state.runtimeReports && state.runtimeReports.length > 0) {
        activity.createEl('li', { text: `Runtime reports available: ${state.runtimeReports.length}` });
    }
    const mindPreviews = state.mindPreviews ?? [];
    if (mindPreviews.length > 0) {
        activity.createEl('li', { text: `Maintenance previews: ${mindPreviews.length}` });
    }
}
