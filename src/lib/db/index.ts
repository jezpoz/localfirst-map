import Dexie, { type EntityTable } from "dexie";

interface GeoJsonGeometry {
  type: string;
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

interface GeoJsonFeature {
  id: string;
  type: "Feature";
  geometry: GeoJsonGeometry;
  properties: Record<string, any>;
}

interface GeoJsonCollection {
  id: string;
  type: "FeatureCollection";
  features: Exclude<GeoJsonFeature, 'id'>;
}

const db = new Dexie("feature") as Dexie & {
  features: EntityTable<GeoJsonFeature, "id">;
  collections: EntityTable<GeoJsonCollection, "id">;
};

db.version(1).stores({
  features: "id, type, properties",
  collections: 'id, features, properties',
});

export type { GeoJsonFeature, GeoJsonCollection };
export { db };
