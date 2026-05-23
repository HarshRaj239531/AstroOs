# AstraOS Architecture

This document describes the high-level architecture of the AstraOS ecosystem.

## System Topology

```mermaid
graph TD
    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef svc fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef db fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    
    %% Clients
    Web["Web Client (apps/web)"]:::client
    Mobile["Mobile Client (apps/mobile)"]:::client
    Admin["Admin Client (apps/admin)"]:::client
    
    %% API Gateway / Ingress
    Ingress["Kubernetes Ingress / Gateway"]
    
    %% Services
    Auth["Auth Service (services/auth-service)"]:::svc
    Chat["Chat Service (services/chat-service)"]:::svc
    AI["AI Service (services/ai-service)"]:::svc
    Notif["Notification Service (services/notification-service)"]:::svc
    File["File Service (services/file-service)"]:::svc
    
    %% Databases
    DB_Auth[(PostgreSQL)]:::db
    DB_Chat[(Redis + MongoDB)]:::db
    DB_Vector[(Vector DB)]:::db
    
    %% Connections
    Web & Mobile & Admin --> Ingress
    
    Ingress --> Auth
    Ingress --> Chat
    Ingress --> AI
    Ingress --> Notif
    Ingress --> File
    
    Auth --> DB_Auth
    Chat --> DB_Chat
    AI --> DB_Vector
    
    Chat -.->|PubSub| Notif
    AI -.->|Auth Verification| Auth
```

## Communication Patterns

1. **Synchronous Requests (HTTP/REST / gRPC)**: Used for administrative settings, data query processes, and authentication workflows.
2. **Asynchronous Messages (WebSocket / Event Bus)**: Real-time chat streaming, live user status, and notification dispatches.
3. **Monorepo Internal Dependencies**:
   - `packages/ui` is shared across `apps/web` and `apps/admin`.
   - `packages/types` defines all payload validation structures imported by both microservices and frontends.
   - `packages/shared` exports cryptographic and utility functions.
