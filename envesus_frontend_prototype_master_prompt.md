# MASTER PROMPT — ENVE SUS SMART WASTE MANAGEMENT FRONTEND PROTOTYPE

## 1. Project Objective

Improve the existing Envesus Smart Waste Management Dashboard into a polished, interactive frontend prototype that accurately communicates the intended product experience.

**Existing prototype:** https://envesus-dashboard-ui-v9su.vercel.app/

This is a frontend prototype, not a fully implemented production system. The objective is to demonstrate the product's intended functionality, workflows, data relationships, and user experiences without introducing unnecessary backend infrastructure.

Act as a senior frontend engineer and UI/UX designer. Inspect the existing application, understand its current functionality, and enhance it incrementally.

The prototype must communicate three distinct experiences:

1. **Admin:** Oversees bins, routes, fleet status, collection operations, and staff/driver assignments.
2. **Collection Staff:** Views bins in their assigned region and confirms whether a bin has been collected.
3. **Driver:** Views an assigned collection route and its progress but cannot confirm bin collection.

The result should be a convincing, functional frontend demonstration of the intended product, not a collection of disconnected static screens.

## 2. Keep the Existing Prototype Simple

Do not turn this project into a production backend application.

Do not introduce a new backend, database server, complex authentication infrastructure, live GPS tracking, IoT integrations, or external routing services unless they are already part of the prototype and are necessary to preserve existing functionality.

Prefer the existing frontend framework, components, styling, and libraries.

Use lightweight frontend state, local mock data, and browser-local persistence where useful.

The prototype should:

- Look and behave like a realistic operational dashboard.
- Have working navigation and interactive controls.
- Demonstrate how route optimization, fleet status, bin assignments, and collection confirmation are intended to work.
- Use consistent data across the Admin, Collection Staff, and Driver interfaces.
- Clearly distinguish demonstrated or simulated functionality from real live integrations.

Avoid unnecessary engineering complexity. Prioritize clarity, visual quality, coherent workflows, and realistic demonstrations.

## 3. Audit the Existing Frontend Before Making Changes

Open the existing prototype and inspect every accessible section, navigation item, tab, button, filter, modal, chart, map, and interactive element.

Inspect the source code to understand the current:

- Framework and project structure.
- Routing and navigation.
- Components and design system.
- Existing bin data and geographical coordinates.
- Route Optimisation section.
- Fleet Status section.
- Dashboard cards and analytics.
- Available user-management interfaces.
- Current mock-data structure.
- Responsive behavior.

Preserve the existing design identity, working features, and page structure wherever possible.

Do not replace the application with a generic dashboard template or rebuild unrelated sections.

Before coding, identify the smallest set of changes required to deliver the requested experience.

## 4. Preserve the Existing 60-Bin Dataset

The prototype already represents 60 bins with exact geographical locations and useful operational information.

**Use the existing 60-bin dataset as the source of truth for the prototype.**

- Preserve all existing bin IDs.
- Preserve exact registered latitude and longitude values.
- Preserve existing bin attributes, fill levels, and operational information wherever available.
- Reuse existing records across all three user interfaces.
- Do not invent replacement bin locations.
- Do not create duplicate bins.
- Do not replace the existing dataset with generic or randomly generated locations.
- Do not hardcode different bin datasets into individual pages.

First inspect where the existing records are stored. Reuse the current data source or move the existing records into a shared frontend data module if necessary.

If the source already contains all 60 bins, retain those records. If only a partial dataset is accessible, report that limitation rather than inventing the missing locations.

You may use clearly identified sample values for missing demonstration fields, such as a driver's name, vehicle status, or collection timestamp, but do not misrepresent them as actual live operational data.

## 5. Admin Dashboard — Preserve and Improve

Keep the existing Admin dashboard largely unchanged.

Preserve its current:

- Colour palette.
- Typography.
- Icons.
- Branding.
- Navigation.
- Cards and charts.
- Existing content.
- Working interactions.

Make only the necessary functional and responsive improvements.

The primary changes to the Admin experience are:

1. Improve Route Optimisation using the existing bin locations.
2. Improve Fleet Status to demonstrate meaningful fleet and route information.
3. Add simple staff and driver assignment controls where needed.
4. Make the entire admin interface responsive across mobile, iPad/tablet, and desktop.

Do not redesign unrelated pages or introduce unnecessary new features.

