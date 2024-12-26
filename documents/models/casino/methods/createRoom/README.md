# Method: `createRoom`

> **Description**: Creates a new poker room within the Casino and adds it to the list of rooms. This method allows dynamic expansion of poker rooms as required, facilitating flexible game setup and management.

---

## 🗂️ Table of Contents

- [Method: `createRoom`](#method-createroom)
  - [🗂️ Table of Contents](#️-table-of-contents)
  - [Description](#description)
    - [Implements](#implements)
    - [Overrides](#overrides)
    - [Purpose](#purpose)
    - [Events](#events)
    - [Requirements](#requirements)
  - [Casino - The Class This Method Belongs To](#casino---the-class-this-method-belongs-to)
  - [Parameters](#parameters)
  - [Returns](#returns)
  - [Throws](#throws)
  - [Usage](#usage)
  - [Examples](#examples)
    - [Basic Example](#basic-example)

---

## Description

### Implements
Implements the `createRoom` method of `CasinoInterface`.

### Overrides
`N/A`

### Purpose
Enables the creation and addition of a new `PokerRoom` to the Casino’s list of rooms, expanding the Casino’s game offerings dynamically.

### Events
- **`casino:roomCreated`**: Emitted when a room is successfully added. Useful for logging or user notifications.

### Requirements
- The configuration object must include:
  - Valid values for `name`, `tableSize`, `smallBlind`, and `bigBlind`.
- Room names must be unique within the Casino.

---

## Casino - The Class This Method Belongs To

This method is part of the `Casino` class, which manages poker rooms and facilitates various poker-related operations.

---

## Parameters

| Parameter Name | Type              | Default Value | Description                                                                         |
|----------------|-------------------|---------------|-------------------------------------------------------------------------------------|
| `config`       | `PokerRoomConfig` | `undefined`   | A configuration object with properties like the room name, table size, small blind, and big blind values.|

---

## Returns

| Type                  | Description                                |
|-----------------------|--------------------------------------------|
| `PokerRoomInterface`  | The newly created poker room instance.     |

---

## Throws

| Error Type    | Description                                |
|---------------|--------------------------------------------|
| `Error`       | If the `config` is invalid or a room with the same name already exists.|

---

## Usage

The `createRoom` method allows dynamic creation of poker rooms based on a configuration object. Once created, it adds the room to the Casino’s list and emits a `casino:roomCreated` event.

---

## Examples

### Basic Example

```typescript
const casino = new Casino();
const room = casino.createRoom({ 
  name: "HighRollers", 
  tableSize: 6, 
  smallBlind: 10, 
  bigBlind: 20 
});
console.log(room);
console.log(casino.getRooms()); // Logs the newly created room within the array of rooms
