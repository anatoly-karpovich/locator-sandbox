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
    description: "We use getByText to find elements by partial text match. In this task we expect to find 1 element with text 'Welcome to the application'.",
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
    description: "We use getByText to find element by exact text match with option 'exact'",
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
    description: "Use getByRole to find a checkbox element that is checked. Set the 'checked' option to true to find only checked checkboxes.",
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
      }
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5q",
    title: "Find button by role with disabled option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description: "Use getByRole to find a button element that is disabled. Set the 'disabled' option to true to find only disabled elements.",
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
      }
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "b2c3d4e5-f6g7-4h8i-9j0k-l1m2n3o4p5q6r",
    title: "Find button by role with name option using RegExp",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description: "Use getByRole to find a button element by its accessible name using a regular expression. The 'name' option accepts a RegExp to match button names that contain 'submit' or 'save' (case-insensitive).",
    html: `
      <div class="document-editor">
        <h3>Document Editor</h3>
        <div class="toolbar">
          <button type="button" aria-label="Save Document">💾</button>
          <button type="button" aria-label="Review">📤</button>
          <button type="button" aria-label="Print Document">🖨️</button>
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
      }
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "c3d4e5f6-g7h8-4i9j-0k1l-m2n3o4p5q6r7s",
    title: "Find button by role with pressed option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description: "Use getByRole to find a button element that has pressed state. Set the 'pressed' option to true to find buttons that are currently pressed/active.",
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
      }
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
  },
  {
    id: "d4e5f6g7-h8i9-4j0k-1l2m-n3o4p5q6r7s8t",
    title: "Find tab by role with selected option",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description: "Use getByRole to find a tab element that is selected. Set the 'selected' option to true to find only the currently selected tab.",
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
      }
    },
    studyMaterials: [studyMaterials.locatorMethods.getByRole],
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