## 6. Route Optimisation — A Realistic Frontend Demonstration

Enhance the existing Route Optimisation section to demonstrate how the system will allocate collection work using the existing 60 bins.

Use the actual registered coordinates when plotting bins on the map.

The interface should demonstrate:

- Existing bin locations.
- Bin IDs and fill levels.
- Collection priority.
- Region or area grouping.
- Route order.
- Assigned collection staff.
- Assigned driver.
- Assigned vehicle, where applicable.
- Route progress.
- Total bins assigned to a route.
- Estimated distance and duration, if the prototype has sufficient information to calculate or reasonably demonstrate these values.

### Route optimization interaction

Provide a working frontend demonstration in which the administrator can:

1. View the existing bins on the map.
2. Select or filter bins by region, fill level, or collection priority.
3. Trigger a route optimization action.
4. See the proposed order of collection stops.
5. Review the resulting route and its assigned bins.
6. Assign the route to a collection staff member and driver.
7. See the updated assignment in the corresponding dashboards.

Use a lightweight client-side algorithm to generate a plausible route order from the actual bin coordinates. For example, a nearest-neighbour heuristic can demonstrate stop ordering without requiring an external routing service.

Do not claim this is a globally optimal road route. If road-network information is not available, label the result as a proposed or estimated route rather than a verified driving route.

Do not invent new bin coordinates to make route generation easier.

The purpose is to demonstrate the intended feature and its interaction flow, not to build a complete vehicle-routing optimization engine.

## 7. Fleet Status — Demonstration Data Only

Keep the existing Fleet Status section and enhance it to show how an administrator would monitor collection operations.

Where appropriate, display:

- Vehicle identifier.
- Assigned driver.
- Assigned route.
- Route status.
- Completed and remaining stops.
- Collection progress.
- Last known location, only when supported by the available data.
- Relevant operational status.

Use existing prototype data where possible. For additional fields, use a small, consistent set of clearly understood demonstration records.

Do not implement real GPS tracking, telemetry ingestion, or vehicle monitoring infrastructure.

Do not fabricate live vehicle movement or label sample values as live data.

Where the interface demonstrates a future integration, use an appropriate label such as "Demo data", "Simulated status", or "Live tracking not connected".

The objective is to communicate the intended Fleet Status experience clearly.

## 8. Collection Staff Dashboard — Mobile-Only UI

Create a separate Collection Staff dashboard within the same frontend application.

This dashboard must remain phone-sized even when opened on a desktop or laptop.

On desktop, centre the mobile-width interface rather than stretching it across the entire screen.

Use the existing Envesus design system and brand identity.

### Staff dashboard content

Show:

- Staff name.
- Assigned region.
- Assigned route or collection area.
- Number of assigned bins.
- Bins that require collection.
- Fill-level indicators.
- Critical or high-priority bins.
- Completed collection tasks.
- Remaining collection tasks.
- A list or map of assigned bins.
- Last update or synchronization time where useful.

The staff member should only see the bins assigned to their demonstration region.

Use the Admin's route and assignment state to determine which bins appear in this dashboard.

### Collection confirmation

Each eligible bin should have a clear collection action.

When the staff member confirms a collection:

1. Update that bin's collection status in the shared frontend state.
2. Update the staff dashboard's completed and remaining counts.
3. Update route progress.
4. Update the Admin dashboard's relevant status.
5. Update the Driver dashboard's view of collection progress.
6. Show clear confirmation feedback.

For this prototype, collection confirmation may update in-memory state or browser-local storage. There is no need to implement a production database or backend API.

The action should be reversible through an appropriate demo reset or correction workflow if needed.

Do not change the bin's registered geographical coordinates or ID when its collection status changes.

## 9. Driver Dashboard — Mobile-Only UI

Create a separate Driver dashboard within the same frontend application.

It must also remain phone-sized when viewed on a desktop or laptop.

### Driver dashboard content

Show:

- Driver name.
- Assigned vehicle, where available.
- Assigned route.
- Ordered collection stops.
- Current stop.
- Next stop.
- Remaining stops.
- Route progress.
- Bin IDs and their registered locations.
- Collection status for each stop.
- Estimated distance or duration where supported.

The driver must see the route assigned through the Admin's Route Optimisation workflow.

The stop list and map should use the same shared bin and route data as the Admin and Collection Staff dashboards.

Provide a clear way to inspect a stop and, where useful, open its location in an external map application.

