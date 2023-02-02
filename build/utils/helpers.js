"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectRoot = void 0;
const path_1 = __importDefault(require("path"));
const getProjectRoot = () => {
    var _a;
    return path_1.default.dirname(((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.filename) || '');
};
exports.getProjectRoot = getProjectRoot;
