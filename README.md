# 📊 Next.js Analytics Dashboard

Un projet Next.js moderne déployé sur Vercel, utilisant Supabase (PostgreSQL) comme base de données cloud, et Grafana Cloud + Prometheus pour la collecte et la visualisation des métriques.

🔧 Stack technique

# Next.js — framework React fullstack (frontend + API routes)

Supabase — base de données PostgreSQL + auth

Vercel — hébergement serverless

Grafana Cloud — dashboarding & monitoring

Prometheus — collecte et stockage des métriques personnalisées

# 🚀 Fonctionnalités principales

Authentification et gestion d'utilisateurs via Supabase

Stockage de données produits et commentaires

API d'exposition de métriques Prometheus (/api/metrics)

Monitoring en temps réel sur Grafana Cloud

Intégration CI/CD automatique avec Vercel (déploiement via push main)

# 📸 Aperçu

Page Admin (tableau de bord à venir)
├— Nombre total d'utilisateurs
├— Nombre total de produits
├— Nombre total de commentaires
└— Nombre de connexions actives dans la dernière heure

# ✅ Prérequis

Assurez-vous d’avoir installé :

Node.js >= 18

pnpm ou [npm/yarn]

Un compte Supabase

Un compte Grafana Cloud

# 📦 Installation

pnpm install
ou
npm install

🧪 Lancer en local

pnpm dev
ou
npm run dev

# 📊 Prometheus Metrics

L'endpoint /api/metrics expose les métriques suivantes :

- app_users_total Total number of users
- app_products_total Total number of products
- app_comments_total Total number of comments
- app_active_users_last_hour Number of users who signed in the past hour

### ⚠️ Protégé via Basic Auth : configure les identifiants dans Grafana Cloud (Metrics Endpoint).

# ☁️ Déploiement

Déployé automatiquement via Vercel.

# CI/CD

Push sur main => déclenche un déploiement Vercel

Les variables d’environnement sont gérées via le dashboard Vercel

# 📊 Monitoring avec Grafana Cloud

Crée un Metrics Endpoint dans Grafana Cloud

Renseigne l’URL de ton endpoint /api/metrics

Ajoute les identifiants METRICS_USER / METRICS_PASS

Explore les métriques dans l’onglet Explore

# 📂 Structure simplifiée

/app
  /api
    /metrics.ts         # Expose les métriques Prometheus
  /admin                # Dashboard (protégé)
  /products             # Produits accessibles sans auth
/utils                 # Fonctions d'auth et helpers
.env.local             # Variables d'environnement locales

# 🛡️ Sécurité

Les routes /api/metrics et /admin sont protégées via un middleware Next.js.

Seuls les tokens JWT valides ou identifiants Basic Auth permettent l'accès aux endpoints sensibles.
