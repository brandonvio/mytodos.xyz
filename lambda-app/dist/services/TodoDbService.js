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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDbService = void 0;
var aws_sdk_1 = require("aws-sdk");
aws_sdk_1.config.update({ region: "us-west-2" });
var docClient = new aws_sdk_1.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
/**
 * Service for interacting with DynamoDB.
 *
 */
var TodoDbService = /** @class */ (function () {
    function TodoDbService() {
    }
    /**
     * Get's Todo items for given user.
     * @param username Username of todos to get.
     */
    TodoDbService.prototype.getTodos = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var params, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params = {
                            ExpressionAttributeValues: {
                                ":u": username,
                                ":s": "archived",
                            },
                            FilterExpression: "todoState <> :s",
                            KeyConditionExpression: "pk = :u",
                            TableName: "TodoTable",
                        };
                        return [4 /*yield*/, docClient.query(params).promise()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        Promise.reject("There was an error calling dbService.getTodos.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Saves respective Todo item.
     * @param todo Todo item to save.
     */
    TodoDbService.prototype.saveTodo = function (todoItem) {
        return __awaiter(this, void 0, void 0, function () {
            var putItem, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        putItem = {
                            TableName: "TodoTable",
                            Item: todoItem,
                        };
                        return [4 /*yield*/, docClient.put(putItem).promise()];
                    case 1:
                        result = _a.sent();
                        console.log(result.$response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        Promise.reject("There was an error calling dbService.getTodos.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TodoDbService;
}());
exports.TodoDbService = TodoDbService;
//# sourceMappingURL=TodoDbService.js.map