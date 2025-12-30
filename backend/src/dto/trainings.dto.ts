import { TrainingCatalogItem } from "../core/training/types";

export interface TrainingCatalogResponseDTO {
  modules: Array<{
    title: string;
    sections: Array<{
      title: string;
      trainings: TrainingCatalogItem[];
    }>;
  }>;
}
