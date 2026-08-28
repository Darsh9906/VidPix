# VidPix 📸🎥

> A modern media discovery platform for searching and exploring photos, videos, and GIFs from multiple media APIs.

VidPix is a React-based media discovery application built while learning and applying modern React development concepts. The project brings different media sources together into a single, simple interface where users can search for photos, videos, and GIFs, explore trending content, and save their favorite media to a personal collection.

The main focus of this project was **learning by building** — especially React, Redux Toolkit, API integration, asynchronous data handling, reusable components, and UI/UX development.

---

## ✨ Features

* 🔎 Search for photos, videos, and GIFs
* 📸 Browse high-quality photos
* 🎥 Search and preview videos
* 🎞️ Search and explore GIFs
* 🔥 Trending media on the homepage
* 🔖 Save media to a personal collection
* 📂 View saved media
* ⚡ Loading states while fetching data
* ❌ Custom error state for failed requests
* 🎨 Responsive and modern dark-themed UI
* 🧩 Reusable React components
* 🔄 Dynamic content based on the selected media type
* 🌐 Multiple external API integrations

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **JavaScript (ES6+)**
* **Tailwind CSS**
* **React Router DOM**
* **Lucide React**

### State Management

* **Redux Toolkit**
* **React Redux**

### APIs

* **Unsplash API** — Photos
* **Pexels API** — Videos
* **GIPHY API** — GIFs

### Development Tools

* **Vite**
* **Axios**
* **Git**
* **GitHub**
* **VS Code**

---

## 🏗️ Application Structure

The application is organized around reusable React components and centralized state management.

```text
src/
│
├── api/
│   └── mediaApi.js
│
├── components/
│   ├── ErrorState.jsx
│   ├── ExploreFeed.jsx
│   ├── Loader.jsx
│   ├── ResultCard.jsx
│   ├── ResultGrid.jsx
│   ├── SearchBar.jsx
│   └── Tabs.jsx
│
├── pages/
│   ├── HomePage.jsx
│   └── CollectionPage.jsx
│
├── redux/
│   ├── store.js
│   └── features/
│       ├── searchSlice.js
│       ├── collectionSlice.js
│       └── homeSlice.js
│
├── App.jsx
└── main.jsx
```

---

## 🔄 How VidPix Works

### 1. User searches for media

The user enters a search query through the search bar.

```text
User Query
    ↓
SearchBar
    ↓
Redux Search State
    ↓
Active Media Type
    ↓
API Request
```

### 2. Media API is called

Depending on the selected tab, VidPix requests data from the corresponding API.

```text
Photos → Unsplash
Videos → Pexels
GIFs   → GIPHY
```

### 3. API response is normalized

Different APIs return different data structures.

VidPix converts the responses into a common structure before rendering them.

Example:

```js
{
  id: item.id,
  type: "photo",
  title: item.alt_description,
  thumbnail: item.urls.thumb,
  src: item.urls.full,
  url: item.links.html
}
```

This allows the same `ResultCard` component to handle different types of media.

### 4. Results are rendered

The normalized media objects are stored in Redux and displayed through reusable components.

```text
Redux State
    ↓
ResultGrid
    ↓
ResultCard
    ↓
Photo / Video / GIF
```

---

## 🧠 State Management

Redux Toolkit is used to manage application-level state.

### Search State

Responsible for:

* Search query
* Active media tab
* Search results
* Loading state
* Error state

### Home State

Responsible for:

* Trending photos
* Trending videos
* Trending GIFs
* Homepage loading state
* Homepage errors

### Collection State

Responsible for:

* Saved media
* Adding media to collection
* Collection-related UI state

---

## 🔖 Collection System

Users can save media using the bookmark button.

The selected media is dispatched to the Redux collection state.

```text
Click Bookmark
      ↓
addCollection()
      ↓
Redux Collection State
      ↓
Collection Page
```

This also helped me understand how Redux Toolkit can be used for shared application state across multiple components.

---

## ⚡ Loading & Error Handling

VidPix includes dedicated UI states for asynchronous API operations.

### Loading

