# WTWR (What to Wear?) — Full Stack

This repository now contains a connected front-end (React + Vite) and back-end (Express + MongoDB) so you can run a full‑stack WTWR app locally. The front end communicates with the API for user auth, profile updates, and item operations (create, like/unlike, delete).

## Link to backend repo

- [View Backend Repo](https://github.com/MWATERS-DESIGN/se_project_express)

## Figma Design

- [Figma Design](https://www.figma.com/design/BlrieGhuUXMk3OUbi4bHGC/Sprint-14--WTWR?node-id=10-341&t=zTltFMsti4FTybpa-0)

## What was added / implemented

- User authentication: sign up, sign in, sign out using JWTs stored in localStorage.
  - Front-end logic: [`se_project_react1/src/utils/auth.js`](se_project_react1/src/utils/auth.js) and usage in [`se_project_react1/src/components/App/App.jsx`](se_project_react1/src/components/App/App.jsx).
  - Back-end endpoints: [`se_project_express/controllers/users.js`](se_project_express/controllers/users.js) mounted in [`se_project_express/app.js`](se_project_express/app.js).

- Current user context to share profile across UI:
  - [`CurrentUserContext`](se_project_react1/src/context/CurrentUserContext.js)

- Profile editing:
  - Front-end modal: [`se_project_react1/src/components/EditProfileModal/EditProfileModal.jsx`](se_project_react1/src/components/EditProfileModal/EditProfileModal.jsx)
  - Back-end update: [`se_project_express/controllers/users.js`](se_project_express/controllers/users.js) (PATCH /users/me)
  - Auth middleware protecting routes: [`se_project_express/middlewares/auth.js`](se_project_express/middlewares/auth.js)

- Clothing items and likes:
  - Front-end API helpers: [`se_project_react1/src/utils/api.js`](se_project_react1/src/utils/api.js)
  - Add item modal: [`se_project_react1/src/components/AddItemModal/AddItemModal.jsx`](se_project_react1/src/components/AddItemModal/AddItemModal.jsx)
  - Item card UI and like handling: [`se_project_react1/src/components/ItemCard/ItemCard.jsx`](se_project_react1/src/components/ItemCard/ItemCard.jsx)
  - Item preview and delete modal: [`se_project_react1/src/components/ItemModal/ItemModal.jsx`](se_project_react1/src/components/ItemModal/ItemModal.jsx)
  - Server controllers for items: [`se_project_express/controllers/clothingItems.js`](se_project_express/controllers/clothingItems.js) and routes [`se_project_express/routes/clothingItems.js`](se_project_express/routes/clothingItems.js)
  - Item model: [`se_project_express/models/clothingItem.js`](se_project_express/models/clothingItem.js)

- Weather integration remains in place:
  - Weather fetch + filter: [`se_project_react1/src/utils/weatherAPI.js`](se_project_react1/src/utils/weatherAPI.js)

## How it works (quick)

- Front end stores the JWT in localStorage under key `jwt` after successful sign in (`auth.signin`).
  - The token is used for protected API calls in [`se_project_react1/src/utils/api.js`](se_project_react1/src/utils/api.js) and [`se_project_react1/src/utils/auth.js`](se_project_react1/src/utils/auth.js).
- On app mount the token is checked with [`auth.checkToken`](se_project_react1/src/utils/auth.js) to populate [`CurrentUserContext`](se_project_react1/src/context/CurrentUserContext.js).
- Liking/unliking clothing items triggers PUT/DELETE to `/items/:itemId/likes` on the back end; the server updates `likes` and returns the updated item.

## Important files / entry points

- Front end entry: [se_project_react1/src/main.jsx](se_project_react1/src/main.jsx)
- Front app root: [se_project_react1/src/components/App/App.jsx](se_project_react1/src/components/App/App.jsx)
- Back end entry: [se_project_express/app.js](se_project_express/app.js)
- Back end auth middleware: [se_project_express/middlewares/auth.js](se_project_express/middlewares/auth.js)
- User model: [se_project_express/models/user.js](se_project_express/models/user.js)
- User controllers: [se_project_express/controllers/users.js](se_project_express/controllers/users.js)
- Clothing controllers: [se_project_express/controllers/clothingItems.js](se_project_express/controllers/clothingItems.js)
- Routes: [se_project_express/routes/users.js](se_project_express/routes/users.js), [se_project_express/routes/clothingItems.js](se_project_express/routes/clothingItems.js)

## Run the project locally

1. Start the back end
   - cd se_project_express
   - Install deps: npm ci
   - Ensure MongoDB is running (default: mongodb://127.0.0.1:27017/wtwr_db)
   - Start server: npm run dev (or npm start)
   - Server listens on PORT (default 3001) — see [se_project_express/utils/config.js](se_project_express/utils/config.js) for JWT secret handling.

2. Start the front end
   - cd se_project_react1
   - Install deps: npm ci
   - Start dev server: npm run dev (Vite will open on port 3000)

3. Use the UI:
   - Register via the Register modal: [`se_project_react1/src/components/RegisterModal/RegisterModal.jsx`](se_project_react1/src/components/RegisterModal/RegisterModal.jsx)
   - Login via the Login modal: [`se_project_react1/src/components/LoginModal/LoginModal.jsx`](se_project_react1/src/components/LoginModal/LoginModal.jsx)
   - Edit profile via Edit Profile modal: [`se_project_react1/src/components/EditProfileModal/EditProfileModal.jsx`](se_project_react1/src/components/EditProfileModal/EditProfileModal.jsx)
   - Add items via Add Item modal: [`se_project_react1/src/components/AddItemModal/AddItemModal.jsx`](se_project_react1/src/components/AddItemModal/AddItemModal.jsx)
   - View and like items via Item cards: [`se_project_react1/src/components/ItemCard/ItemCard.jsx`](se_project_react1/src/components/ItemCard/ItemCard.jsx)

## Notes and environment

- Backend: set JWT_SECRET in production; otherwise uses "dev-secret" (see [se_project_express/utils/config.js](se_project_express/utils/config.js)).
- The client expects the API at http://localhost:3001 (see baseUrl in [`se_project_react1/src/utils/auth.js`](se_project_react1/src/utils/auth.js) and [`se_project_react1/src/utils/api.js`](se_project_react1/src/utils/api.js)).
- Token lifecycle: tokens expire in 7 days (created in [`se_project_express/controllers/users.js`](se_project_express/controllers/users.js)).

## Troubleshooting

- If the front end shows authentication errors, ensure:
  - Backend is running and listening on port 3001 ([se_project_express/app.js](se_project_express/app.js))
  - MongoDB is available at mongodb://127.0.0.1:27017/wtwr_db
  - Browser localStorage contains a `jwt` token after login
- Check server logs for errors in controllers: [se_project_express/controllers/users.js](se_project_express/controllers/users.js) and [se_project_express/controllers/clothingItems.js](se_project_express/controllers/clothingItems.js)

## License & credit

Developed by Marquis Waters
