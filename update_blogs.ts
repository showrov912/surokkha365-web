import { createClient } from '@supabase/supabase-js';
import { initialBlogsData } from './src/data/blogsData';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
      value = value.replace(/\\n/gm, '\n');
    }
    env[key] = value.replace(/(^['"]|['"]$)/g, '').trim();
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 1).single();
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  const payload = data.data;
  payload.blogsData = initialBlogsData;

  const { error: updateError } = await supabase.from('site_content').update({ data: payload }).eq('id', 1);
  if (updateError) {
    console.error("Error updating data:", updateError);
  } else {
    console.log("Successfully updated Supabase with blogsData!");
  }
}

main();
