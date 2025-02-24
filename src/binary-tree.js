function create(numbers, arvore) {
    if (!numbers || numbers.length === 0) return arvore;

    if (!arvore.root) {
        arvore = {
            root: numbers[0],
            left: null,
            right: null
        }
        return create(numbers.slice(1), arvore);
    } else {
        if (numbers[0] > arvore.root) {
            if (!arvore.right) { 
                arvore.right = { root: numbers[0], left: null, right: null }; 
            } else {
                create([numbers[0]], arvore.right); 
            }
        } else if (numbers[0] < arvore.root) {
            if (!arvore.left) { 
                arvore.left = { root: numbers[0], left: null, right: null };
            } else {
                create([numbers[0]], arvore.left); 
            }
        }

        return create(numbers.slice(1), arvore);
    }
}

let arvoreInicial = {
    root: null,
    left: null,
    right: null
}
let arrayInicial = [6, 8, 2, 1, 4, 3];
let arvore = create(arrayInicial, arvoreInicial);
console.log(JSON.stringify(arvore, null, 2));




/* numbers.forEach(element => {
 if(!arvore) {
     arvore = {
         root: element,
         left: null,
         right: null
     }
 }else{
     if(element > arvore.root){
         if(!arvore.right){
             arvore.right = {
                 root: element,
                 left: null,
                 right: null
             }
         }else{
             arvore.right.right = {
                 root: element,
                 left: null,
                 right: null
             }
         }
     }else{
         if(!arvore.left){
             arvore.left = {
                 root: element,
                 left: null,
                 right: null
             }
         }else{
             arvore.left.right = {
                 root: element,
                 left: null,
                 right: null
             }
         }
     }
 }
}); */


