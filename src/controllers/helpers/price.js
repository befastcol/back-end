"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = void 0;
var calculatePrice = function (distance, duration) {
    var distanceFactor = 56000;
    var timeFactor = 120;
    var basePrice = 15;
    var price = Math.round(distance / distanceFactor + duration / timeFactor + basePrice);
    return price;
};
exports.calculatePrice = calculatePrice;
