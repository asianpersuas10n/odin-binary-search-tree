class Node {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

const Tree = (arr) => {
  return {
    root: buildTree(mergeSort(arr), 0, arr.length - 1),
  };
};

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }
  const mid = Math.floor((start + end) / 2);
  let node = new Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(root, val) {
  root = insertVal(root, val);
}

function insertVal(root, val) {
  if (root === null) {
    root = new Node(val);
    return root;
  }
  if (val < root.data) {
    root.left = insertVal(root.left, val);
  }
  if (val > root.data) {
    root.right = insertVal(root.right, val);
  }
  return root;
}

function remove(root, val) {
  if (root === null) {
    return root;
  }
  if (root.data > val) {
    root.left = remove(root.left, val);
    return root;
  } else if (root.data < val) {
    root.right = remove(root.right, val);
    return root;
  }
  if (root.left === null) {
    return root.right;
  } else if (root.right === null) {
    return root.left;
  } else {
    let succParent = root;
    let succ = root.right;

    while (succ.left != null) {
      succParent = succ;
      succ = succ.left;
    }
    if (succParent != root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }
    root.data = succ.data;
    return root;
  }
}

function findVal(root, val) {
  if (root === null || root.data === val) {
    return root;
  }
  if (val > root.data) {
    return findVal(root.right, val);
  }
  return findVal(root.left, val);
}

function levelOrderLoop(root, func) {
  if (root === null) {
    return;
  }
  let queue = [];
  queue.push(root);
  while (queue.length) {
    const current = queue[0];
    if (func(current.data)) {
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      queue.shift();
    } else {
      return false;
    }
  }
  return true;
}

function levelOrderRecursion(root, func) {
  let testArr = [];
  for (let i = 0; i <= maxDepth(root); i++) {
    testArr.push(...levelOrderRecursionLog(root, i));
  }
  if (!func) {
    return testArr;
  }
  for (let j = 0; j < testArr.length; j++) {
    if (!func(testArr[j])) {
      return false;
    }
  }
  return true;
}

function levelOrderRecursionLog(root, level, arr = []) {
  if (root === null) {
    return arr;
  }
  if (level === 0) {
    arr.push(root.data);
  } else if (level > 0) {
    levelOrderRecursionLog(root.left, level - 1, arr);
    levelOrderRecursionLog(root.right, level - 1, arr);
  }
  return arr;
}

function inorder(root, func) {
  let testArr = [];
  testArr.push(...inorderLogic(root));
  if (!func) {
    return testArr;
  }
  for (let i = 0; i < testArr.length; i++) {
    if (!func(testArr[i])) {
      return false;
    }
  }
  return true;
}

function inorderLogic(root, arr = []) {
  if (root === null) {
    return arr;
  }
  inorderLogic(root.left, arr);
  arr.push(root.data);
  inorderLogic(root.right, arr);
  return arr;
}

function preorder(root, func) {
  let testArr = [];
  testArr.push(...preorderLogic(root));
  if (!func) {
    return testArr;
  }
  for (let i = 0; i < testArr.length; i++) {
    if (!func(testArr[i])) {
      return false;
    }
  }
  return true;
}

function preorderLogic(root, arr = []) {
  if (root === null) {
    return arr;
  }
  arr.push(root.data);
  preorderLogic(root.left, arr);
  preorderLogic(root.right, arr);
  return arr;
}

function postorder(root, func) {
  let testArr = [];
  testArr.push(...postorderLogic(root));
  if (!func) {
    return testArr;
  }
  for (let i = 0; i < testArr.length; i++) {
    if (!func(testArr[i])) {
      return false;
    }
  }
  return true;
}

function postorderLogic(root, arr = []) {
  if (root === null) {
    return arr;
  }
  postorderLogic(root.left, arr);
  postorderLogic(root.right, arr);
  arr.push(root.data);
  return arr;
}

function findHeight(root, val) {
  return maxDepth(findVal(root, val));
}

function maxDepth(root) {
  if (root === null) {
    return root;
  } else {
    let leftDepth = maxDepth(root.left);
    let rightDepth = maxDepth(root.right);
    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    } else {
      return rightDepth + 1;
    }
  }
}

function findDepth(root, val, depth = 0) {
  if (root === null) {
    return root;
  }
  if (root.data === val) {
    return depth;
  }
  if (val > root.data) {
    return findDepth(root.right, val, depth + 1);
  }
  return findDepth(root.left, val, depth + 1);
}

function isBalanced(root) {
  if (
    maxDepth(root.right) - maxDepth(root.left) >= 2 ||
    maxDepth(root.left) - maxDepth(root.right) >= 2
  ) {
    return false;
  }
  return true;
}

function rebalance(root) {
  let testArr = [];
  testArr.push(...inorderLogic(root));
  return Tree(testArr);
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let leftArr = arr.slice(0, Math.floor(arr.length / 2));
  let rightArr = arr.slice(Math.floor(arr.length / 2, arr.length));

  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(left, right) {
  let sortedArr = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

let newTree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);

prettyPrint(newTree.root);

console.log(isBalanced(newTree.root));

console.log(preorder(newTree.root));

console.log(postorder(newTree.root));

console.log(inorder(newTree.root));

insert(newTree.root, 300);
insert(newTree.root, 371);
insert(newTree.root, 491);
insert(newTree.root, 914);
insert(newTree.root, 1111);
insert(newTree.root, 749);
insert(newTree.root, 1514);

console.log(isBalanced(newTree.root));

newTree = rebalance(newTree.root);

prettyPrint(newTree.root);

console.log(isBalanced(newTree.root));

console.log(preorder(newTree.root));

console.log(postorder(newTree.root));

console.log(inorder(newTree.root));
