function create(numbers, tree) {
    if (!numbers || numbers.length === 0) return tree;

    if (!tree.root) {
        tree = {
            root: numbers[0],
            left: null,
            right: null
        }
        return create(numbers.slice(1), tree);
    } else {
        if (numbers[0] > tree.root) {
            if (!tree.right) { 
                tree.right = { root: numbers[0], left: null, right: null }; 
            } else {
                create([numbers[0]], tree.right); 
            }
        } else if (numbers[0] < tree.root) {
            if (!tree.left) { 
                tree.left = { root: numbers[0], left: null, right: null };
            } else {
                create([numbers[0]], tree.left); 
            }
        }

        return create(numbers.slice(1), tree);
    }
}


function degree(element, tree){
    if(!tree || tree.root == null) return "Elemento não encontrado";

    if(element == tree.root){
        return countNode(tree);
    } else{
        if(element > tree.root){
            return degree(element, tree.right)
        } 
        if(element < tree.root){
            return degree(element, tree.left)
        }
    }
}
function countNode(tree){
    let nodes = 0;
    /* if(tree.right) nodes++;
    if(tree.left) nodes++ */
    tree.right ? nodes++ : nodes;
    tree.left ? nodes++ : nodes;

    return nodes
}




let initialTree = {
    root: null,
    left: null,
    right: null
}
let arrayInicial = [6, 8, 2, 1, 4, 3];
let tree = create(arrayInicial, initialTree);

//console.log(countNode( {root: 5, left: null, right: 6} ) );
//console.log(JSON.stringify(tree, null, 2));
console.log(degree( 4, tree))







/* numbers.forEach(element => {
 if(!tree) {
     tree = {
         root: element,
         left: null,
         right: null
     }
 }else{
     if(element > tree.root){
         if(!tree.right){
             tree.right = {
                 root: element,
                 left: null,
                 right: null
             }
         }else{
             tree.right.right = {
                 root: element,
                 left: null,
                 right: null
             }
         }
     }else{
         if(!tree.left){
             tree.left = {
                 root: element,
                 left: null,
                 right: null
             }
         }else{
             tree.left.right = {
                 root: element,
                 left: null,
                 right: null
             }
         }
     }
 }
}); */


