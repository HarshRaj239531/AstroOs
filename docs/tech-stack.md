# AstraOS Technology Stack

## Overview

AstraOS is built using modern, scalable, cloud-native technologies.

Technology choices prioritize:

- Scalability
- Developer Experience
- Maintainability
- Performance
- Security

---

# Frontend

## Web Application

Framework:
- Next.js 15+

Language:
- TypeScript

Styling:
- Tailwind CSS

UI Components:
- ShadCN UI

Icons:
- Lucide React

Forms:
- React Hook Form

Validation:
- Zod

State Management:
- Zustand

Data Fetching:
- TanStack Query

Realtime:
- Socket.IO Client

---

# Mobile Application

Framework:
- Flutter

Language:
- Dart

State Management:
- Riverpod

Networking:
- Dio

Realtime:
- Socket.IO Client

---

# Backend

Framework:
- NestJS

Language:
- TypeScript

API Style:
- REST

Future:
- GraphQL

Validation:
- Class Validator
- Zod

Authentication:
- JWT
- Refresh Tokens

---

# Database

Primary Database:
- PostgreSQL

ORM:
- Prisma

Migration Tool:
- Prisma Migrate

---

# Caching

Technology:
- Redis

Used For:
- Sessions
- Rate Limiting
- Queues
- Realtime Presence
- Caching

---

# Search Engine

Technology:
- Elasticsearch

Used For:
- Global Search
- Message Search
- File Search

---

# File Storage

Development:
- MinIO

Production:
- AWS S3

Storage Types:
- Images
- Videos
- Documents
- Attachments

---

# AI Stack

Primary Model:
- Gemini

Framework:
- LangGraph

Embeddings:
- Gemini Embeddings

Vector Database:
- Qdrant

AI Features:
- Chat Assistant
- Summarization
- Search
- Automation
- Agents

---

# Realtime Infrastructure

Technology:
- Socket.IO

Features:
- Messaging
- Presence
- Typing Indicators
- Notifications

---

# Background Jobs

Technology:
- BullMQ

Queue Backend:
- Redis

Used For:
- Emails
- Notifications
- AI Jobs
- Reports

---

# Monitoring

Metrics:
- Prometheus

Dashboards:
- Grafana

Logging:
- Winston

Error Tracking:
- Sentry

---

# Testing

Unit Tests:
- Jest

Integration Tests:
- Jest

E2E Tests:
- Playwright

API Testing:
- Postman

---

# Documentation

API Documentation:
- Swagger

Architecture:
- Markdown

Database Design:
- Markdown

---

# Containerization

Technology:
- Docker

Containers:
- Backend
- Frontend
- PostgreSQL
- Redis
- MinIO
- Qdrant

---

# Orchestration

Development:
- Docker Compose

Production:
- Kubernetes

---

# Reverse Proxy

Technology:
- NGINX

Responsibilities:
- SSL
- Load Balancing
- Routing

---

# CI/CD

Platform:
- GitHub Actions

Pipelines:
- Build
- Test
- Deploy

---

# Monorepo Structure

AstraOS/

apps/
├── web
├── mobile
├── admin

services/
├── auth-service
├── user-service
├── workspace-service
├── chat-service
├── notification-service
├── ai-service
├── file-service

packages/
├── ui
├── shared
├── types

infrastructure/
├── docker
├── kubernetes

docs/

---

# Coding Standards

Language:
- TypeScript Everywhere

Naming:

Files:
- kebab-case

Components:
- PascalCase

Variables:
- camelCase

Constants:
- UPPER_SNAKE_CASE

---

# Git Workflow

Main Branch:
- main

Development Branch:
- develop

Feature Branch Example:
- feature/auth-system

Bug Fix Branch Example:
- fix/login-bug

---

# Commit Convention

Examples:

feat: add login API

fix: resolve token refresh issue

refactor: optimize chat service

docs: update architecture document

---

# Security Standards

- HTTPS Everywhere
- JWT Authentication
- Refresh Tokens
- RBAC
- Rate Limiting
- Audit Logs
- Input Validation
- Secure Cookies

---

# Future Technologies

Potential Future Additions:

- Apache Kafka
- GraphQL
- gRPC
- Service Mesh
- AI Agent Runtime
- Edge Computing

---

# Final Principle

Technology should serve the product.

Do not adopt technologies simply because they are popular.

Every technology added to AstraOS must solve a real problem.
