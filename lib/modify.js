"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPackageJson = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const ora_1 = __importDefault(require("ora"));
const log = (0, ora_1.default)('modify');
const modifyPackageJson = function (downloadPath, options) {
    const packagePath = path_1.default.join(downloadPath, 'package.json');
    log.start('start modifying package.json');
    if (fs_extra_1.default.existsSync(packagePath)) {
        const content = fs_extra_1.default.readFileSync(packagePath).toString();
        const template = handlebars_1.default.compile(content);
        const param = { name: options.name, description: options.description, author: options.author };
        const result = template(param);
        fs_extra_1.default.writeFileSync(packagePath, result);
        log.stop();
        log.succeed('modify package.json complate');
    }
    else {
        log.stop();
        log.fail('modify package.json fail');
        throw new Error('no package.json');
    }
};
exports.modifyPackageJson = modifyPackageJson;
//# sourceMappingURL=modify.js.map