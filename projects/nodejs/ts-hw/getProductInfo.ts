type Product = {
    name: string;
    price: number;
    available: 'Так' | 'Ні';
};

function getProductInfo(product: Product): string {
    return `Товар: ${product.name}, Ціна: ${product.price} грн., В наявності: ${product.available}`;
}

const product: Product = {
    name: 'iPhone 15',
    price: 27000,
    available: 'Так',
};

console.log(getProductInfo(product));