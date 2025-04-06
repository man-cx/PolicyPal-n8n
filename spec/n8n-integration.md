# PolicyPal n8n Integration Specification

This document outlines how the PolicyPal React Native app will integrate with n8n for backend workflows, AI processing, and data management.

## 1. Overview

n8n serves as the integration and automation layer for PolicyPal, handling:
- Document processing and AI interactions
- Vector embedding generation and management
- Automated notifications and scheduled communications
- Background processing tasks

## 2. Integration Architecture

```
┌──────────────┐         ┌──────────────┐         ┌───────────────┐
│  React Native│  API    │     n8n      │  API    │   Azure OpenAI │
│  Expo App    │◄──────►│   Workflows   │◄──────►│     Services    │
└──────────────┘  Calls  └──────────────┘         └───────────────┘
        │                       │                         
        ▼                       ▼                         
┌──────────────┐         ┌──────────────┐                 
│   Supabase   │◄──────►│  Supabase    │                 
│  Auth/Storage│         │ Vector Store │                 
└──────────────┘         └──────────────┘                 
```

## 3. API Interfaces

### 3.1 n8n Endpoints

| Endpoint | Method | Purpose | Request Payload | Response |
|----------|--------|---------|-----------------|----------|
| `/api/documents/process` | POST | Process and embed documents | Document reference, policy ID | Processing status |
| `/api/advisor/query` | POST | Send question to AI advisor | User query, relevant policy IDs | AI response |
| `/api/notifications/schedule` | POST | Schedule a future notification | Notification details, target users, timing | Schedule status |

### 3.2 Webhook Triggers

| Webhook | Trigger | Purpose |
|---------|---------|---------|
| `/webhook/policy/updated` | Policy update | Trigger re-processing of policy data |
| `/webhook/user/verified` | User verification | Start onboarding workflow |
| `/webhook/reminder/policy` | Scheduled event | Send policy renewal reminders |
| `/webhook/notification/deliver` | Time-based trigger | Send scheduled notifications |
| `/webhook/document/processed` | Process completion | Notify when document processing completes |

## 4. Key n8n Workflows

### 4.1 Document Processing Workflow

1. App uploads document to Supabase Storage
2. App calls n8n document processing endpoint with document reference
3. n8n workflow:
   - Retrieves document from Supabase
   - Extracts text and structured data
   - Generates embeddings via Azure OpenAI
   - Stores embeddings in Supabase Vector Store
   - Updates document metadata
   - Returns processing status to app
   - Optionally triggers notification on completion

### 4.2 AI Advisor Workflow

1. User asks question in app
2. App sends query to n8n endpoint
3. n8n workflow:
   - Generates embedding for user query
   - Searches Supabase Vector Store for relevant content
   - Retrieves top matching documents/sections
   - Constructs prompt with context for Azure OpenAI
   - Gets completion from Azure OpenAI
   - Returns formatted response to app
   - Logs interaction for feedback analysis

### 4.3 Automated Notification Workflow

1. Triggered by schedule or event:
   - Policy expiration date approaching
   - Document processing completed
   - New feature announcement
   - Scheduled reminders
2. n8n workflow:
   - Identifies users who should receive the notification
   - Retrieves device tokens from Supabase
   - Formats notification content
   - Sends push notifications via Expo Push API
   - Logs delivery status
   - Updates notification history in Supabase

### 4.4 Automated Email Workflow

1. Triggered by schedule or event:
   - Policy renewal reminders
   - Account verification
   - Weekly/monthly summaries
   - System alerts
2. n8n workflow:
   - Retrieves email template
   - Personalizes content based on user and context
   - Sends email via Google SMTP
   - Logs email delivery status
   - Updates user communication history in Supabase

## 5. Data Exchange Formats

### 5.1 Document Processing Request
```json
{
  "document": {
    "id": "doc-uuid",
    "storage_path": "policies/user123/doc1.pdf",
    "file_name": "health_insurance_policy.pdf",
    "mime_type": "application/pdf"
  },
  "policy": {
    "id": "policy-uuid",
    "type": "health",
    "provider": "Example Insurance Co"
  },
  "user_id": "user-uuid",
  "notify_on_completion": true
}
```

