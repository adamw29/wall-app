export interface Product {
    objectId: string;
    name: String;
    type: String;
    quantity: Number;
    price: Number;
    volume?: Number;
    weight?: Number;
    description?: string;
    createdBy: {
        username: string
    };
}