import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = 'https://gfbtrrhsnmositvqjzzg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYnRycmhzbm1vc2l0dnFqenpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTU4MjEsImV4cCI6MjA2OTEzMTgyMX0.mZAm4EJvsEF--yKMAsjLvhvTZV0JupyGGDQ7Nm3-Pvg';
// Debug: Let's see if these are actually loading
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Key loaded!' : 'No key found!');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
