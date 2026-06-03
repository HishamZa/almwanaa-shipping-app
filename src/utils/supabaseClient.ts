import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://guxzjqrmzqrmeybdzgxo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1eHpqcXJtenFybWV5YmR6Z3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NDIyODQsImV4cCI6MjA4ODQxODI4NH0.Ro9lxMNRUdd2mnh6LtCN5Zd6glSQV9SRqmBkqD0G5hI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);