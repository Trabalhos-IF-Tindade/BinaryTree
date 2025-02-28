function createTree(elements) {

  let tree = {}

  if (!elements) {
    return null;
  }

  if (!Array.isArray(elements)) {
    return insert(tree, elements)
  }

  if (elements.length === 0) {
    return null
  }

  for (const element of elements) {
    tree = insert(tree, element)
  }

  return tree
}

function degree(tree, value) {
  if (!tree) return undefined

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
  } else return undefined
}

function insert(tree, value) {
  if (!tree || !tree.root) {
    return { root: value }
  } else if (value > tree.root) {
    tree.right = insert(tree.right, value)
  }
  else if (value < tree.root) {
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

      temp.left = tree.left;
      tree.root = tree.right.root;
      tree.left = tree.right.left;
      tree.right = tree.right.right;

      return true;
    }
  }
}

function getFather(tree, value, parent = null) {
  if (!tree) return undefined
  if (value === tree.root) {
    if (parent === null) return undefined
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
  if (!father) return undefined

  if (father.left?.root === value) {
    return father.right ? father.right : undefined

  } else if (father.right?.root === value) {
    return father.left ? father.left : undefined
  }

  return undefined
}

function getElement(tree, value) {
  if (!tree) return undefined

  if (value === tree.root) return tree

  if (value > tree.root) return getElement(tree.right, value)
  else if (value < tree.root) return getElement(tree.left, value)
}

function calculateTreeDepth(tree, level = 0) {
  if (!tree || !tree.root) return undefined

  if (!tree.left && !tree.right) {
    return level
  }

  const leftDepth = calculateTreeDepth(tree.left, level + 1)
  const rightDepth = calculateTreeDepth(tree.right, level + 1)


  return Math.max(leftDepth ?? 0, rightDepth ?? 0)
  
}

function calculateNodeLevel(tree, value, level = 0) {
  if (!tree) return undefined

  if (value === tree.root) return level

  const leftLevel = calculateNodeLevel(tree.left, value, level + 1)
  if (leftLevel !== undefined) {
    return leftLevel
  }

  const rightLevel = calculateNodeLevel(tree.right, value, level + 1)
  if (rightLevel !== undefined) {
    return rightLevel
  }
  return undefined
}

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