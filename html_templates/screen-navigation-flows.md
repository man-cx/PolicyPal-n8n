# PolicyPal Screen Navigation Flows

This document outlines the navigation paths and user flows through the PolicyPal application, showing how screens connect to create a cohesive user experience.

## Screen Hierarchy Diagram

```
                          +--------------+
                          |   welcome    |
                          +--------------+
                                 |
                                 v
+--------------+        +--------------+
|     tour     |<-------+   language   |
+--------------+        +--------------+
                                 |
                                 v
                          +--------------+
                          |   register   |
                          +--------------+
                                 |
                                 v
                          +--------------+
                          |    verify    |
                          +--------------+
                                 |
                                 v
                          +--------------+
                          |    terms     |
                          +--------------+
                                 |
                                 v
+--------------+    +--------------+    +--------------+    +--------------+    +--------------+
|  dashboard   |<-->|  policy-list |<-->|   advisor    |<-->|    share     |<-->|   profile    |
+--------------+    +--------------+    +--------------+    +--------------+    +--------------+
       |                   |                                        |                  |
       |                   |                                        |                  |
       v                   v                                        |                  v
+--------------+    +--------------+                               |          +--------------+
| policy-search|    |policy-details|<-------------------------------+          | help-center  |
+--------------+    +--------------+                                          +--------------+
       |                   |                                                         |
       |                   |                                                         |
       v                   v                                                         v
+--------------+    +--------------+                                         +--------------+
|searched items|    | edit-policy  |                                         |    faqs      |
+--------------+    +--------------+                                         +--------------+
                           |
                           |
                           v
                    +--------------+                                         +--------------+
                    |document-upload|                                        |contact-support|
                    +--------------+                                         +--------------+
                                                                                    ^
                                                                                    |
                                                                           +--------------+
                                                                           | edit-profile |
                                                                           +--------------+
                                                                                    ^
                                                                                    |
                                                                           +--------------+
                                                                           |   settings   |
                                                                           +--------------+
                                                                                    ^
                                                                                    |
                                                                           +--------------+
                                                                           |    about     |
                                                                           +--------------+
```

## 1. Onboarding Flow

```
welcome.html → language.html → register.html → verify.html → terms.html → dashboard.html
```

**Description:**
1. Users start at the Welcome screen with an introduction to PolicyPal
2. They select their preferred language (English, Traditional Chinese, Simplified Chinese)
3. They register with email and password
4. They verify their email address with a verification code
5. They accept the terms and privacy policy
6. Upon completion, they are directed to the Dashboard (home screen)

**Alternative Paths:**
- From any onboarding screen, users can navigate back to the previous screen
- New users may see the `tour.html` screen after completing onboarding

## 2. Main Navigation

The main app uses a bottom navigation bar with five primary destinations:

```
dashboard.html ↔ policy-list.html ↔ advisor.html ↔ share.html ↔ profile.html
```

These screens are always accessible via the bottom navigation bar from anywhere in the main application.

## 3. Policy Management Flow

### 3.1 Viewing and Adding Policies

```
dashboard.html → policy-list.html → [add-policy.html OR policy-details.html]
```

**Description:**
1. From the Dashboard, users can navigate to the Policy List screen 
2. From Policy List, users can either:
   - Add a new policy via the add button (→ add-policy.html)
   - View details of an existing policy (→ policy-details.html)

### 3.2 Policy Details Flow

```
policy-list.html → policy-details.html → [edit-policy.html OR document-upload.html OR share.html]
```

**Description:**
1. From Policy Details, users can:
   - Edit the policy information (→ edit-policy.html)
   - Upload policy documents (→ document-upload.html)
   - Share the policy with others (→ share.html)

### 3.3 Policy Search Flow

```
policy-list.html → policy-search.html → policy-details.html
```

**Description:**
1. From Policy List, users can access advanced search
2. After searching, users can select a policy from results
3. This takes them to the Policy Details screen

## 4. AI Advisor Flow

```
dashboard.html OR policy-details.html → advisor.html
```

**Description:**
1. Users can access the AI Advisor from the Dashboard or directly from Policy Details
2. In the Advisor, users ask questions and receive responses
3. Users can provide feedback on AI responses within the same screen

## 5. Policy Sharing Flow

```
policy-details.html → share.html
```
OR
```
dashboard.html → share.html
```

**Description:**
1. Users can share policies either from Policy Details or from the Share tab in bottom navigation
2. In the Share screen, users can:
   - Share a new policy with a contact
   - Manage existing shared policies
   - View the activity log of shared policies

## 6. Profile and Settings Flow

### 6.1 Profile Management

```
dashboard.html → profile.html → [edit-profile.html OR settings.html OR about.html]
```

**Description:**
1. From the Profile screen, users can:
   - Edit their profile information (→ edit-profile.html)
   - Access app settings (→ settings.html)
   - View app information (→ about.html)

### 6.2 Settings Flow

```
profile.html → settings.html
```

**Description:**
1. In Settings, users can modify:
   - Language preferences
   - Theme options (light/dark)
   - Notification settings

## 7. Help and Support Flow

```
profile.html → help-center.html → [faqs.html OR contact-support.html]
```

**Description:**
1. From Profile, users access the Help Center
2. From Help Center, users can:
   - Browse frequently asked questions (→ faqs.html)
   - Contact support for assistance (→ contact-support.html)

## 8. Common Modal Flows

Throughout the app, several modal screens appear contextually:

1. **Confirmation Dialogs**: Appear when users perform critical actions (delete policy, log out)
2. **Success Messages**: Shown after completing actions successfully
3. **Error Messages**: Displayed when actions cannot be completed
4. **Loading Indicators**: Shown during data fetching or processing operations

## 9. Back Navigation

Most screens (except the main navigation tabs) include a back button in the top-left corner, allowing users to return to the previous screen.

## 10. App Tour Flow

```
dashboard.html (first login) → tour.html → dashboard.html
```

**Description:**
1. First-time users are guided through key app features via the tour
2. Users can skip the tour at any point
3. After completing or skipping the tour, users return to the Dashboard 