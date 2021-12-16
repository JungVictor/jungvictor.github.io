# Memory Management : AllocatorOf

## AllocatorOf
The `AllocatorOf` is the structure that contains all objects in the pool of memory. It is implemented using an array to stock the objects, and a stack to stock the indices of free objects, i.e their position in the array.  
There are three methods that you can use to manipulate the `AllocatorOf` :  
* `E get()` to get a free element from the pool. If none is available, create a new one.
* `free(E element)` to put back the element in the array, and pushing its position back to the stack of free indices.

Because `AllocatorOf` is an **ABSTRACT CLASS**, you must extends it for every type `E` you want to manage.  
It is best that you implement it as an inner class of `E`.
```java
static final class Allocator extends AllocatorOf<E> {

    // You can specify the initial capacity. Default : 10.
    Allocator(int capacity) {
        super.init(capacity);
    }

    Allocator(){
        super.init();
    }

    @Override
    protected E[] arrayCreation(int capacity) {
        return new E[capacity];
    }

    @Override
    protected E createObject(int index) {
        return new E(index);
    }
}
```

> **IMPORTANT NOTE** :  
> `AllocatorOf` can only manage objects implementing the `Allocable` interface !!

> [[**View in code**]](https://github.com/JungVictor/MDDLib/blob/main/core/src/main/java/memory/AllocatorOf.java)  

## Allocable
`Allocable` is an interface that must be implemented if you want your object to be able to be reused. It simply consists of two methods :  
* `allocatedIndex()` that is used to get the index of the object in the pool.
* `free()` that push back the object to the `AllocatorOf`. You can clean most references when calling this method.

> [[**View in code**]](https://github.com/JungVictor/MDDLib/blob/main/core/src/main/java/memory/Allocable.java)  

### Implementation
When implementing this interface, you want your object to have *at least* the following shape :  
```java
// Allocable variables
// Thread safe allocator
private final static ThreadLocal<Allocator> localStorage = ThreadLocal.withInitial(Allocator::new);
// Index in Memory
private final int allocatedIndex;

// You can have multiples constructors with different arguments
// BUT you must ALWAYS have the allocatedIndex as an argument.
// You basically want to make private your constructor so that the user can't create an object
// by using the "new" keyword
private MyObject(int allocatedIndex){ this.allocatedIndex = allocatedIndex; }

// To get a "new" object, you will have to ask the allocator first. 
// Because we made the allocator Thread Safe, you must implement a function that will return the allocator.
private static Allocator allocator(){ return localStorage.get(); }

// This will be the "new constructor". You can have the parameters you want here. 
// You can declare multiple create functions with differents parameters, but they must all have the same shape :
public static E create(parameters... ){
    E e = allocator().allocate();
    // preparation of the object here
    return e;
}


//**************************************//
//           MEMORY FUNCTIONS           //
//**************************************//
// Implementation of Allocable interface

@Override
public int allocatedIndex(){ return allocatedIndex; }

@Override
public void free(){
    // clean all references and
    // free the variables you have to

    allocator().free(this); // Free the object
}
```


## Differences with `MemoryPool` (legacy memory)
The main difference is that you won't have to create multiple "MemoryPool" objects and stock them into a big static class (Factory).  
Furthermore, this new template is **Thread Safe** while maintaining similar performances. Because the Allocator is hidden inside the class, we can make our constructor private, which makes it _impossible_ for the user to bypass our design pattern.  
Finally, the fact that everything related to the creation of an object is located in the object's class is cleaner.

The drawback is that you can't create an allocator for a class with generic type (for instance, the MapOf<K, V>) without creating a subclass that is explicitly of type <K, V>.

The _Legacy_ design is still used for class using generic types, such as SetOf<E> and MapOf<K, V>.  
See : [Memory Management (Legacy)](memory-pool)
