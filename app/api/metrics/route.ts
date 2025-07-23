import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  // 🪜 Try to get private env vars first, fallback to public ones
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    return new NextResponse('# Error: Missing Supabase environment variables', {
      status: 500,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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

    return new NextResponse(metrics, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; version=0.0.4' },
    });
  } catch (err: unknown) {
    console.error('Metrics error:', err);
    return new NextResponse(
      `# Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
}
