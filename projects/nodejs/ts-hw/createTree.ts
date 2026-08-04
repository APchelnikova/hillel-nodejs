type TreeNode = {
    value: number;
    child: TreeNode | null;
};

function createTree(maxDepth: number, currentDepth: number = 1): TreeNode {
    if (currentDepth > maxDepth) return null;

    return {
        value: currentDepth,
        child: createTree(maxDepth, currentDepth + 1)
    };
}

console.log(createTree(3));