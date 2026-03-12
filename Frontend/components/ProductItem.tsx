"use client";

import { useEffect, useState } from "react";
import { getVariants } from "../lib/api";
import VariantForm from "./VariantForm";
import { Product, Variant } from "../types";

type ProductItemProps = {
    product: Product;
};

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

            <ul>
                {variants.map((v) => (
                    <li key={v._id}>
                        Variante {v.value}: {v.assignments.map((a, idx) => (
                            <span key={idx}>{a.baureihe} ({a.modelle.join(", ")})</span>
                        ))}
                    </li>
                ))}
            </ul>
            <VariantForm product={product} onCreated={handleVariantCreated} />
        </div>
    );
}
