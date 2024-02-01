
# Simple Node.js API Server

This is a simple Node.js server that serves as an API endpoint.
It fetches data from 'time.com' and returns it as a JSON response.

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    node server.js
    ```

4. The server will start running at `http://localhost:8008/`.

## Endpoints

### `GET /getTimes`

- Description: Fetches the latest stories from time.com.
- Response Format: JSON
- Sample Response:
    ```json
    {
        "latest_stories": [
            {
                "title": "Sample Story 1",
                "link": "https://example.com/story1"
            },
            {
                "title": "Sample Story 2",
                "link": "https://example.com/story2"
            }
        ]
    }
    ```

## Error Handling

- If the requested route is not found, the server responds with a 404 status code and a JSON message: `{"message": "No route matching"}`.
- If there is an internal server error, the server responds with a 500 status code and a JSON message: `{"message": "Internal server error"}`.

## Dependencies

- [http](https://nodejs.org/api/http.html): Java Script built-in module for creating HTTP servers.
- [https](https://nodejs.org/api/https.html): Java Script built-in module for making HTTPS requests.
- [url](https://nodejs.org/api/url.html): Java Script built-in module for URL parsing.
