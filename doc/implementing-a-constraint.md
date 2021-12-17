# Implementing a constraint

This section will detail how to implement a constraint.  

?> [States & Parameters](states-and-parameters)

## Parameters

!> It is not mandatory to create a class to describe the parameters of the constraint. However, it is considered good practice to do so, because the parameters of a constraint do not change. It is therefore better to only have one object that you will pass as parameter of your state.

The parameters contain all information about the constraint. The parameters will be shared by all states.  
For instance, the parameters of a [Sum Constraint](mddbuilder?id=sum) are the lower bound and upper bound of the sum.  

> It is recommended that you implement the `Allocable` interface, but it is not necessary as we may build few objects of type Parameters.


## State

The second step is to implement the state of the constraint.  
The state must extends the `NodeState` abstract class, that implements the `Allocable` interface. That is to say, you will have to implement an [Allocator](allocatorof).  

To correctly implement the state, you must at least implement the three functions : `createState`, `isValid` and `hash`.

- `createState` will be used to build to create a new State according to the current state and a transition
- `isValid` will be used to verify if a transition is valid. It will be called **before** the `createState` method in order to avoid creating a useless state.
- `hash` will be used to verify if there is an already existing node with the same state as the one we want to create. 

### Example
```java
public class MyState extends NodeState {
    // Thread safe allocator
    private final static ThreadLocal<Allocator> localStorage = ThreadLocal.withInitial(Allocator::new);

    // Parameters of the constraint
    private MyParameters constraint;


    //**************************************//
    //           INITIALISATION             //
    //**************************************//

    // Private constructor, to prevent the creation using the new keyword
    private MyState(int allocatedIndex) { super(allocatedIndex); }

    public void init(MyParameters constraint, ...) {
    	this.constraint = constraint;
    	// initialisation of the state
    }

    // The public constructor using the Allocable interface
    public static MyState create(MyParameters constraint, ...) {
    	MyState state = allocator().allocate();
    	state.init(constraint, ...);
    	return state;
    }

    private static Allocator allocator(){ return localStorage.get(); }
    

    //**************************************//
    //                STATE                 //
    //**************************************//

    // Transition function
    @Override
    public NodeState createState(int label, int layer, int size){
    	MyState state = MyState.create(constraint, ...);
    	// TODO : Transition function
    	// Return the state according to the transition by the value label
    	return state;
    }

    // Validity check
    @Override
    public boolean isValid(int label, int layer, int size){
    	// TODO : Validity check
    	// Return true if the transition is valid, false otherwise
    	return true;
    }

    // Hash function
    @Override
    public String hash(int label, int layer, int size){
    	// Return the hash of the state obtained by the transition with value label
    	return "";
    }


    //**************************************//
    //           MEMORY FUNCTIONS           //
    //**************************************//

    @Override
    public void free(){
        this.constraint = null;
        // Eventually free the variables used to describe the state, if possible
        allocator().free(this);
    }

    // Allocator
    static final class Allocator extends AllocatorOf<MyState> {

        Allocator(int capacity) {
            super.init(capacity);
        }

        Allocator(){
            super.init();
        }

        @Override
        protected MyState[] arrayCreation(int capacity) {
            return new MyState[capacity];
        }

        @Override
        protected MyState createObject(int index) {
            return new MyState(index);
        }
    }

}
```

## Building the MDD

You need to use the `build` method of the `ConstraintBuilder` class. This method will take as parameters :
- `MDD result` : the mdd that will stock the result of the construction
- `SNode constraint` : the node that will hold the base state of the constraint. It typically is the neutral state of the constraint.
- `Domains D` : the domains of the variables
- `int size` : the size of the MDD.

Here is a possible implementation of the builder :

```java
public static MDD myConstraint(MDD result, Domains D, int size, ...) {
	SNode snode = SNode.create();

	// some initialisation / pre-computation ... ?

	MyParameters parameters = MyParameters.create(...);
	MyState state = MyState.create(parameters, ...);

	// Set the state to the Node
	snode.setState(state);

	// Build the MDD according to the rules of MyState
	ConstraintBuilder.build(result, snode, D, size);

	// Do not forget to free the Allocable objects you created (except state and snode)
	Memory.free(parameters); // If MyParameters implements Allocable

	// Reduce the MDD obtained
	result.reduce();
	return result;
}
```

## On the fly intersection

The on the fly `intersection` method is almost identical to the `build` method.
You need to use the `intersection` method of the `ConstraintOperation` class. This method will take as parameters :
- `MDD result` : the mdd that will stock the result of the intersection.
- `MDD mdd` : the mdd on which we will perform the intersection.
- `SNode constraint` : the node that will hold the base state of the constraint. It typically is the neutral state of the constraint.

You do not need to specify a Domains or a size, because the function will automatically use the Domains and size of `mdd`.

Here is a possible implementation :

```java
public static MDD myConstraint(MDD result, MDD mdd, int size, ...) {
	SNode snode = SNode.create();

	// some initialisation / pre-computation ... ?

	MyParameters parameters = MyParameters.create(...);
	MyState state = MyState.create(parameters, ...);

	// Set the state to the Node
	snode.setState(state);

	// Build the MDD according to the rules of MyState
	ConstraintOperation.intersection(result, snode, size);	// <- ONLY LINE TO CHANGE

	// Do not forget to free the Allocable objects you created (except state and snode)
	Memory.free(parameters); // If MyParameters implements Allocable

	// Reduce the MDD obtained
	result.reduce();
	return result;
}
```