export interface Pokemon {
   name: number;
   url: string;
}

export interface Type {
   name: string;
   immune: Array<string>;
   takeX2Damage: Array<string>;
   pokemon: Pokemon[];
}

export interface Detail {
   id: number;
   name: string;
   types: Array<{
      type: {
         name: string;
      };
   }>;
   height: number;
   weight: number;
   species: {
      url: string;
   };
   stats: Array<{
      base_stat: number;
      stat: {
         name: string;
      };
   }>;
   sprites: {
      front_default: string;
   };
}

export interface Species {
   evolution_chain: {
      url: string;
   };
   flavor_text_entries: any;
   varieties: {
      pokemon: Pokemon;
   };
}

export interface Evolution {
   id: number;
   name: string;
   level: number;
   is_special_form: boolean;
   many_evolutions: boolean;
}
