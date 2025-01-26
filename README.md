# Githubeautified

Githubeautified leverages the GitHub GraphQL API to make exploring GitHub users and their repositories seamless and intuitive. Users can search for GitHub profiles, browse their repositories, and filter results by repository name and/or primary programming language. The app incorporates pagination for efficient repository fetching and infinite scrolling for fetching users, delivering a fluid and responsive experience.
## Getting Started

### Prerequisites

To run this project, you need:
- Node.js installed on your system.
- A GitHub personal access token with the necessary permissions to access public repositories.

### Setup Instructions



1. Create a `.env` file in the root directory and add the following variable:
   ```env
   REACT_APP_GITHUB_ACCESS_TOKEN=your_github_access_token
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   vite
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Running Tests

To run the test suite, use the following command:
```bash
vitest
```

## Future Improvements

Here are some potential improvements for the project:
- **Error Handling:** Improve error messages and handle API rate limits gracefully.
- **User Interface Enhancements:** Refine the UI for a more seamless user experience.
- **Dark Mode:** Add a dark mode toggle for better accessibility.
- **Sorting Options:** Allow users to sort repositories by stars, forks, or creation date.

