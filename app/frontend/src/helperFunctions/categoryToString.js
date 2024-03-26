function categoryToString(category) {
    if (category === "COCKTAIL") {
        return "Cocktail";
    } 
    if (category === "COFFEE") {
        return "Kaffee";
    }
    if (category === "JUICE") {
        return "Saft";
    }
    if (category === "LEMONADE") {
        return "Limonade";
    }
    if (category === "MILKSHAKE") {
        return "Milchshake";
    }
    if (category === "SMOOTHIE") {
        return "Smoothie";
    }
    if (category === "TEA") {
        return "Tee";
    }
    else {
        return category;
    }
}