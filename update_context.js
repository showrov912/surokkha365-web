const fs = require('fs');
const path = 'd:/antigravity/surokkha365/web/src/context/WebsiteContext.tsx';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes('import { initialBlogsData }')) {
  code = code.replace('import { supabase } from "@/lib/supabaseClient";', 'import { supabase } from "@/lib/supabaseClient";\nimport { initialBlogsData } from "../data/blogsData";');
}

const blogsRegex = /blogsData: \[\s*\{[\s\S]*?\] as BlogData\[\],/;
if (blogsRegex.test(code)) {
  code = code.replace(blogsRegex, 'blogsData: initialBlogsData,');
  fs.writeFileSync(path, code);
  console.log("Successfully replaced blogsData array.");
} else {
  console.log("Regex did not match.");
}
