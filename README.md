The Street Animal Rescue Platform is a web-based application built for the ABBS Autonomous Hackathon that connects citizens, NGOs, and nearby pet clinics in a single, seamless workflow focused on animal welfare, where users can quickly report distressed street animals by uploading images, adding address details, and pinpointing the exact location on an integrated Google Map; each report becomes visible to relevant NGOs in that city and state, who can claim cases, update rescue statuses, and manage operations through a dedicated, role-based NGO dashboard, while citizens can browse reported animals, track their own reports, and express interest in adoption or other support such as fostering, food, or medical help; powerful filters by city, state, and status enable focused responses to local emergencies, a “Nearby Pet Clinics” feature shows clinics on Google Maps with contact information, secure role-based login provides tailored dashboards for users, NGOs, and admins, a structured database stores users, NGOs, reports, adoption interests, clinics, and notifications to keep the system scalable, and automatic in-app notifications ensure everyone stays informed about new reports, status changes, and adoption interests, demonstrating a professional, socially impactful solution designed during the ABBS Autonomous hackathon.
Along with enabling fast reporting and rescue, the platform is designed to be easy to use on any device so students, residents, and volunteers around ABBS Autonomous can participate without technical barriers, while clean dashboards and Google Maps views help NGOs plan field visits more efficiently by reducing response time and avoiding duplicate efforts between organizations, and by tracking adoption and support interests the system promotes long-term care and rehoming of animals—not just emergency rescue—making it a practical, scalable solution born from the ABBS Autonomous hackathon.
Main items on the page:

Header / Navbar: Links for RESQ home, View Reports, Pet Clinics, Log In, Sign Up.
​

Animal type (title): Shows the reported animal type as “Cat” (tag + heading).
​

Status: Shows current case status as “Open”.
​

Short description: A brief text field (e.g., “wdwdsd”) that looks like the main report description.
​

Condition field: Labeled “Condition:” with text describing animal condition (here “dddhdddddw”).
​

Location details block:

Address/free-text location (e.g., “skksskss”)

City (“Bangalore”)

Contact phone (“983635363”)

Report time (“about 1 hour ago”)
​

Landmark field: Labeled “Landmark:” with extra location hint (e.g., “wswjiw”).
​

Map widget: Interactive map (Leaflet + OpenStreetMap) with a marker and zoom controls.
​

Footer/dev badge: “Edit with Lovable” badge linking to the Lovable project editor.
​

Underlying tools / tech you’re using
Lovable: No-code/low-code builder powering this app (lovable.app editor link).
​

Leaflet: JS map library, providing the map, marker, and zoom UI.
​

OpenStreetMap tiles: Map data/tiles shown inside Leaflet.
​

If you want to “list things and tools” in your project
You could document it like this:

Entities/fields in a report:

Animal type, Status, Description, Condition, Address/Location text, City, Contact number, Report timestamp, Landmark, Geo location (for the map).
​

User roles this page relates to:

Citizen reporting a case (viewer of the confirmation page).

NGO/volunteer viewing details for rescue assignment (same data, maybe with extra internal fields in another view).
​

Core tools/services behind this screen:

Frontend: Lovable-generated React/Next (via lovable.app), Leaflet map component.
​

Maps: Leaflet + OpenStreetMap.
​

Auth & navigation: Log In / Sign Up routes, reports feed, clinics listing.
