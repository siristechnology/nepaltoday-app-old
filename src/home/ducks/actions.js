import types from "./types.js";

const startToOpenArticle = (event) => {
    return { type: types.OPEN_ARTICLE_START, event };
}

export default {
    startToOpenArticle
}