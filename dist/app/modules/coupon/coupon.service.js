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
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponServices = void 0;
const prismaClient_1 = require("../../constants/prismaClient");
const createCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.coupon.create({ data: payload });
    return result;
});
const updateCouponIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.coupon.update({ where: { id }, data: payload });
    return result;
});
const deleteCouponIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.coupon.delete({ where: { id } });
    return result;
});
const getCouponFromDB = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.coupon.findFirst({
        where: { code, status: "Active" },
    });
    return result;
});
const getAllCouponFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.prisma.coupon.findMany();
    return result;
});
exports.couponServices = {
    createCouponIntoDB,
    updateCouponIntoDB,
    deleteCouponIntoDB,
    getCouponFromDB,
    getAllCouponFromDB
};
