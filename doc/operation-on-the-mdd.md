# Operation on the MDD <!-- {docsify-ignore-all} -->

## Reduction
The reduction operation is one of the most important in a MDD. It merges with a bottom-up approach all equivalent nodes, meaning nodes having the same children. The reduction operation offers a potentially exponential gain in terms of space. All deleted nodes are automatically freed from the memory.  
In order to reduce the MDD, simply call `mdd.reduce()` function.  
Additionally, this operation create a reference to the true terminal node `tt` to the MDD ; otherwise, calling `mdd.getTt()` will return a `null` pointer.

## Copy
The copy operator is very basic ; it produces a copy of the specified MDD. You can use it in many different ways :
* `mdd.copy()` returns a proper copy of the MDD : same type of MDD, same type of Node.
* `mdd.copy(MDD copyMDD)` creates a copy of `mdd` in `copyMDD`, with `copyMDD`'s Node. 
* `mdd.copy(MDD copyMDD, Node copyRoot, int offset)` creates a copy of `mdd` from the Node `copyRoot` with specified `offset`, that is to say the layer in wich is `copyRoot`.
* `mdd.copy(MDD copyMDD, int offset, int start, int stop)` creates a copy of `mdd` from layer `start` to layer `stop`, from the layer `offset` of `copyMDD`. In order to use this function, you must first manually do the associations of nodes. This is some kind of _low level_ function that is used in very specific cases, that you won't likely need.

## Replace arcs' values
The `replace` function allows you to change the values of all arcs according to a given mapping. For instance, you want to replace all arcs with value `0` by `[1, 2]` : all you have to do is make a mapping `0 -> {1, 2}` and give it as an input.
```java
MapOf<Integer, SetOf<Integer>> mapping = Memory.MapOfIntegerSetOfInteger(); // Allocate the MapOf
mapping.put(0, Memory.SetOfInteger()); // Allocate the SetOf
mapping.get(0).add(1); mapping.get(0).add(2); // Doing the mapping
mdd.replace(mapping);
```

This function is mainly useful when you compute the MDD of a relaxed problem, and you want to use this MDD in order to compute a _more accurate_ MDD representing the problem's solutions. You can remap the set of relaxed values to the (bigger) set of not-relaxed values and use it as a _mold_ to faster compute a solution.

> **Note** :  
> This function is also available directly in the Node class. The MDD's function actually calls it for every node.
