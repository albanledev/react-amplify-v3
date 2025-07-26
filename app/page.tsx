"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product, Products } from "./types";
import { useAuth } from "./AuthContext";

const Home = () => {
  const [stats, setStats] = useState<{
    products: Products;
    error: boolean;
    loading: boolean;
  }>({
    products: [],
    error: false,
    loading: true,
  });
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();

        setStats({
          products: data.data,
          error: false,
          loading: false,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          error: true,
          loading: false,
        }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return <h1>Loading ..</h1>;
  }

  if (stats.error) {
    return <div>Erreur de chargement des produits</div>;
  }

  const productsWithUrls = stats.products.map((product: Product) => ({
    ...product,
    url: `/products/${product.id}`,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {!isAuthenticated ? (
        <Link
          href={"/signIn"}
          className="bg-white text-black rounded-lg px-4 py-2"
        >
          Go SignIn
        </Link>
      ) : (
        <button
          className="bg-white text-black rounded-lg px-4 py-2 cursor-pointer"
          onClick={() => logout()}
        >
          Logout
        </button>
      )}
      <h1 className="text-3xl font-bold mb-8 mt-4">Nos Produits</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsWithUrls.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link href={product.url} className="hover:text-blue-600">
                {product.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <Link
              href={product.url}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Voir détails →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
