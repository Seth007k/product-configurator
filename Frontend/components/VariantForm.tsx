"use client";

import { useState } from "react";
import { createVariant } from "../lib/api";
import { Product, Variant, Assignment } from "../types";

type VariantFormProps = {
    Product: Product;
    onCreated?: (productId: string, variant: Variant) => void;
};

/**
 * Komponente für das Erstellen einer neuen Variante zu einem spezifischen Produkt.
 * Enthält ein Formular zur Eingabe von Baureihe und Modellen.
 * props - Die Produkteigenschaften und das onCreated-Callback
 */
export default function VariantForm({ Product, onCreated }: VariantFormProps) {
    const [baureihe, setBaureihe] = useState("");
    const [modelle, setModelle] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const assignment: Assignment = {
            baureihe,
            modelle: modelle.split(",").map((m) => m.trim()),
        };

        try {
            const newVariant = await createVariant(Product._id, [assignment]);

            if (onCreated) onCreated(Product._id, newVariant);

            setBaureihe("");
            setModelle("");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Variante hinzufügen für: {Product.name}</h3>

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