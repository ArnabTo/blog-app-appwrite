export default function calCulateAmount(price: number, factor = 100) {
    return Math.round(price * factor);
}