const isAdmin = (array) => {
    if(array === undefined)
        return false;
    const res = array.indexOf("Admin");
    if(res === -1)
        return false;
    return true;
}

export default isAdmin;