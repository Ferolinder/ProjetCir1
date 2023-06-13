//structure du tableau des catégories
struct HashTableCategory {
    struct MoviesList* table[HASH_TABLE_PERFECT_BUCKETS]; // the table
};

//Fonction pour créer une table vide
struct HashTableCategory* createEmptyHashTableType();

// Une fonction pour savoir l’adresse de certain élément dans la table.
unsigned int hash_function_str(struct HashTableCategory* ht, char* category);

void addType(struct Movie* m, struct HashTableCategory* htc);

struct MoviesList* getPFFromType(struct HashTableCategory* hct,int type);