### 5.2 AI Query Request
```json
{
  "query": "What is my deductible for emergency room visits?",
  "context": {
    "policies": ["policy-id-1", "policy-id-2"],
    "language": "en",
    "user_id": "user-uuid"
  }
}
```

### 5.3 AI Response Format
```json
{
  "answer": "Your deductible for emergency room visits is $250 according to your UnitedHealth policy.",
  "confidence": 0.92,
  "sources": [
    {
      "policy_id": "policy-id-1",
      "document_id": "doc-uuid",
      "page": 4,
      "excerpt": "Emergency room visits are subject to a $250 deductible per visit."
    }
  ],
  "follow_up_questions": [
    "What is my out-of-pocket maximum?",
    "Are urgent care visits covered differently?"
  ]
}
```

### 5.4 Notification Schedule Request
```json
{
  "notification": {
    "title": "Policy Renewal Reminder",
    "body": "Your health insurance policy expires in 30 days",
    "data": {
      "policy_id": "policy-uuid",
      "action": "view_policy_details"
    }
  },
  "users": ["user-id-1", "user-id-2"],
  "schedule": {
    "type": "one-time",
    "datetime": "2023-12-01T09:00:00Z"
  }
}
```

### 5.5 Webhook Response Format
```json
{
  "status": "success",
  "event_processed": true,
  "timestamp": "2023-11-01T14:22:31Z",
  "details": {
    "event_type": "document_processed",
    "resource_id": "doc-uuid"
  }
}
```

## 6. User Identification

### 6.1 User ID Standard
- Supabase Auth UUID is used as the universal user identifier across all system components
- This UUID is generated when a user registers and remains constant throughout the user's lifetime
- All communication between the app and n8n includes this UUID for user identification

### 6.2 User ID in API Requests
- Each API request from the app to n8n includes the user's UUID in the payload
- The JWT authentication token also contains this UUID for verification
- Example: `"user_id": "550e8400-e29b-41d4-a716-446655440000"`

### 6.3 User ID in Workflows
- n8n workflows use the Supabase Auth UUID to:
  - Query user-specific data from Supabase
  - Filter policies and documents by owner
  - Target notifications to specific users
  - Personalize email content
  - Maintain audit logs of user activities

### 6.4 Cross-Component Reference
- The consistent use of Supabase Auth UUID ensures that:
  - User identity is maintained across all system components
  - User data can be properly segregated and secured
  - Permissions can be enforced consistently
  - User actions can be tracked and audited
  - Multiple devices can be associated with a single user

## 7. Authentication & Security

### 7.1 API Authentication
- All n8n API endpoints require authentication
- API requests use JWT token authentication
- Tokens are validated through Supabase Auth

### 7.2 Security Measures
- All API communication uses HTTPS
- Rate limiting on all endpoints
- n8n credentials for external services stored securely
- Azure OpenAI keys never exposed to client app
- Webhook endpoints secured with shared secrets

## 8. Error Handling

| Error Code | Description | Response Format |
|------------|-------------|-----------------|
| 400 | Bad Request | `{"error": "Invalid request format", "details": "..."}` |
| 401 | Unauthorized | `{"error": "Authentication required", "details": "..."}` |
| 404 | Resource Not Found | `{"error": "Resource not found", "details": "..."}` |
| 429 | Rate Limit Exceeded | `{"error": "Too many requests", "retry_after": 30}` |
| 500 | Server Error | `{"error": "Internal server error", "request_id": "..."}` |

## 9. Implementation Checklist

1. Set up n8n instance and secure it
2. Configure n8n with required credentials:
   - Azure OpenAI API keys
   - Supabase access tokens
   - Google SMTP credentials
   - Expo Push notification credentials
3. Create the core workflows in n8n
4. Build API endpoints for app communication
5. Implement authentication mechanism
6. Create error handling and logging
7. Test workflows with sample data
8. Document API interfaces for mobile developers

## 10. Monitoring and Operations

- Log all n8n workflow executions
- Track API performance and error rates
- Monitor notification and email delivery success rates
- Set up alerting for workflow failures
- Establish backup and recovery procedures
- Document operational procedures for updates

## 11. Future Extensions

- Batch processing for multiple documents
- Scheduled policy analysis and summarization
- Advanced notification targeting based on user behavior
- A/B testing for notification content
- Integration with additional external services
- Advanced analytics on user queries and responses
- Multilingual support for document processing 