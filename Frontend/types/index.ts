export type Product = {
    _id: string;
    name: string;
    code: string;
}

export type Assignment = {
    baureihe: string;
    modelle: string[];
}

export type Variant = {
    _id: string;
    value: string
    assignments: Assignment[];
    product: Product
};

export type Props = {
    onCreated: (product: Product) => void;
};

