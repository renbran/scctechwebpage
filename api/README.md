# SGC TECH AI - User Profile REST API

## Overview
REST API endpoint for managing user profiles with full CRUD operations, input validation, and proper error handling. Built for Cloudflare Workers with Supabase backend.

## Base URL
```
https://sgctech.pages.dev/api
```

## Endpoints

### Health Check
```
GET /api/health
```
**Response:**
```json
{
    "success": true,
    "data": {
        "status": "healthy",
        "service": "SGC TECH AI Profile API",
        "version": "1.0.0"
    },
    "timestamp": "2025-12-08T12:00:00.000Z"
}
```

---

### Get Profile by ID
```
GET /api/profile/:id
```
**Parameters:**
- `id` (UUID) - Profile ID

**Example:**
```bash
curl https://sgctech.pages.dev/api/profile/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200):**
```json
{
    "success": true,
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Ahmed Al Rashid",
        "email": "ahmed@company.ae",
        "phone": "+971501234567",
        "company": "Dubai Enterprises LLC",
        "industry": "real-estate",
        "created_at": "2025-12-08T12:00:00.000Z"
    },
    "timestamp": "2025-12-08T12:00:00.000Z"
}
```

---

### Get Profile by Email
```
GET /api/profile?email={email}
```
**Parameters:**
- `email` (string) - User email address

**Example:**
```bash
curl "https://sgctech.pages.dev/api/profile?email=ahmed@company.ae"
```

---

### Create Profile
```
POST /api/profile
```
**Request Body:**
```json
{
    "name": "Ahmed Al Rashid",
    "email": "ahmed@company.ae",
    "phone": "+971501234567",
    "company": "Dubai Enterprises LLC",
    "industry": "real-estate"
}
```

**Required Fields:**
- `name` (string, 2-100 characters)
- `email` (string, valid email format)

**Optional Fields:**
- `phone` (string, international format)
- `company` (string, max 200 characters)
- `industry` (string)

**Example:**
```bash
curl -X POST https://sgctech.pages.dev/api/profile \
  -H "Content-Type: application/json" \
  -d '{"name": "Ahmed Al Rashid", "email": "ahmed@company.ae"}'
```

**Success Response (201):**
```json
{
    "success": true,
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Ahmed Al Rashid",
        "email": "ahmed@company.ae",
        "created_at": "2025-12-08T12:00:00.000Z"
    },
    "timestamp": "2025-12-08T12:00:00.000Z"
}
```

---

### Update Profile
```
PUT /api/profile/:id
```
**Parameters:**
- `id` (UUID) - Profile ID

**Request Body:** (all fields optional)
```json
{
    "name": "Ahmed Al Rashid",
    "phone": "+971509876543",
    "company": "New Company LLC"
}
```

**Example:**
```bash
curl -X PUT https://sgctech.pages.dev/api/profile/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"phone": "+971509876543"}'
```

---

### Delete Profile
```
DELETE /api/profile/:id
```
**Parameters:**
- `id` (UUID) - Profile ID

**Example:**
```bash
curl -X DELETE https://sgctech.pages.dev/api/profile/550e8400-e29b-41d4-a716-446655440000
```

---

## Error Handling

### Validation Error (400)
```json
{
    "success": false,
    "error": {
        "message": "Validation failed",
        "status": 400,
        "details": [
            { "field": "email", "message": "Invalid email format" },
            { "field": "name", "message": "Name must be at least 2 characters" }
        ],
        "timestamp": "2025-12-08T12:00:00.000Z"
    }
}
```

### Not Found (404)
```json
{
    "success": false,
    "error": {
        "message": "Profile not found",
        "status": 404,
        "details": null,
        "timestamp": "2025-12-08T12:00:00.000Z"
    }
}
```

### Server Error (500)
```json
{
    "success": false,
    "error": {
        "message": "Internal server error",
        "status": 500,
        "details": { "message": "Database connection failed" },
        "timestamp": "2025-12-08T12:00:00.000Z"
    }
}
```

---

## Input Validation Rules

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes (create) | 2-100 characters |
| email | string | Yes (create) | Valid email format |
| phone | string | No | International format (+971XXXXXXXXX) |
| company | string | No | Max 200 characters |
| industry | string | No | No specific validation |

---

## Deployment

### 1. Create Supabase Table
Run `profiles-schema.sql` in your Supabase SQL editor.

### 2. Configure Cloudflare Worker
Add environment variables in Cloudflare dashboard:
```
SUPABASE_URL=https://ubkccylvneiyxqkgkyqi.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. Deploy Worker
```bash
wrangler deploy api/profile-worker.js
```

---

## CORS
All endpoints support CORS with the following headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

---

## Rate Limiting
Recommended: Implement rate limiting via Cloudflare rules
- 100 requests per minute per IP
- 1000 requests per hour per IP
