/** 
* @param n Nombre a élever a la factorielle
* @returns Résultat de la factorielle de n ou null si n < 0
*/ 
const factorial = (n: number): number | null => {
    if (n < 0) {
        console.error("Les nombres négatif n'ont pas de factorielle");
        return null;
    }
    if (n === 0 || n === 1) {
        return 1;
    }   
    const factNMinusOne = factorial(n-1);
    return (factNMinusOne == null ? null : n* factNMinusOne);
};
