import { TrainingCatalogItem } from "@core/training/types.js";

export interface TrainingCatalogSectionDTO {
  id: string;
  title: string;
  trainings: TrainingCatalogItem[];
}

export interface TrainingCatalogResponseDTO {
  trainings: TrainingCatalogSectionDTO[];
}