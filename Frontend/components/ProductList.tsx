"use client";

import { useEffect, useState } from "react";
import { getProducts, getVariants } from "../lib/api";
import VariantForm from "./VariantForm";
import ProductForm from "./ProductForm";

type Product = {
    _id: string;
    name: string;
    code: string;
}

type Assignment = {
    baureihe: string;
    modelle: string[];
}

type Variant = {
    _id: string;
    value: string
    assignments: Assignment[];
    product: Product
};


export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [variantsMap, setVariantsMap] = useState<Record<string, Variant[]>>({});


    useEffect(() => {
        const fetchData = async () => {
            const products = await getProducts();
            setProducts(products);

            const map: Record<string, Variant[]> = {};
            for (const p of products) {
                const vars = await getVariants(p._id);
                map[p._id] = vars;
            }
            setVariantsMap(map);
        };
        fetchData();
    }, []);

    const handleProductCreated = (product: Product) => {
        setProducts(prev => [...prev, product]);
        setVariantsMap(prev => ({ ...prev, [product._id]: [] }));
    }

    const handleVariantCreated = (productId: string, variant: Variant) => {
        setVariantsMap(prev => {
            const list = prev[productId] || [];
            return { ...prev, [productId]: [...list, variant] };
        });
    };

    return (
        <div>
            <h2>Produkte & Varianten</h2>

            <ProductForm onCreated={handleProductCreated} />
            {products.map((p) => (
                <div key={p._id} style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>

                    <strong>{p.name} - {p.code}</strong>

                    <ul>
                        {variantsMap[p._id]?.map((v) => (
                            <li key={v._id}>Variante {v.value}: {v.assignments.map((a, idx) => (
                                <span key={idx}>{a.baureihe} ({a.modelle.join(", ")})</span>
                            ))}
                            </li>
                        ))}
                    </ul>
                    <VariantForm product={p} onCreated={handleVariantCreated} />
                </div>
            ))}
        </div>
    );
}