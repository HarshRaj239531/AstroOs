# AstraOS Database Design

## Overview

AstraOS uses PostgreSQL as the primary database.

Database design follows:

- Normalized Structure
- UUID Primary Keys
- Soft Delete Support
- Audit Fields
- Scalable Relationships

---

# Common Fields

Every table should contain:

```sql
id UUID PRIMARY KEY
createdAt TIMESTAMP
updatedAt TIMESTAMP
deletedAt TIMESTAMP NULL
```

---

# Module 1: Users

## User

| Field | Type |
|---------|---------|
| id | UUID |
| firstName | String |
| lastName | String |
| username | String |
| email | String |
| password | String |
| avatar | String |
| bio | Text |
| isVerified | Boolean |
| status | Enum |
| createdAt | Timestamp |
| updatedAt | Timestamp |

---

## User Settings

| Field | Type |
|---------|---------|
| id | UUID |
| userId | UUID |
| theme | String |
| language | String |
| notificationsEnabled | Boolean |

---

# Module 2: Authentication

## Session

| Field | Type |
|---------|---------|
| id | UUID |
| userId | UUID |
| token | String |
| deviceName | String |
| ipAddress | String |
| expiresAt | Timestamp |

---

## Refresh Token

| Field | Type |
|---------|---------|
| id | UUID |
| userId | UUID |
| token | String |
| expiresAt | Timestamp |

---

# Module 3: Workspaces

## Workspace

| Field | Type |
|---------|---------|
| id | UUID |
| name | String |
| slug | String |
| description | Text |
| ownerId | UUID |

---

## Workspace Member

| Field | Type |
|---------|---------|
| id | UUID |
| workspaceId | UUID |
| userId | UUID |
| roleId | UUID |

---

# Module 4: Roles and Permissions

## Role

| Field | Type |
|---------|---------|
| id | UUID |
| workspaceId | UUID |
| name | String |

---

## Permission

| Field | Type |
|---------|---------|
| id | UUID |
| name | String |
| description | String |

---

## Role Permission

| Field | Type |
|---------|---------|
| roleId | UUID |
| permissionId | UUID |

---

# Module 5: Chat

## Conversation

| Field | Type |
|---------|---------|
| id | UUID |
| type | Enum |
| workspaceId | UUID NULL |

---

## Conversation Member

| Field | Type |
|---------|---------|
| id | UUID |
| conversationId | UUID |
| userId | UUID |

---

## Message

| Field | Type |
|---------|---------|
| id | UUID |
| conversationId | UUID |
| senderId | UUID |
| content | Text |
| messageType | Enum |
| replyToId | UUID NULL |

---

## Message Reaction

| Field | Type |
|---------|---------|
| id | UUID |
| messageId | UUID |
| userId | UUID |
| emoji | String |

---

# Module 6: Notifications

## Notification

| Field | Type |
|---------|---------|
| id | UUID |
| userId | UUID |
| title | String |
| body | Text |
| isRead | Boolean |

---

# Module 7: File Management

## File

| Field | Type |
|---------|---------|
| id | UUID |
| uploaderId | UUID |
| fileName | String |
| fileUrl | String |
| fileSize | BigInt |
| mimeType | String |

---

## Folder

| Field | Type |
|---------|---------|
| id | UUID |
| name | String |
| ownerId | UUID |

---

# Module 8: Tasks

## Task

| Field | Type |
|---------|---------|
| id | UUID |
| title | String |
| description | Text |
| workspaceId | UUID |
| assignedTo | UUID |
| status | Enum |
| dueDate | Timestamp |

---

# Module 9: Notes

## Note

| Field | Type |
|---------|---------|
| id | UUID |
| title | String |
| content | Text |
| ownerId | UUID |
| workspaceId | UUID |

---

# Module 10: Calendar

## Event

| Field | Type |
|---------|---------|
| id | UUID |
| title | String |
| description | Text |
| startTime | Timestamp |
| endTime | Timestamp |
| creatorId | UUID |

---

# Module 11: AI Assistant

## AI Conversation

| Field | Type |
|---------|---------|
| id | UUID |
| userId | UUID |
| title | String |

---

## AI Message

| Field | Type |
|---------|---------|
| id | UUID |
| conversationId | UUID |
| role | Enum |
| content | Text |

---

# Module 12: CRM

## Customer

| Field | Type |
|---------|---------|
| id | UUID |
| workspaceId | UUID |
| name | String |
| email | String |
| phone | String |

---

## Lead

| Field | Type |
|---------|---------|
| id | UUID |
| workspaceId | UUID |
| source | String |
| status | Enum |

---

# Module 13: Inventory

## Product

| Field | Type |
|---------|---------|
| id | UUID |
| workspaceId | UUID |
| name | String |
| sku | String |
| price | Decimal |
| stock | Integer |

---

# Module 14: Billing

## Invoice

| Field | Type |
|---------|---------|
| id | UUID |
| workspaceId | UUID |
| customerId | UUID |
| totalAmount | Decimal |
| status | Enum |

---

# Module 15: Audit Logs

## Audit Log

| Field | Type |
|---------|---------|
| id | UUID |
| userId | UUID |
| action | String |
| entityType | String |
| entityId | UUID |

---

# Important Relationships

User
│
├── Sessions
├── Notifications
├── Files
├── Tasks
├── Notes
├── AI Conversations
└── Workspace Memberships

Workspace
│
├── Members
├── Roles
├── Conversations
├── Tasks
├── Notes
├── Customers
├── Products
└── Invoices

Conversation
│
├── Members
├── Messages
└── Reactions

Message
│
├── Reactions
└── Replies

---

# Database Rules

1. Use UUID everywhere.
2. Never hard delete critical records.
3. Use indexes on searchable fields.
4. Use foreign keys.
5. Use audit logs for important actions.
6. Use transactions for critical operations.
7. Design for horizontal scaling.
