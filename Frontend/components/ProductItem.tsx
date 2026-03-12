"use client";

import { useEffect, useState } from "react";
import { getVariants } from "../lib/api";
import VariantForm from "./VariantForm";
import { Variant, ProductItemProps } from "../types";

/**
 * Komponente, die ein einzelnes Produkt sowie dessen Varianten darstellt.
 * Ruft die dazugehörigen Varianten selbstständig vom Backend ab.
 * props - Enthält das darzustellende Produkt
 */
export default function ProductItem({ product }: ProductItemProps) {
    const [variants, setVariants] = useState<Variant[]>([]);

    useEffect(() => {
        const fetchVariants = async () => {
            const vars = await getVariants(product._id);
            setVariants(vars);
        };
        fetchVariants();
    }, [product._id]);

    const handleVariantCreated = (productId: string, variant: Variant) => {
        setVariants(prev => [...prev, variant]);
    };

    return (
        <div className="productItem-container" style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
            <strong>{product.name} - {product.code}</strong>

            <ul className="variant-list">
                {variants.map((v) => (
                    <li className="variant-item" key={v._id}>
                        Variante {v.value}: {v.assignments.map((a, idx) => (
                            <span className="variant-assignment" key={idx}>{a.baureihe} ({a.modelle.join(", ")})</span>
                        ))}
                    </li>
                ))}
            </ul>
            <VariantForm product={product} onCreated={handleVariantCreated} />
        </div>
    );
}
