/**
 * One-time Firestore migration utility.
 * Renames old field names to new ones across all warehouse_details documents.
 *
 * Usage:
 *   import { migrateWarehouseFields } from '@/lib/migrateFields';
 *   await migrateWarehouseFields();   // call once from a button / console
 *
 * Safe to run multiple times — it only touches documents that still have the old field.
 */

import { collection, getDocs, doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Migrate all warehouse_details documents:
 *  - pricingModel → pricingUnit  (copy value, then delete old field)
 *
 * Returns { total, migrated } counts.
 */
export async function migrateWarehouseFields() {
    const snap = await getDocs(collection(db, 'warehouse_details'));
    let migrated = 0;

    const promises = snap.docs.map(async (d) => {
        const data = d.data();
        const updates = {};

        // ── pricingModel → pricingUnit ─────────────────────────
        if (data.pricingModel !== undefined && data.pricingUnit === undefined) {
            updates.pricingUnit = data.pricingModel;
            updates.pricingModel = deleteField();
        }

        // Add more field renames here in the future:
        // if (data.oldField !== undefined && data.newField === undefined) {
        //   updates.newField = data.oldField;
        //   updates.oldField = deleteField();
        // }

        if (Object.keys(updates).length > 0) {
            await updateDoc(doc(db, 'warehouse_details', d.id), updates);
            migrated++;
        }
    });

    await Promise.all(promises);
    return { total: snap.size, migrated };
}
