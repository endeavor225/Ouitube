export const convertFileToLink = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function(evt) {
            resolve(evt.target?.result);
        };
        
        reader.onerror = function(evt) {
            reject(new Error("Error reading the file.", evt.target.error));
        };

        reader.readAsDataURL(file);
    });
};


export const convertFileToBlob = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function(evt) {
            if (evt.target?.result instanceof ArrayBuffer) {
                const blob = new Blob([evt.target.result], {type: file.type})
                resolve(blob);
            } else {
                reject(new Error("Error converting file to Blob."));
            }
        };
        
        reader.onerror = function(evt) {
            reject(evt.target.error);
        };
        
        reader.readAsArrayBuffer(file);
    });
};


export const linkToBlob =  (url) => {
    return new Promise(async(resolve, reject)=>{
      try {
        const response = await fetch(url)
    
        if (!response.ok) {
          reject(`La requête a échoué avec le statut ${response.status}`);
        }
    
        // Récupérez le corps de la réponse en tant que tableau tampon (ArrayBuffer)
        const buffer = await response.arrayBuffer();
    
        // Créez un objet Blob à partir du tableau tampon
        const blob = new Blob([buffer]);
    
        resolve(blob)
    
      } catch (error) {
        reject('Erreur lors de la conversion du lien en Blob :'+ error);
      }
  
    })
  }


export const convertBlobToUrl = (blob) => {
    return URL.createObjectURL(blob)
}