
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pmcrqujzumbcvrqoplnf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtY3JxdWp6dW1iY3ZycW9wbG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTM0MDcsImV4cCI6MjA2MzY4OTQwN30.KyjefiynXfCWbvE49H_kdIMzfEEHKg_NXbLbIuc0MJk'

export const supabase = createClient(supabaseUrl, supabaseKey)
