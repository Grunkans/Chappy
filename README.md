# Chappy - API Dokumentation

**Chappy** är en applikation där du kan chatta och surra med dina vänner! Nedan finns dokumentation för API:ets endpoints.

###  Installation & Start
#### 1️ Installera beroenden:
```sh
npm install
```
#### 2️ Bygg backend:
```sh
npm run build-backend
```
#### 3️ Starta backend:
```sh
npm run start-backend
```


---

###  **Autentisering & Användare**
####  **Hämta alla användare**
```http
GET /api/users
```
| Parameter | Typ  | Beskrivning |
|-----------|------|------------|
| x | x | Hämtar alla användare i systemet |

| Status | Beskrivning |
|--------|------------|
| 200    | Lyckad begäran (returnerar en array av användare) |
| 404    | Inga användare hittades |
| 500    | Serverfel |

---

####  **Hämta en enskild användare**
```http
GET /api/users/:id
```
| Parameter | Typ | Beskrivning |
|-----------|----|------------|
| `id` | String | Användarens unika ID |

| Status | Beskrivning |
|--------|------------|
| 200    | Lyckad begäran (returnerar användaren) |
| 404    | Användaren hittades inte |
| 500    | Serverfel |

---

####  **Logga in**
```http
POST /api/users/login
```
| Body-parametrar | Typ  | Beskrivning |
|-----------|------|------------|
| `name`    | String | Användarnamn |
| `password` | String | Lösenord |

| Status | Beskrivning |
|--------|------------|
| 200    | Lyckad inloggning (returnerar användarinformation) |
| 401    | Fel användarnamn eller lösenord |
| 500    | Serverfel |

---

###  **Meddelanden (Chat Messages)**
####  **Hämta alla meddelanden (från ett specifikt chattrum)**
```http
GET /api/messages?chatroomId={chatroomId}
```
| Parameter | Typ | Beskrivning |
|-----------|----|------------|
| `chatroomId` | String | Chattrummets ID |

| Status | Beskrivning |
|--------|------------|
| 200    | Returnerar en array av meddelanden |
| 404    | Inga meddelanden hittades |
| 500    | Serverfel |

---

####  **Skicka ett meddelande**
```http
POST /api/messages
```
| Body-parametrar | Typ | Beskrivning |
|-----------|----|------------|
| `messageContent` | String | Meddelandets innehåll |
| `userId` | String | Avsändarens ID |
| `chatroomId` | String | ID för chattrummet |

| Status | Beskrivning |
|--------|------------|
| 201    | Meddelandet sparades |
| 400    | Saknade fält |
| 500    | Serverfel |

---

###  **Direktmeddelanden (DMs)**
####  **Hämta DM-konversation mellan två användare**
```http
GET /api/dms?user1={user1}&user2={user2}
```
| Parameter | Typ | Beskrivning |
|-----------|----|------------|
| `user1` | String | ID för första användaren |
| `user2` | String | ID för andra användaren |

| Status | Beskrivning |
|--------|------------|
| 200    | Returnerar en array av direktmeddelanden |
| 400    | Saknade användar-ID:n |
| 500    | Serverfel |

---

####  **Skicka ett direktmeddelande**
```http
POST /api/dms
```
| Body-parametrar | Typ | Beskrivning |
|-----------|----|------------|
| `messageContent` | String | Meddelandets innehåll |
| `senderId` | String | Avsändarens ID |
| `receiverId` | String | Mottagarens ID |

| Status | Beskrivning |
|--------|------------|
| 201    | DM sparat |
| 400    | Saknade fält |
| 500    | Serverfel |

---

###  **Chattrum**
####  **Hämta alla chattrum**
```http
GET /api/chatrooms
```
| Parameter | Typ  | Beskrivning |
|-----------|------|------------|
| x | x | Hämtar alla chattrum |

| Status | Beskrivning |
|--------|------------|
| 200    | Lyckad begäran (returnerar en array av chattrum) |
| 404    | Inga chattrum hittades |
| 500    | Serverfel |

---

####  **Hämta ett enskilt chattrum**
```http
GET /api/chatrooms/:id
```
| Parameter | Typ  | Beskrivning |
|-----------|------|------------|
| `id` | String | Chattrummets ID |

| Status | Beskrivning |
|--------|------------|
| 200    | Returnerar chattrummets data |
| 400    | Ogiltigt ID |
| 404    | Chattrum hittades inte |
| 500    | Serverfel |

---





