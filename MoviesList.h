#ifndef PROJET_SERVEUR_MOVIE_H
#define PROJET_SERVEUR_MOVIE_H
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

//structure des films
struct Movie{
    /*
    Cette structure ne contiens que les attributs informatifs du film (nom, durée...),
    elle est la structure vers laquelle pointe les pointeurs qui sont présents dans
    les structures de tri (table de hash, arbre...).
    */
    char* realisator;
    char* movieName;
    int categoryID; // correspond au hash du nom de la catégorie
    unsigned int lenght; // durée en minutes du film
//    struct Movie* next;
};
//fonction qui permet de créer une structure "film"
struct Movie* createMovie(char* Title , unsigned int duration,char* productor, int categoryID);

//fonction qui permet d'afficher un film
void PrintMovie(struct Movie* m);


//structure des liste personnalisées contenant des pointeurs vers les films
struct MoviesCell{
    struct Movie* movie;
    struct MoviesCell* next;
};

struct MoviesList{
    unsigned int size;
    struct MoviesCell* head;
};

//crée une liste vide
struct MoviesList* createEmptyMoviesList();

//fonction de création d'un élément film dans la liste film qui l'ajoute automatiquement
void createMovieCellAndAddIt(struct Movie* movie, struct MoviesList* Ml);

//fonction pour cérifier que la liste n'est pas vide
bool isListEmpty(struct MoviesList* l);

//premet d'afficher dans la console une liste de film :
void printMoviesList(struct MoviesList* l);

//nous donne le nb de films dans la liste
unsigned int listSize(struct MoviesList* l);

char* getTitle(struct Movie* m);

char* getProd(struct Movie* m);

unsigned int getDuration( struct Movie* m);

int getType(struct Movie* m);

struct Movie* getPFFromName(struct MoviesList* Title, char* nameFilm);

void deleteMovieList(struct MoviesList** AllMovie);
