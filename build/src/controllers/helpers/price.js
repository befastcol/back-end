"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = void 0;
const calculatePrice = (distance, duration) => {
    const distanceFactor = 56000;
    const timeFactor = 120;
    const basePrice = 15;
    const price = Math.round(distance / distanceFactor + duration / timeFactor + basePrice);
    return price;
};
exports.calculatePrice = calculatePrice;
