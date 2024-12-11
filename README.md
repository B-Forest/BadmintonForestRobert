# Table des matières

1. [Installation](#installation)
2. [Utilisation](#utilisation)
3. [Conception](#conception)
4. [Références](#références)
   
## Installation

Configuration du .env
```bash
$ cp .env.example .env
```
Remplissez les valeurs dans .env en fonction des besoins de votre environnement

Installation des librairies externes
```bash
$ npm install
```
Executition du seeder 
```bash
$ npm run seed
```
Lancement du projet 
```bash
$ npm run start
```

## Utilisation

Pour pouvoir accéder au Swagger, une fois le projet lancé, allez sur : http://localhost:3000/api

Le fichier OAD.yaml peut-être utilisé dans Swagger Editor.

Pour pouvoir vous connecter, veuillez utiliser la route /register pour créer un compte, puis la route /login pour pouvoir récuperer un token necessaire à l'utilisation de certaines routes.

Vous pourrez alors voir la liste des créneaux disponible pour une journée avec la route : /slots/fields/{date}

Et par la suite réserver un créneau avec la route /slots/reservations/{id} avec l'id qui correspond à l'id d'un créneau.

## Conception

Dictionnaire des données
![image](https://github.com/user-attachments/assets/adf4670e-4e50-4cb6-bf06-353a9a9e2cfd)

Listes des routes
![image](https://github.com/user-attachments/assets/22e2f9d8-798c-40b2-b658-d339518c10d1)

## Références

Documentation NestJS : https://docs.nestjs.com/

Cours d'API de Paul SCHUHMACHER

Forum StackOverflow : https://stackoverflow.com/

ChatGPT : https://chatgpt.com/
