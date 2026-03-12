"use client";

import { useState } from "react";
import { createProduct } from "../lib/api";
import { Props } from "../types";


/**
 * Komponente für das Erstellen eines neuen Produkts.
 * Enthält ein einfaches Formular zur Eingabe des Produktnamens.
 * props - Die Props der Komponente, inklusive onCreated-Callback
 */
export default function ProductForm({ onCreated }: Props) {
    const [name, setName] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const newProduct = await createProduct(name);

            setName("");

            onCreated(newProduct);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Neues Produkt erstellen</h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Produkt Name"
                />

                <button type="submit"> Produkt erstellen</button>
            </form>
        </div>
    )
}