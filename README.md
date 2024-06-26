# Fullstack Assignment: Brainop (Please read this before starting)

NOTE: Actually, you cannot test the website since the database is local. However, I am inserting a demo video link so that you can observe all the functionalities.
Video link: https://www.loom.com/share/48af78fc92c94219b21fc2de94a69af9?sid=067ec68f-b84d-43ce-990f-80933b18487e 

*)Project Overview
- The application utilizes a modular architecture with separate client and server folders.

*)Installation
- Navigate to the client folder and execute "npm install" to install project dependencies.
- Repeat step 1 in the server folder.
  
*)Running the Application
- Start the development server in both folders by running "npm run dev".

*)Features
- Database: Leverages PostgreSQL as the primary database with Prisma ORM for efficient data interaction.
- Client-Side Validation: Utilizes libraries like ZOD and React Hook Forms to enforce data integrity and improve user experience.
- React Query: Used React Query to implement infinite scrolling of posts and for fetching the user data.
- State Management: Used Zustand for managing the global states 
- Dynamic Rendering: Employs conditional rendering to display content based on user interaction , application state and user authentication.
- User Management: Enables retrieving, updating, and resetting user data (e.g., password reset).
- Type Safety: Enhances code reliability and maintainability through the use of TypeScript.
- User Experience: Custom toast notifications provide visual feedback to users for a more engaging experience.
- Authentication: Implements JSON Web Tokens (JWT) for secure user authentication.
- Middleware: Server-side middleware is incorporated for added functionality.
- Password Visibility: Added show/hide button to toggle the visibility of the password.
- Responsive Design: Ensures optimal user experience across various screen sizes.

*)Disclaimer
- While design is not my core strength , but I surely possesses the ability to replicate provided designs.
