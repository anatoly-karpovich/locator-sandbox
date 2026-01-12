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
    title: "Find input by label text",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to find the email input by its label text.",
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
              <input id="email-input" type="email" placeholder="name@example.com" aria-describedby="email-hint" />
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
      editable: true,
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
    id: "6c60d755-8257-4b01-88eb-b53600fa56a3",
    title: "Find required name input by label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to locate the required Full name input.",
    html: `
      <section class="signup-panel">
        <header class="panel-header">
          <h3>Create your account</h3>
          <p class="panel-subtitle">Tell us who will own this workspace.</p>
        </header>
        <form class="signup-form">
          <fieldset class="identity-block">
            <legend>Identity</legend>
            <div class="field">
              <label for="full-name">Full name</label>
              <span class="required-indicator" aria-hidden="true">*</span>
              <input id="full-name" type="text" required />
              <p class="hint">Use your legal name.</p>
            </div>
            <div class="field">
              <label for="display-name">Display name</label>
              <input id="display-name" type="text" />
            </div>
          </fieldset>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      editable: true,
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
    id: "e3a4d7b5-0ea0-4c50-a927-2049b73b106d",
    title: "Find wrapped label input",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Use getByLabel to find an input when the label wraps the control.",
    html: `
      <section class="account-card">
        <header class="card-header">
          <h3>Account basics</h3>
          <p class="card-subtitle">Public details shown to teammates.</p>
        </header>
        <form class="account-form">
          <div class="field">
            <label>
              <span class="label-text">Username</span>
              <input type="text" name="username" />
            </label>
            <p class="hint">Lowercase letters and numbers only.</p>
          </div>
          <div class="field">
            <label for="user-id">User ID</label>
            <input id="user-id" type="text" readonly />
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      editable: true,
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
    id: "0abf0f40-9ae7-448c-8b67-fa9150d56be2",
    title: "Find select by label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to find the Country select element.",
    html: `
      <section class="shipping-panel">
        <header class="panel-header">
          <h3>Shipping details</h3>
          <p class="panel-subtitle">Where should we deliver your order?</p>
        </header>
        <form class="shipping-form">
          <div class="field">
            <label for="country-select">Country</label>
            <select id="country-select">
              <option>USA</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
          <div class="field">
            <label for="region-select">Region</label>
            <select id="region-select">
              <option>West</option>
              <option>Central</option>
              <option>East</option>
            </select>
          </div>
          <div class="field">
            <label for="postal-input">Postal code</label>
            <input id="postal-input" type="text" />
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      enabled: true,
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
    id: "e7ac2f4b-32c6-4971-84f1-a23571412c28",
    title: "Find priority select by label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to locate the Priority select.",
    html: `
      <section class="support-panel">
        <header class="panel-header">
          <h3>Support request</h3>
          <p class="panel-subtitle">Give us details so we can help.</p>
        </header>
        <form class="support-form">
          <div class="field">
            <label for="subject">Subject</label>
            <input id="subject" type="text" />
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea id="message" rows="4"></textarea>
            <p class="hint">Include steps to reproduce.</p>
          </div>
          <div class="field">
            <label for="priority">Priority</label>
            <select id="priority">
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      enabled: true,
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
    id: "8dfb2b95-b3f2-40ba-805c-abd251cf659b",
    title: "Find file upload by label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to find the file upload input.",
    html: `
      <section class="upload-panel">
        <header class="panel-header">
          <h3>Application files</h3>
          <p class="panel-subtitle">Attach documents in PDF or DOCX format.</p>
        </header>
        <form class="upload-form">
          <div class="field">
            <label for="resume-upload">Upload resume</label>
            <input id="resume-upload" type="file" />
          </div>
          <div class="field">
            <label for="cover-upload">Cover letter</label>
            <input id="cover-upload" type="file" />
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      enabled: true,
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
    id: "fb24f6fb-1a8f-478f-bdce-65a476c49e34",
    title: "Find checkbox by label text",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to locate a checked checkbox by its label.",
    html: `
      <section class="consent-panel">
        <header class="panel-header">
          <h3>Agreements</h3>
          <p class="panel-subtitle">Choose what you accept.</p>
        </header>
        <form class="consent-form">
          <fieldset class="consent-list">
            <legend>Terms</legend>
            <label>
              <input type="checkbox" name="terms" checked />
              I agree to terms
            </label>
            <label>
              <input type="checkbox" name="privacy" />
              I accept the privacy policy
            </label>
            <label>
              <input type="checkbox" name="updates" />
              Send product updates
            </label>
          </fieldset>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      checked: true,
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
    id: "8ec105d5-2739-4a90-b1db-3eb5e825f457",
    title: "Find radio button by label text",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to locate the selected plan radio button.",
    html: `
      <section class="plan-panel">
        <header class="panel-header">
          <h3>Choose a plan</h3>
          <p class="panel-subtitle">Pick the option that fits your team.</p>
        </header>
        <form class="plan-form">
          <fieldset class="plan-group">
            <legend>Monthly plans</legend>
            <label>
              <input type="radio" name="plan" />
              Basic plan
            </label>
            <label>
              <input type="radio" name="plan" checked />
              Pro plan
            </label>
            <label>
              <input type="radio" name="plan" />
              Team plan
            </label>
          </fieldset>
          <fieldset class="plan-group">
            <legend>Annual plans</legend>
            <label>
              <input type="radio" name="annual-plan" />
              Starter annual
            </label>
            <label>
              <input type="radio" name="annual-plan" />
              Enterprise annual
            </label>
          </fieldset>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      checked: true,
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
    id: "ebb4bffe-ac4b-4a6b-aa29-dc95559b6348",
    title: "Find input by aria-labelledby",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      'Use getByLabel to locate the input whose accessible name comes from the text "Billing company" via aria-labelledby.',
    html: `
      <section class="billing-panel">
        <header class="panel-header">
          <h3>Billing details</h3>
          <p class="panel-subtitle">Use the name that appears on your invoice.</p>
        </header>
        <form class="billing-form">
          <div class="field">
            <span id="billing-name-label">Billing name</span>
            <input type="text" aria-labelledby="billing-name-label" />
          </div>
          <div class="field">
            <span id="billing-company-label">Billing company</span>
            <input type="text" aria-labelledby="billing-company-label" />
          </div>
          <div class="field">
            <label for="billing-email">Billing email</label>
            <input id="billing-email" type="email" />
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      editable: true,
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
    id: "8e96ecc1-4344-4b3d-889f-37324c920db8",
    title: "Find exact label match",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Use getByLabel with the exact option to match 'Email' when similar labels like 'Email address' and 'Email notifications' are present.",
    html: `
      <section class="emails-panel">
        <header class="panel-header">
          <h3>Email preferences</h3>
          <p class="panel-subtitle">Manage how you hear from us.</p>
        </header>
        <form class="emails-form">
          <div class="field">
            <label for="email-short">Email</label>
            <input id="email-short" type="email" />
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
      editable: true,
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
    id: "2c4f6b0e-0d2f-4f3a-bc9c-4a22b3f1a2d1",
    title: "Find billing city input by label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Use getByLabel to locate the Billing city input.",
    html: `
      <form class="address-form">
        <div class="field">
          <label for="shipping-city">Shipping city</label>
          <input id="shipping-city" type="text" />
        </div>

        <div class="field">
          <label for="billing-city">Billing city</label>
          <input id="billing-city" type="text" />
        </div>

        <div class="field">
          <label for="postal-code">Postal code</label>
          <input id="postal-code" type="text" />
        </div>
      </form>
    `,
    expectations: {
      count: 1,
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
    title: "Match phone extension label with regex",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      'Use getByLabel with a RegExp to match the "Phone extension" label.',
    html: `
      <form class="phones-form">
        <div class="field">
          <label for="phone-us">Phone +1</label>
          <input id="phone-us" type="tel" />
        </div>

        <div class="field">
          <label for="phone-uk">Phone +44</label>
          <input id="phone-uk" type="tel" />
        </div>

        <div class="field">
          <label for="phone-de">Phone +49</label>
          <input id="phone-de" type="tel" />
        </div>

        <div class="field">
          <label for="phone-ext">Phone extension</label>
          <input id="phone-ext" type="text" />
        </div>
      </form>
    `,
    expectations: {
      count: 1,
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
    id: "4c657c71-34e1-4618-9f4d-f69a79c3f1d2",
    title: "Find filter input by hidden label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      'Use getByLabel to locate the "Filter by tag" input whose label is visually hidden in the HTML.',
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
            <label for="filter-tag" class="sr-only">Filter by tag</label>
            <input id="filter-tag" type="text" placeholder="Tag name" />
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
      editable: true,
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
    id: "7a1d34d2-6d71-45fd-9c53-6f08f5f2a8a9",
    title: "Find element by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description: "Use getByTestId to locate the stats card by its data-testid.",
    html: `
      <section class="dashboard">
        <header class="panel-header">
          <h3>Usage overview</h3>
          <p class="panel-subtitle">Last 30 days snapshot.</p>
        </header>
        <div class="stat-grid">
          <div class="stat" data-testid="active-users">Active users</div>
          <div class="stat" data-testid="total-sales">Total sales</div>
          <div class="stat" data-testid="trial-users">Trial users</div>
        </div>
        <div class="dashboard-footer">
          <button type="button">Download report</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Active users",
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
    title: "Find submit button by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description: "Use getByTestId to locate the order submit button.",
    html: `
      <section class="checkout">
        <header class="panel-header">
          <h3>Order summary</h3>
          <p class="panel-subtitle">Review your items before placing the order.</p>
        </header>
        <div class="summary-list">
          <div class="summary-row">
            <span>Items</span>
            <span>3</span>
          </div>
          <div class="summary-row">
            <span>Total</span>
            <span>$128.00</span>
          </div>
        </div>
        <div class="checkout-actions">
          <button data-testid="apply-coupon">Apply coupon</button>
          <button data-testid="submit-order">Place order</button>
          <button type="button">Save for later</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Place order",
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
    id: "a1ea336f-5119-4371-a44b-336dab66fe89",
    title: "Find specific table row by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description: "Use getByTestId to locate the Beta row.",
    html: `
      <section class="plans-panel">
        <header class="panel-header">
          <h3>Plan comparison</h3>
          <p class="panel-subtitle">Choose a tier that fits.</p>
        </header>
        <table class="plans">
          <thead>
            <tr>
              <th>Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr data-testid="plan-row-basic"><td>Basic</td></tr>
            <tr data-testid="plan-row-beta"><td>Beta</td></tr>
            <tr data-testid="plan-row-pro"><td>Pro</td></tr>
            <tr data-testid="plan-row-enterprise"><td>Enterprise</td></tr>
          </tbody>
        </table>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Beta",
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
    id: "dbf54bce-8951-4ce0-ad3e-24a410c1aa48",
    title: "Find editable input by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description: "Use getByTestId to locate the promo code input.",
    html: `
      <section class="promo-panel">
        <header class="panel-header">
          <h3>Apply discounts</h3>
          <p class="panel-subtitle">Enter any codes before checkout.</p>
        </header>
        <form class="promo-form">
          <div class="field">
            <label for="promo-code">Promo code</label>
            <input id="promo-code" type="text" data-testid="promo-code" />
          </div>
          <div class="field">
            <label for="gift-code">Gift code</label>
            <input id="gift-code" type="text" data-testid="gift-code" disabled />
          </div>
          <div class="form-actions">
            <button type="button">Apply</button>
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      editable: true,
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
    id: "d09205ba-9493-4584-8821-d1317ad69f87",
    title: "Find featured cart item by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description: "Use getByTestId to locate the featured cart item row.",
    html: `
      <section class="cart">
        <header class="panel-header">
          <h3>Your cart</h3>
          <p class="panel-subtitle">Items ready for checkout.</p>
        </header>
        <ul class="cart-list">
          <li data-testid="cart-item">
            <span class="item-name">Item A</span>
            <span class="item-qty">1</span>
          </li>
          <li data-testid="cart-item-featured">
            <span class="item-name">Item B</span>
            <span class="item-qty">2</span>
          </li>
          <li data-testid="cart-item">
            <span class="item-name">Item C</span>
            <span class="item-qty">1</span>
          </li>
        </ul>
        <div class="cart-summary">
          <span>Subtotal</span>
          <span>$84.00</span>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Item B",
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
    id: "0daf6c04-4326-4aea-900f-2e2052e8c21d",
    title: "Match help nav test id with regex",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "intermediate",
    description: "Use getByTestId with a RegExp to match the Help nav link.",
    html: `
      <nav class="main-nav" aria-label="Main">
        <div class="nav-brand">
          <a href="/" class="logo">Acme</a>
        </div>
        <div class="nav-links">
          <a href="/" data-testid="nav-home">Home</a>
          <a href="/settings" data-testid="nav-settings">Settings</a>
          <a href="/help" data-testid="nav-help">Help</a>
          <a href="/contact" data-testid="footer-contact">Contact</a>
          <a href="/blog" data-testid="link-blog">Blog</a>
        </div>
        <div class="nav-actions">
          <button type="button" data-testid="user-menu">Account</button>
        </div>
      </nav>
    `,
    expectations: {
      count: 1,
      text: "Help",
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
    id: "b44f5cce-ac37-46e8-be13-602b3d018e75",
    title: "Find hidden toast by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "intermediate",
    description: "Use getByTestId to locate a hidden success toast.",
    html: `
      <section class="toast-area">
        <div class="toasts">
          <div class="toast-stack">
            <div data-testid="toast-success" style="display: none;">Saved</div>
            <div data-testid="toast-error">Failed</div>
            <div data-testid="toast-warning">Pending</div>
          </div>
          <button type="button">Clear all</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      hidden: true,
    },
    usageSpec: {
      method: "getByTestId",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByTestId],
  },
];
