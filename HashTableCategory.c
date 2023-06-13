
//structure de la table des types

struct HashTableCategory* createEmptyHashTableType(){
    struct HashTableCategory* ht = malloc(sizeof(struct HashTableCategory));
    for (unsigned int i = 0; i < HASH_TABLE_PERFECT_BUCKETS; i++){ // initializes the positions to NULL
        (ht -> table)[i] = NULL;
    }
    return ht;
}

void addType(struct Movie* m, struct HashTableCategory* htc){
    if(htc->table[m->categoryID] ==NULL){
        struct MoviesList* new = createEmptyMoviesList();
        createMovieCellAndAddIt(m,new);
        htc->table[m->categoryID]=new;
    }
    else{
        createMovieCellAndAddIt(m,htc->table[m->categoryID]);
    }
}

bool isHashTableEmptyType(struct HashTableCategory* ht){
    for (unsigned int i = 0; i < HASH_TABLE_PERFECT_BUCKETS; i++){
        if ((ht -> table)[i] != NULL){
            // décommenter quand ListMovies.c sera fini
            /*
            if (isListEmpty((ht -> table)[i])){
                return false;
            }
            */
            return false;
        }
    }
    return true;
}

struct MoviesList* getFilmsFromCategory(struct HashTableCategory* ht, char* category){
    return (ht -> table)[hash_function_str(ht, category)];
}

unsigned int hash_function_str(struct HashTableCategory* ht, char* category){
    /*
    Chaque nom de catégorie connue ressort de cette fonction de hash avec son propre identifiant
    dans un tableau de 85 éléments, dont chaque élément est une liste chaînée de films.
    En revanche, la perfection de cette table serait perturbée par l'ajout d'une nouvelle catégorie.
    les seules catégories disponibles seront donc celles présentes dans BD_medium.txt.

    l'algorithme de hash utilisé ici est une version modifiée du sdbm implémenté dans gawk.
    */

    unsigned int hash = 0;
    // tant qu'on est pas à la fin du string
    while (*category != '\0'){ // *category = category[0], donc un char
        hash = (*category) + (hash << 6) + (hash << 16) - hash;
        category++; // lettre suivante
    }
    return hash % HASH_TABLE_PERFECT_BUCKETS;
}

struct MoviesList* getPFFromType(struct HashTableCategory* hct,int type){
    if(0<type && type<HASH_TABLE_PERFECT_BUCKETS){
        return hct->table[type];
    }
    else{
        return NULL;
    }
}
