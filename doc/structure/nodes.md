# Nodes <!-- {docsify-ignore-all} -->
Because of Java's restrictions of not supporting multiple inheritence, the library uses interfaces to implements the different types of nodes.  
In this section, we will see how the nodes are implemented and how the architecture works.

## Interfaces
There are basically four types of nodes implemented :  

	- NodeInteface : The most essential type of node, only contains elementary functions. Every type of Node is implementing this interface ;
	- StateNodeInterface : A node capable of holding a NodeState ;
	- CostNodeInterface : A node capable of having a cost on its arcs ;
	- PropertyNodeInterface : A node capable of having a property.

```plantuml
@startuml

interface Freeable
interface NodeInterface
interface CostNodeInterface
interface StateNodeInterface
interface PropertyNodeInterface

NodeInterface --> Freeable
CostNodeInterface --> NodeInterface
StateNodeInterface --> NodeInterface
PropertyNodeInterface --> NodeInterface

@enduml
```

## Architecture of the Multi-Valued nodes

```plantuml
@startuml

interface Freeable
interface NodeInterface
interface CostNodeInterface
interface StateNodeInterface
interface PropertyNodeInterface

abstract AbstractNode
class Node
class CostNode
class SNode
class PNode


NodeInterface --> Freeable
CostNodeInterface --> NodeInterface
StateNodeInterface --> NodeInterface
PropertyNodeInterface --> NodeInterface

AbstractNode ..> NodeInterface
Node --> AbstractNode
CostNode --> Node
CostNode ..> CostNodeInterface
SNode --> Node
SNode ..> StateNodeInterface
PNode --> Node
PNode ..> PropertyNodeInterface

@enduml
```