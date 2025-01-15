# Instagram Clone Project

## Overview
This project is a clone of the Instagram website developed using:
- **Vite**
- **React**
- **TypeScript**
- **Ant Design (antd)**
- **styled-components**

The application is designed to be responsive and supports infinite loading functionality.

## Features
1. **Responsive Design**: Adapts seamlessly to both web and mobile views.
2. **Infinite Loading**:
   - The total dataset contains 50 items.
   - Items are displayed 10 at a time, with more items loaded as you scroll.
3. **User Actions**:
   - **Like/Unlike Posts**: Click the heart icon on a post to like or unlike it.
   - **Double-Click Like**: Double-clicking on a post’s image will like the post and display a heart effect.
   - **Search**: Use the search menu to input queries. This feature works on both web and app layouts.

## Installation
To set up and run the project locally:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Testing
The project includes functional tests. Run the tests using the following command:
```bash
npm test
```