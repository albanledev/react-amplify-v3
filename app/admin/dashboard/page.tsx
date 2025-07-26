"use client";

import Card from "@/app/components/Card";
import List from "@/app/components/List";
import { CommentsType, Products, UsersType } from "@/app/types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

enum Filter {
  USER = "USER",
  PRODUCT = "PRODCT",
  COMMENT = "COMMENT",
}

const Dashboard = () => {
  const [filter, setFilter] = useState<Filter>(Filter.USER);
  const [stats, setStats] = useState<{
    users: UsersType | null;
    products: Products | null;
    comments: CommentsType | null;
    loading: boolean;
    error: boolean;
  }>({
    users: null,
    products: null,
    comments: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/infos", {
          method: "GET",
          headers: {
            Authorization: Cookies.get("token") as string,
          },
        });
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();

        setStats({
          users: data.data.users,
          products: data.data.products,
          comments: data.data.comments,
          loading: false,
          error: false,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: false,
        }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return <h1>Loading ..</h1>;
  }

  if (stats.error || !stats.comments || !stats.products || !stats.users) {
    return <div>Erreur de chargement du produit</div>;
  }

  const products = stats.products;
  const comments = stats.comments;
  const users = stats.users;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex justify-center font-bold">Admin Infos</h1>
      <div className="flex flex-row justify-center gap-2">
        <Card
          title={"Users"}
          content={users.length.toString()}
          onClick={() => setFilter(Filter.USER)}
        />
        <Card
          title={"Products"}
          content={products.length.toString()}
          onClick={() => setFilter(Filter.PRODUCT)}
        />
        <Card
          title={"Comments"}
          content={comments.length.toString()}
          onClick={() => setFilter(Filter.COMMENT)}
        />
      </div>
      <h2 className="text-white font-bold">
        {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
      </h2>
      <List
        el={
          filter === Filter.USER
            ? users.map((u) => ({
                id: u.id,
                created_at: u.created_at,
                name: u.email,
                content: u.name ? u.name + " - " + u.role : u.role,
              }))
            : filter === Filter.PRODUCT
            ? products.map((p) => ({
                id: p.id,
                created_at: p.created_at,
                name: p.title,
                content: p.description,
              }))
            : filter === Filter.COMMENT
            ? comments.map((c) => ({
                id: c.id,
                created_at: c.created_at,
                name: c.content,
              }))
            : users.map((u) => ({
                id: u.id,
                created_at: u.created_at,
                name: u.email,
                content: u.name ? u.name + " - " + u.role : u.role,
              }))
        }
      />
    </div>
  );
};

export default Dashboard;
