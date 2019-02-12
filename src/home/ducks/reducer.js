import types from "./types.js";

export const initialState = {
    loginStatus: "uninitiated"
};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
