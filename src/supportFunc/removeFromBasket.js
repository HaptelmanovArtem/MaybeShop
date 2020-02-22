export const DleateFromBasket = (products,id) => {
    const prod = [...products];
    const index = prod.findIndex(item=>item.id === id);
    prod.splice(index,1);
    return prod;
}