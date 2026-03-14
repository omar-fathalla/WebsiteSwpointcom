1. Color System (The Tonal Palette)
MD3 uses a functional color system based on Tonal Palettes. Do not use random hex codes; use roles:

Primary: Use for main actions (e.g., "Hire Me" button).

Surface: Use for the page background.

Surface Container: Use for cards and navigation bars.

On-Surface / On-Primary: High-contrast text colors that sit on top of their respective backgrounds.

Outline / Outline Variant: Used for borders and decorative dividers.

Pro Tip: Use the Material Theme Builder to generate a "Switch Point" brand palette (Deep Blues/Teals) that maintains accessible contrast ratios (WCAG AA).

2. Typography Hierarchy
MD3 replaces "Headline 1" with a more descriptive scale. Stick to these for your portfolio:
Role,Size,Weight,Use Case
Display Large,57pt,Bold,Hero Section Title (Switch Point)
Headline Medium,28pt,Semi-Bold,Project Titles (Tashil Delegate)
Title Medium,16pt,Medium,Card Headers / Sub-sections
Body Large,16pt,Regular,Project Descriptions
Label Small,11pt,Medium,"Tech Tags (Flutter, Firebase)"

3. Cards & Containers
In MD3, cards have specific "Elevations" (0 to 5) and rounded corners.

Corner Radius: Standard is 12dp for medium components (cards) or 16dp for large sections.

Elevated Card (Level 1): Use a subtle shadow and a slightly lighter surface color than the background.

Filled Card: Use a container color (Surface Container Low) with no shadow but a subtle 1dp outline for a "Clean Tech" look.

Padding: Internal card padding should be 16dp or 24dp.

Dividers: Use the Outline Variant color. Keep them thin (1dp) and avoid full-width lines; use "Inset Dividers" to keep the UI modern.

Icons: Use Material Symbols (Rounded). Ensure they are consistently weighted (usually 24px optical size).
Micro-interactionsState Layers: When a user hovers over a project card, apply a +8% opacity overlay of the Primary color (the "State Layer") rather than just changing the shadow.Shape Morphing: Use the MD3 "Standard Easing" ($t = 300ms$) when expanding a project card to show details.
