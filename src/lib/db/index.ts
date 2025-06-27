import Dexie, { type EntityTable } from "dexie";

interface GeoJsonFeature {
  id: string;
  type: "feature";
}

const db = new Dexie("feature") as Dexie & {
  features: EntityTable<GeoJsonFeature, "id">;
};

db.version(1).stores({
  features: "id, type",
});

export type { GeoJsonFeature };
export { db };
