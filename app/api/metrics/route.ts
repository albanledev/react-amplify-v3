import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const basicAuth = 'Basic ' + Buffer.from(
    process.env.METRICS_USER + ':' + process.env.METRICS_PASS
  ).toString('base64');

  if (authHeader !== basicAuth) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase environment variables');
    return new NextResponse('# Error: Missing Supabase environment variables', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    // Date ISO il y a une heure
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const [{ count: userCount }, { count: productCount }, { count: commentCount }, { count: activeUsersCount }] =
      await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('comments').select('*', { count: 'exact', head: true }),
        supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .or(`last_sign_in_at.gte.${oneHourAgo},created_at.gte.${oneHourAgo}`),
      ]);

    const metrics = `
# HELP app_users_total Total number of users
# TYPE app_users_total gauge
app_users_total ${userCount ?? 0}

# HELP app_products_total Total number of products
# TYPE app_products_total gauge
app_products_total ${productCount ?? 0}

# HELP app_comments_total Total number of comments
# TYPE app_comments_total gauge
app_comments_total ${commentCount ?? 0}

# HELP app_active_users_last_hour Number of users who signed in the past hour
# TYPE app_active_users_last_hour gauge
app_active_users_last_hour ${activeUsersCount ?? 0}
`.trim();

    return new NextResponse(metrics, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; version=0.0.4' },
    });
  } catch (err: unknown) {
    console.error('Metrics error:', err);
    return new NextResponse(`# Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 500 });
  }
}
