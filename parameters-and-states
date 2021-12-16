# Parameters & States

States are used to represent a constraint current state at a given node. This structure is composed of mainly three functions :  
* The transition (creation) function `createState` : Given a state and a label, it outputs the next state obtained when taking the arc with the given label.   
* The validity check function `isValid` : Given a state and a label, it outputs true if the next state is valid according to the constraint, and false otherwise.  
* The hash function `hash` : it is a representation of the state. This is mainly used to decide whether or not two states can be merged (they can be merged if the hash is the same).  

This allows us to create an MDD on-the-fly by only defining these three functions.


## Among & Sequence

### Parameters
```java
Memory.ParametersAmong(int q, int min, int max, SetOf<Integer> V)
```
?> **See also** : [Among Constraint](https://github.com/JungVictor/MDDLib/wiki/MDDBuilder#among)

### State
```java
Memory.StateAmong(ParametersAmong constraint)
```
This will create an object that represent a state of an Among constraint, and will propagate according to the given parameters.

!> When creating states by propagation, the same Parameters object is passed as reference. Therefore, you do not want to free this reference when freeing the State. You should keep a reference to the Parameters and free it once the propagation is over.

## Sum

### Parameters
```java
Memory.ParametersSum(int min, int max, int vMin, int vMax)
```
`vMin` and `vMax` are respectively the minimum and maximum value that a variable can take.  
**This will likely change in the future in order to take into account the different domains of the variables.**  

?> **See also** : [Sum Constraint](https://github.com/JungVictor/MDDLib/wiki/MDDBuilder#sum)

### State
```java
Memory.StateSum(ParametersSum constraint)
```
This will create an object that represent a state of a Sum constraint, and will propagate according to the given parameters.

## GCC

### Parameters
```java
Memory.ParametersGCC(MapOf<Integer, TupleOfInt> gcc)
```
?> **See also** : [GCC Constraint](https://github.com/JungVictor/MDDLib/wiki/MDDBuilder#gcc)

### State
```java
Memory.StateGCC(ParametersGCC constraint)
```
This will create an object that represent a state of a GCC constraint, and will propagate according to the given parameters.

## AllDifferent

### Parameters
```java
Memory.ParametersAllDiff(SetOf<Integer> V)
```
?> **See also** : [AllDiff Constraint](https://github.com/JungVictor/MDDLib/wiki/MDDBuilder#alldiff)

### State
```java
Memory.StateAllDiff(ParametersSum constraint)
```
This will create an object that represent a state of an AllDifferent constraint, and will propagate according to the given parameters.
