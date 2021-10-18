const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor(){
    this.myRoot = null;
  }

  root() {
    return this.myRoot;
  }

  add(data) {
    const node = new Node(data);
    
    if(this.myRoot === null){
      return this.myRoot = node;
    }

    let current = this.myRoot;

    while(current){
      if(node.data < current.data){
        if(current.left === null){
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if(current.right === null){
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.myRoot;

    while(current){
      if(current === null){
        return false;
      }

      if(current.data === data){
        return true;
      }

      if(current.data > data){
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this.myRoot;

    while(current){
      if(current === null){
        return null;
      }

      if(current.data === data){
        return current;
      }

      if(current.data > data){
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    this.myRoot = removeNode(this.myRoot, data);

    function removeNode(root, data){
      if(root === null){
        return null;
      }
      if(data < root.data){
        root.left = removeNode(root.left, data);
        return root;
      } else if (root.data < data){
        root.right = removeNode(root.right, data);
        return root;
      } else { 
        //если значения равны
        //нету левого и правого потомка
        if(root.left === null && root.right === null){
          //вернуть ноль, лист удален
          return null; 
        }
        if(root.left === null){
          //заместить текущий узел его правым потомком
          root = root.right;
          return root;
        }
        if(root.right === null){
          //заместить текущий узел его левым потомком
          root = root.left;
          return root;
        }

        let minFromRight = root.right;
        //если есть и правый и левый потомки, ищем среди правого поддерева
        while (minFromRight.left){
          minFromRight = minFromRight.left;
        }
        root.data = minFromRight.data;
        root.right = removeNode(root.right, minFromRight.data);
        return root;
      }
    }
  }

  min() {
    let current = this.myRoot;

    while(current.left !== null){
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.myRoot;

    while(current.right !== null){
      current = current.right;
    }
    return current.data;
  }
}