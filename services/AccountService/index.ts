import express from 'express'
import helmet from 'helmet'
import { SetupLogging } from './Logging.middleware'
import { setupAuth } from './Authentication.middleware'
import routes from './RoutesRegistry'

/*
1. User Data:

User profiles: Store user-specific information, including username, email, name, and custom attributes.
User credentials: Store username/password combinations, social login tokens, or other authentication methods.
User roles and permissions: Define user roles and map them to specific permissions or scopes.
2. Applications and Clients:

Represent the applications or clients that interact with Auth0.
Store client credentials, allowed grant types, and redirect URIs.
3. Tokens and Sessions:

Access Tokens: Generate and manage access tokens for authorized users or clients.
Refresh Tokens: Handle long-term authentication by allowing clients to obtain new access tokens without user interaction.
ID Tokens: Include user information and authentication details to be used in client applications.
4. Authorization Policies:

Define authorization rules and policies that determine which users or clients can access specific resources.
Manage role-based access control (RBAC) and attribute-based access control (ABAC) policies.
5. Connections:

Represent the identity providers (e.g., LDAP, social logins, SAML, OIDC) that Auth0 supports.
Store configuration details for each connection.
6. Hooks and Rules:

Define custom hooks and rules to extend Auth0's behavior, including custom authentication, authorization, or token issuance logic.
7. Audit Logs and Logging:

Log all significant events, including authentication attempts, token issuance, and changes to user profiles or configurations.
8. Tokens Blacklist:

Maintain a blacklist of revoked or invalidated tokens to prevent their reuse.
9. Data Storage and Integration:

Integrate with databases or external systems to store user-related data and synchronize user information.
10. Metadata:

Store metadata about users, clients, and connections for administrative purposes.
11. Security Measures:

Implement security features such as multi-factor authentication (MFA), brute-force protection, and rate limiting.
12. Reporting and Analytics:

Collect and store data for reporting and analytics to monitor system usage and user behavior.
13. Configuration Settings:

Store global and per-tenant configuration settings, including custom branding and theming options.
14. Tenant Management:

Support multi-tenancy by managing separate data stores and configurations for each tenant.
15. Authentication Logs:

Store logs of authentication events, including successful and failed login attempts.
16. Geolocation Data:

Optionally, store geolocation data for login events for security analysis.
17. OAuth 2.0 and OIDC Data:

Implement OAuth 2.0 and OpenID Connect (OIDC) endpoints and data structures for token issuance and user authentication.
18. Notifications and Emails:

Store templates and settings for sending email notifications, including password reset emails and email verification messages.
*/

const app = express()
const port = 3040


// Basic
// ==============================
app.use(express.json())
app.use(helmet())

// Logger
// ==============================
SetupLogging(app)


// Rate Limit
// ==============================
setupAuth(app, routes)



// Fallback
// ==============================

// TODO expose a derived object, and let the frontend check status so it doesnt block server side
app.get('/', (req:any, res:any)=> {
	res.json(routes)
})

app.listen(port, ()=>{
	console.log(`API Gateway Started at port ${port}`)
})
