# Movie-Organizer

Movie-Organizer is a web application to help you catalog, manage, and view your movie collection. MVC architecture.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Configuration](#configuration)  


---

## Features

- Add, edit, delete movies  
- View list of all movies    
- Search movies 
- Responsive UI

---

## Tech Stack

- **Node.js** — JavaScript runtime  
- **Express.js** — Web framework  
- **EJS** — Templating engine  
- **CSS** — Styling  
- **MongoDB**

---

## Getting Started

### Prerequisites

- Node.js (v14.x or higher recommended)  
- npm (comes with Node.js)  
- Database server

### Installation  

1. Clone the repo:  

   ```bash
   git clone https://github.com/EriK013/Movie-Organizer.git
   cd Movie-Organizer
   
2. Install dependencies:
npm install

3. Set up the database (configure connection string and run migrations if needed).

4. Start the app:
npm start
Open in your browser at:

5. Open in your browser at:
http://localhost:3000

### Configuration
You need a api.env file with variables:

   ```bash
   OMDB_API_KEY={YOUR API KEY}
   MONGO_URI={YOUR MONGO_URI}

