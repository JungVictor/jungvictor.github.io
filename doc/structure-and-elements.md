# Structure & Elements <!-- {docsify-ignore-all} -->
This page will details the structure of the MDD, the specificities and functionalities of each elements of the MDD.

## Layers
The Layer is the structure used to stock and manage nodes. As a layer is implemented using a Set, there is no notion of order. However, the notion of order in a layer is not important.    
Available actions : 
* `add(Node node)` to add a node to the layer ;
* `remove(Node node)` to remove a node from the layer ; 
* `removeAndFree(Node node)` to remove a node from the layer and free the node ;
* `size()` to get the size of the layer, i.e the number of nodes in it ;
* `contains(Node node)` to check if the node is present in the layer ;
* `getNodes()` to get the set of nodes that are in the layer.

The Layer implements the `Allocable` interface, meaning that you can `free` it.
To create a Layer, call the function `Layer.create()`.

> [[**View in code**]](https://github.com/JungVictor/MDDLib/blob/main/core/src/main/java/dd/mdd/components/Layer.java)

## Nodes
The Node might be the most important structure in the MDD. It contains all information about its parents and its children. Furthermore, you can associate other node to a given node, which is notably useful during operations such as intersection or union.  

### Getters
* `getChild(int label)` to get the child corresponding to the given label (null if there is none) ;
* `getChildByIndex(int index)` to get the child corresponding to the given index. Children are ordered by their label ;
* `getValue(int index)` to get the value of the label corresponding to the given index ;
* `getValues()` to get all values of the children's labels ;
* `containsLabel(int label)` to check if the node has a child corresponding to the given label ;
* `getAssociations()` to get all nodes associated to this node ;
* `getX1(), getX2(), getX(int i)` to get the first, second or ith node associated to this node ;
* `getChildren(), getParents()` to get all children or parents of the node.

### Arcs Management
* `addChild(int label, Node child)` to add the `child` node as a child with the given `label` ;
* `removeChild(int label)` to remove the child corresponding to the given `label` ;
* `addParent(int label, Node parent)` to add the `parent` node as a parent with the given `label` ;
* `removeParent(int label, Node parent)` to remove the given `parent` node with the given `label` ;
* `replaceReferencesBy(Node node)` to replace **ALL** references of the current node by the given `node` ;
  * `replaceParentsReferencesBy(Node node)` to replace the parents' references
  * `replaceChildrenReferencesBy(Node node)` to replace the children's references
* `replace(MapOf<Integer, SetOf<Integer>> values)` to replace all arcs values according to the given map. More details here : [Replace arcs' values](operation-on-the-mdd?id=replace-arcs-values).

### Node Management
* `remove()` to remove all references of the node ;
* `clear()` to clear all information of the node ;
* `clearAssociations()` to clear all associations of the node.

> [[**View in code**]](https://github.com/JungVictor/MDDLib/blob/main/core/src/main/java/dd/mdd/components/Node.java)

## Arcs
There are two types of arcs : `InArcs` (corresponding to the parents nodes) and `OutArcs` (corresponding to the children nodes).  

### InArcs : the parents
The in-going arcs (InArcs) is represented using a Map, binding the labels of the arcs to the parents node. As a node can have multiple parents having the same label, the map is actually binding an integer to a set of nodes.  
Operations :  
* `add(int label, Node node)` to add a node with the given arc's label ;
* `remove(int label, Node node)` to remove a node from the set of node corresponding to the given arc's label ;
* `get(int label)` to get the set of nodes having an in-going arc with the given label ; 
* `size()` to get the number of in-going values (**NOT** the number of in-going arcs !)
* `clear()` to clear the map.

To create an InArcs, simply call the `create` method in the `InArcs` class : `InArcs.create()`.

> [[**View in code**]](https://github.com/JungVictor/MDDLib/blob/main/core/src/main/java/dd/mdd/components/InArcs.java)

### OutArcs : the children
The out-going arcs (OutArcs) is represented using a simple map binding integer to node, as the MDD is determinist by default (i.e. can only have one children with a specific label).  
When added, the nodes are sorted (increasing order) according to the value of their label.  
Operations :  
* `add(int label, Node node)` to add a node with the given arc's label ;
* `remove(int label)` to remove the node corresponding to the given label ;
* `contains(int label)` to check if there is a child with the given label ;
* `get(int label)` to get the node corresponding to the given label ;
* `getByIndex(int index)` to get the node corresponding to the given index (sorted by value) ;
* `getValue(int index)` to get the arc's value corresponding to the given index ;
* `getValues()` to get all children's values ;
* `size()` to get the number of children ;
* `clear()` to clear all information.

> [[**View in code**]](https://github.com/JungVictor/MDDLib/blob/main/core/src/main/java/dd/mdd/components/OutArcs.java)

To create an OutArcs , simply call the `create` method in the `OutArcs` class : `OutArcs.create()`.
