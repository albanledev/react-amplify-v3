"use client";
import { useAuth } from "@/app/AuthContext";
import List from "@/app/components/List";
import { Product } from "@/app/types";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";

const ProdcutPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [stats, setStats] = useState<{
    product: Product | null;
    error: boolean;
    loading: boolean;
  }>({
    product: null,
    error: false,
    loading: true,
  });

  const { id } = use(params);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();
        setStats({
          product: data.data,
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
  }, [id]);

  if (stats.loading) {
    return <h1>Loading ..</h1>;
  }

  if (stats.error || !stats.product) {
    return <div>Erreur de chargement du produit</div>;
  }
  const product = stats.product;
  return (
    <div className="flex flex-col gap-4 container mx-auto px-4 py-8">
      <Link href={"/"} className="bg-white text-black rounded-lg px-4 py-2">
        Home Page
      </Link>
      <h1>Product title : {product.title}</h1>
      <p>Product description : {product.description}</p>
      <p>Created by {product.users.name}</p>
      <Image
        src={product.image_url}
        alt={`Image of ${product.title}`}
        loading="lazy"
        decoding="async"
        width={50}
        height={50}
      />
      <h3>Comments</h3>
      <List
        el={product.comments.map((e) => ({
          id: e.id,
          created_at: e.created_at,
          name: "Comment: " + e.content,
        }))}
      />
    </div>
  );
};

export default ProdcutPage;
