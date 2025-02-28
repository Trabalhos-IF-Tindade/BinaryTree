function createTree(elements) {

  let tree = {}

  if (!elements) {
    return null;
  }

  if (!Array.isArray(elements)) {
    return insert(tree, elements)
  }

  for (const element of elements) {
    tree = insert(tree, element)
  }

  return tree
}

function degree(tree, value) {
  if (!tree) return 'Árvore inválida'

  if (value < tree.root) {
    return degree(tree.left, value)
  }
  else if (value > tree.root) {
    return degree(tree.right, value)
  }
  else if (value === tree.root) {
    if (tree.left && tree.right) return 2
    else if (tree.left || tree.right) return 1
    else return 0
  } else return 'Elemento não encontrado'
}

function insert(tree, value) {
  if (!tree || !tree.root) {
    return { root: value }
  } else if (value > tree.root) {
    tree.right = insert(tree.right, value)
  }
  else {
    tree.left = insert(tree.left, value)
  }
  return tree
}

function remove(tree, value) {
  if (!tree) return false

  if (value < tree.root) {

    const removed = remove(tree.left, value)
    return removed

  } else if (value > tree.root) {

    const removed = remove(tree.right, value)
    return removed

  } else {

    if (!tree.left && !tree.right) {
      tree.root = null
      return true
    }

    else if (!tree.left) {
      tree.root = tree.right.root
      tree.left = tree.right.left
      tree.right = tree.right.right
      return true
    }

    else if (!tree.right) {
      tree.root = tree.left.root
      tree.right = tree.left.right
      tree.left = tree.left.left
      return true
    }

    else {
      let temp = tree.right
      while (temp.left) {
        temp = temp.left
      }

      tree.root = temp.root
      const removed = remove(tree.right, temp.root)
      return removed

    }
  }
}

function getFather(tree, value, parent = null) {
  if (!tree) return undefined
  if (value === tree.root) {
    return parent
  }
  if (value < tree.root) {
    return getFather(tree.left, value, tree)
  } else if (value > tree.root) {
    return getFather(tree.right, value, tree)
  }
}

function getBrother(tree, value) {

  const father = getFather(tree, value)
  if (!father) return null

  if (father.left?.root === value) {
    return father.right ? father.right : null;

  } else if (father.right?.root === value) {
    return father.left ? father.left : null;
  }

  return null;
}

function getElement(tree, value) {
  if (!tree) return null

  if (value === tree.root) return tree

  if (value > tree.root) return getElement(tree.right, value)
  else if (value < tree.root) return getElement(tree.left, value)
}

/**
 * Calculate the tree depth
 * 
 * @param {object} tree
 * @returns {number} depth - tree depth
 */
function calculateTreeDepth(tree) { 
  if(!tree) return 0

  const leftDepth = calculateTreeDepth(tree.left)

  const rightDepth = calculateTreeDepth(tree.right)

  return Math.max(leftDepth, rightDepth) + 1
}

function calculateNodeLevel(tree, value) { }


function toString(tree) {
  let stringTree = `root:${tree.root} `

  if (!tree.left && !tree.right) {
    return stringTree
  }

  return stringTree += auxToString(tree)
}

function auxToString(node) {
  if (!node) {
    return ''
  }
  if (node.left && node.left.root != null && node.right && node.right.root != null) {
    return `(left:${node.left.root} ${auxToString(node.left)}right:${node.right.root} ${auxToString(node.right)})`
  } else if (node.left && node.left.root != null) {
    return `(left:${node.left.root} ${auxToString(node.left)})`
  } else if (node.right && node.right.root != null) {
    return `(right:${node.right.root} ${auxToString(node.right)})`
  } else {
    return ''
  }
}

const elements = [6, 2, 8, 1, 4, 3, 7]
const tree = createTree(elements)
console.log(toString(tree))
// console.log(remove(tree, 2))
// console.log(degree(tree, 1))
// console.log(getFather(tree, 2))
// console.log(getBrother(tree, 3))
// console.log(getElement(tree, 6))
console.log(calculateTreeDepth(tree))

module.exports = {
  createTree,
  degree,
  insert,
  remove,
  getFather,
  getBrother,
  getElement,
  calculateTreeDepth,
  calculateNodeLevel,
  toString
}