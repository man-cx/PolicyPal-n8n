# PolicyPal - Mobile Insurance Management App

PolicyPal is a mobile application designed to simplify insurance management for caregivers, providing a comprehensive platform to manage multiple policies, access critical information, and receive personalized advice through an AI-powered advisor.

## Project Overview

This repository contains the React Native codebase for PolicyPal, featuring a component library and integration with backend services.

## Technology Stack

- **Frontend**: React Native with Expo
- **UI Components**: Custom component library with consistent design system
- **Backend**: Supabase for database, authentication, and storage
- **Workflow Automation**: n8n.io for backend workflows and AI processing
- **AI Service**: Azure OpenAI (accessed via n8n)
- **State Management**: Redux Toolkit
- **Form Handling**: Formik & Yup

## Key Features

- **User Registration and Login**: Secure authentication with email verification
- **Multi-policy Management**: Support for various insurance types with categorization and search
- **AI-Powered Policy Advisor**: Natural language processing to answer policy questions
- **Multi-language Support**: English, Traditional Chinese, and Simplified Chinese
- **Theme Selection**: Light and dark modes with customizable accent colors
- **Policy Information Sharing**: Secure sharing with granular permissions

## Component Library

The `src/components/common` directory contains reusable UI components:

- `Button`: Customizable button with multiple variants and states
- `Card`: Container component for grouping related content
- `Input`: Form input with validation and different states
- `Avatar`: User avatar component with image or text initials
- `Badge`: Component for small counts or status indicators
- `Icon`: Vector icon wrapper for various icon sets
- `Header`: Screen header with customizable sections

## Project Structure

- `src/components/` - Reusable UI components
  - `common/` - The component library
- `src/screens/` - Application screens
- `src/styles/` - Design system tokens and global styles
- `spec/` - Project specifications and requirements
- `tasks/` - Implementation tasks and guidelines

## Backend Integration

The app communicates with:

1. **Supabase** directly for:
   - User authentication
   - Policy CRUD operations
   - Profile management
   - Document storage

2. **n8n** for workflow automation:
   - Document processing and AI embeddings
   - AI policy advisor functionality
   - Automated notifications
   - Email communications

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

3. Run on iOS or Android:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## Development Status

This project is currently in active development. The component library has been established with foundational UI elements, and screens are being implemented based on the specification.

## Next Steps

- Complete screen implementations
- Implement navigation flows
- Connect to Supabase backend
- Set up n8n workflow integrations
- Implement the AI advisor interface
