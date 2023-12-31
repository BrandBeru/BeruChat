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
const boom_1 = __importDefault(require("@hapi/boom"));
const chat_model_1 = require("../db/models/chat.model");
const user_service_1 = __importDefault(require("./user.service"));
const encrypt_1 = require("../utils/encrypt");
const user = new user_service_1.default();
class ChatService {
    create(...members) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user.existUsers(...members);
                if (users.length !== members.length) {
                    throw new Error();
                }
                const response = yield chat_model_1.Chat.create({ members });
                return response;
            }
            catch (error) {
                throw boom_1.default.badData();
            }
        });
    }
    sendMessage(chatId, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield (0, encrypt_1.encryption)(body.text.toString());
            const message = Object.assign(Object.assign({}, body), { transmitter: userId, text: password.ciph, iv: password.iv });
            const data = yield chat_model_1.Chat.updateOne({ _id: chatId }, { $push: {
                    messages: message
                } });
            return data;
        });
    }
    getMessages(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield chat_model_1.Chat.find;
        });
    }
    /**
     *
     * @param userId
     * @param chatId
     * @description Obtener los demas contactos del chat
     */
    getMemberContact(chatId, userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const chat = (_a = (yield chat_model_1.Chat.findOne({ _id: chatId }))) === null || _a === void 0 ? void 0 : _a.populate({
                path: 'members',
                select: 'name lastName username email meta'
            });
            const mem = (_b = (yield chat)) === null || _b === void 0 ? void 0 : _b.members;
            const index = mem.indexOf(userId);
            const members = mem.splice(index, 1);
            return members;
        });
    }
    findChatByMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield chat_model_1.Chat.find({ members: id }).populate({
                path: 'members',
                select: 'name _id username email name lastName meta'
            });
            return chats;
        });
    }
    findChatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield chat_model_1.Chat.findOne({ _id: id }).populate({
                    path: 'members',
                    select: 'name _id username email name lastName meta'
                });
                const messages = new Array();
                chat === null || chat === void 0 ? void 0 : chat.messages.forEach(({ text, iv }) => __awaiter(this, void 0, void 0, function* () {
                    const decrypt = yield (0, encrypt_1.decryption)(text.toString(), iv);
                    messages.push(decrypt);
                }));
                const object = {
                    chat,
                    messages: messages
                };
                return object;
            }
            catch (err) {
                throw boom_1.default.badRequest();
            }
        });
    }
    deleteChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield chat_model_1.Chat.deleteOne({ _id: id });
            return data;
        });
    }
}
exports.default = ChatService;
