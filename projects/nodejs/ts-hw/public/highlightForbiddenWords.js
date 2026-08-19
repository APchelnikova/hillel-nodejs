"use strict";
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlightForbiddenWords(text, forbiddenWords) {
    if (!text)
        return [];
    const cleanedWords = forbiddenWords
        .map((w) => w.trim())
        .filter((w) => w.length > 0)
        .sort((a, b) => b.length - a.length)
        .map(escapeRegExp);
    if (cleanedWords.length === 0) {
        return [{ text, isForbidden: false }];
    }
    const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])(${cleanedWords.join("|")})(?![\\p{L}\\p{N}_])`, "giu");
    const segments = [];
    let lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            segments.push({ text: text.slice(lastIndex, match.index), isForbidden: false });
        }
        segments.push({ text: match[0], isForbidden: true });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        segments.push({ text: text.slice(lastIndex), isForbidden: false });
    }
    return segments;
}
const text = "This is a test sentence with some bad words.";
const forbiddenWords = ["bad", "test"];
const result = highlightForbiddenWords(text, forbiddenWords);
console.log(result);
