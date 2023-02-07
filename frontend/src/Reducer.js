export const InitialState = {user: JSON.parse(localStorage.getItem("user"))}
export const Reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.user, //akcja zdefiniowana w app
            };
        case "logout":
            return {
                ...state,
                user: null, //domyslnie nie ma zadnego uzytkownika
            };
        default:
            throw new Error("nie ma akcji" + action.type);
    }
};
