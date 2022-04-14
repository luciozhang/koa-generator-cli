"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTemplate = void 0;
const promise_1 = __importDefault(require("git-clone/promise"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const ora_1 = __importDefault(require("ora"));
const downloadTemplate = (name, templateGitUrl, downloadPath) => {
    const loading = (0, ora_1.default)('download template');
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            loading.start('start download template');
            yield (0, promise_1.default)(templateGitUrl, downloadPath, { checkout: 'master', shallow: true });
            fs_extra_1.default.removeSync(path_1.default.join(downloadPath, '.git'));
            loading.stop();
            loading.succeed('download success');
            resolve('download success');
        }
        catch (error) {
            reject(error);
            loading.stop();
            loading.fail('download fail');
        }
    }));
};
exports.downloadTemplate = downloadTemplate;
//# sourceMappingURL=download.js.map