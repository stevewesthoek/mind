"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBrainConsoleSnapshot = readBrainConsoleSnapshot;
exports.readBrainCoreStatus = readBrainCoreStatus;
exports.readBrainCoreCapabilities = readBrainCoreCapabilities;
exports.readBrainCoreRuntimeReports = readBrainCoreRuntimeReports;
exports.readBrainCoreSchedulerStatus = readBrainCoreSchedulerStatus;
exports.readBrainCoreSchedulerJobs = readBrainCoreSchedulerJobs;
exports.readBrainCoreSessions = readBrainCoreSessions;
exports.readBrainCoreRepos = readBrainCoreRepos;
exports.readBrainCoreApprovals = readBrainCoreApprovals;
exports.readBrainCoreApprovalStore = readBrainCoreApprovalStore;
exports.readBrainCoreExecutionPlans = readBrainCoreExecutionPlans;
exports.readBrainCoreExecutionReadiness = readBrainCoreExecutionReadiness;
exports.readBrainCoreMindPreviewPolicy = readBrainCoreMindPreviewPolicy;
exports.readBrainCoreMindPreviews = readBrainCoreMindPreviews;
exports.readBrainCoreVideoStatus = readBrainCoreVideoStatus;
exports.readBrainCoreVideoQueue = readBrainCoreVideoQueue;
exports.readBrainCoreLocalApps = readBrainCoreLocalApps;
const REQUEST_TIMEOUT_MS = 1_500;
async function readBrainConsoleSnapshot(baseUrl) {
    const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
    const [status, capabilities, runtimeReports, schedulerStatus, schedulerJobs, sessions, repos, approvals, approvalStore, executionPlans, executionReadiness, mindPreviewPolicy, mindPreviews] = await Promise.all([
        fetchJson(normalizedBaseUrl, '/status'),
        fetchJson(normalizedBaseUrl, '/capabilities'),
        fetchJson(normalizedBaseUrl, '/runtime/reports'),
        fetchJson(normalizedBaseUrl, '/scheduler/status'),
        fetchJson(normalizedBaseUrl, '/scheduler/jobs'),
        fetchJson(normalizedBaseUrl, '/sessions'),
        fetchJson(normalizedBaseUrl, '/repos'),
        fetchJson(normalizedBaseUrl, '/approvals'),
        fetchJson(normalizedBaseUrl, '/approvals/store'),
        fetchJson(normalizedBaseUrl, '/execution/plans'),
        fetchJson(normalizedBaseUrl, '/execution/readiness'),
        fetchJson(normalizedBaseUrl, '/execution/mind-preview-policy'),
        fetchJson(normalizedBaseUrl, '/execution/mind-previews'),
    ]);
    const [videoStatus, videoQueue, localApps] = await Promise.all([
        readBrainCoreVideoStatus(normalizedBaseUrl),
        readBrainCoreVideoQueue(normalizedBaseUrl),
        readBrainCoreLocalApps(normalizedBaseUrl),
    ]);
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
    };
}
async function readBrainCoreStatus(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/status');
}
async function readBrainCoreCapabilities(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/capabilities');
}
async function readBrainCoreRuntimeReports(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/runtime/reports');
}
async function readBrainCoreSchedulerStatus(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/scheduler/status');
}
async function readBrainCoreSchedulerJobs(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/scheduler/jobs');
}
async function readBrainCoreSessions(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/sessions');
}
async function readBrainCoreRepos(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/repos');
}
async function readBrainCoreApprovals(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/approvals');
}
async function readBrainCoreApprovalStore(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/approvals/store');
}
async function readBrainCoreExecutionPlans(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/execution/plans');
}
async function readBrainCoreExecutionReadiness(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/execution/readiness');
}
async function readBrainCoreMindPreviewPolicy(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/execution/mind-preview-policy');
}
async function readBrainCoreMindPreviews(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/execution/mind-previews');
}
async function readBrainCoreVideoStatus(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/video/status');
}
async function readBrainCoreVideoQueue(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/video/queue');
}
async function readBrainCoreLocalApps(baseUrl) {
    return fetchJson(normalizeBaseUrl(baseUrl), '/local-apps');
}
async function fetchJson(baseUrl, pathname) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(`${baseUrl}${pathname}`, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                accept: 'application/json',
            },
        });
        if (!response.ok) {
            return { error: `HTTP ${response.status}` };
        }
        return { value: (await response.json()) };
    }
    catch (error) {
        return { error: error instanceof Error ? error.message : 'request failed' };
    }
    finally {
        clearTimeout(timeout);
    }
}
function normalizeBaseUrl(rawValue) {
    return rawValue.replace(/\/+$/g, '');
}