### Strict collection-permission rule

**The Driver must not have a button or action to confirm whether a bin has been collected.**

The driver can view whether collection has been completed by authorized staff, but cannot modify the collection status.

Do not display the staff-only collection-confirmation controls in the Driver dashboard.

This restriction must be represented consistently in the prototype's UI and interaction logic. Production authorization will require a separate backend implementation in the future.

## 10. Shared Frontend State and Data Consistency

The three dashboards must behave as parts of one application.

Use a shared frontend data model or state store rather than separate copies of the same records.

At minimum, keep consistent:

- Bin records and coordinates.
- Bin fill levels and statuses.
- Region assignments.
- Route stops and ordering.
- Staff assignments.
- Driver assignments.
- Collection confirmation status.
- Route progress.

For example, when an administrator assigns a route, the staff and driver dashboards should immediately reflect that assignment.

When staff confirm a collection, the Admin and Driver interfaces should display the updated status.

Use the simplest state-management approach that fits the existing application. Existing React state, Context, or an already-installed state-management library is sufficient.

Use browser-local persistence if the prototype should retain changes after a page refresh. If local persistence is implemented, provide a way to reset the demonstration to its original state.

Do not introduce a backend merely to synchronize state between pages in the same frontend prototype.

## 11. User Role Selection and Navigation

Demonstrate the three roles:

- Admin.
- Collection Staff.
- Driver.

Use the existing login or role-selection interface if available. Otherwise, introduce a simple prototype-only role switcher or demo login flow.

The goal is to let reviewers easily explore each role without implementing a complete authentication system.

When a role is selected:

- Display the appropriate dashboard.
- Show only the relevant navigation and actions.
- Preserve the shared application state.
- Make it easy to switch between roles during a demonstration.

Clearly treat this as prototype navigation, not secure production authentication.

Do not build password-reset infrastructure, OAuth flows, permission-management servers, or other production authentication features for this task.

## 12. Admin Responsive Design — Mobile, iPad, and Desktop

Use the supplied SellRecord mobile dashboard image as inspiration for layout proportions, spacing, card sizing, typography scale, and information hierarchy.

Do not copy its brand colours, icons, typography, or content.

Retain the existing Envesus visual identity.

### Mobile

- Collapse or adapt the existing navigation.
- Stack cards and content sections where appropriate.
- Reduce excessive margins and padding.
- Maintain readable text and touch-friendly controls.
- Adapt charts and tables.
- Prevent horizontal overflow.
- Keep maps usable.
- Divide dense content into logical sections when necessary.
- Preserve access to all important admin functions.

### iPad and tablet

- Use two-column layouts where appropriate.
- Make better use of the available width than on a phone.
- Adapt charts, tables, navigation, and map layouts.
- Support portrait and landscape orientations.
- Avoid forcing a desktop layout onto a tablet.

### Desktop

- Preserve the existing desktop layout and visual structure.
- Use available space efficiently.
- Do not redesign unrelated pages.

Use responsive CSS and the existing styling framework. Test representative viewport widths instead of relying on a single mobile screenshot.

## 13. Strict Mobile Layout for Staff and Driver

The Staff and Driver interfaces have a different requirement from Admin.

They must remain mobile-width interfaces at every viewport size.

On desktop:

- Centre the dashboard.
- Keep the content inside a realistic phone-width container.
- Preserve the mobile navigation and information hierarchy.
- Do not expand cards to fill the desktop screen.
- Do not transform the interface into a desktop sidebar dashboard.

The width restriction must apply to the actual content layout, not just to a decorative phone frame.

Use mobile-friendly spacing, typography, cards, map sections, and touch controls.

## 14. Keep the Prototype Lightweight

Do not add unnecessary complexity.

Prefer:

- Existing components and libraries.
- Shared frontend state.
- Local mock data for missing demonstration fields.
- Existing bin records and coordinates.
- Lightweight client-side route ordering.
- Local storage for optional demo persistence.
- Reusable UI components.
- Simple role switching.
- Existing maps and chart components, if available.

Avoid:

- Building a new backend.
- Adding a new production database.
- Implementing real-time IoT integrations.
- Implementing live fleet tracking.
- Integrating external routing APIs solely for the prototype.
- Creating complex authentication and authorization infrastructure.
- Adding unnecessary dependencies.
- Rewriting the application from scratch.
- Replacing existing working features with static mockups.

