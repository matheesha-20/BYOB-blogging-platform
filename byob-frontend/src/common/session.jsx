const storeInSession = (key, value) => {
    return sessionStorage.setItem(key, value);
}

const lookINSession = (key) => {
    return sessionStorage.getItem(key);
}

const removeFromSession = (key) => {
    return sessionStorage.removeItem(key);
}

const logOutUser = () => {
    sessionStorage.clear();
}

export { storeInSession, lookINSession, removeFromSession, logOutUser}