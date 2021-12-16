# Basic usage
This page will cover everything you have to know to get started with the creation of a MDD.

## Creating a MDD
To create a MDD, you have different options available : 
* From scratch, call the static function from MDD to allocate a new MDD : `MDD.create()`
* From an already existing MDD : `mdd.MDD()`

The second option will ensure that the MDD you create is the same type as the one you are using to create it. It is recommended that you use this function over the call over the allocator from MDD whenever it is possible.
Alternatively, you can call the constructor with the `new` method, but then you'll be unable to free the MDD, so I strongly recommend you don't.  
After creating the MDD, you want to specify its size, which means the number of layer it will contains. To do so, call the function `mdd.setSize(int size)`. This is really important as it allocate and add layers to the MDD.

> **Note** :  
> You can also specify which node you want as a root when creating a MDD by passing it as an argument. Example : `MDD.create(Node myRoot)`.

> **See also** : [Memory Management](https://github.com/JungVictor/MDDLib/wiki/Memory-Management)


## Adding and removing a Node

### Adding a node
In order to add a Node to the MDD, you first have to create one. As for the MDD, you have two _main_ options to do so : 
* From scratch, call the static function from Node to allocate a new Node : `Node.create()`
* From the MDD : `mdd.Node()`

Same as before, calling the `mdd.Node()` function will ensure better compatibility, as it will create a Node the same type as the nodes held by the MDD. This will make your code robust to the addition of new types of MDDs/nodes.

After creating the node, you have two options to add it to the MDD : 
* Call the method `mdd.addNode(Node myNode, int layer)`
* Call the method `mdd.addArcAndNode(Node source, int arcValue, Node myNode, int layer)`

The first method will simply add the node `myNode` to the specified layer's level, while the second method will also add an arc from the node `source` to the node `myNode` with value `arcValue`.

### Removing a node
To remove a node, you have to remove all references of it (remove it from its parents' children list, and from its children's parents list) and removing it from its layer. While you can manually do it calling the methods from the Node and Layer classes, you can simply achieve it by calling the MDD method `mdd.removeNode(Node myNode, int layer)`. This method will also free the removed node.


> **See also** : [Nodes](https://github.com/JungVictor/MDDLib/wiki/Structure-and-elements#nodes), [Layers](https://github.com/JungVictor/MDDLib/wiki/Structure-and-elements#layers)


## Adding and removing an arc

### Adding an arc
To add an arc to the MDD, you can use two options : 
* Call the method `mdd.addArc(Node source, int arcValue, Node destination)`
* Call the method `mdd.addArcAndNode(Node source, int arcValue, Node destination, int layer)`

I already talked about the second method in the previous section about adding a node the the MDD. The first option is always better than the second one in term of complexity, because the second perform an additional operation to check whether the node is already existing in the MDD or not. If you don't know if the destination node is in the MDD, prefer the second option.

### Removing an arc
To remove an arc, you have to remove its references from both the parent (source) and the child (destination). As for the node's case, you can do it manually by call methods from the Node class, but you may prefer to simply call the `mdd.removeArc(Node source, int arcValue)`.

## Reducing the MDD
The final step is to reduce the MDD, in order to compress it and remove useless nodes and arcs. To do so, simply call the function `mdd.reduce()`. This will create the terminal node `tt`.

> **See also** : [Reduction](https://github.com/JungVictor/MDDLib/wiki/Operations#reduction)

## Example
This is an example that compute the _universal mdd_ of size 10 over the domain V = {0, 1, 2, 3}.
```java
// Allocating the MDD and setting its size
MDD mdd = MDD.create();
mdd.setSize(10);

// Defining the domain of the MDD.
int[] V = {0, 1, 2, 3};

// Adding nodes to the MDD
Node current = mdd.getRoot();
Node next;
for(int i = 1; i < mdd.size(); i++){
    next = mdd.Node();     // allocating a new Node
    mdd.addNode(next, i);  // adding it to the ith layer
    // Add an arc for each value in the domain, add an arc between two nodes current and next
    for(int v : V) mdd.addArc(current, v, next, i-1);
    current = next;
}

mdd.reduce(); // Reduce the MDD and add to the MDD the reference to the tt node
```
