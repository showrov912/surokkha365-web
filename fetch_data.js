const fs = require('fs');
fetch('https://qcqnfpcvvudlnrabtixn.supabase.co/rest/v1/site_content?id=eq.1&select=data', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjcW5mcGN2dnVkbG5yYWJ0aXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3OTA5MzQsImV4cCI6MjEwNTM2NjkzNH0.kbYwzuHliV5TtoVB-jecPQ_zuYlbLgup7y-W1lxYA60',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjcW5mcGN2dnVkbG5yYWJ0aXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3OTA5MzQsImV4cCI6MjEwNTM2NjkzNH0.kbYwzuHliV5TtoVB-jecPQ_zuYlbLgup7y-W1lxYA60'
  }
}).then(r => r.json()).then(data => fs.writeFileSync('data.json', JSON.stringify(data[0].data.pricingData, null, 2)));
