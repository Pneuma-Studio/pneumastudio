import { createAdminClient } from './admin';

interface AuditEntry {
  entity_type: string;
  entity_id: string;
  entity_name: string;
  action: string;
  details?: Record<string, any>;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from('audit_log').insert(entry);
  } catch {
    // Non-fatal: never let audit failure break the main operation
  }
}
