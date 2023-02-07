import react from "react";

export const AuthContext = react.createContext({
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
});

const useAuth = () => {
    const authContext = react.useContext(AuthContext);
    const auth = authContext.user;
    const setAuth = (user) => {
        if (user) {
            authContext.login(user);
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            authContext.logout();
            localStorage.removeItem("user");
            localStorage.removeItem("val");
        }
    };
    return [auth, setAuth];
};

export default useAuth;