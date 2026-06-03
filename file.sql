create table public.shipments (
  id uuid default uuid_generate_v4() primary key,
  customer_id text not null,
  customer_name text not null,
  size_cbm numeric not null,
  cost_usd numeric not null,
  arrival_date text not null,
  status text not null default 'Received in the Warehouse',
  tracking_number text unique not null,
  created_at timestamptz default now()
);

-- Disable security for demo purposes
alter table public.shipments enable row level security;

create policy "Enable all access for demo" on public.shipments
for all
using (true)
with check (true);