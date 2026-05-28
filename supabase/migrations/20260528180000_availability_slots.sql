-- Availability Slots Migration
-- Tracks how many project slots are available/taken per month

CREATE TABLE IF NOT EXISTS public.availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month_label TEXT NOT NULL,
  total_slots INTEGER NOT NULL DEFAULT 5,
  taken_slots INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_availability_slots_is_active ON public.availability_slots(is_active);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_availability_slots_updated_at ON public.availability_slots;
CREATE TRIGGER set_availability_slots_updated_at
  BEFORE UPDATE ON public.availability_slots
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;

-- Public can read active slots
DROP POLICY IF EXISTS "public_read_availability_slots" ON public.availability_slots;
CREATE POLICY "public_read_availability_slots"
  ON public.availability_slots
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users (admin) can do everything
DROP POLICY IF EXISTS "authenticated_manage_availability_slots" ON public.availability_slots;
CREATE POLICY "authenticated_manage_availability_slots"
  ON public.availability_slots
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed initial data: current month (June 2026)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.availability_slots WHERE month_label = 'Junio 2026') THEN
    INSERT INTO public.availability_slots (month_label, total_slots, taken_slots, is_active)
    VALUES ('Junio 2026', 5, 3, true);
  END IF;
END $$;
