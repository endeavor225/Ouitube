
export const slugyfy = (name) => {

    const randomNumber = Math.floor(Math.random() * 1000); // Générer un nombre aléatoire entre 0 et 999
    let baseSlug =  name
    .toLowerCase() // Convertir le texte en minuscules
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/[^\w-]+/g, '') // Supprimer les caractères non alphanumériques et non tirets
    .replace(/--+/g, '-') // Remplacer les doubles tirets par un seul tiret
    .trim(); // Supprimer les espaces au début et à la fin

    return `${baseSlug}-${randomNumber}`;
}