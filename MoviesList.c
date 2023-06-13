#include "Movie.h"


//structure des films

struct Movie* createMovie(char* Title , unsigned int duration,char* productor, int categoryID){
    struct Movie* m = malloc(sizeof(struct Movie));
    if(m==NULL){
        printf("Erreur Malloc");
        return NULL;
    }
    else{
        m->categoryID=categoryID;
        m->lenght=duration;
        m->movieName=Title;
        m->realisator=productor;
//        m->next = NULL;
        return m;
    }
}

void AddMovieInTitleTreeDirectorListDurationCategory(struct MoviesList* AllMovie, struct NameTrie* tree, struct DirectorList* dl,struct MovieDurationArray* mda, struct HashTableCategory* hct,struct Movie* m){
    createMovieCellAndAddIt(m,AllMovie);
    addMovieInTree(m,tree);
    addDirector(dl,m);
    addDuration(m,mda);
    addType(m,hct);
}

void PrintMovie(struct Movie* m){
    if(m!=NULL){
        printf("Titre => %s\n Duree => %d\n Producteur => %s\n TypeId => %c\n",getTitle(m), getDuration(m),getProd(m),getType(m));
    }
    else{
        printf("film absent de la BD");
    }

}

//structure des MoviesList

struct MoviesList* createEmptyMoviesList(){
    struct MoviesList* Ml = malloc(sizeof (struct MoviesList));
    if(Ml==NULL){
        printf("Erreur Malloc");
        return NULL;
    }
    else{
        Ml->head=NULL;
        Ml->size=0;
        return Ml;
    }
}

void createMovieCellAndAddIt(struct Movie* movie, struct MoviesList* Ml){
    struct MoviesCell* mc = malloc(sizeof(struct MoviesCell));
    if(mc==NULL){
        printf("Erreur Malloc");
    }
    else{
        mc->movie=movie;
        mc->next=Ml->head;

        Ml->head=mc;
        Ml->size++;
    }
}

bool isListEmpty(struct MoviesList* l){
    return l->size;
}

void printMoviesList(struct MoviesList* l){
    if(l!=NULL){
        struct MoviesCell* Temp = l->head;
        for(int i=0; i<listSize(l);i++){
            printf("Titre => %s\n Duree => %d\n Producteur => %s\n TypeId => %c\n",getTitle(Temp->movie), getDuration(Temp->movie),getProd(Temp->movie),getType(Temp->movie));
            Temp = Temp->next;
            printf("-----film suivant----\n");
        }
    }
    else{
        printf("Liste vide, vos paramettres n'existent pas dans la BD");
    }

}

unsigned int listSize(struct MoviesList* l){
    return l->size;
}

char* getTitle(struct Movie* m){
    return m->movieName;
}

char* getProd(struct Movie* m){
    return m->realisator;
}

unsigned int getDuration( struct Movie* m){
    return m->lenght;
}

int getType(struct Movie* m){
    return m->categoryID;
}

struct Movie* getPFFromName(struct MoviesList* Title, char* nameFilm){
    struct MoviesCell* m = Title->head;
    for(int i =0;i<Title->size;i++){
        if(strcmp(m->movie->movieName,nameFilm)==0){
            return m->movie;
        }
        else{
            m=m->next;
        }
    }
    return NULL;
}