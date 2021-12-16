# Operations between MDDs

## Basic operations
Basic operations are operations that can be computed following a general scheme. Let a be an arc of the MDD A and b be the corresponding arc in the MDD B : the following array gives whether (T) or not (F) the arc resulting from operation between a and b must be created in the new MDD.

|          |   ¬a ∧ ¬b    |    ¬a ∧ b    |    a ∧ ¬b    |     a ∧ b    |
| :------: | :----------: | :----------: | :----------: | :----------: |
| **Layer**| [1..r-1] - r | [1..r-1] - r | [1..r-1] - r | [1..r-1] - r |
| A ⋂ B    |    F - F    |    F - F     |     F - F    |    T - T     |
| A ⋃ B    |    F - F    |    T - T     |     T - T    |    T - T     |
| A - B    |    F - F    |    F - F     |     T - T    |    T - F     |
| A ∆ B    |    F - F    |    T - T     |     T - T    |    T - F     |

You can perform these operations by calling the respectives functions :  

```java
Operation.intersection(MDD A, MDD B);
Operation.union(MDD A, MDD B);
Operation.minus(MDD A, MDD B);
Operation.diamond(MDD A, MDD B);
```

You can also specify for each of these function the MDD in which the result will be stocked. This might come handy if you want the result to be a certain type of MDD. By default, the MDD result is created as the same type as MDD A.  
   
```java
Operation.intersection(MDD result, MDD A, MDD B);
```

## Inclusion
The inclusion operation is the only operation to return a boolean and not a MDD, as it checks if the second MDD is included in the first one. To be included means here that each solution that is in the second MDD also is in the first MDD.  
You can perform this operation in two ways : 
* With the method `Operation.inclusion(MDD mdd1, MDD mdd2)` that will check if `mdd2` is included in `mdd1`
* With the method `Operation.inclusion(Node node1, Node node2, int size, SetOf<Integer> V)` that will check if the MDD rooted in `node2` is included in the MDD rooted in `node1`, for a size of `size` and all values in `V`.

> **Note** :  
> The first method `Operation.inclusion(MDD mdd1, MDD mdd2)` perform a call to the second method for every node in the first ith layers, `i = mdd1.size() - mdd2.size()`

If `mdd2.size() > mdd1.size()`, or if `V` is empty, there is no inclusion.

## Concatenation
Computing the concatenation of two MDDs means to replace the second mdd's root to the first mdd's tt. This is a pretty simple operation.  
This operation is implemented using the `copy` operator, described [here](https://github.com/JungVictor/MDDLib/wiki/Operations#copy). It simply completely copies the first MDD, then associates the last node of the copied MDD to the root of the second mdd, then copy the second mdd from there.  

!> **Note** :  
> This function returns a **NEW** MDD that is the concatenation, it does not directly contatenate the second mdd to the first !  
> As a consequence, you can concatenate multiple times the exact same MDD.

This is a n-ary operation, so you can either call it as `Operation.concatenate(MDD mdd1, MDD mdd2)` or `Operation.concatenate(ArrayOf<MDD> mdds)` if you need to concatenate more than two mdds.
