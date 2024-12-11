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

Lancement du projet et création de la base de données grâce au synchronize: true dans app.module.ts

```bash
$ npm run start
```

Exécution du seeder qui va créer des utilisateurs de base et des terrains

```bash
$ npm run seed
```

## Utilisation

Pour pouvoir accéder au Swagger, une fois le projet lancé, allez sur : http://localhost:3000/api

Le fichier OAD.yaml peut-être utilisé dans Swagger Editor.

Pour pouvoir vous connecter, veuillez utiliser la route /register pour créer un compte, puis la route /login pour pouvoir récuperer un token nécessaire à l'utilisation de certaines routes.

Pour utiliser les routes protégées, veuillez ajouter le token dans swagger avec le format suivant : Bearer {token}

Vous pourrez alors voir la liste des créneaux disponibles pour une journée avec la route : /slots/fields/{date}

Et par la suite réserver un créneau avec la route /slots/reservations/{id} avec l'id qui correspond à l'id d'un créneau.

Pour pouvoir accéder au bac à sable pour utiliser GraphQL, une fois le projet lancé, allez sur : http://localhost:3000/graphql

Vous pourrez alors utiliser les requêtes suivantes :

```graphql
query GetAvailableSlots {
  availableSlots(date: "11-12-2024", terrain: "B") {
    slot_hour
    isAvailable
  }
}
```

afin de récupérer les créneaux disponibles en fonction de la date et du terrain. (avec ce format de date : "DD-MM-YYYY")

## Conception

Dictionnaire des données
![image](https://github.com/user-attachments/assets/adf4670e-4e50-4cb6-bf06-353a9a9e2cfd)

Listes des routes
![image](https://github.com/user-attachments/assets/22e2f9d8-798c-40b2-b658-d339518c10d1)

## Références

Documentation NestJS : https://docs.nestjs.com/

Cours d'API de Paul SCHUHMACHER

RepoGit Nest HAL : https://github.com/gabriel-pinheiro/nest-hal

Forum StackOverflow : https://stackoverflow.com/

ChatGPT : https://chatgpt.com/
