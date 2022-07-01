# Nodes <!-- {docsify-ignore-all} -->
Because of Java's restrictions of not supporting multiple inheritence, the library uses interfaces to implements the different types of nodes.  
In this section, we will see how the nodes are implemented and how the architecture works.

## Interfaces
There are basically four types of nodes implemented :  

* **INode** : The most essential type of node, only contains elementary functions;
* **IStateNode** : A node capable of holding a NodeState;
* **ICostNode** : A node capable of having a cost on its arcs;
* **IPropertyNode** : A node capable of having a property.

```plantuml
@startuml

interface Freeable
interface INode
interface ICostNode
interface IStateNode
interface IPropertyNode

INode --> Freeable
ICostNode --> INode
IStateNode --> INode
IPropertyNode --> INode

@enduml
```

## Architecture of the Multi-Valued nodes

```plantuml
@startuml

interface Freeable
interface INode
interface ICostNode
interface IStateNode
interface IPropertyNode

abstract AbstractNode
class Node
class CostNode
class StateNode
class PropertyNode


INode --> Freeable
ICostNode --> INode
IStateNode --> INode
IPropertyNode --> INode

AbstractNode ..> INode
Node --> AbstractNode
CostNode --> Node
CostNode ..> ICostNode
StateNode --> Node
StateNode ..> IStateNode
PropertyNode --> Node
PropertyNode ..> IPropertyNode

@enduml
```

## Good practice

When dealing with nodes, the good practices is to always abstract as much as possible the type of the object you manipulate.  
For instance, if you manipulate a `CostNode`, it probably is better to manipulate the object as a `ICostNode` if the behaviour you're trying to implement corresponds to every kind of node implementing the `ICostNode`.  

!> In general, you never want to refer to the `AbstractNode` class, as it simply provides a common base code for all nodes implementing the `INode` interface. Therefore, it is better to directly refers to it as a `INode` node.

