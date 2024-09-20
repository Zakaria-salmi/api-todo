# API Gestion des Tâches

Cette API, développée avec **Express.js**, permet de gérer une liste de tâches. Elle offre des opérations de type CRUD (Create, Read, Update, Delete) sur des tâches avec la possibilité de les marquer comme complétées ou non.

## Fonctionnalités

1. **Ajouter une tâche**
2. **Consulter toutes les tâches** ou filtrer les tâches en fonction de leur état (complétées ou non).
3. **Modifier une tâche** (mise à jour complète ou partielle).
4. **Marquer une tâche comme complétée** (ou non).
5. **Supprimer une tâche**.

## Pré-requis

- **Node.js** et **npm** installés sur votre machine.
- Une fois le projet téléchargé, exécutez `npm install` pour installer les dépendances.

## Installation

1. Clonez ce dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/todo-api.git
    ```

2. Accédez au répertoire du projet :
    ```bash
    cd todo-api
    ```

3. Installez les dépendances :
    ```bash
    npm install
    ```

4. Démarrez le serveur :
    ```bash
    node app.js
    ```

5. Le serveur sera lancé à l'adresse : `http://localhost:8001`

## Points de terminaison (Endpoints)

### 1. **Récupérer la page d'accueil**
   - **URL** : `/`
   - **Méthode** : `GET`
   - Renvoie la page HTML située dans le répertoire `frontend`.

### 2. **Récupérer toutes les tâches**
   - **URL** : `/tasks`
   - **Méthode** : `GET`
   - **Query paramètre (optionnel)** :
     - `completed` : Filtrer les tâches par leur état (`true` ou `false`).
   - **Exemple** :
     - `/tasks?completed=true` renvoie les tâches complétées.

### 3. **Créer une nouvelle tâche**
   - **URL** : `/tasks`
   - **Méthode** : `POST`
   - **Corps de la requête (JSON)** :
     ```json
     {
       "name": "Nom de la tâche",
       "completed": false
     }
     ```
   - Renvoie la tâche nouvellement créée avec son `id`.

### 4. **Mettre à jour une tâche existante**
   - **URL** : `/tasks/:id`
   - **Méthode** : `PUT`
   - **Paramètre** : `id` de la tâche à mettre à jour.
   - **Corps de la requête (JSON)** :
     ```json
     {
       "name": "Nouveau nom de la tâche",
       "completed": true
     }
     ```

### 5. **Marquer une tâche comme complétée ou non**
   - **URL** : `/tasks/:id/completed`
   - **Méthode** : `PATCH`
   - **Paramètre** : `id` de la tâche à mettre à jour.
   - Cette requête bascule l'état `completed` de la tâche.

### 6. **Supprimer une tâche**
   - **URL** : `/tasks/:id`
   - **Méthode** : `DELETE`
   - **Paramètre** : `id` de la tâche à supprimer.
   - Renvoie un message de confirmation en cas de succès.

## Exemple d'utilisation

### 1. Créer une tâche

**Requête :**
```bash
curl -X POST http://localhost:8001/tasks \
-H "Content-Type: application/json" \
-d '{"name": "Apprendre Node.js", "completed": false}'
```

**Réponse :**
```json
{
  "id": 0,
  "name": "Apprendre Node.js",
  "completed": false
}
```

### 2. Récupérer toutes les tâches

**Requête :**
```bash
curl http://localhost:8001/tasks
```

**Réponse :**
```json
[
  {
    "id": 0,
    "name": "Apprendre Node.js",
    "completed": false
  }
]
```

## Technologies utilisées

- **Node.js**
- **Express.js**
- **HTML/CSS** (fichiers statiques dans le dossier `frontend`)

## Lancement du serveur

```bash
node app.js
```

L'API est disponible à l'adresse `http://localhost:8001`.

## Licence

Ce projet est sous licence MIT.