If a feature cannot be genuinely implemented within the frontend prototype, demonstrate its intended UI honestly and label the limitation.

## 15. Visual Quality and Interaction Requirements

Every important interactive control should work within the prototype.

Examples include:

- Navigation links.
- Role switching.
- Filters.
- Search.
- Route optimization.
- Route assignment.
- Bin detail views.
- Collection confirmation.
- Route progress updates.
- Relevant dashboard counters.
- Modals and dropdowns.
- Reset-demo controls, if implemented.

Avoid decorative buttons that do nothing.

Use clear loading, empty, success, and error states where appropriate.

Maintain a consistent design system across all three roles while giving each role the right information density.

Do not change the Envesus colour palette or typography merely to imitate the reference image.

## 16. Testing and Verification

After implementation, verify the following.

### Admin

- Existing dashboard sections still work.
- Existing bin data remains intact.
- Route optimization uses the registered bin coordinates.
- Route assignment updates shared state.
- Fleet Status uses coherent demonstration data.
- Mobile, tablet, and desktop layouts work.

### Collection Staff

- The dashboard remains mobile-sized on desktop.
- The assigned region and bin list are correct.
- Collection confirmation updates shared state.
- Related dashboard counts and statuses update.
- The staff interface does not modify bin IDs or coordinates.

### Driver

- The dashboard remains mobile-sized on desktop.
- The correct assigned route is displayed.
- Stop order and collection status are consistent.
- The driver cannot confirm a collection.
- Route changes made by the Admin are reflected.

### Shared data

- All roles reference the same bin records.
- Bin locations remain unchanged.
- No duplicate bin records are introduced.
- Route assignments reference existing bins.
- Collection status remains consistent across the application.
- Refresh behavior works as intended if persistence is implemented.

### Responsive testing

Test representative viewport widths:

- 320–375 px.
- 390–430 px.
- 768 px.
- 820–1024 px.
- 1280 px and above.

Check portrait and landscape layouts where appropriate, horizontal overflow, clipped cards, unreadable text, broken maps, and inaccessible controls.

Fix issues before considering the prototype complete.

## 17. Implementation Sequence

Work in this order:

**Phase 1 — Inspect**

Understand the existing frontend, its sections, its components, and its bin data.

**Phase 2 — Shared data**

Preserve the existing 60 bins and establish a shared frontend state model.

**Phase 3 — Admin improvements**

Update Route Optimisation and Fleet Status with coherent, location-based demonstration behavior. Add the minimum necessary assignment controls.

**Phase 4 — Collection Staff**

Build the mobile-only staff dashboard and working collection-confirmation interaction.

**Phase 5 — Driver**

Build the mobile-only driver dashboard and route-visibility workflow, without collection-confirmation controls.

**Phase 6 — Responsive design**

Improve the existing Admin layout for mobile, iPad/tablet, and desktop while preserving its visual identity.

**Phase 7 — Verification**

Test the workflows, shared state, permissions represented in the UI, data preservation, and responsive layouts.

Make incremental changes. Avoid replacing working components unless necessary.

## 18. Definition of Done

The prototype is complete when:

- The existing 60-bin dataset and exact coordinates are preserved.
- Route Optimisation demonstrates route ordering using those actual locations.
- Fleet Status communicates the intended operational workflow without pretending to have live tracking.
- Admin can demonstrate route and region assignments.
- Collection Staff can view assigned bins and confirm collection.
- Driver can view assigned routes and collection progress but cannot confirm collection.
- Changes are reflected consistently across all three dashboards.
- Admin works across mobile, iPad/tablet, and desktop.
- Staff and Driver remain mobile-sized on every screen.
- Existing admin functionality and design identity are preserved.
- Interactive controls work as intended.
- No unnecessary backend or infrastructure has been introduced.
- The implementation and its limitations are clearly documented.

## Final Instruction

Build a **simple, polished, interactive frontend prototype** that accurately communicates the intended Envesus Smart Waste Management product.

Do not overengineer it.

Do not build a production backend.

Do not replace the existing 60-bin data.

Do not redesign the existing Admin dashboard unnecessarily.

Focus on a coherent demonstration of the actual product idea: existing bin locations, meaningful route optimization, fleet visibility, region-based staff assignments, driver navigation, collection confirmation, and responsive dashboards.

Start by inspecting the existing codebase and then implement the smallest set of changes needed to achieve this experience.
