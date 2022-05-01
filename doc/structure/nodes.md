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
skinparam monochrome true
skinparam ranksep 20
skinparam dpi 150
skinparam arrowThickness 0.7
skinparam packageTitleAlignment left
skinparam usecaseBorderThickness 0.4
skinparam defaultFontSize 12
skinparam rectangleBorderThickness 1


rectangle "<b>Freeable</b>" as freeable
rectangle "<b>CostNodeInterface</b>" as cost_node
rectangle "<b>StateNodeInterface</b>" as state_node
rectangle "<b>PropertyNodeInterface</b>" as property_node
rectangle "<b>NodeInterface</b>" as node

node --> freeable
cost_node --> node
state_node --> node
property_node --> node

@enduml
```

## Architecture of the Multi-Valued nodes

```plantuml
@startuml
skinparam monochrome true
skinparam ranksep 20
skinparam dpi 150
skinparam arrowThickness 0.7
skinparam packageTitleAlignment left
skinparam usecaseBorderThickness 0.4
skinparam defaultFontSize 12
skinparam rectangleBorderThickness 1

rectangle "<b>Freeable</b>" as freeable
rectangle "<b>CostNodeInterface</b>" as cost_node_
rectangle "<b>StateNodeInterface</b>" as state_node_
rectangle "<b>PropertyNodeInterface</b>" as property_node_
rectangle "<b>NodeInterface</b>" as node_
rectangle "<b>AbstractNode</b>" as abstract_node
rectangle "<b>Node</b>" as node
rectangle "<b>CostNode</b>" as cost_node
rectangle "<b>SNode</b>" as snode
rectangle "<b>PNode</b>" as pnode

node_ --> freeable
cost_node_ --> node_
state_node_ --> node_
property_node_ --> node_
abstract_node ..> node_
node --> abstract_node
cost_node --> node
cost_node ..> cost_node_
snode --> node
snode ..> state_node_
pnode --> node
pnode ..> property_node_

@enduml
```