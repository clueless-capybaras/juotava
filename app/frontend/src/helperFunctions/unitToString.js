export function unitToString(unit) {
    if (unit === "MILLILITRES") {
        return "ml";
    }
    if (unit === "DECILITRES") {
        return "dl";
    }
    if (unit === "CENTILITRES") {
        return "cl";
    }
    if (unit === "LITRES") {
        return "l";
    }
    if (unit === "OUNCES") {
        return "oz";
    }
    if (unit === "MILLIGRAMS") {
        return "mg";
    }
    if (unit === "GRAMS") {
        return "g";
    }
    if (unit === "KILOGRAMS") {
        return "kg";
    }
    if (unit === "PIECES") {
        return "Stk";
    }
    if (unit === "TEASPOONS") {
        return "TL";
    }
    if (unit === "TABLESPOONS") {
        return "EL";
    }
    if (unit === "PINCH") {
        return "Prise";
    }
    else {
        return unit;
    }

}