# API Documentation

This document details the CRUD API endpoints for managing overlays.

**API Base URL:** `http://127.0.0.1:5000/api`

---

### Create an Overlay

Adds a new text overlay to the database.

-   **Endpoint:** `/overlays`
-   **Method:** `POST`
-   **Description:** Creates a new overlay record.

-   **Request Body (JSON):**
    ```json
    {
      "type": "text",
      "content": "Your desired overlay text",
      "font": {
        "size": 20,
        "color": "#FFFFFF"
      }
    }
    ```

-   **Success Response:**
    -   **Code:** `201 Created`
    -   **Content:** The newly created overlay object, including its unique `_id`.
    ```json
    {
      "_id": "670f4e6d82a1b3a8243328e1",
      "type": "text",
      "content": "Your desired overlay text",
      "font": {
        "size": 20,
        "color": "#FFFFFF"
      }
    }
    ```

---

### Read All Overlays

Retrieves a list of all existing overlays.

-   **Endpoint:** `/overlays`
-   **Method:** `GET`
-   **Description:** Fetches an array of all overlay objects from the database.

-   **Success Response:**
    -   **Code:** `200 OK`
    -   **Content:** An array of overlay objects.
    ```json
    [
      {
        "_id": "670f4e6d82a1b3a8243328e1",
        "type": "text",
        "content": "First Overlay"
      },
      {
        "_id": "670f4e8a82a1b3a8243328e2",
        "type": "text",
        "content": "Second Overlay"
      }
    ]
    ```

---

### Update an Overlay

Modifies the data of an existing overlay.

-   **Endpoint:** `/overlays/<id>`
-   **Method:** `PUT`
-   **Description:** Updates an overlay specified by its ID.

-   **URL Parameters:**
    -   `id` (string, **required**): The unique `_id` of the overlay to update.

-   **Request Body (JSON):** A JSON object containing the fields to be updated.
    ```json
    {
      "content": "This is the updated text"
    }
    ```

-   **Success Response:**
    -   **Code:** `200 OK`
    -   **Content:**
    ```json
    {
      "message": "Overlay updated successfully"
    }
    ```

-   **Error Response:**
    -   **Code:** `404 Not Found`
    -   **Content:**
    ```json
    {
      "error": "Overlay not found"
    }
    ```

---

### Delete an Overlay

Removes an overlay from the database.

-   **Endpoint:** `/overlays/<id>`
-   **Method:** `DELETE`
-   **Description:** Deletes a single overlay specified by its ID.

-   **URL Parameters:**
    -   `id` (string, **required**): The unique `_id` of the overlay to delete.

-   **Success Response:**
    -   **Code:** `200 OK`
    -   **Content:**
    ```json
    {
      "message": "Overlay deleted successfully"
    }
    ```

-   **Error Response:**
    -   **Code:** `404 Not Found`
    -   **Content:**
    ```json
    {
      "error": "Overlay not found"
    }
    ```
