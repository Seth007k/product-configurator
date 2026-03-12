"use client";

import { useState } from "react";
import { createVariant } from "../lib/api";

type Product = {
    _id: string;
    name: string;
    code: string;
};

type Assignment = {
    baureihe: string;
    modelle: string[];
};

type Variant = {
    _id: string;
    value: string
    assignments: Assignment[];
    product: Product;
};



type Props = {
    product: Product;
    onCreated: (productId: string, variant: Variant) => void;
};

export default function VariantForm({ product, onCreated }: Props) {
    const [baureihe, setBaureihe] = useState("");
    const [modelle, setModelle] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const assignment: Assignment = {
            baureihe,
            modelle: modelle.split(",").map((m) => m.trim()),
        };

        try {
            const newVariant = await createVariant(product._id, [assignment]);

            if (onCreated) onCreated(product._id, newVariant);

            setBaureihe("");
            setModelle("");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Variante hinzufügen für: {product.name}</h3>

            <input placeholder="Baureihe (z.B. 964) "
                value={baureihe}
                onChange={(e) => setBaureihe(e.target.value)}
            />

            <input placeholder="Modelle (Coupe, Targa)"
                value={modelle}
                onChange={(e) => setModelle(e.target.value)}
            />

            <button type="submit">Variante erstellen</button>
        </form>
    )
}