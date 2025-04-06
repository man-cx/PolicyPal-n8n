# PolicyPal Technical Stack

## Core Technologies
- React Native - Mobile app framework
- Expo - Development platform for React Native
- n8n.io - Workflow automation and integration platform
- Supabase - Backend as a service platform
- Azure OpenAI - AI service for the policy advisor feature (accessed via n8n)

## Frontend
- TypeScript - For type safety and better developer experience
- React Navigation - Navigation library for React Native
- Redux Toolkit - State management
- React Native Paper or Native Base - UI component library
- Formik & Yup - Form handling and validation

## Backend & Data
- Supabase Auth - User authentication and authorization
- Supabase Storage - Document storage for policy files
- Supabase Database - PostgreSQL database with real-time capabilities
- Supabase Vector Store - Storage for AI embeddings
- n8n Workflows - Business logic and integration workflows (replacing Azure Functions)
- @react-native-async-storage/async-storage - Local data persistence for offline support
- App Center - Analytics and crash reporting

## User Management & Identification
- Supabase Auth UUID - Universal user identifier across all system components
- JWT tokens - Used for authentication and user identity verification
- User profile data - Stored in Supabase Database (profiles table)
- Device tokens - Associated with user UUID for push notifications
- User preferences - Linked to user UUID for personalization
- Data ownership - All user content linked to their UUID for proper access control

## Direct App-to-Supabase Operations
The following operations are handled directly between the app and Supabase without n8n:

| Operation | Purpose | Implementation |
|-----------|---------|----------------|
| User Authentication | User signup, login, verification | Supabase Auth API |
| User Profile Management | Store and update user information | Supabase Database (profiles table) |
| Policy CRUD Operations | Create, read, update, delete policies | Supabase Database (policies table) |
| Device Registration | Register devices for notifications | Supabase Database (user_devices table) |
| Notification Preferences | Manage user notification settings | Supabase Database (user_preferences table) |

## Communication Services
- react-native-mail - Handle user-initiated email sending from the app
- Google SMTP credentials - Authentication for email sending
- Expo Notifications - Push notification client for receiving notifications
- n8n Automated Email - Handles scheduled and triggered email notifications
- n8n Push Notifications - Sends automated push notifications via Expo Push API
- n8n SMS Integration - SMS notification workflows (optional)
- Twilio - SMS service provider (optional, connected via n8n)

## User Interactions
- User-initiated email composition and sending
- Policy sharing via email
- Receiving push notifications on device
- In-app policy sharing and collaboration
- PDF document viewing and generation in-app
- Error handling and retry mechanisms for failed operations

## Automated Communications (via n8n)
- Policy renewal reminder emails
- Document processing notifications
- Account verification emails
- Weekly/monthly policy summaries
- System alerts and announcements
- Timed or triggered push notifications

## AI & RAG Pipeline
- n8n Document Processing - Extract text and data from policy documents
- n8n Document Embedding - Process documents and generate embeddings via Azure OpenAI
- Expo Document Upload - Send documents to n8n for processing and embedding
- Supabase Vector Store - Storage for generated document embeddings
- Azure OpenAI - Generate embeddings and AI responses (accessed via n8n)
- n8n AI Workflows - Orchestrate the complete RAG pipeline process

## App-to-n8n Communication
- RESTful API calls from app to n8n endpoints
- JWT authentication for secure communication
- User identification via Supabase Auth UUID in all requests
- Error handling with appropriate user feedback
- Retry mechanisms for failed requests
- Response caching for improved performance

## Accessibility & Internationalization
- React Native Accessibility API - Core accessibility support
- React Native Localization - Base localization support
- i18next - Complete internationalization solution
- Azure Translator (via n8n) - Translation services for multilingual support

## Security & Compliance
- Supabase Row-Level Security - Data access control
- n8n Credentials Management - Secure storage of API keys and secrets
- App Center Code Push - Secure over-the-air updates
- Supabase Policies - Enforce data access rules
- HTTPS for all API communication
- JWT token-based authentication
- Credential storage in secure app storage
- User data isolation through UUID-based access control

## DevOps & Tooling
- GitHub Actions - CI/CD pipeline
- n8n Monitoring - Workflow monitoring
- Supabase Monitoring - Database and storage monitoring
- Jest - Testing framework
- ESLint/Prettier - Code quality and formatting

## Additional Services
- react-native-pdf - PDF document viewing
- Expo Image Picker - Document and image upload handling
- n8n OCR Integration - Document scanning and data extraction
- Stripe (optional) - If implementing premium features or payments (via n8n)
- Redux Persist - Persistence layer for Redux state (works with AsyncStorage)
- React Native Reanimated - Advanced animations for smooth UI transitions
