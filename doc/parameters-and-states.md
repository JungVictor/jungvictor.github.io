# Parameters & States

States are used to represent a constraint current state at a given node. This structure is composed of mainly three functions :  
* The transition (creation) function `createState` : Given a state and a label, it outputs the next state obtained when taking the arc with the given label.   
* The validity check function `isValid` : Given a state and a label, it outputs true if the next state is valid according to the constraint, and false otherwise.  
* The hash function `hash` : it is a representation of the state. This is mainly used to decide whether or not two states can be merged (they can be merged if the hash is the same).  

This allows us to create an MDD on-the-fly by only defining these three functions.


## Among & Sequence

#### Parameters
```java
ParametersAmong.create(int q, int min, int max, SetOf<Integer> V);
```

#### State
```java
StateAmong.create(ParametersAmong constraint);
```
This will create an object that represent a state of an Among constraint, and will propagate according to the given parameters.

!> When creating states by propagation, the same Parameters object is passed as reference. Therefore, you do not want to free this reference when freeing the State. You should keep a reference to the Parameters and free it once the propagation is over.

?> **See also** : [Among Constraint](mddbuilder?id=among), [Sequence Constraint](mddbuilder?id=sequence)

## Sum

#### Parameters
```java
ParametersSum.create(int min, int max, int vMin, int vMax)
```
`vMin` and `vMax` are respectively the minimum and maximum value that a variable can take.  
**This will likely change in the future in order to take into account the different domains of the variables.**  

#### State
```java
StateSum.create(ParametersSum constraint)
```
This will create an object that represent a state of a Sum constraint, and will propagate according to the given parameters.

?> **See also** : [Sum Constraint](mddbuilder?id=sum)

## GCC

#### Parameters
```java
ParametersGCC.create(MapOf<Integer, TupleOfInt> gcc)
```

#### State
```java
StateGCC.create(ParametersGCC constraint)
```
This will create an object that represent a state of a GCC constraint, and will propagate according to the given parameters.

?> **See also** : [GCC Constraint](mddbuilder?id=gcc)

## AllDifferent

#### Parameters
```java
ParametersAllDiff.create(SetOf<Integer> V)
```

#### State
```java
StateAllDiff.create(ParametersSum constraint)
```
This will create an object that represent a state of an AllDifferent constraint, and will propagate according to the given parameters.

?> **See also** : [AllDiff Constraint](mddbuilder?id=alldiff)
