# AstraOS API Design

## Overview

AstraOS follows an API-First architecture.

All clients communicate through REST APIs.

Future support:

- GraphQL
- WebSockets
- Internal Service APIs

---

# API Standards

## Base URL

/api/v1

Example:

/api/v1/auth/login

---

# Response Format

## Success Response

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

---

## Error Response

{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "code": "VALIDATION_ERROR"
  }
}

---

# HTTP Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error

---

# Authentication

Authentication Method:

Bearer Token

Authorization: Bearer <access_token>

---

# Auth Module

Base Route:

/api/v1/auth

---

## Register

POST /register

Request

{
  "firstName": "Harsh",
  "lastName": "Raj",
  "email": "harsh@example.com",
  "password": "password123"
}

Response

{
  "success": true,
  "message": "Account created"
}

---

## Login

POST /login

Request

{
  "email": "harsh@example.com",
  "password": "password123"
}

Response

{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}

---

## Logout

POST /logout

---

## Refresh Token

POST /refresh-token

---

## Forgot Password

POST /forgot-password

---

## Reset Password

POST /reset-password

---

# User Module

Base Route

/api/v1/users

---

## Get Current User

GET /me

---

## Update Profile

PATCH /me

---

## Upload Avatar

POST /avatar

---

# Workspace Module

Base Route

/api/v1/workspaces

---

## Create Workspace

POST /

---

## Get Workspaces

GET /

---

## Get Workspace

GET /:workspaceId

---

## Update Workspace

PATCH /:workspaceId

---

## Delete Workspace

DELETE /:workspaceId

---

# Workspace Members

GET /:workspaceId/members

POST /:workspaceId/members

DELETE /:workspaceId/members/:memberId

---

# Chat Module

Base Route

/api/v1/chats

---

## Create Conversation

POST /

---

## Get Conversations

GET /

---

## Get Conversation

GET /:conversationId

---

## Send Message

POST /:conversationId/messages

Request

{
  "content": "Hello World"
}

---

## Get Messages

GET /:conversationId/messages

---

## Edit Message

PATCH /messages/:messageId

---

## Delete Message

DELETE /messages/:messageId

---

# Reactions

POST /messages/:messageId/reactions

DELETE /messages/:messageId/reactions

---

# Notification Module

Base Route

/api/v1/notifications

---

## Get Notifications

GET /

---

## Mark Read

PATCH /:notificationId/read

---

## Mark All Read

PATCH /read-all

---

# File Module

Base Route

/api/v1/files

---

## Upload File

POST /upload

---

## Download File

GET /:fileId

---

## Delete File

DELETE /:fileId

---

# Task Module

Base Route

/api/v1/tasks

---

## Create Task

POST /

---

## Get Tasks

GET /

---

## Update Task

PATCH /:taskId

---

## Delete Task

DELETE /:taskId

---

# Notes Module

Base Route

/api/v1/notes

---

## Create Note

POST /

---

## Get Notes

GET /

---

## Update Note

PATCH /:noteId

---

## Delete Note

DELETE /:noteId

---

# Calendar Module

Base Route

/api/v1/events

---

## Create Event

POST /

---

## Get Events

GET /

---

## Update Event

PATCH /:eventId

---

## Delete Event

DELETE /:eventId

---

# AI Module

Base Route

/api/v1/ai

---

## Chat With AI

POST /chat

Request

{
  "message": "Summarize this document"
}

---

## Generate Summary

POST /summary

---

## Generate Insights

POST /insights

---

# CRM Module

Base Route

/api/v1/customers

---

## Create Customer

POST /

---

## Get Customers

GET /

---

## Update Customer

PATCH /:customerId

---

## Delete Customer

DELETE /:customerId

---

# Inventory Module

Base Route

/api/v1/products

---

## Create Product

POST /

---

## Get Products

GET /

---

## Update Product

PATCH /:productId

---

## Delete Product

DELETE /:productId

---

# Billing Module

Base Route

/api/v1/invoices

---

## Create Invoice

POST /

---

## Get Invoices

GET /

---

## Update Invoice

PATCH /:invoiceId

---

## Delete Invoice

DELETE /:invoiceId

---

# Search Module

Base Route

/api/v1/search

---

## Global Search

GET ?query=...

Searches:

- Users
- Messages
- Files
- Notes
- Tasks

---

# Admin Module

Base Route

/api/v1/admin

---

## Dashboard Stats

GET /stats

---

## Users

GET /users

PATCH /users/:id

DELETE /users/:id

---

## Workspaces

GET /workspaces

DELETE /workspaces/:id

---

# API Versioning Strategy

Current Version

/api/v1

Future

/api/v2

/api/v3

---

# Rate Limiting

Auth APIs

5 requests per minute

General APIs

100 requests per minute

AI APIs

20 requests per minute

---

# Security Standards

- JWT Authentication
- Refresh Tokens
- HTTPS Only
- Input Validation
- Rate Limiting
- Audit Logging
- RBAC Authorization

---

# Future APIs

- GraphQL API
- Public Developer API
- Webhook API
- Plugin API
- Marketplace API
