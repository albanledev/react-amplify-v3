"use client";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    comments: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/infos");
        if (!response.ok) throw new Error("Erreur de chargement");
        const data = await response.json();

        setStats({
          users: data.data.numberUsers,
          products: data.data.numberProducts,
          comments: data.data.numberComments,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ marginBottom: "20px" }}>Chargement en cours...</h2>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          color: "red",
        }}
      >
        <h2>Erreur</h2>
        <p>{stats.error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "30px",
          color: "#333",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        Tableau de bord administrateur
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Carte Utilisateurs */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Utilisateurs</h3>
          <p style={{ fontSize: "32px", margin: 0, fontWeight: "bold" }}>
            {stats.users}
          </p>
        </div>

        {/* Carte Produits */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Produits</h3>
          <p style={{ fontSize: "32px", margin: 0, fontWeight: "bold" }}>
            {stats.products}
          </p>
        </div>

        {/* Carte Commentaires */}
        <div
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Commentaires</h3>
          <p style={{ fontSize: "32px", margin: 0, fontWeight: "bold" }}>
            {stats.comments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
