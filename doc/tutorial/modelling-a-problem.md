# Modelling a problem <!-- {docsify-ignore-all} -->

There are different ways to build a model using this library.  
First, you can use the different methods "from composition", building and intersecting MDDs.  
You can also use the abstraction provided by the library designed to simplify the process of modelling.

## Abstraction

The first thing you have to do is to create an object from the `Model` class. This is the most essential class in order to create a model.  
`Model model = new Model();`

### Defining variables

To define variables, simply call the method `variables(...)` from the class `Model`. It will create an array of object `Variable`. There are multiple ways to create `n` variables :  

- Without defining domains : `model.variables(int n)`  
- With the same domain for all variables : `model.variables(int n, int[] domain)`  
- With the same domain for all variables, defined over an interval with a given step : `model.variables(int n, int from, int to, int step)`  

You can then change the domain of a variable by calling the `setDomain(...)` method. This method is defined over the same parameters as the previous method presented.  


#### Examples

```java
Model model = new Model();

// Create 10 variables with domain [0, 10]
Variable[] X = model.variables(10, 0, 10, 1);

// Create 10 variables with domain {0, 2, 4, 6, 8, 10}
Variable[] X = model.variables(10, 0, 10, 2);

// Create 10 variables with domain {1, 3, 5, 7, 11}
int[] domain = new int[]{1, 3, 5, 7, 11};
Variable[] X = model.variables(10, domain);

// Change the domain of the first variable to [0, 1]
X[0].setDomain(0, 1);
```

### Defining constraints

To define constraints, you have to create a `Constraint` object per constraint.  
You can use the different static methods from the `Constraint` class to create pre-defined constraint provided by the library.  
The various constraint provided are : `sum`, `sequence`, `among`, `allDifferent`, `gcc`, [[`expression`]](./arithmetic-model)  

To create a constraint using these methods, you have to pass the model as an argument ; this will allow to perform dedicated behaviour for each constraint in order to optimise the computation.  

You can also choose to specify the scope of the constraint : in case you don't, the model will consider that all variables are in the scope.  

#### Example

```java
// The sum of all variables of the model must be between 5 and 10.
Constraint c1 = Constraint.sum(model, 5, 10);

// Variables 0, 1, 2 and 3 must be all different
Constraint c2 = Constraint.allDifferent(model, X[0], X[1], X[2], X[3]);

// The difference between variable 5 and 6 must be greater than 2
Constraint c3 = Constraint.expression(model, "|{5} - {6}| > 2");
```


### Combining constraints

The final step of the modelling process is to instruct how to combine the different constraints defined.  
In order to do so, you can perform different type of operation between constraints : `union`, `intersection`, `minus`, `diamond`. All operations are described [[here]](./operation-between-mdds).  

An interesting feature is that the result from a combination of constraint is also a constraint, that can be used later in the model.  

The operations `union` and `intersection` allow multiple constraint at the same time without ambiguity. The `diamond` and `minus` operations treat constraints in the same order as they are given.   

#### Example

```java
Constraint c4 = model.intersection(c1, c2);
Constraint c5 = model.union(c4, c3);
```

### Computing the result

During the execution of the program, all instructions are postponed until the call to the method `execute()`. The result of this method is an MDD containing the solutions of the model.

```java
Model model = new Model();

// Create 10 variables with domain [0, 10]
Variable[] X = model.variables(10, 0, 10, 1);

// Change the domain of the first variable to [0, 1]
X[0].setDomain(0, 1);


// The sum of all variables of the model must be between 5 and 10.
Constraint c1 = Constraint.sum(model, 5, 10);

// Variables 0, 1, 2 and 3 must be all different
Constraint c2 = Constraint.allDifferent(model, X[0], X[1], X[2], X[3]);

// The difference between variable 5 and 6 must be greater than 2
Constraint c3 = Constraint.expression(model, "|{5} - {6}| > 2");

// Operations
Constraint c4 = model.intersection(c1, c2);
Constraint c5 = model.union(c4, c3);

MDD result = model.execute();
```