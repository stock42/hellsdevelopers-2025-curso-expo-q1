export type Character = {
    id: number;
    name: string;
    ki: string;       // Se maneja como string porque viene con puntos y palabras ("60.000.000", "90 Septillion")
    maxKi: string;    // Igualmente string
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: string | null; // o Date | null si en tu lógica quieres manejar un objeto Date
  };
  
  export type CharacterInfo = Character & {
    originPlanet: {
      id: number;
      name: string;
      isDestroyed: boolean;
      description: string;
      image: string;
      deletedAt: string | null;
    };
    transformations: Array<{
      id: number;
      name: string;
      image: string;
      ki: string;
      deletedAt: string | null;
    }>;
  }
 