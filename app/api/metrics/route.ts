import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!
);

export async function GET() {
  try {
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    if (userError) throw userError;

    const { count: productCount, error: productError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    if (productError) throw productError;

    const { count: commentCount, error: commentError } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true });
    if (commentError) throw commentError;

    const metrics = `
# HELP app_users_total Total number of users
# TYPE app_users_total gauge
app_users_total ${userCount}

# HELP app_products_total Total number of products
# TYPE app_products_total gauge
app_products_total ${productCount}

# HELP app_comments_total Total number of comments
# TYPE app_comments_total gauge
app_comments_total ${commentCount}
`.trim();

    const response = new NextResponse(metrics, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; version=0.0.4' },
    });
    return response;

  } catch (err: unknown) {
    console.error('Metrics error:', err);
    return new NextResponse(`# Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 500 });
  }
}
