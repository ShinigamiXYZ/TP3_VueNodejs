Vous devez respecter les consignes suivantes
Le site doit être monopage (SPA) avec la mise à jour du DOM et de la base de données sans exécuter de requête http au navigateur.
Insérer, mettre à jour, supprimer et lister tous les produits et le produit sélectionné
Les informations sur le produit qui doivent être enregistrées sont :
Le nom, la description, le prix, une photo et la catégorie.
Une fois enregistré, le produit doit apparaître en bas de page avec un bouton pour le mettre à jour et un bouton pour le supprimer. Toutes les opérations doivent être exécutées sans recharger la page (Requête HTTP).
Une page de présentation de l'entreprise. Cette page doit être accessible depuis un menu de navigation et directement depuis le navigateur web avec le nom de la page (route). Votre projet doit répondre aux critères suivants.
Créer un projet Vue.js CLI
Un menu de navigation entre les pages (Accueil / produits)
Pour la conception (CSS), vous pouvez utiliser le framework bootstrap (vanille, aucun modèle autorisé) ou développer votre propre css.
Un Server Node.JS
Une base de données MySQL (nommée : tp_vue)



----

Logic directement en DB pour le delete when reach 0


ALTER TABLE products
ADD COLUMN quantity INT NOT NULL,
ADD CONSTRAINT non_negative_quantity CHECK (quantity >= 0),
ADD CONSTRAINT delete_when_quantity_zero
    CHECK (quantity > 0 OR quantity IS NULL);