"use client";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Produkt Konfigurator</h1>

      <ProductList />
    </main>
  );
}