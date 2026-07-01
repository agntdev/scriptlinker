# ScriptLinker Bot — Bot specification

**Archetype:** custom

**Voice:** professional and concise — write every user-facing message, button label, error, and empty state in this voice.

Delivers plain-text scripts to users via shareable links. When a user clicks a link containing a script name, the bot sends the corresponding script as a Telegram message or displays it on a web landing page with a Telegram opener button.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- script creators/maintainers
- users needing instant script access

## Success criteria

- Script delivered successfully to 99.9% of valid link clicks within 1 second
- Error messages shown for invalid script names with recovery options
- Admin notifications triggered for all deliveries when enabled

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open main menu or trigger script delivery when used with script name parameter
- **Open in Telegram** (button, actor: web_user, callback: telegram_open) — Convert web landing page view to Telegram message delivery

## Flows

### Script Delivery
_Trigger:_ Link click with script name

1. Parse script name from URL parameter
2. Validate script visibility and access token if private
3. Deliver script text in Telegram message or web view
4. Log delivery event with timestamp and source

_Data touched:_ Script, Link, DeliveryLog

### Error Recovery
_Trigger:_ Invalid script name in link

1. Show 'Script not found' message
2. List up to 10 valid script names
3. Offer help options

_Data touched:_ Script

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **Script** _(retention: persistent)_ — Plain-text script with metadata
  - fields: name (slug), title, body (plain text), description, visibility (public/private)
- **DeliveryLog** _(retention: persistent)_ — Record of script delivery events
  - fields: script_name, timestamp, recipient_telegram_id, source (telegram/web)

## Integrations

- **Telegram** (required) — Bot API messaging and link handling
- **Web Server** (required) — Host landing page for non-Telegram link clicks
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Enable/disable admin notifications
- Set script visibility (public/private)
- Add/remove scripts via admin interface

## Notifications

- Admin chat notifications for script deliveries
- Error alerts for invalid access attempts
- Abuse detection alerts for suspicious activity

## Permissions & privacy

- Telegram user ID collection limited to delivery logs
- Private script access requires token in URL
- Web landing page doesn't require user authentication

## Edge cases

- Invalid script names in URLs
- Private script access without valid token
- High-volume link abuse attempts
- Telegram message delivery limits exceeded

## Required tests

- End-to-end script delivery from link click to message receipt
- Error handling with invalid script names
- Private script access validation with token
- Admin notification system verification

## Assumptions

- Admin interface for script management is pre-implemented
- Script slugs follow lowercase alphanumeric format
- 90-day delivery log retention is acceptable
