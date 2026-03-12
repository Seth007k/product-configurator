"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";
import { Product } from "../types";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    const handleProductCreated = (product: Product) => {
        setProducts(prev => [...prev, product]);
    }

    return (
        <div>
            <h2>Produkte & Varianten</h2>

            <ProductForm onCreated={handleProductCreated} />

            {products.map((p) => (
                <ProductItem key={p._id} product={p} />
            ))}
        </div>
    );
}