// pages/api/metrics.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialise Supabase côté server (ne jamais exposer Service Role côté client)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/plain; version=0.0.4');

  try {
    // Compter les utilisateurs
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    if (userError) throw userError;

    // Compter les produits
    const { count: productCount, error: productError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    if (productError) throw productError;

    // Compter les commentaires
    const { count: commentCount, error: commentError } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true });
    if (commentError) throw commentError;

    // Retourner les métriques au format Prometheus
    res.status(200).send(`
# HELP app_users_total Total number of users
# TYPE app_users_total gauge
app_users_total ${userCount}

# HELP app_products_total Total number of products
# TYPE app_products_total gauge
app_products_total ${productCount}

# HELP app_comments_total Total number of comments
# TYPE app_comments_total gauge
app_comments_total ${commentCount}
    `.trim());
  } catch (err: any) {
    console.error('Metrics error:', err);
    res.status(500).send(`# Error: ${err.message}`);
  }
}
