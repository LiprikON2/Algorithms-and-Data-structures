export const removeFromListById = (arr, id) => {
    arr.splice(
        arr.findIndex((obj) => obj.id === id),
        1
    );
};

export const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
