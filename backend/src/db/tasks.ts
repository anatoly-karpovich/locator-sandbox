import { studyMaterials } from "@core/tasks/studyMaterials/data.js";
import { Task } from "@core/tasks/types.js";

export const tasks: Task[] = [
  {
    id: "a5d6f5de-385f-4b50-abca-52370d3fb58a",
    title: "Find element by partial text match",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "beginner",
    html: `
        <div class="container">
          <header class="app-header">
            <h1 class="app-title">My Application</h1>
            <nav class="main-nav">
              <ul class="nav-list">
                <li class="nav-item"><a href="#" class="nav-link" data-testid="home-link">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link" data-testid="about-link">About</a></li>
                <li class="nav-item"><a href="#" class="nav-link" data-testid="contact-link">Contact</a></li>
              </ul>
            </nav>
          </header>

          <main class="main-content">
            <section class="hero-section">
              <h2 class="hero-title">Welcome to the application</h2>
              <p class="hero-description">This is a sample application with various elements for testing locator strategies.</p>
              <button class="cta-button" type="button" aria-label="Get started">Get Started</button>
            </section>
          </main>

          <footer class="app-footer">
            <p class="footer-text">© 2024 My Application. All rights reserved.</p>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
            </div>
          </footer>
        </div>
      `,
    expectations: {
      count: 1,
      text: "Welcome to the application",
      visible: true,
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
    description:
      "We use getByText to find elements by partial text match. In this task we expect to find 1 element with text 'Welcome to the application'.",
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
        // match: "partial",
        // value: "Welcome to the application",
      },
    },
  },
  {
    id: "6cf7c8b5-0d3e-4238-9db6-ec981976acba",
    title: "Find element by exact text match",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "beginner",
    description:
      "We use getByText to find element by exact text match with option 'exact'",
    html: `
      <ul class="menu">
        <li>Hello</li>
        <li>Hello World</li>
        <li>Hello Universe</li>
      </ul>
    `,
    expectations: {
      count: 1,
      text: "Hello",
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
  },
  {
    id: "f8a1b2c3-d4e5-4f6g-8h9i-j0k1l2m3n4o5p",
    title: "Find checkbox by role with checked option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description:
      "Use getByRole to find a checkbox element that is checked. Set the 'checked' option to true to find only checked checkboxes.",
    html: `
      <div class="form-container">
        <h3>Task Settings</h3>
        <form class="task-form">
          <div class="checkbox-group">
            <label>
              <input type="checkbox" name="autoSave" checked />
              Enable auto-save
            </label>
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" name="notifications" />
              Enable notifications
            </label>
          </div>
          <button disabled>Save Settings</button>
        </form>
      </div>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByRole",
      argument: {
        type: "string",
      },
      options: {
        checked: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5q",
    title: "Find button by role with disabled option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description:
      "Use getByRole to find a button element that is disabled. Set the 'disabled' option to true to find only disabled elements.",
    html: `
      <div class="user-actions">
        <h3>User Management</h3>
        <div class="action-buttons">
          <button type="button" class="edit-btn">Edit Profile</button>
          <button type="button" class="delete-btn" disabled>Delete Account</button>
          <button type="button" class="save-btn">Save Changes</button>
        </div>
        <div class="user-status">
          <p>Account status: Active</p>
          <button type="button" class="deactivate-btn" disabled>Deactivate</button>
        </div>
      </div>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "getByRole",
      argument: {
        type: "string",
      },
      options: {
        disabled: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "b2c3d4e5-f6g7-4h8i-9j0k-l1m2n3o4p5q6r",
    title: "Find button by role with name option using RegExp",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description:
      "Use getByRole to find a button element by its accessible name using a regular expression. The 'name' option accepts a RegExp to match button names that contain 'submit' or 'save' (case-insensitive).",
    html: `
      <div class="document-editor">
        <h3>Document Editor</h3>
        <div class="toolbar">
          <button type="button" aria-label="Save Document">💾</button>
          <button type="button" aria-label="Review">💾</button>
          <button type="button" aria-label="Print Document">💾</button>
        </div>
        <div class="content">
          <textarea placeholder="Enter your content here..."></textarea>
        </div>
        <div class="actions">
          <button type="button">Cancel</button>
          <button type="button" aria-label="Submit Changes">Submit</button>
        </div>
      </div>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "getByRole",
      argument: {
        type: "string",
      },
      options: {
        name: "/submit|save/i",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "c3d4e5f6-g7h8-4i9j-0k1l-m2n3o4p5q6r7s",
    title: "Find button by role with pressed option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description:
      "Use getByRole to find a button element that has pressed state. Set the 'pressed' option to true to find buttons that are currently pressed/active.",
    html: `
      <div class="text-editor">
        <h3>Text Formatting</h3>
        <div class="format-toolbar">
          <button type="button" aria-pressed="true" aria-label="Bold">B</button>
          <button type="button" aria-pressed="false" aria-label="Italic">I</button>
          <button type="button" aria-pressed="false" aria-label="Underline">U</button>
        </div>
        <div class="editor-content">
          <div contenteditable="true">Sample text content</div>
        </div>
      </div>
    `,
    expectations: {
      count: 1,
      text: "B",
      visible: true,
    },
    usageSpec: {
      method: "getByRole",
      argument: {
        type: "string",
      },
      options: {
        pressed: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "d4e5f6g7-h8i9-4j0k-1l2m-n3o4p5q6r7s8t",
    title: "Find tab by role with selected option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description:
      "Use getByRole to find a tab element that is selected. Set the 'selected' option to true to find only the currently selected tab.",
    html: `
      <div class="tab-container">
        <h3>Settings</h3>
        <div role="tablist" class="tab-list">
          <button role="tab" aria-selected="false" aria-controls="profile-panel">Profile</button>
          <button role="tab" aria-selected="true" aria-controls="security-panel">Security</button>
          <button role="tab" aria-selected="false" aria-controls="notifications-panel">Notifications</button>
        </div>
        <div class="tab-content">
          <div id="profile-panel" role="tabpanel" hidden>Profile settings...</div>
          <div id="security-panel" role="tabpanel">Security settings...</div>
          <div id="notifications-panel" role="tabpanel" hidden>Notification settings...</div>
        </div>
      </div>
    `,
    expectations: {
      count: 1,
      text: "Security",
      visible: true,
    },
    usageSpec: {
      method: "getByRole",
      argument: {
        type: "string",
      },
      options: {
        selected: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "f6c1b5c0-8c0d-4bd4-bf52-15a7f7b88c01",
    title: "Find input by label text (string)",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Use getByLabel when a control has an associated label; it is more stable than placeholders or CSS selectors. Here the label text is 'Email address' and the field contains 'primary@acme.com'.",
    html: `
      <section class="profile-card">
        <header class="card-header">
          <h3>Profile settings</h3>
          <p class="card-subtitle">Update contact details for your account.</p>
        </header>
        <form class="profile-form">
          <fieldset class="form-section">
            <legend>Contact info</legend>
            <div class="field">
              <label for="email-input">Email address</label>
              <textarea id="email-input" aria-describedby="email-hint">primary@acme.com</textarea>
              <p class="hint" id="email-hint">Receipts are sent here.</p>
            </div>
            <div class="field">
              <label for="phone-input">Phone</label>
              <input id="phone-input" type="tel" readonly />
            </div>
          </fieldset>
          <div class="field">
            <label for="timezone">Time zone</label>
            <select id="timezone">
              <option>UTC</option>
              <option>GMT+1</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button">Cancel</button>
            <button type="submit">Save changes</button>
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "primary@acme.com",
    },
    usageSpec: {
      method: "getByLabel",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByLabel],
  },
  {
    id: "6b7b2a1f-1c8b-4dcb-8d6a-5d7e9b3c11a4",
    title: "Find extension field by label using RegExp",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "In this form there are two extension fields: 204 and 2045. Find the field for extension 204 using getByLabel with a RegExp. The label may contain mixed case ('eXt'), extra spaces, or punctuation, so match only the stable parts: the word 'ext' (case-insensitive) and the number 204 as a whole number (avoid matching 2045).",
    html: `
      <form class="phones-form">
        <fieldset class="group">
          <legend>Contact numbers</legend>

          <div class="field">
            <label for="phone-us">Phone +1</label>
            <input id="phone-us" type="tel" placeholder="+1 (555) 123-4567" />
          </div>

          <div class="field">
            <label for="phone-uk">Phone +44</label>
            <input id="phone-uk" type="tel" placeholder="+44 20 1234 5678" />
          </div>

          <div class="field">
            <label for="phone-de">Phone +49</label>
            <input id="phone-de" type="tel" placeholder="+49 30 123456" />
          </div>

          <div class="field">
            <label for="phone-ext">Office eXt .  204</label>
            <textarea id="phone-ext">Ext 204</textarea>
          </div>

          <div class="field">
            <label for="phone-ext-legacy">Office EXT. 2045 (legacy)</label>
            <textarea id="phone-ext-legacy">Ext 2045</textarea>
          </div>
        </fieldset>
      </form>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "Ext 204",
    },
    usageSpec: {
      method: "getByLabel",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByLabel],
  },
  {
    id: "8e96ecc1-4344-4b3d-889f-37324c920db8",
    title: "Find the primary email field",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Email preferences include several similar fields. Target the one that shows 'Primary inbox'.",
    html: `
      <section class="emails-panel">
        <header class="panel-header">
          <h3>Email preferences</h3>
          <p class="panel-subtitle">Manage how you hear from us.</p>
        </header>
        <form class="emails-form">
          <div class="field">
            <label for="email-short">Email</label>
            <textarea id="email-short">Primary inbox</textarea>
          </div>
          <div class="field">
            <label for="email-opt-in">Email notifications</label>
            <input id="email-opt-in" type="checkbox" />
          </div>
          <div class="field">
            <label for="email-long">Email address</label>
            <input id="email-long" type="email" readonly />
          </div>
          <div class="field">
            <label for="email-work">Work email</label>
            <input id="email-work" type="email" />
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "Primary inbox",
    },
    usageSpec: {
      method: "getByLabel",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByLabel],
  },
  {
    id: "4c657c71-34e1-4618-9f4d-f69a79c3f1d2",
    title: "Find the tag filter field",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "In the site search panel, target the tag filter field that currently contains 'Priority'.",
    html: `
      <section class="search-panel">
        <header class="panel-header">
          <h3>Site search</h3>
          <p class="panel-subtitle">Search across pages and docs.</p>
        </header>
        <form class="search-form">
          <div class="field">
            <label for="site-search">Search site</label>
            <input id="site-search" type="search" />
          </div>
          <div class="field">
          <label for="filter-tag">
            Filter by tag
            <span class="helper">(optional)</span>
            <span style="position: absolute; left: -9999px;">, max 3 tags</span>
          </label>
            <textarea id="filter-tag">Priority</textarea>
          </div>
          <div class="field">
            <label for="search-scope">Scope</label>
            <select id="search-scope">
              <option>All content</option>
              <option>Docs</option>
              <option>Projects</option>
            </select>
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "Priority",
    },
    usageSpec: {
      method: "getByLabel",
      argument: {
        type: "string",
      },
      options: {
        exact: false,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByLabel],
  },
  {
    id: "7a1d34d2-6d71-45fd-9c53-6f08f5f2a8a9",
    title: "Find element by test id (string)",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description: "Use getByTestId to locate the Directions button by its data-testid.",
    html: `
      <section class="route-actions">
        <header class="panel-header">
          <h3>Trip planner</h3>
          <p class="panel-subtitle">Pick the next step for your route.</p>
        </header>
        <div class="action-row">
          <button type="button" data-testid="directions">Directions</button>
          <button type="button" data-testid="route-map">Route map</button>
          <button type="button" data-testid="schedule">Schedule</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Directions",
      visible: true,
    },
    usageSpec: {
      method: "getByTestId",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByTestId],
  },
  {
    id: "5194d811-7ceb-4f16-8e0f-e30aa4eefdad",
    title: "Find element by test id with regex (exact match)",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description:
      "Use getByTestId with a RegExp when multiple ids share a prefix and you need to target one. Prefer role/text if available; here match only 'directions' among similar ids.",
    html: `
      <section class="route-panel">
        <header class="panel-header">
          <h3>Navigation tools</h3>
          <p class="panel-subtitle">Quick access to turn-by-turn tools.</p>
        </header>
        <div class="tool-row">
          <button type="button" data-testid="directions">Directions</button>
          <button type="button" data-testid="directions-map">Map</button>
          <button type="button" data-testid="directions-list">Stops</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Directions",
      visible: true,
    },
    usageSpec: {
      method: "getByTestId",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByTestId],
  },
  {
    id: "81f1d3a2-1f2a-4f6c-9b1f-1e8c5a4b3d2f",
    title: "Filter cards with hasText and hasNotText",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description: "We use locator.filter() with hasText and hasNotText when the base locator is easy (like a card class), but we need to keep only items that mention the right text and exclude misleading labels.\n\nTask: target the Pro plan card that is Recommended and not Deprecated. This task expects both parameters together.",
    html: `
      <section class="pricing">
        <article class="plan-card">
          <h3>Starter</h3>
          <p>Great for learning</p>
        </article>
        <article class="plan-card plan-card--pro"><h3>Pro</h3> <p>Best for teams</p> <span class="badge">Recommended</span></article>
        <article class="plan-card"><h3>Pro</h3> <p>Recommended for legacy users</p> <span class="badge badge--muted">Deprecated</span></article>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Pro Best for teams Recommended",
      visible: true,
    },
    usageSpec: {
      method: "filter",
      options: {
        hasText: "Recommended",
        hasNotText: "Deprecated",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
  {
    id: "3a7f0a91-2b0b-4cdd-8c88-7f5a3d2c1b0a",
    title: "Filter cards with has",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description: "We use locator.filter() with has when the base locator is easy but the distinguishing clue is a nested element like a button.\n\nTask: target the order card that contains the Ship now button.",
    html: `
      <section class="orders">
        <article class="order-card"><div class="order-meta"><h3>Order #103</h3> <p>Ready to ship</p></div> <button class="action" type="button">Ship now</button></article>
        <article class="order-card"><div class="order-meta"><h3>Order #104</h3> <p>Ready to ship</p></div></article>
        <article class="order-card"><div class="order-meta"><h3>Order #105</h3> <p>Ready to ship</p></div></article>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Order #103 Ready to ship Ship now",
      visible: true,
    },
    usageSpec: {
      method: "filter",
      options: {
        has: "locator",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
  {
    id: "7a6c2c1e-9b4a-4f2d-8e6b-5d4c3b2a1f0e",
    title: "Filter cards with hasNot",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description: "We use locator.filter() with hasNot when the base locator is easy but we need to exclude cards that contain a specific nested element, like a cancelled badge.\n\nTask: target the order card that does not include a cancelled badge.",
    html: `
      <section class="orders">
        <article class="order-card"><h3>Order #201</h3> <span class="status status--cancelled" aria-label="Cancelled"></span> <p>Refunded</p></article>
        <article class="order-card"><h3>Order #202</h3> <span class="status status--hold">Refunded</span></article>
        <article class="order-card"><h3>Order #203</h3> <span class="status status--cancelled" aria-label="Cancelled"></span> <p>Refunded</p></article>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Order #202 On hold",
      visible: true,
    },
    usageSpec: {
      method: "filter",
      options: {
        hasNot: "locator",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
  {
    id: "6c2f1b0e-4c9d-4a7f-8e6d-2b1c0a9f8e7d",
    title: "Filter visible notice",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description: "We use locator.filter({ visible }) when the base locator matches both visible and hidden elements, and we want to keep only the visible ones.\n\nTask: target the visible Maintenance window notice using filter({ visible: true }).",
    html: `
      <section class="alerts">
        <div class="alert">Maintenance window</div>
        <div class="alert" style="display: none;">Maintenance window</div>
        <div class="alert">Backup completed</div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Maintenance window",
      visible: true,
    },
    usageSpec: {
      method: "filter",
      options: {
        visible: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  }
];
