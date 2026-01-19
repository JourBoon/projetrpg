const sumString = (a:number, b:string) : number => {
    return a + b.length ;
}

const Factorielle = (n: number): number => {
    let result = 1;
    for (let i=2; i <= n; i++) {
        result *= i;
    }
    return result;
}