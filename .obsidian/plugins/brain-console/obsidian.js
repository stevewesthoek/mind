"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemView = exports.WorkspaceLeaf = exports.Notice = exports.Setting = exports.PluginSettingTab = exports.Plugin = exports.App = void 0;
class App {
    vault;
    workspace;
}
exports.App = App;
class Plugin {
    app;
    manifest;
    loadData() {
        return Promise.resolve(undefined);
    }
    saveData(_data) {
        return Promise.resolve();
    }
    addRibbonIcon(_icon, _title, _callback) {
        return { remove() { } };
    }
    addCommand(_command) { }
    addSettingTab(_tab) { }
    registerView(_type, _creator) { }
    unload() { }
}
exports.Plugin = Plugin;
class PluginSettingTab {
    containerEl;
    constructor(_app, _plugin) { }
    display() { }
}
exports.PluginSettingTab = PluginSettingTab;
class Setting {
    constructor(_containerEl) { }
    setName(_name) {
        return this;
    }
    setDesc(_desc) {
        return this;
    }
    addText(_onChange) {
        return this;
    }
    addButton(_onChange) {
        return this;
    }
}
exports.Setting = Setting;
class Notice {
    constructor(_message) { }
}
exports.Notice = Notice;
class WorkspaceLeaf {
    setViewState(_state) {
        return Promise.resolve();
    }
}
exports.WorkspaceLeaf = WorkspaceLeaf;
class ItemView {
    containerEl;
    contentEl;
    constructor(_leaf) { }
    onOpen() { }
    onClose() { }
}
exports.ItemView = ItemView;
