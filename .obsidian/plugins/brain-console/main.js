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
async function readBrainCoreMaintenancePreviewDetail(baseUrl, previewId) {
  return fetchJson(normalizeBaseUrl(baseUrl), `/execution/maintenance-previews/${previewId}`);
}
var requestUrlFn = null;
function setRequestUrl(fn) {
  requestUrlFn = fn;
}
async function fetchJson(baseUrl, pathname, options = {}) {
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
        (_, reject) => setTimeout(() => reject(new Error("request timeout")), REQUEST_TIMEOUT_MS)
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
        return fetchJsonWithFallback(fallbackUrl, pathname, responseTimeMs);
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
async function fetchJsonWithFallback(fallbackUrl, pathname, firstAttemptMs) {
  try {
    const response = await Promise.race([
      requestUrlFn({
        url: `${fallbackUrl}${pathname}`,
        method: "GET",
        headers: { accept: "application/json" },
        throw: false
      }),
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("request timeout")), REQUEST_TIMEOUT_MS)
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
async function readBrainCoreVOPostingInstructions(baseUrl, jobId) {
  return fetchJson(
    normalizeBaseUrl(baseUrl),
    `/infra/video-orchestrator/posting-instructions/${encodeURIComponent(jobId)}`
  );
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
function formatRelativeTime(date) {
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
    // 157
  ]);
  const settledValues = withSafeEndpointPadding(
    results.map((result) => result.status === "fulfilled" ? result.value : { value: void 0, error: result.reason }),
    158
  );
  const [status, capabilities, runtimeReports, videoStatus, videoQueue, localApps, localAppsDashboard, localAppsActionReadiness, localAppsActionEnablementBacklog, localAppsActionStatus, schedulerStatus, schedulerJobs, sessions, repos, approvals, approvalStore, executionPlans, executionReadiness, mindPreviewPolicy, mindPreviews, orchestrators, pipelines, projects, platforms, probotDashboardParity, probotSessionsParity, probotLocalAppsParity, probotSchedulerParity, probotStudioParity, probotExternalAdminParity, probotDecommissionReadiness, probotExternalAdminSafeMetadata, probotFeatureParityMatrix, probotPhaseOutChecklist, postOrchestratorStatus, postOrchestratorOverview, postOrchestratorFlows, postOrchestratorDrafts, postOrchestratorEvents, postOrchestratorDryRun, postOrchestratorReviewQueue, postOrchestratorSchedulePreview, postOrchestratorAnalytics, postOrchestratorPipeline, postOrchestratorReadiness, postOrchestratorPlatformPolicies, postOrchestratorDecommissionReadiness, postOrchestratorOperatorGuidance, postOrchestratorManualExportPackage, postOrchestratorAcceptanceChecklist, postOrchestratorMigrationParity, postOrchestratorRoadmapCheckpoint, postOrchestratorContracts, postOrchestratorIntegrations, postOrchestratorRecovery, postOrchestratorQaStatus, stbStatus, videoOrchestratorStatus, videoOrchestratorIntake, videoAssetPlans, videoDesignPlans, videoVoiceoverPlans, videoVisualPlans, videoAssemblyPlans, videoMetadataPlans, videoPublishingPrepPlans, videoManualExportPackages, videoThumbnailDesignPlans, videoArchiveLoggingPlans, videoDesignProviderBoundaryPlans, videoDesignProviderCredentialIsolationPlans, videoDesignProviderPromptReviewPolicyPlans, videoArtifactSandboxProviderHandoffPlans, videoProviderOutputRedactionPolicyPlans, videoDesignProviderComplianceChecklistPlans, videoDesignProviderEnablementReadinessIndex, videoProviderIntegrationFinalPlanningCheckpoint, videoCredentialStoreImplementationBoundaryPlan, videoPromptReviewUxImplementationPlan, videoProviderAuditPersistenceBoundaryPlan, videoProviderWrapperSecurityReviewPlan, videoProviderImplementationPhaseStartGate, videoProviderImplementationReadinessDashboardSummary, videoProviderImplementationApprovalPacket, videoProviderApprovalPacketConsoleReviewSummary, videoProviderPlanningSurfaceIndex, videoCredentialReferenceScaffold, videoProviderRequestWrapperScaffold, videoProviderWrapperValidationHarness, videoProviderRequestEnvelopeScaffold, videoProviderResponseEnvelopeScaffold, videoProviderScaffoldingIntegrationSummary, videoProviderRequestWrapperInertShell, videoCredentialReferenceValidator, videoProviderResponseRedactionSkeleton, videoProviderAuditEventTypes, videoProviderDisabledOrchestrationFacade, videoProviderCapabilityPolicyEvaluator, videoProviderBlockedActionLedgerTypes, videoProviderDisabledOrchestrationIntegrationSummary, stbVideoMigrationStatus, stbVideoParityMatrix, stbVideoDualRunStatus, stbVideoDualRunEvidence, videoProductionGate, videoRenderExportPolicy, videoControlledDryRunDesign, videoProductionCutoverGate, videoReleaseCandidateReadiness, videoOperatorDecisionQueue, videoControlledExecutionPolicyBoundary, videoControlledExecutionReadinessIndex, videoRoadmapCheckpoint, videoOperatorReviewPacket, videoControlledExecutionApprovalPayloadSchema, videoPreviewCompletionIndex, videoControlledExecutionPreflightChecklist, videoControlledExecutionRiskRegister, videoControlledExecutionPreflightValidatorSchema, videoControlledExecutionPlanStub, videoControlledExecutionApprovalRequestDesign, videoControlledExecutionDisabledGate, videoControlledExecutionSecondApprovalPolicy, videoControlledExecutionOperatorIdentityProtocol, videoControlledExecutionRolePolicy, controlledDualRunRequestDesign, agents, actions, mindStewardReportDetail, agentRuns, agentEvents, agentCostSummary, recoveryItems, localAppsOperationalReadiness, localAppsOperatorSummary, localAppsOrchestratorDef, infraDokploy, infraTunnels, infraDomains, infraNewRelic, infraUmami, infraGoogleAds, infraStripe, infraStudio, voLiveStatus, pipelinesLiveStatus, voAccountsResult, voAuthStatusResult, voJobsResult, systemMetricsResult, stbCredentialsResult, voNormalizeHistoryResult, voManualQueueResult, voWorkerConfigResult, voAccountStatsResult, voReadinessResult, credentialCatalogResult, aiModelSelectorResult] = settledValues;
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
  const connectionDiagnostics = await diagnoseBrainCoreConnection(baseUrl);
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
  { id: "studio", label: "Studio", icon: "\u25C8" },
  { id: "orchestrators", label: "Orchestrators", icon: "\u25B2" },
  { id: "pipelines", label: "Pipelines", icon: "\u2192" },
  { id: "projects", label: "Projects", icon: "\u25C9" },
  { id: "reports", label: "Reports", icon: "\u{1F4CB}" },
  { id: "posts", label: "Posts", icon: "\u2726" },
  { id: "agents", label: "Agents", icon: "\u25C8" },
  { id: "recovery", label: "Recovery", icon: "\u26A0" },
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
  return `<div class="bc-metrics-banner">${cpuCard}${memCard}${gpuCard}${uptimeCard}${codex5Card}${codex7Card}</div>`;
}
function renderBrainConsoleView(container, state, settings, onRefresh) {
  container.empty();
  container.addClass("brain-console");
  try {
    const snapshot = deriveDashboardSnapshot(state, settings.brainCoreUrl);
    const activeSection = state.activeSection ?? "overview";
    const shell = container.createDiv({ cls: "brain-console__shell" });
    renderCommandBar(shell, state, activeSection, onRefresh);
    const metricsBanner = shell.createDiv({ cls: "bc-metrics-wrapper" });
    metricsBanner.innerHTML = renderSystemMetricsBanner(state);
    const scrollArea = shell.createDiv({ cls: "brain-console__scroll-area" });
    if (snapshot.connectionStatus === "offline") {
      renderOfflineState(scrollArea, state.brainCoreUrl || settings.brainCoreUrl, state.statusError, state.endpointErrors);
    } else {
      renderActiveSectionContent(scrollArea, activeSection, state, snapshot, settings, onRefresh);
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
function renderCommandBar(shell, state, activeSection, onRefresh) {
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
  refreshBtn.setAttribute("aria-label", "Manual refresh");
  refreshBtn.textContent = "\u21BB";
  if (onRefresh) refreshBtn.addEventListener("click", () => onRefresh());
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
function renderActiveSectionContent(shell, activeSection, state, snapshot, settings, onRefresh) {
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
      case "studio":
        renderStudioSection(content, state);
        break;
      case "orchestrators":
        renderOrchestratorsSection(content, state, snapshot);
        break;
      case "pipelines":
        renderPipelinesSection(content, state, snapshot);
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
      case "recovery":
        renderRecoverySection(content, state, snapshot);
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
function safeNumber(value, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}
function safeArray(value) {
  return Array.isArray(value) ? value : [];
}
function safeCount(items) {
  return Array.isArray(items) ? items.length : 0;
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
  const lower = page.createDiv({ cls: "brain-console__apps-lower" });
  renderCard(lower, "Local App Action Audit", renderLocalAppActionAuditCard(state));
  renderCard(lower, "Brain Core", renderBrainCoreCard(state));
  renderCard(lower, "Scheduler", renderSchedulerCard(state));
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
      row.createEl("span", { cls: "brain-console__detail", text: s.startedAt ? formatRelativeTime(s.startedAt) : "" });
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
      { label: "Last run", value: sched.lastRunAt ? formatRelativeTime(sched.lastRunAt) : "never" }
    ]);
    for (const job of jobs.slice(0, 10)) {
      const row = schedulerCard.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: job.id ?? "unknown" });
      row.createEl("span", { cls: "brain-console__list-value", text: job.schedule ?? "" });
      row.createEl("span", { cls: "brain-console__detail", text: job.lastRunAt ? formatRelativeTime(job.lastRunAt) : "never" });
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
        row.createEl("span", { cls: "brain-console__detail", text: `expires ${formatRelativeTime(d.expiresAt)}` });
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
      { label: "Last sync", value: ads.lastSync ? formatRelativeTime(ads.lastSync) : "never" },
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
    card.createEl("p", { cls: "brain-console__detail", text: "Set NEW_RELIC_USER_API_KEY and NEW_RELIC_ACCOUNT_ID env vars." });
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
function renderVOLiveStatusCards(grid, state) {
  const vol = state.voLiveStatus;
  if (!vol) {
    return;
  }
  if (!vol.ok) {
    const errCard = document.createElement("div");
    errCard.addClass("brain-console__card-content");
    errCard.createEl("p", { cls: "brain-console__error-detail", text: vol.error ?? "VO DB unreachable." });
    errCard.createEl("p", { cls: "brain-console__detail", text: "Brain Core cannot connect to the Video Orchestrator PostgreSQL database." });
    renderCard(grid, "VO Live DB", errCard);
    return;
  }
  if (vol.queueDepth) {
    const qCard = document.createElement("div");
    qCard.addClass("brain-console__card-content");
    const qd = vol.queueDepth;
    renderCompactStatGrid(qCard, [
      { label: "Pending", value: String(qd.pending) },
      { label: "Running", value: String(qd.running) },
      { label: "Failed", value: String(qd.failed) },
      { label: "Dead", value: String(qd.dead ?? 0) },
      { label: "Active accounts", value: String(vol.activeAccounts ?? 0) }
    ]);
    if ((qd.dead ?? 0) > 0) {
      qCard.createEl("p", { cls: "brain-console__warning", text: `${qd.dead} dead jobs \u2014 run: vo jobs to inspect, vo retry <id> to re-queue` });
    }
    if (vol.lastJobAt) {
      qCard.createEl("p", { cls: "brain-console__detail", text: `Last job: ${formatRelativeTime(vol.lastJobAt)}` });
    }
    renderCard(grid, "VO Queue", qCard);
  }
  if (vol.accountsByPlatform && Object.keys(vol.accountsByPlatform).length > 0) {
    const apCard = document.createElement("div");
    apCard.addClass("brain-console__card-content");
    const apList = apCard.createDiv({ cls: "brain-console__list" });
    for (const [platform, count] of Object.entries(vol.accountsByPlatform)) {
      const row = apList.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: platform });
      row.createEl("span", { cls: "brain-console__list-value", text: `${count} account${count !== 1 ? "s" : ""}` });
    }
    renderCard(grid, "VO Accounts by Platform", apCard);
  }
  if (vol.recentPosts && vol.recentPosts.length > 0) {
    const rpCard = document.createElement("div");
    rpCard.addClass("brain-console__card-content");
    const rpList = rpCard.createDiv({ cls: "brain-console__list" });
    for (const post of vol.recentPosts.slice(0, 3)) {
      const row = rpList.createDiv({ cls: "brain-console__list-row" });
      row.createEl("span", { cls: "brain-console__list-label", text: `${post.accountHandle} (${post.platform})` });
      row.createEl("span", { cls: "brain-console__detail", text: post.title.slice(0, 40) });
      if (post.postedAt) {
        row.createEl("span", { cls: "brain-console__list-value", text: formatRelativeTime(post.postedAt) });
      }
    }
    renderCard(grid, "VO Recent Posts", rpCard);
  }
  if (vol.analyticsSnapshot) {
    const asCard = document.createElement("div");
    asCard.addClass("brain-console__card-content");
    const snap = vol.analyticsSnapshot;
    renderCompactStatGrid(asCard, [
      { label: "Total views (7d)", value: snap.totalViews7d.toLocaleString() },
      { label: "Avg engagement (7d)", value: `${(snap.avgEngagement7d * 100).toFixed(1)}%` },
      { label: "Top platform", value: snap.topPlatform || "\u2014" }
    ]);
    renderCard(grid, "VO Analytics (7d)", asCard);
  }
}
function renderStudioSection(content, state) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  const studio = state.infraStudio;
  if (!studio || studio.status === "not-configured") {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    card.createEl("p", { text: studio?.error ?? "Studio data not configured." });
    card.createEl("p", { cls: "brain-console__detail", text: "Viral Flow config expected at ~/.config/viralflow/. Video Orchestrator runtime at runtime/local/video-orchestrator/latest.json." });
    renderCard(grid, "Studio", card);
    renderVOLiveStatusCards(grid, state);
    return;
  }
  if (studio.status === "error") {
    const card = document.createElement("div");
    card.addClass("brain-console__card-content");
    card.createEl("p", { cls: "brain-console__error-detail", text: studio.error ?? "Studio error." });
    renderCard(grid, "Studio", card);
    renderVOLiveStatusCards(grid, state);
    return;
  }
  const vf = studio.viralFlow;
  if (vf) {
    const vfCard = document.createElement("div");
    vfCard.addClass("brain-console__card-content");
    renderCompactStatGrid(vfCard, [
      { label: "Accounts", value: String(vf.accountCount) },
      { label: "Active topics", value: String(vf.activeTopicCount) },
      { label: "Scripts", value: String(vf.recentScripts.length) },
      { label: "Total videos", value: String(vf.performance.totalVideos) },
      { label: "Total views", value: vf.performance.totalViews.toLocaleString() },
      { label: "Avg engagement", value: `${(vf.performance.avgEngagementRate * 100).toFixed(1)}%` }
    ]);
    if (vf.activeBatch) {
      const b = vf.activeBatch;
      const batchDiv = vfCard.createDiv({ cls: "brain-console__list" });
      batchDiv.createEl("div", { cls: "brain-console__list-label", text: `Active batch: ${b.topic} \u2014 stage: ${b.stage}` });
      for (const [stageName, stageData] of Object.entries(b.stages)) {
        const row = batchDiv.createDiv({ cls: "brain-console__list-row" });
        const icon = stageData.completed ? "\u2713" : stageData.inProgress ? "\u25CF" : "\u25CB";
        row.createEl("span", { cls: "brain-console__list-label", text: `${icon} ${stageName}` });
      }
      if (b.errors.length > 0) {
        vfCard.createEl("p", { cls: "brain-console__error-detail", text: `Batch errors: ${b.errors.slice(0, 2).join(", ")}` });
      }
    }
    renderCard(grid, "Viral Flow", vfCard);
    if (vf.accounts.length > 0) {
      const accCard = document.createElement("div");
      accCard.addClass("brain-console__card-content");
      const accList = accCard.createDiv({ cls: "brain-console__list" });
      for (const a of vf.accounts) {
        const row = accList.createDiv({ cls: "brain-console__list-row" });
        row.createEl("span", { cls: "brain-console__list-label", text: `${a.platform}: ${a.name}` });
        row.createEl("span", { cls: "brain-console__list-value", text: a.status });
        if (a.lastPost) {
          row.createEl("span", { cls: "brain-console__detail", text: formatRelativeTime(a.lastPost) });
        }
      }
      renderCard(grid, `Accounts (${vf.accounts.length})`, accCard);
    }
    if (vf.recentTopics.length > 0) {
      const topicsCard = document.createElement("div");
      topicsCard.addClass("brain-console__card-content");
      const tList = topicsCard.createDiv({ cls: "brain-console__list" });
      for (const t of vf.recentTopics.slice(0, 10)) {
        const row = tList.createDiv({ cls: "brain-console__list-row" });
        row.createEl("span", { cls: "brain-console__list-label", text: t.title.slice(0, 50) });
        row.createEl("span", { cls: "brain-console__list-value", text: `${t.trendScore}% trend` });
      }
      renderCard(grid, `Recent Topics (${vf.recentTopics.length})`, topicsCard);
    }
    if (vf.performance.topVideos.length > 0) {
      const tvCard = document.createElement("div");
      tvCard.addClass("brain-console__card-content");
      const tvList = tvCard.createDiv({ cls: "brain-console__list" });
      for (const v of vf.performance.topVideos.slice(0, 10)) {
        const row = tvList.createDiv({ cls: "brain-console__list-row" });
        row.createEl("span", { cls: "brain-console__list-label", text: v.title.slice(0, 40) });
        row.createEl("span", { cls: "brain-console__list-value", text: `${v.views.toLocaleString()} views` });
        row.createEl("span", { cls: "brain-console__detail", text: v.platform });
      }
      renderCard(grid, "Top Videos", tvCard);
    }
  }
  const vo = studio.videoOrchestrator;
  if (vo) {
    const voCard = document.createElement("div");
    voCard.addClass("brain-console__card-content");
    if (vo.error) {
      voCard.createEl("p", { cls: "brain-console__error-detail", text: vo.error });
    }
    renderCompactStatGrid(voCard, [
      { label: "Database", value: vo.databaseStatus },
      { label: "Total videos", value: String(vo.totalVideos) },
      { label: "Completed packages", value: String(vo.completedPackages) },
      { label: "Completion rate", value: `${vo.completionRate}%` },
      { label: "Running jobs", value: String(vo.runningJobs) },
      { label: "Pending jobs", value: String(vo.pendingJobs) },
      { label: "Failed (7d)", value: String(vo.failedJobs7d) },
      { label: "Accounts", value: String(vo.totalAccounts) }
    ]);
    renderCard(grid, "Video Orchestrator Pipeline", voCard);
    if (vo.accountSummary && vo.accountSummary.length > 0) {
      const acctCard = document.createElement("div");
      acctCard.addClass("brain-console__card-content");
      const table = acctCard.createEl("table", { cls: "brain-console__compact-table" });
      const thead = table.createEl("thead");
      const hrow = thead.createEl("tr");
      hrow.createEl("th", { text: "Platform" });
      hrow.createEl("th", { text: "Accounts" });
      hrow.createEl("th", { text: "Posted today" });
      const tbody = table.createEl("tbody");
      for (const entry of vo.accountSummary) {
        const row = tbody.createEl("tr");
        row.createEl("td", { text: entry.platform });
        row.createEl("td", { text: String(entry.count) });
        row.createEl("td", { text: String(entry.postedToday) });
      }
      renderCard(grid, `Accounts by Platform (${vo.accountSummary.length})`, acctCard);
    }
  }
  const rd = state.voReadiness;
  if (rd?.ok) {
    const rdCard = document.createElement("div");
    rdCard.addClass("brain-console__card-content");
    const statusEmoji = rd.status === "ready" ? "\u{1F7E2}" : rd.status === "partial" ? "\u{1F7E1}" : "\u{1F534}";
    renderCompactStatGrid(rdCard, [
      { label: "Status", value: `${statusEmoji} ${rd.status}` },
      { label: "Readiness", value: `${rd.readinessScore}%` },
      { label: "Checks passed", value: `${rd.passCount}/${rd.checks.length}` },
      { label: "Failed", value: String(rd.failCount) },
      { label: "Warnings", value: String(rd.warnCount) }
    ]);
    const checkList = rdCard.createDiv({ cls: "brain-console__list" });
    for (const check of rd.checks) {
      const row = checkList.createDiv({ cls: "brain-console__list-row" });
      const icon = check.status === "pass" ? "\u2713" : check.status === "fail" ? "\u2717" : check.status === "warn" ? "\u26A0" : "?";
      row.createEl("span", { cls: "brain-console__list-label", text: `${icon} ${check.label}` });
      const badge = row.createEl("span", { cls: "brain-console__badge", text: check.status });
      badge.addClass(
        check.status === "pass" ? "brain-console__badge--ok" : check.status === "fail" ? "brain-console__badge--danger" : check.status === "warn" ? "brain-console__badge--warn" : "brain-console__badge--muted"
      );
      if (check.status !== "pass") {
        rdCard.createEl("p", { cls: "brain-console__detail", text: `${check.label}: ${check.detail}` });
      }
    }
    const rdTitle = `VO System Readiness \u2014 ${rd.readinessScore}% (${rd.status})`;
    renderCard(grid, rdTitle, rdCard);
  }
  renderVOLiveStatusCards(grid, state);
  const jobs = state.voJobs;
  if (jobs?.ok && jobs.jobs.length > 0) {
    const jobsContent = document.createElement("div");
    jobsContent.addClass("brain-console__card-content");
    const table = jobsContent.createEl("table", { cls: "brain-console__compact-table" });
    const thead = table.createEl("thead");
    const hrow = thead.createEl("tr");
    hrow.createEl("th", { text: "Type" });
    hrow.createEl("th", { text: "Platform" });
    hrow.createEl("th", { text: "Account" });
    hrow.createEl("th", { text: "Status" });
    hrow.createEl("th", { text: "Created" });
    hrow.createEl("th", { text: "" });
    const tbody = table.createEl("tbody");
    const instructionsPanel = jobsContent.createDiv({ cls: "brain-console__detail" });
    for (const job of jobs.jobs.slice(0, 10)) {
      const row = tbody.createEl("tr");
      row.createEl("td", { text: job.jobType });
      row.createEl("td", { text: job.platform ?? "\u2014" });
      const handleText = job.accountHandle ? job.accountHandle.slice(0, 20) : "\u2014";
      row.createEl("td", { text: handleText });
      const statusCell = row.createEl("td");
      const statusBadge = statusCell.createEl("span", { cls: "brain-console__badge", text: job.jobStatus });
      if (job.jobStatus === "succeeded") statusBadge.addClass("brain-console__badge--ok");
      else if (job.jobStatus === "failed" || job.jobStatus === "dead") statusBadge.addClass("brain-console__badge--danger");
      else if (job.jobStatus === "running") statusBadge.addClass("brain-console__badge--warn");
      else statusBadge.addClass("brain-console__badge--muted");
      row.createEl("td", { text: formatRelativeTime(job.createdAt) });
      const actionCell = row.createEl("td");
      const isManualPosted = job.pipelineState === "posted" && (job.adapterMode === null || job.adapterMode === "manual");
      if (isManualPosted) {
        const link = actionCell.createEl("button", { cls: "brain-console__link-button", text: "View instructions" });
        link.addEventListener("click", async () => {
          instructionsPanel.empty();
          instructionsPanel.setText("Loading posting instructions...");
          const result = await readBrainCoreVOPostingInstructions(state.brainCoreUrl ?? "", job.jobId);
          instructionsPanel.empty();
          if (!result.value?.exists) {
            instructionsPanel.setText(result.value?.error ?? "Posting instructions are not available for this job.");
            return;
          }
          instructionsPanel.createEl("div", { text: `${result.value.account ?? "Unknown account"} \xB7 ${result.value.platform ?? "unknown platform"}` });
          instructionsPanel.createEl("pre", { text: result.value.content });
        });
      } else {
        actionCell.createEl("span", { text: "\u2014" });
      }
    }
    renderCard(grid, `VO Recent Jobs (${Math.min(jobs.jobs.length, 10)} of ${jobs.totalCount})`, jobsContent);
  }
  const wc = state.voWorkerConfig;
  if (wc) {
    const wcCard = document.createElement("div");
    wcCard.addClass("brain-console__card-content");
    if (!wc.ok || !wc.config) {
      wcCard.createEl("p", { cls: "brain-console__error-detail", text: wc.error ?? "Worker config unavailable." });
    } else {
      const cfg = wc.config;
      const statusRows = [
        { label: "n8n webhook", value: cfg.n8nWebhookConfigured ? cfg.n8nReachable === true ? "reachable" : cfg.n8nReachable === false ? "unreachable" : "configured (untested)" : "not configured", ok: cfg.n8nWebhookConfigured && cfg.n8nReachable !== false },
        { label: "CF Access", value: cfg.cfAccessConfigured ? "configured" : "missing", ok: cfg.cfAccessConfigured },
        { label: "YouTube OAuth", value: cfg.youtubeOauthConfigured ? `${cfg.youtubeOauthAccounts.join(", ")}` : "not configured", ok: cfg.youtubeOauthConfigured }
      ];
      const statusList = wcCard.createDiv({ cls: "brain-console__list" });
      for (const s of statusRows) {
        const row = statusList.createDiv({ cls: "brain-console__list-row" });
        row.createEl("span", { cls: "brain-console__list-label", text: s.label });
        const badge = row.createEl("span", { cls: "brain-console__badge", text: s.value });
        badge.addClass(s.ok ? "brain-console__badge--ok" : "brain-console__badge--danger");
      }
      if (wc.manualActionsRequired.length > 0) {
        wcCard.createEl("p", { cls: "brain-console__detail", text: `${wc.manualActionsRequired.length} manual action${wc.manualActionsRequired.length !== 1 ? "s" : ""} required:` });
        const actionList = wcCard.createDiv({ cls: "brain-console__list" });
        for (const action of wc.manualActionsRequired) {
          actionList.createEl("p", { cls: "brain-console__warning", text: action });
        }
      }
    }
    const wcTitle = wc.config && wc.manualActionsRequired.length > 0 ? `VO Worker Config (${wc.manualActionsRequired.length} action${wc.manualActionsRequired.length !== 1 ? "s" : ""} needed)` : "VO Worker Config";
    renderCard(grid, wcTitle, wcCard);
  }
  const as = state.voAccountStats;
  if (as?.ok && as.stats.length > 0) {
    const asCard = document.createElement("div");
    asCard.addClass("brain-console__card-content");
    const asTable = asCard.createEl("table", { cls: "brain-console__compact-table" });
    const asHead = asTable.createEl("thead").createEl("tr");
    asHead.createEl("th", { text: "Platform" });
    asHead.createEl("th", { text: "Account" });
    asHead.createEl("th", { text: "Posts (30d)" });
    asHead.createEl("th", { text: "Success" });
    asHead.createEl("th", { text: "Mode" });
    asHead.createEl("th", { text: "Last post" });
    const asBody = asTable.createEl("tbody");
    for (const stat of as.stats) {
      const row = asBody.createEl("tr");
      row.createEl("td", { text: stat.platform });
      row.createEl("td", { text: stat.accountHandle.slice(0, 22) });
      row.createEl("td", { text: String(stat.totalJobs30d) });
      const rateCell = row.createEl("td");
      if (stat.successRate30d !== null) {
        const badge = rateCell.createEl("span", { cls: "brain-console__badge", text: `${stat.successRate30d}%` });
        badge.addClass(stat.successRate30d >= 80 ? "brain-console__badge--ok" : stat.successRate30d >= 50 ? "brain-console__badge--warn" : "brain-console__badge--danger");
      } else {
        rateCell.createEl("span", { cls: "brain-console__badge brain-console__badge--muted", text: "\u2014" });
      }
      const modeCell = row.createEl("td");
      if (stat.lastAdapterMode) {
        const modeBadge = modeCell.createEl("span", { cls: "brain-console__badge", text: stat.lastAdapterMode });
        modeBadge.addClass(stat.lastAdapterMode === "auto" ? "brain-console__badge--ok" : "brain-console__badge--warn");
      } else {
        modeCell.createEl("span", { cls: "brain-console__badge brain-console__badge--muted", text: "no posts" });
      }
      row.createEl("td", { text: stat.lastSucceededAt ? formatRelativeTime(stat.lastSucceededAt) : "\u2014" });
    }
    renderCard(grid, `VO Account Stats (30d) \u2014 ${as.stats.length} accounts`, asCard);
  }
  const nh = state.voNormalizeHistory;
  if (nh?.ok && nh.jobs.length > 0) {
    const nhCard = document.createElement("div");
    nhCard.addClass("brain-console__card-content");
    const nhTable = nhCard.createEl("table", { cls: "brain-console__compact-table" });
    const nhHead = nhTable.createEl("thead").createEl("tr");
    nhHead.createEl("th", { text: "Job" });
    nhHead.createEl("th", { text: "Status" });
    nhHead.createEl("th", { text: "Formats" });
    nhHead.createEl("th", { text: "Files" });
    nhHead.createEl("th", { text: "Created" });
    const nhBody = nhTable.createEl("tbody");
    for (const job of nh.jobs.slice(0, 8)) {
      const row = nhBody.createEl("tr");
      row.createEl("td", { text: job.jobId.slice(0, 8) });
      const sc = row.createEl("td");
      const sb = sc.createEl("span", { cls: "brain-console__badge", text: job.status });
      if (job.status === "succeeded") sb.addClass("brain-console__badge--ok");
      else if (job.status === "failed") sb.addClass("brain-console__badge--danger");
      else if (job.status === "running") sb.addClass("brain-console__badge--warn");
      else sb.addClass("brain-console__badge--muted");
      row.createEl("td", { text: job.formats.length > 0 ? job.formats.join(", ") : "\u2014" });
      row.createEl("td", { text: String(job.outputFiles.length) });
      row.createEl("td", { text: formatRelativeTime(job.createdAt) });
    }
    renderCard(grid, `VO Normalize History (${Math.min(nh.jobs.length, 8)} of ${nh.totalCount})`, nhCard);
  } else if (nh && !nh.ok) {
    const nhErrCard = document.createElement("div");
    nhErrCard.addClass("brain-console__card-content");
    nhErrCard.createEl("p", { cls: "brain-console__error-detail", text: nh.error ?? "Normalize history unavailable." });
    renderCard(grid, "VO Normalize History", nhErrCard);
  }
  const mq = state.voManualQueue;
  if (mq?.ok && mq.jobs.length > 0) {
    const mqCard = document.createElement("div");
    mqCard.addClass("brain-console__card-content");
    const mqTable = mqCard.createEl("table", { cls: "brain-console__compact-table" });
    const mqHead = mqTable.createEl("thead").createEl("tr");
    mqHead.createEl("th", { text: "Platform" });
    mqHead.createEl("th", { text: "Account" });
    mqHead.createEl("th", { text: "Title" });
    mqHead.createEl("th", { text: "Instructions" });
    mqHead.createEl("th", { text: "Created" });
    const mqBody = mqTable.createEl("tbody");
    const mqInstructionsPanel = mqCard.createDiv({ cls: "brain-console__detail" });
    for (const job of mq.jobs.slice(0, 10)) {
      const row = mqBody.createEl("tr");
      row.createEl("td", { text: job.platform });
      row.createEl("td", { text: job.accountHandle.slice(0, 20) });
      row.createEl("td", { text: job.title.slice(0, 35) });
      const instrCell = row.createEl("td");
      if (job.hasInstructions) {
        const btn = instrCell.createEl("button", { cls: "brain-console__link-button", text: "View" });
        btn.addEventListener("click", async () => {
          mqInstructionsPanel.empty();
          mqInstructionsPanel.setText("Loading posting instructions...");
          const result = await readBrainCoreVOPostingInstructions(state.brainCoreUrl ?? "", job.jobId);
          mqInstructionsPanel.empty();
          if (!result.value?.exists) {
            mqInstructionsPanel.setText(result.value?.error ?? "Posting instructions not available.");
            return;
          }
          mqInstructionsPanel.createEl("div", { text: `${result.value.account ?? "Unknown"} \xB7 ${result.value.platform ?? "unknown"}` });
          mqInstructionsPanel.createEl("pre", { text: result.value.content });
        });
      } else {
        instrCell.createEl("span", { cls: "brain-console__badge brain-console__badge--muted", text: "missing" });
      }
      row.createEl("td", { text: formatRelativeTime(job.createdAt) });
    }
    renderCard(grid, `VO Manual Posting Queue (${Math.min(mq.jobs.length, 10)} of ${mq.totalCount})`, mqCard);
  }
}
function renderLocalAppActionAuditCard(state) {
  const container = document.createElement("div");
  container.addClass("brain-console__card-content");
  const audit = state.localAppsActionStatus?.audit;
  const recentCount = state.localAppsActionStatus?.recentResults?.length ?? 0;
  const inFlightCount = state.localAppsActionStatus?.inFlight?.length ?? 0;
  const managedProcesses = state.localAppsActionStatus?.managedProcesses ?? [];
  if (!audit) {
    container.createEl("p", { text: "Local app action audit status is not available yet." });
    container.createEl("p", { cls: "brain-console__detail", text: "Manual refresh after Brain Core is online to load audit persistence state." });
    return container;
  }
  const status = container.createEl("p");
  status.createEl("strong", { text: "Audit status: " });
  status.appendText(audit.status);
  const rows = [
    ["Audit path", audit.path],
    ["Persisted results", String(audit.persistedResultCount ?? 0)],
    ["Recent results", String(recentCount)],
    ["In-flight actions", String(inFlightCount)],
    ["Managed processes", String(managedProcesses.length)],
    ["Last persisted", audit.lastPersistedAt ? formatRelativeTime(audit.lastPersistedAt) : "never"]
  ];
  for (const [label, value] of rows) {
    const row = container.createEl("p", { cls: "brain-console__detail" });
    row.createEl("strong", { text: `${label}: ` });
    row.appendText(value);
  }
  if (audit.lastError) {
    container.createEl("p", { cls: "brain-console__error-detail", text: `Audit warning: ${audit.lastError}` });
  }
  if (managedProcesses.length > 0) {
    const list = container.createDiv({ cls: "brain-console__managed-process-list" });
    list.createEl("div", { cls: "brain-console__managed-process-list-label", text: "Active Brain Core-managed processes" });
    for (const process of managedProcesses.slice(0, 5)) {
      const row = list.createDiv({ cls: "brain-console__managed-process-row" });
      row.createEl("span", { cls: "brain-console__managed-process-name", text: process.appId });
      row.createEl("span", { cls: "brain-console__managed-process-meta", text: `pid ${process.pid} \xB7 ${process.commandLabel}` });
      row.createEl("span", { cls: "brain-console__managed-process-meta", text: formatRelativeTime(process.startedAt) });
      row.title = `${process.appId} started by Brain Core from ${process.cwdSummary}`;
    }
    if (managedProcesses.length > 5) {
      list.createEl("div", { cls: "brain-console__managed-process-more", text: `${managedProcesses.length - 5} more managed process(es)` });
    }
  }
  container.createEl("p", {
    cls: "brain-console__detail",
    text: "Brain Console reads this status from Brain Core. The plugin does not execute shell commands or write audit files."
  });
  return container;
}
function renderOrchestratorsSection(content, state, snapshot) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(grid, "Orchestrators", renderOrchestratorsCard(state, snapshot));
  const videoOrch = state.orchestrators?.find((o) => o.id === "video-orchestrator");
  if (videoOrch) {
    renderCard(grid, "Video Orchestrator", renderVideoOrchestratorCard(state, snapshot));
  }
}
function renderPipelinesSection(content, state, snapshot) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
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
      const readiness = account.authMethod === "oauth2" ? account.oauthReady ? `ready${account.tokenExpiry ? ` \xB7 ${formatRelativeTime(account.tokenExpiry)}` : ""}` : "token missing" : account.authMethod;
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
    { label: "Last job", value: vo.lastJobAt ? formatRelativeTime(vo.lastJobAt) : "\u2014" }
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
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
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
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
  renderCard(grid, "Agent View", renderAgentViewLedgerCard(state));
  renderCard(grid, "Approval Audit Trail", renderApprovalAuditTrailCard(state));
  renderCard(grid, "Agents (Summary)", renderAgentViewCard(state, snapshot));
}
function renderRecoverySection(content, state, snapshot) {
  const grid = content.createDiv({ cls: "brain-console__dashboard-grid" });
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
function renderSchedulerCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  const status = state.schedulerStatus?.latestRunStatus ?? "unknown";
  const metric = container.createEl("div", { cls: "brain-console__metric", text: status });
  if (status === "failed") metric.style.color = "#ef4444";
  if (status === "ok") metric.style.color = "#22c55e";
  container.createEl("p", { cls: "brain-console__detail", text: `${state.schedulerStatus?.latestRunAt ? formatRelativeTime(state.schedulerStatus.latestRunAt) : "never"}` });
  return container;
}
function renderBrainCoreCard(state) {
  const container = document.createElement("div");
  container.className = "brain-console__card-content";
  const online = state.status?.ok === true;
  const metric = container.createEl("div", { cls: "brain-console__metric", text: online ? "online" : "offline" });
  if (online) metric.style.color = "#22c55e";
  else metric.style.color = "#ef4444";
  container.createEl("p", { cls: "brain-console__detail", text: `v${state.status?.version ?? "?"}` });
  container.createEl("p", { cls: "brain-console__detail", text: `exec: ${state.executionReadiness?.executionEnabled ? "on" : "off"}` });
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
    renderMicroStat(strip, "Apps", String(apps.length));
    renderMicroStat(strip, "Controls", "Unknown");
  }
  if (apps.length === 0) {
    container.appendChild(renderEmptyState("No local apps available", "Check the canonical inventory source."));
    return container;
  }
  const definitionsById = new Map((orchestrator?.definitions ?? []).map((definition) => [definition.id, definition]));
  const controlsEnabled = dashboard?.actionPolicy.status === "enabled" || readiness?.ready === true || readiness != null && readiness.criteria?.every((c) => c.satisfied || c.id === "audit-logging");
  const list = container.createDiv({ cls: "brain-console__apps-operations-grid" });
  apps.forEach((app) => {
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
      const startBtn = actions.createEl("button", { text: startLabel, cls: "brain-console__local-app-action" });
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
      const stopBtn = actions.createEl("button", { text: "Stop", cls: "brain-console__local-app-action" });
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
  const lower = container.createDiv({ cls: "brain-console__apps-detail-row" });
  if (dashboard) {
    const policyCard = lower.createDiv({ cls: "brain-console__local-app-readiness" });
    policyCard.createEl("div", { cls: "brain-console__section-heading", text: "App Operations Policy" });
    policyCard.appendChild(renderStatusBadge(dashboard.actionPolicy.status, dashboard.actionPolicy.status === "enabled" ? "ok" : "warn"));
    renderCompactStatGrid(policyCard, [
      { label: "Path", value: dashboard.actionPolicy.executionPath },
      { label: "Confirm", value: dashboard.actionPolicy.requiresConfirmation ? "Required" : "No" },
      { label: "Shell", value: dashboard.safety.pluginExecutesShell ? "Plugin shell" : "Never" }
    ]);
    policyCard.createEl("div", { cls: "brain-console__safety-note", text: "Brain Console posts only canonical app id + start/stop/restart to Brain Core." });
  }
  if (readiness) {
    const readinessCard = lower.createDiv({ cls: "brain-console__local-app-readiness" });
    readinessCard.appendChild(renderStatusBadge(readiness.ready ? "Ready" : "Not ready", readiness.ready ? "ok" : "warn"));
    readinessCard.createEl("div", { cls: "brain-console__section-heading", text: "Action Readiness" });
    renderCompactStatGrid(readinessCard, [
      { label: "Satisfied", value: String(readiness.satisfiedCount) },
      { label: "Unsatisfied", value: String(readiness.unsatisfiedCount) }
    ]);
    readinessCard.createEl("div", { cls: "brain-console__safety-note", text: readiness.nextSafeStep });
  }
  if (onboarding) {
    const onboardingCard = lower.createDiv({ cls: "brain-console__local-app-readiness" });
    onboardingCard.createEl("div", { cls: "brain-console__section-heading", text: "Onboarding Standards" });
    renderCompactStatGrid(onboardingCard, [
      { label: "Required fields", value: String(onboarding.requiredFields.length) },
      { label: "Steps", value: String(onboarding.onboardingSteps.length) }
    ]);
    onboardingCard.createEl("div", { cls: "brain-console__safety-note", text: onboarding.nextSafeStep });
  }
  const operationalReadiness = state.localAppsOperationalReadiness;
  if (operationalReadiness) {
    const orCard = lower.createDiv({ cls: "brain-console__local-app-readiness" });
    orCard.createEl("div", { cls: "brain-console__section-heading", text: "Operational Readiness" });
    const reachableLabel = operationalReadiness.reachableCount > 0 ? "ok" : "muted";
    orCard.appendChild(renderStatusBadge(
      `${operationalReadiness.reachableCount}/${operationalReadiness.appCount} reachable`,
      reachableLabel
    ));
    renderCompactStatGrid(orCard, [
      { label: "Reachable", value: String(operationalReadiness.reachableCount) },
      { label: "Unreachable", value: String(operationalReadiness.unreachableCount) },
      { label: "Not configured", value: String(operationalReadiness.notConfiguredCount) },
      { label: "Check ms", value: String(operationalReadiness.totalCheckDurationMs) }
    ]);
    const reachableItems = operationalReadiness.items.filter((item) => item.status === "reachable");
    const unreachableItems = operationalReadiness.items.filter((item) => item.status === "unreachable");
    if (reachableItems.length > 0) {
      const reachableList = orCard.createDiv({ cls: "brain-console__or-item-list" });
      reachableList.createEl("div", { cls: "brain-console__or-item-list-label", text: "Reachable" });
      for (const item of reachableItems) {
        const line = reachableList.createDiv({ cls: "brain-console__or-item-line brain-console__or-item-line--reachable" });
        line.createEl("span", { cls: "brain-console__or-item-name", text: item.appName });
        if (item.durationMs !== void 0) {
          line.createEl("span", { cls: "brain-console__or-item-duration", text: `${item.durationMs}ms` });
        }
      }
    }
    if (unreachableItems.length > 0) {
      const unreachableList = orCard.createDiv({ cls: "brain-console__or-item-list" });
      unreachableList.createEl("div", { cls: "brain-console__or-item-list-label", text: "Unreachable" });
      for (const item of unreachableItems) {
        const line = unreachableList.createDiv({ cls: "brain-console__or-item-line brain-console__or-item-line--unreachable" });
        line.createEl("span", { cls: "brain-console__or-item-name", text: item.appName });
        line.createEl("span", { cls: "brain-console__or-item-message", text: item.message });
      }
    }
    const checkedAt = operationalReadiness.generatedAt;
    orCard.createEl("div", { cls: "brain-console__safety-note", text: `Checked at ${formatIsoTime(checkedAt)} \xB7 read-only health probes only.` });
  }
  const operatorSummary = state.localAppsOperatorSummary;
  if (operatorSummary) {
    const osCard = lower.createDiv({ cls: "brain-console__local-app-readiness" });
    osCard.createEl("div", { cls: "brain-console__section-heading", text: "Operator Summary" });
    const attentionLabel = operatorSummary.attentionCount > 0 ? "warn" : "ok";
    osCard.appendChild(renderStatusBadge(
      operatorSummary.attentionCount > 0 ? `${operatorSummary.attentionCount} apps need attention` : "All apps nominal",
      attentionLabel
    ));
    renderCompactStatGrid(osCard, [
      { label: "Apps", value: String(operatorSummary.appCount) },
      { label: "Executable actions", value: String(operatorSummary.executableActionCount) },
      { label: "Disabled actions", value: String(operatorSummary.disabledActionCount) },
      { label: "Reachable", value: String(operatorSummary.reachableCount) },
      { label: "Unreachable", value: String(operatorSummary.unreachableCount) },
      { label: "Not configured", value: String(operatorSummary.notConfiguredCount) }
    ]);
    if (operatorSummary.topAttentionItems.length > 0) {
      const attentionList = osCard.createDiv({ cls: "brain-console__or-item-list" });
      attentionList.createEl("div", { cls: "brain-console__or-item-list-label", text: "Needs attention" });
      for (const item of operatorSummary.topAttentionItems) {
        const line = attentionList.createDiv({ cls: "brain-console__or-item-line brain-console__or-item-line--unreachable" });
        line.createEl("span", { cls: "brain-console__or-item-name", text: item.appName });
        line.createEl("span", { cls: "brain-console__or-item-message", text: item.nextRecommendedAction });
      }
    }
    osCard.createEl("div", { cls: "brain-console__safety-note", text: "Read-only operator summary \xB7 no lifecycle actions triggered." });
  }
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
function formatIsoTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}
function renderOfflineState(shell, brainCoreUrl, statusError, endpointErrors) {
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
  steps.createEl("li", { text: "Click Refresh" });
  const refreshBtn = offline.createEl("button", { text: "Refresh" });
  refreshBtn.addClass("brain-console__btn-main");
}
function renderOrchestratorsCard(state, snapshot) {
  const card = document.createElement("div");
  if (!state.orchestrators) {
    card.textContent = "No data";
    return card;
  }
  const list = card.createEl("ul");
  list.createEl("li", { text: `Total: ${snapshot.orchestratorCount}` });
  list.createEl("li", { text: `Legacy: ${snapshot.legacySystemCount}` });
  const operationalCount = state.orchestrators.filter((o) => o.lifecycle === "operational").length;
  const problematicCount = state.orchestrators.filter((o) => ["migrating", "partial"].includes(o.lifecycle ?? "")).length;
  list.createEl("li", { text: `Operational: ${operationalCount}` });
  if (problematicCount > 0) {
    list.createEl("li", { text: `Needs Attention: ${problematicCount}`, cls: "brain-console__list-warning" });
  }
  return card;
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
function renderVideoOrchestratorCard(state, snapshot) {
  const card = document.createElement("div");
  if (!state.videoOrchestratorStatus) {
    card.textContent = "No video status available";
    return card;
  }
  const progress = state.videoOrchestratorStatus.moduleProgress ?? {};
  const platforms = safeArray(state.videoOrchestratorStatus.supportedPlatforms);
  const list = card.createEl("ul");
  list.createEl("li", { text: `Progress: ${safeNumber(progress.percent, 0)}%` });
  list.createEl("li", { text: `Implemented: ${safeNumber(progress.implemented, 0)}/${safeNumber(progress.total, 0)}` });
  const partialCount = safeNumber(progress.partial, 0);
  if (partialCount > 0) {
    list.createEl("li", { text: `Partial: ${partialCount}` });
  }
  const plannedCount = safeNumber(progress.planned, 0);
  if (plannedCount > 0) {
    list.createEl("li", { text: `Planned: ${plannedCount}` });
  }
  list.createEl("li", { text: `Platforms: ${safeCount(platforms)}` });
  return card;
}
function renderAgentViewCard(state, snapshot) {
  const card = document.createElement("div");
  const list = card.createEl("ul");
  const consoleSummary = state.agentConsole;
  if (consoleSummary) {
    list.createEl("li", { text: `Active runs: ${consoleSummary.activeRunCount}` });
    list.createEl("li", { text: `Planned runs: ${consoleSummary.plannedRunCount}` });
    list.createEl("li", { text: `Blocked runs: ${consoleSummary.blockedRunCount}` });
    list.createEl("li", { text: `Executor selections: ${consoleSummary.executorSelectionCount}` });
    list.createEl("li", { text: `Pending approvals: ${consoleSummary.approvalPendingCount}` });
    list.createEl("li", { text: `Next: ${consoleSummary.nextSafeStep}` });
  } else {
    list.createEl("li", { text: `Total agents: ${snapshot.agentCount}` });
    list.createEl("li", { text: `External executors: ${snapshot.externalExecutorCount}` });
    if (snapshot.plannedAgentCount > 0) {
      list.createEl("li", { text: `Planned: ${snapshot.plannedAgentCount}` });
    }
    if (snapshot.mindStewardAgentSummary) {
      list.createEl("li", { text: `Mind Steward: ${snapshot.mindStewardAgentSummary.health}` });
    }
  }
  list.createEl("li", { text: "Agent runtime is read-only (planned)", cls: "brain-console__list-note" });
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
  const note = el.createEl("div", { cls: "brain-console__list-note" });
  note.textContent = "\u25CF Read-only ledger \xB7 Approval-gated \xB7 Execution disabled";
  const counts = el.createDiv({ cls: "brain-console__row" });
  counts.createEl("dt", { text: "Total Runs" });
  counts.createEl("dd", { text: `${state.agentRuns?.length ?? 0}` });
  if (state.agentRuns && state.agentRuns.length > 0) {
    const blocked = state.agentRuns.filter((r) => r.status === "blocked").length;
    const completed = state.agentRuns.filter((r) => r.status === "completed").length;
    if (blocked > 0) {
      const blockedRow = el.createDiv({ cls: "brain-console__row" });
      blockedRow.createEl("dt", { text: "Blocked" });
      blockedRow.createEl("dd", { text: `${blocked}`, cls: "brain-console__list-warning" });
    }
    if (completed > 0) {
      const completedRow = el.createDiv({ cls: "brain-console__row" });
      completedRow.createEl("dt", { text: "Completed" });
      completedRow.createEl("dd", { text: `${completed}`, cls: "brain-console__list-item-highlight" });
    }
  }
  if (state.agentRuns && state.agentRuns.length > 0) {
    el.createEl("hr");
    el.createEl("strong", { text: "Latest Runs (read-only):" });
    const list = el.createEl("ul", { cls: "brain-console__list" });
    const maxRuns = Math.min(5, state.agentRuns.length);
    for (let i = 0; i < maxRuns; i++) {
      const run = state.agentRuns[i];
      const li = list.createEl("li");
      const title = li.createEl("strong", { text: run.title });
      li.appendText(` (${run.agentId})`);
      const details = li.createEl("div", { cls: "brain-console__list-note" });
      const parts = [];
      parts.push(run.status);
      if (run.ageMinutes !== void 0) parts.push(`${run.ageMinutes}m old`);
      if (run.targetId) parts.push(`\u2192 ${run.targetId}`);
      details.textContent = parts.join(" \xB7 ");
      if (run.blockers.length > 0) {
        const blocker = li.createEl("div", { cls: "brain-console__list-warning", text: `\u26A0 ${run.blockers[0]}` });
      }
      const safety = li.createEl("div", { cls: "brain-console__list-note" });
      const chips = [];
      if (!run.safety.writesToMind) chips.push("no Mind write");
      if (!run.safety.executesShell) chips.push("no shell");
      if (!run.safety.mutatesRuntime) chips.push("no runtime mutation");
      if (!run.safety.executionEnabled) chips.push("execution disabled");
      if (run.safety.requiresApproval) chips.push("approval required");
      safety.textContent = chips.join(" \xB7 ");
    }
  } else {
    el.createEl("div", { cls: "brain-console__list-note", text: "No agent runs available yet." });
  }
  const footer = el.createEl("div", { cls: "brain-console__list-note" });
  footer.innerHTML = "<em>Agent runtime is not autonomous. This view is a read-only ledger derived from approvals, reports, and status scans.</em>";
  return el;
}
function renderApprovalAuditTrailCard(state) {
  const el = document.createElement("div");
  if (!state.agentEvents || state.agentEvents.length === 0) {
    el.createEl("div", { cls: "brain-console__list-note", text: "No approval audit events available yet." });
    return el;
  }
  const list = el.createEl("ul", { cls: "brain-console__list" });
  const maxEvents = Math.min(8, state.agentEvents.length);
  for (let i = 0; i < maxEvents; i++) {
    const event = state.agentEvents[i];
    const li = list.createEl("li");
    const typeSpan = li.createEl("span", { cls: "brain-console__list-item-highlight" });
    typeSpan.textContent = event.type.toUpperCase();
    if (event.severity === "error") {
      li.classList.add("brain-console__list-error");
    } else if (event.severity === "warning") {
      li.classList.add("brain-console__list-warning");
    }
    const meta = li.createEl("div", { cls: "brain-console__list-note" });
    const parts = [];
    if (event.createdAt) {
      const timeStr = formatRelativeTime(new Date(event.createdAt));
      parts.push(timeStr);
    }
    if (event.relatedApprovalId) parts.push(`#${event.relatedApprovalId}`);
    if (event.summary) parts.push(event.summary);
    meta.textContent = parts.join(" \xB7 ");
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
var BRAIN_CONSOLE_BUILD_ID = "v2.15";
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
  heartbeatInterval = null;
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
    state.createDiv({ cls: "brain-console__status-line", text: "Manual refresh + Brain Core allowlisted local app actions \xB7 plugin never executes shell" });
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
    if (this.heartbeatInterval !== null) return;
    this.heartbeatInterval = this.registerInterval(
      window.setInterval(async () => {
        if (this.isRefreshing) return;
        if (this.activeSection === "accounts") {
          const settings = await this.plugin.getSettings();
          this.cachedState = await loadBrainConsoleViewState(settings);
          return;
        }
        await this.fullRefresh();
      }, 3e3)
    );
  }
  /** Full refresh: reload all Brain Core data and re-render */
  async fullRefresh() {
    const settings = await this.plugin.getSettings();
    this.cachedState = await loadBrainConsoleViewState(settings);
    this.rerenderWithCachedState();
  }
  /** Re-render using cached state (instant tab switch) */
  rerenderWithCachedState() {
    if (!this.cachedState) return;
    const settings = this.plugin.settings;
    this.cachedState.activeSection = this.activeSection;
    renderBrainConsoleView(this.contentEl, this.cachedState, settings, () => {
      void this.fullRefresh();
    });
  }
  async refresh() {
    try {
      await this.fullRefresh();
    } catch (error) {
      this.renderOpenFallback(error);
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
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
};
function sanitizeSettings(data) {
  const maybeData = data;
  const normalized = normalizeBrainCoreUrl(maybeData?.brainCoreUrl ?? DEFAULT_BRAIN_CONSOLE_SETTINGS.brainCoreUrl);
  return { brainCoreUrl: normalized.value };
}