A reusable loader is displayed while media is being fetched.

### Error

A custom error state is displayed when an API request fails.

This prevents the application from simply showing a blank screen when something goes wrong.

---

## 🎨 UI / UX

The interface was designed with a focus on:

* Clean visual hierarchy
* Simple dark-themed design
* Clear search experience
* Easy media discovery
* Consistent media cards
* Clear active-tab states
* Simple save/bookmark interaction
* Responsive layouts

The UI was iteratively redesigned while building the project instead of being treated as a separate step at the end.

---

## 📱 Responsive Design

The layout uses Tailwind CSS utilities to adapt the interface across different screen sizes.

The main areas designed responsively include:

* Navigation
* Search section
* Media grid
* Media cards
* Collection page
* Homepage feed

---

## 🔐 Environment Variables

API keys are stored using environment variables instead of being directly written into the source code.

Create a `.env` file in the project root:

```env
VITE_UNSPLASH_API_KEY=your_unsplash_api_key
VITE_PEXELS_API_KEY=your_pexels_api_key
VITE_GIPHY_API_KEY=your_giphy_api_key
```

> Never commit your `.env` file or expose private API credentials in your repository.

Make sure `.env` is included in `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/Darsh9906/vidpix.git
```

### 2. Navigate to the project

```bash
cd vidpix
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file:

```env
VITE_UNSPLASH_API_KEY=your_key
VITE_PEXELS_API_KEY=your_key
VITE_GIPHY_API_KEY=your_key
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## 📦 Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📚 What I Learned

This project was primarily built as a **learning-through-building project**.

While developing VidPix, I practiced:

* React component architecture
* Props and reusable components
* React Hooks
* `useState`
* `useEffect`
* React Router
* Redux Toolkit
* Redux slices
* Dispatching actions
* Selecting state with `useSelector`
* Asynchronous API requests
* Axios
* Working with multiple APIs
* Handling different API response structures
* Loading and error states
* Conditional rendering
* Environment variables
* Tailwind CSS
* Responsive UI design
* Git and GitHub workflow
* UI/UX iteration

One of the biggest lessons from this project was learning how to take an idea, break it into smaller pieces, build each part, debug it, and gradually improve the final product.

---

## 🧩 Challenges Solved

Some of the challenges I worked through while building VidPix included:

### Different API structures

Unsplash, Pexels, and GIPHY return different response formats.

I solved this by transforming each API response into a common media object structure.

### Asynchronous state handling

API requests required proper handling of:

* Loading
* Success
* Error

Redux state was used to keep these states predictable across the application.

### Media-specific rendering

Photos, videos, and GIFs require different HTML elements and properties.

The reusable `ResultCard` component handles these differences based on the media type.

### Homepage feed

The homepage uses separate API requests to provide media for the discovery/trending section.

### UI iteration

The UI was redesigned multiple times while developing the application based on usability and visual feedback.

---

## 🔮 Future Improvements

Some improvements planned for future versions:

* [ ] Infinite scrolling
* [ ] Pagination improvements
* [ ] Better media filtering
* [ ] Advanced search options
* [ ] Search history
* [ ] Improved collection management
* [ ] Remove items from collection
* [ ] Persistent collections
* [ ] Better mobile experience
* [ ] Improved accessibility
* [ ] Better API caching
* [ ] React Query / TanStack Query for server-state management
* [ ] Improved performance and image optimization
* [ ] Skeleton loading states

---

## 🎯 Project Goal

VidPix was created as a practical way to strengthen my React development skills.

Instead of only following tutorials, I wanted to understand how different concepts work together inside a real application.

The project allowed me to practice the complete development flow:

```text
Idea
 ↓
UI Design
 ↓
Component Architecture
 ↓
API Integration
 ↓
State Management
 ↓
Error Handling
 ↓
Debugging
 ↓
UI/UX Improvements
 ↓
Git & GitHub
```

## 📄 License

This project is created for learning and portfolio purposes.

---

## 👨‍💻 Author

**Darsh Bhatt**

Built with React, Redux Toolkit, Tailwind CSS, and a lot of learning through building. 
