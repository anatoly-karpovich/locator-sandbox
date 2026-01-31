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
          <button type="button" aria-label="Save Document">??</button>
          <button type="button" aria-label="Review">??</button>
          <button type="button" aria-label="Print Document">??</button>
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
    id: "4a173978-8e26-4fc3-9cea-9c6a1710e25f",
    title: "Find input by placeholder text",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description: 'Find the email input by its placeholder "name@example.com".',
    html: `
      <section class="newsletter-panel">
        <header class="panel-header">
          <h3>Newsletter signup</h3>
          <p class="panel-subtitle">Get weekly updates.</p>
        </header>
        <form class="newsletter-form">
          <div class="field">
            <input type="text" placeholder="Full name" />
          </div>
          <div class="field">
            <input type="email" placeholder="name@example.com" />
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      placeholder: "name@example.com",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "76472bf8-9b69-4878-9872-235bb9cd0b1f",
    title: "Match placeholder with regex",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description: "Find the order input whose placeholder contains the number 2048 (use a RegExp).",
    html: `
      <section class="orders-panel">
        <header class="panel-header">
          <h3>Order lookup</h3>
          <p class="panel-subtitle">Enter the order number.</p>
        </header>
        <form class="orders-form">
          <div class="field">
            <label for="order-a">Order A</label>
            <input id="order-a" type="text" placeholder="Order #1024" />
          </div>
          <div class="field">
            <label for="order-b">Order B</label>
            <input id="order-b" type="text" placeholder="Order #2048" />
          </div>
          <div class="field">
            <label for="order-c">Order C</label>
            <input id="order-c" type="text" placeholder="Order #4096" />
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      placeholder: "Order #2048",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "04087c58-91f7-4c09-8946-c62b6e49fe76",
    title: "Find input by exact placeholder match",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description: 'Find the single input with the exact placeholder "Search".',
    html: `
      <section class="search-panel">
        <header class="panel-header">
          <h3>Search</h3>
          <p class="panel-subtitle">Find content quickly.</p>
        </header>
        <div class="search-fields">
          <input type="search" placeholder="Search" />
          <input type="search" placeholder="Search docs" />
          <input type="search" placeholder="Search tickets" />
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      placeholder: "Search",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "35f43500-6a2a-47be-a7f7-9c173c57e107",
    title: "Find input by partial placeholder match",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      "Find the mobile phone input. The placeholder has some extra text, so match the part that clearly points to it.",

    html: `
  <section class="contact-form">
  <h2>Contact Information</h2>
  <p>Please provide your phone numbers so we can reach you if needed.</p>

  <div class="phone-fields">
    <input type="tel" placeholder="Phone number (home)" name="phone-home" />
    <input type="tel" placeholder="Phone number (mobile)" name="phone-mobile" />
    <input type="tel" placeholder="Phone number (work)" name="phone-work" />
  </div>
</section>
`,
    expectations: {
      count: 1,
      placeholder: "Phone number (mobile)",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "string",
      },
      options: {
        exact: false,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
    {
    id: "9baf3ec8-3a9b-4b62-8455-96b2c48fcd13",
    title: "Find order input by dynamic placeholder",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the order number input. The placeholder starts with "Order #" but contains a changing number. Match it using a regular expression.',

    html: `
    <div class="container">
      <header class="app-header">
        <h1>Order Tracking</h1>
      </header>

      <main class="main-content">
        <section class="track-form">
          <h2>Track your order</h2>
          <p>Please enter your order number below:</p>
          <input type="text" name="orderId" placeholder="Order #84539" />
          <button>Track</button>
        </section>
      </main>

      <footer class="app-footer">
        <p>Need help? <a href="#">Contact support</a></p>
      </footer>
    </div>
  `,

    expectations: {
      count: 1,
      placeholder: "Order #84539",
      visible: true,
    },

    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "7e1a1878-0ef4-49fc-a8b6-d34977d42937",
    title: "Find 6-digit code input",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      "Find the input field for a 6-digit verification code. The digits change every time, so use a regular expression to match the pattern.",

    html: `
    <div class="container">
      <header><h1>Two-Factor Authentication</h1></header>

      <main>
        <section class="code-entry">
          <p>A 6-digit code was sent to your device.</p>
          <input type="text" placeholder="Code: 123456" maxlength="6" />
          <button>Submit</button>
        </section>
      </main>

      <footer><p>Security powered by Acme Inc.</p></footer>
    </div>
  `,

    expectations: {
      count: 1,
      placeholder: "Code: 123456",
      visible: true,
    },

    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },

    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "8f2a5d9b-5391-4c94-88db-457b3fe97d5c",
    title: "Find company name input with optional hint",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the company name input. The placeholder includes "(optional)", but that part might vary. Use a regular expression that matches both cases.',

    html: `
    <div class="container">
      <header><h1>Organization Setup</h1></header>

      <main>
        <section class="company-form">
          <p>Tell us about your company.</p>
          <form>
            <input type="text" name="companyName" placeholder="Company name (optional)" />
            <input type="text" name="industry" placeholder="Industry" />
          </form>
        </section>
      </main>

      <footer><p>Step 1 of 3</p></footer>
    </div>
  `,

    expectations: {
      count: 1,
      placeholder: "Company name (optional)",
      visible: true,
    },

    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },

    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "d8d7a8ce-07f7-4456-bc5a-f53d1685f984",
    title: "Find input with special character in placeholder",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the input for company and department. The placeholder includes a special character "&". Match it using a regular expression.',

    html: `
    <div class="container">
      <header><h1>Employment Info</h1></header>

      <main>
        <section class="employment-form">
          <form>
            <label for="company-dept">Company and Department</label>
            <input type="text" id="company-dept" placeholder="Company & department" />
          </form>
        </section>
      </main>

      <footer><p>Your data is encrypted and secure.</p></footer>
    </div>
  `,

    expectations: {
      count: 1,
      placeholder: "Company & department",
      visible: true,
    },

    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },

    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "d009eeb4-bb9b-4ff0-9ad5-32db5bc9e344",
    title: "Find search input with optional label",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the search input. The placeholder may include "(optional)" depending on the page. Match the field regardless of that.',

    html: `
    <div class="container">
      <header><h1>Keyword Search</h1></header>

      <main>
        <section class="search-panel">
          <p>You can search using any relevant keyword.</p>
          <input type="search" placeholder="Search keyword (optional)" />
        </section>
      </main>

      <footer><p>Need help? Visit our <a href="#">FAQ</a>.</p></footer>
    </div>
  `,

    expectations: {
      count: 1,
      placeholder: "Search keyword (optional)",
      visible: true,
    },

    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },

    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "2c7c9f5a-fabc-4f3f-a41f-5cd01eae8fae",
    title: "Exact placeholder among similar fields",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the input with placeholder "Name". It sits next to "Username", so match the placeholder exactly to avoid the second field.',
    html: `
      <h2>Create Your Profile</h2>
      <p>Please enter your full name and choose a nickname for the community.</p>
      <form>
        <input type="text" placeholder="Name" /><br/>
        <input type="text" placeholder="Username" /><br/>
        <button>Submit</button>
      </form>
    `,
    expectations: {
      count: 1,
      placeholder: "Name",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "3f6c1d7b-0f32-4e6e-b2b9-5b6e92d927b6",
    title: "Pick the primary email field",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Target the field with placeholder "Email" and skip "Confirm Email". Both share the word "Email", so require an exact placeholder match before filling it.',
    html: `
      <h2>Sign Up</h2>
      <p>Please enter your email address twice to confirm:</p>
      <form>
        <input type="email" placeholder="Email" /><br/>
        <input type="email" placeholder="Confirm Email" /><br/>
        <input type="password" placeholder="Password" /><br/>
        <button>Sign Up</button>
      </form>
    `,
    expectations: {
      count: 1,
      placeholder: "Email",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "5e0a7cbd-1d87-4c03-9f73-2c459e8ff2a9",
    title: "Match ticket input with regex",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the ticket ID field. The placeholder ends with a changing number, so match the "Ticket ID: <digits>" pattern with a regular expression before submitting.',
    html: `
      <h3>Track Your Support Ticket</h3>
      <p>Enter your support ticket ID to check its status:</p>
      <form>
        <input type="text" placeholder="Ticket ID: 39421" />
        <button>Find Ticket</button>
      </form>
    `,
    expectations: {
      count: 1,
      placeholder: "Ticket ID: 39421",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "7c5c4e0a-8b3b-4cce-9b1c-9c8a5f0c5f5e",
    title: "Booking code placeholder with regex",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the booking code field. Its placeholder contains a mixed-code like "ABX-934", so match the "Booking code: AAA-999" pattern with a regex.',
    html: `
      <h3>Check Your Booking</h3>
      <p>Enter your booking confirmation code to view details:</p>
      <form>
        <input type="text" placeholder="Booking code: ABX-934" />
        <button>View Booking</button>
      </form>
    `,
    expectations: {
      count: 1,
      placeholder: "Booking code: ABX-934",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "0d7f0c43-1d89-4c32-92d3-f6ab4c1a8a31",
    title: "Unique email placeholder",
    topicId: "19981989-8407-48c7-bfc2-659aa098d4f5",
    difficulty: "beginner",
    description:
      'Find the email input whose placeholder is "Enter your email". There are no similar placeholders nearby, so a direct match is enough.',
    html: `
      <h3>Newsletter Sign-Up</h3>
      <p>Enter your email address to subscribe:</p>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </form>
    `,
    expectations: {
      count: 1,
      placeholder: "Enter your email",
      visible: true,
    },
    usageSpec: {
      method: "getByPlaceholder",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByPlaceholder],
  },
  {
    id: "9f2b8c14-4e7a-4d2a-b9a3-3b7e4f1c8a12",
    title: "Find image by alt text (string)",
    topicId: "9063b40b-07af-4be9-abf8-e7b6a5fe5e5a",
    difficulty: "beginner",
    description:
      "Use getByAltText when the element is an image or image button and the alt text is the accessible name. Here the alt text is 'City map'.",
    html: `
      <section class="gallery">
        <img src="/img/city.png" alt="City map" />
        <img src="/img/park.png" alt="Park aerial" />
        <img src="/img/river.png" alt="River route" />
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByAltText",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByAltText],
  },
  {
    id: "1a6c3d9f-2b4e-4f91-8e2d-5c7a3b6d8f10",
    title: "Find image by alt text with regex",
    topicId: "9063b40b-07af-4be9-abf8-e7b6a5fe5e5a",
    difficulty: "beginner",
    description:
      "Use getByAltText with a RegExp when alt texts share a naming pattern. Prefer a string when you know the exact alt text; here the regex targets 'icon-user'.",
    html: `
      <div class="icon-row">
        <img src="/icons/user.svg" alt="icon-user" />
        <img src="/icons/settings.svg" alt="icon-settings" />
        <img src="/icons/help.svg" alt="icon-help" />
      </div>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByAltText",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByAltText],
  },
  {
    id: "6b1f3c8d-5a2e-4f70-9c13-8d5f2a6b4e91",
    title: "Find exact alt text match (exact: true)",
    topicId: "9063b40b-07af-4be9-abf8-e7b6a5fe5e5a",
    difficulty: "beginner",
    description:
      "Use getByAltText with exact: true when similar alt texts exist; it enforces a whole-string match. Here it selects only 'Brand logo'.",
    html: `
      <section class="brand-panel">
        <img src="/brand/logo.png" alt="Brand logo" />
        <img src="/brand/logo-dark.png" alt="Brand logo dark" />
        <img src="/brand/logo-small.png" alt="Brand logo small" />
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByAltText",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByAltText],
  },
  {
    id: "3e7a1b9c-6d2f-4a58-8c21-7b5d3a9f1e04",
    title: "Find alt text with extra words (exact: false)",
    topicId: "9063b40b-07af-4be9-abf8-e7b6a5fe5e5a",
    difficulty: "beginner",
    description:
      "Use getByAltText with exact: false when the alt text includes extra words and you want a partial match. Here 'Billing banner' matches 'Billing banner (beta)'.",
    html: `
      <section class="billing-hero">
        <img src="/img/billing-beta.png" alt="Billing banner (beta)" />
        <img src="/img/billing-summary.png" alt="Billing summary graphic" />
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByAltText",
      argument: {
        type: "string",
      },
      options: {
        exact: false,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByAltText],
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
    id: "8e96ecc1-4344-4b3d-889f-37324c920db8",
    title: "Find the primary email field",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "Email preferences include several similar fields. Target the one that shows 'Primary inbox'.",
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
    studyMaterials: [
      studyMaterials.locatorMethods.getByLabel,
      studyMaterials.general.regexInLocators,
      studyMaterials.general.javaScriptRegex,
    ],
  },
  {
    id: "4c657c71-34e1-4618-9f4d-f69a79c3f1d2",
    title: "Find the tag filter field",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description: "In the site search panel, target the tag filter field that currently contains 'Priority'.",
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
    id: "0c0d5d7d-8c9e-4d1b-9c40-16c3ab7a7e11",
    title: "Find input by aria-label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "getByLabel also works when the control is labelled via aria-label (no separate <label> element). Here we find the input labelled 'Delivery address'.",
    html: `
      <section class="address-form">
        <h3>Shipping details</h3>
        <div class="field">
          <input type="text" aria-label="Delivery address" value="221B Baker Street" />
        </div>
        <div class="field">
          <input type="text" aria-label="Billing address" value="742 Evergreen Terrace" />
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "221B Baker Street",
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
    id: "b8c2e2b0-7a13-44d2-97ef-9c8d9b3e2a21",
    title: "Find field by aria-labelledby",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "A control can be labelled by another element via aria-labelledby. This is common in custom UIs where the label isn't a <label> tag.",
    html: `
      <section class="security-panel">
        <h3>Security</h3>
        <div class="field">
          <span id="api-token-label">API token</span>
          <textarea aria-labelledby="api-token-label">token_123</textarea>
        </div>
        <div class="field">
          <span id="backup-token-label">Backup token</span>
          <textarea aria-labelledby="backup-token-label">token_456</textarea>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "token_123",
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
    id: "8a3c0d67-d8c1-4c6a-9ff5-2ce5e6e2f1b3",
    title: "Match label with regex (case-insensitive)",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Use a RegExp when label text varies slightly. Here, 'Project ID' appears in mixed casing and punctuation, so we match robustly with a case-insensitive regex.",
    html: `
      <section class="project-panel">
        <h3>Project</h3>
        <div class="field">
          <label for="project-id">Project ID:</label>
          <input id="project-id" type="text" value="PRJ-7" />
        </div>
        <div class="field">
          <label for="project-key">Project key</label>
          <input id="project-key" type="text" value="ALPHA" />
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "PRJ-7",
    },
    usageSpec: {
      method: "getByLabel",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [
      studyMaterials.locatorMethods.getByLabel,
      studyMaterials.general.regexInLocators,
      studyMaterials.general.javaScriptRegex,
    ],
  },
  {
    id: "c70e4a12-1e1a-4c3d-8f86-88c35b19a0b4",
    title: "Exact label match avoids similarly prefixed labels",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "When multiple labels share a prefix, set exact: true to select only the whole-string label. Here we target 'Name' and not 'Name (public)'.",
    html: `
      <section class="account-panel">
        <h3>Account</h3>
        <div class="field">
          <label for="name">Name</label>
          <input id="name" type="text" value="Alice" />
        </div>
        <div class="field">
          <label for="name-public">Name (public)</label>
          <input id="name-public" type="text" value="Alice A." />
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "Alice",
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
    id: "b0c85b0e-7cb3-4bb0-a6db-9c3b9c4e5b90",
    title: "Include hidden labelled controls (includeHidden: true)",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "intermediate",
    description:
      "By default, hidden controls are not matched. Set includeHidden: true to locate a control even if it is visually hidden (useful for progressive disclosure UIs).",
    html: `
      <section class="two-factor">
        <h3>Two-factor authentication</h3>
        <div class="field">
          <label for="otp">One-time code</label>
          <input id="otp" type="text" value="123456" style="display: none;" />
        </div>
        <div class="field">
          <label for="recovery">Recovery code</label>
          <input id="recovery" type="text" value="recovery-xyz" />
        </div>
      </section>
    `,
    expectations: {
      count: 1,
    },
    usageSpec: {
      method: "getByLabel",
      argument: {
        type: "string",
      },
      options: {
        includeHidden: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByLabel],
  },
  {
    id: "f5b0d1a9-0f35-4f7e-bb78-3dfdfd6b7f21",
    title: "Label wraps control (implicit association)",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Labels can be associated implicitly by wrapping the control (no for/id). getByLabel should still work.",
    html: `
      <section class="preferences">
        <h3>Preferences</h3>
        <div class="field">
          <label>
            Display name
            <input type="text" value="Captain Nemo" />
          </label>
        </div>
        <div class="field">
          <label>
            Organization
            <input type="text" value="Nautilus" />
          </label>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "Captain Nemo",
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
    id: "d2a9c8b7-6e5f-4d3c-a2b1-0c9d8e7f6a5b",
    title: "Find select element by label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "getByLabel works with any form control, including <select>. Here we target the dropdown labelled 'Country'.",
    html: `
      <section class="location-form">
        <h3>Location settings</h3>
        <div class="field">
          <label for="region">Region</label>
          <select id="region">
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>
        <div class="field">
          <label for="country">Country</label>
          <select id="country">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
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
    id: "e3b0c9d8-7f6a-4e5d-b4c3-1d0e9f8a7b6c",
    title: "Find checkbox by its label",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "beginner",
    description:
      "Checkboxes are commonly targeted via their label. Use getByLabel to find the 'Remember me' checkbox.",
    html: `
      <section class="login-options">
        <h3>Login options</h3>
        <div class="field">
          <label>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
        </div>
        <div class="field">
          <label>
            <input type="checkbox" name="newsletter" />
            Subscribe to newsletter
          </label>
        </div>
        <div class="field">
          <label>
            <input type="checkbox" name="terms" />
            I agree to terms
          </label>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
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
    id: "f4c1d0e9-8a7b-4f6e-c5d4-2e1f0a9b8c7d",
    title: "Label with nested markup (text normalization)",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "intermediate",
    description:
      "Labels often contain nested elements like icons or helper text. Playwright normalizes whitespace when matching. Target the field labelled 'Card number'.",
    html: `
      <section class="payment-form">
        <h3>Payment</h3>
        <div class="field">
          <label for="card-number">
            <span class="icon">💳</span>
            Card number
            <span class="required">*</span>
          </label>
          <input id="card-number" type="text" value="4111 1111 1111 1111" />
        </div>
        <div class="field">
          <label for="card-expiry">
            <span class="icon">📅</span>
            Expiry date
            <span class="required">*</span>
          </label>
          <input id="card-expiry" type="text" value="12/28" />
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "4111 1111 1111 1111",
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
    id: "a5d2e1f0-9b8c-4a7d-d6e5-3f2a1b0c9d8e",
    title: "Find multiple controls with same label (count > 1)",
    topicId: "ecf8d4e8-1afa-47ba-8867-b7c45603c7b8",
    difficulty: "intermediate",
    description:
      "Sometimes multiple controls share the same label text. This task expects 2 matches—use nth() or other methods to disambiguate if needed in real tests.",
    html: `
      <section class="contact-form">
        <h3>Contact details</h3>
        <fieldset>
          <legend>Primary contact</legend>
          <div class="field">
            <label for="phone-primary">Phone</label>
            <input id="phone-primary" type="tel" value="+1 555-0100" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Secondary contact</legend>
          <div class="field">
            <label for="phone-secondary">Phone</label>
            <input id="phone-secondary" type="tel" value="+1 555-0200" />
          </div>
        </fieldset>
      </section>
    `,
    expectations: {
      count: 2,
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
    title: "Find element by test id (string)",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description:
      "Use getByTestId as a fallback when role/text locators are not reliable; data-testid is a stable, test-only hook. Here the stable id is 'directions'.",
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
    description:
      "We use locator.filter() with hasText and hasNotText when the base locator is easy (like a card class), but we need to keep only items that mention the right text and exclude misleading labels.\n\nTask: target the Pro plan card that is Recommended and not Deprecated. This task expects both parameters together.",
    html: `
      <section class="pricing">
        <article class="plan-card">
          <h3>Starter</h3>
          <p>Great for learning</p>
        </article>
        <article class="plan-card plan-card--pro">
          <h3>Pro</h3>
          <p>Best for teams</p>
          <span class="badge">Recommended</span>
        </article>
        <article class="plan-card">
          <h3>Pro</h3>
          <p>Recommended for legacy users</p>
          <span class="badge badge--muted">Deprecated</span>
        </article>
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
    description:
      "We use locator.filter() with has when the base locator is easy but the distinguishing clue is a nested element like a button.\n\nTask: target the order card that contains the Ship now button.",
    html: `
      <section class="orders">
        <article class="order-card">
          <div class="order-meta">
            <h3>Order #103</h3>
            <p>Ready to ship</p>
          </div>
          <button class="action" type="button">Ship now</button>
        </article>
        <article class="order-card">
          <div class="order-meta">
            <h3>Order #104</h3>
            <p>Ready to ship</p>
          </div>
        </article>
        <article class="order-card">
          <div class="order-meta">
            <h3>Order #105</h3>
            <p>Ready to ship</p>
          </div>
        </article>
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
    description:
      "We use locator.filter() with hasNot when the base locator is easy but we need to exclude cards that contain a specific nested element, like a cancelled badge.\n\nTask: target the order card that does not include a cancelled badge.",
    html: `
      <section class="orders">
        <article class="order-card">
          <h3>Order #201</h3>
          <span class="status status--cancelled" aria-label="Cancelled"></span>
          <p>Refunded</p>
        </article>
        <article class="order-card">
          <h3>Order #202</h3>
          <span class="status status--hold">Refunded</span>
        </article>
        <article class="order-card">
          <h3>Order #203</h3>
          <span class="status status--cancelled" aria-label="Cancelled"></span>
          <p>Refunded</p>
        </article>
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
    description:
      "We use locator.filter({ visible }) when the base locator matches both visible and hidden elements, and we want to keep only the visible ones.\n\nTask: target the visible Maintenance window notice using filter({ visible: true }).",
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
  },

  // ============================================
  // getByTestId Tasks
  // ============================================
  {
    id: "b3a2c1d0-e4f5-4a6b-9c8d-7e6f5a4b3c2d",
    title: "Find element by test id with multiple similar IDs",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description:
      "Use getByTestId when you have multiple elements with similar test IDs and need to target a specific one. Unlike role-based locators, test IDs provide a stable hook that doesn't change with UI refactoring.",
    html: `
      <section class="dashboard-widgets">
        <header class="panel-header">
          <h3>Dashboard</h3>
          <p class="panel-subtitle">Your daily overview</p>
        </header>
        <div class="widget-grid">
          <div class="widget" data-testid="widget-sales">
            <h4>Sales</h4>
            <p>$12,500</p>
          </div>
          <div class="widget" data-testid="widget-orders">
            <h4>Orders</h4>
            <p>156</p>
          </div>
          <div class="widget" data-testid="widget-visitors">
            <h4>Visitors</h4>
            <p>2,340</p>
          </div>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Orders 156",
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
    id: "c4b3d2e1-f5a6-4b7c-0d9e-8f7a6b5c4d3e",
    title: "Find element by test id using regex pattern",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "intermediate",
    description:
      "Use getByTestId with a RegExp to match test IDs that follow a naming pattern. This is useful when test IDs contain dynamic parts or when you want to match multiple elements with similar prefixes.",
    html: `
      <section class="notification-center">
        <header class="panel-header">
          <h3>Notifications</h3>
        </header>
        <ul class="notification-list">
          <li data-testid="notification-info-1">Info: System updated</li>
          <li data-testid="notification-warning-1">Warning: Low storage</li>
          <li data-testid="notification-error-1">Error: Connection failed</li>
          <li data-testid="notification-info-2">Info: New feature available</li>
        </ul>
      </section>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "getByTestId",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByTestId, studyMaterials.general.regexInLocators],
  },
  {
    id: "d5c4e3f2-a6b7-4c8d-1e0f-9a8b7c6d5e4f",
    title: "Find form element by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "beginner",
    description:
      "Use getByTestId to locate form elements when they lack accessible labels or when other locator strategies would be ambiguous. Test IDs are especially useful for complex form components.",
    html: `
      <section class="checkout-form">
        <header class="form-header">
          <h3>Checkout</h3>
        </header>
        <form class="payment-form">
          <div class="form-row">
            <input type="text" data-testid="card-number" placeholder="Card Number" />
          </div>
          <div class="form-row">
            <input type="text" data-testid="card-expiry" placeholder="MM/YY" />
            <input type="text" data-testid="card-cvv" placeholder="CVV" />
          </div>
          <button type="submit" data-testid="submit-payment">Pay Now</button>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
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
    id: "e6d5f4a3-b7c8-4d9e-2f1a-0b9c8d7e6f5a",
    title: "Find hidden element by test id",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "intermediate",
    description:
      "Use getByTestId to locate elements that may be hidden. This is useful for testing UI states like collapsed menus or modal dialogs that are present in the DOM but not visible.",
    html: `
      <section class="modal-container">
        <div class="modal" data-testid="confirm-dialog" style="display: none;">
          <h4>Confirm Action</h4>
          <p>Are you sure you want to proceed?</p>
          <button>Confirm</button>
          <button>Cancel</button>
        </div>
        <div class="modal" data-testid="success-dialog">
          <h4>Success</h4>
          <p>Your action was completed successfully.</p>
          <button>OK</button>
        </div>
        <div class="modal" data-testid="error-dialog" style="display: none;">
          <h4>Error</h4>
          <p>Something went wrong.</p>
          <button>Retry</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
      text: "Success Your action was completed successfully. OK",
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
    id: "f7e6a5b4-c8d9-4e0f-3a2b-1c0d9e8f7a6b",
    title: "Find nested component by test id with regex anchors",
    topicId: "33124b4e-123c-4716-8c5e-0e5c73904e4a",
    difficulty: "intermediate",
    description:
      "Use getByTestId with a RegExp using anchors (^ and $) for exact matching when test IDs share common substrings. This prevents matching unintended elements like 'user-profile-avatar' when targeting 'user-profile'.",
    html: `
      <section class="user-section">
        <header class="panel-header">
          <h3>User Settings</h3>
        </header>
        <div class="user-cards">
          <div data-testid="user-profile-avatar" class="avatar-card">
            <img src="/avatar.png" alt="Avatar" />
          </div>
          <div data-testid="user-profile" class="profile-card">
            <h4>John Doe</h4>
            <p>john.doe@example.com</p>
          </div>
          <div data-testid="user-profile-settings" class="settings-card">
            <h4>Settings</h4>
            <p>Manage preferences</p>
          </div>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "John Doe john.doe@example.com",
      visible: true,
    },
    usageSpec: {
      method: "getByTestId",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByTestId, studyMaterials.general.regexInLocators],
  },

  // ============================================
  // getByText Tasks
  // ============================================
  {
    id: "a8b7c6d5-e4f3-4a2b-1c0d-9e8f7a6b5c4d",
    title: "Find element by text with case-insensitive regex",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "beginner",
    description:
      "Use getByText with a case-insensitive RegExp when the text casing might vary. The 'i' flag makes the match case-insensitive, useful for dynamically generated or user-facing text.",
    html: `
      <section class="alerts-panel">
        <div class="alert alert-success">SUCCESS: Operation completed</div>
        <div class="alert alert-warning">Warning: Low disk space</div>
        <div class="alert alert-error">ERROR: Connection timeout</div>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText, studyMaterials.general.regexInLocators],
  },
  {
    id: "b9c8d7e6-f5a4-4b3c-2d1e-0f9a8b7c6d5e",
    title: "Find button by text (input type button)",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "beginner",
    description:
      "getByText matches input elements of type 'button' and 'submit' by their 'value' attribute instead of text content. This is a special case that allows consistent text-based location for all button types.",
    html: `
      <section class="action-panel">
        <header class="panel-header">
          <h3>Form Actions</h3>
        </header>
        <form class="action-form">
          <div class="form-field">
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="Enter username" />
          </div>
          <div class="form-actions">
            <input type="button" value="Reset Form" />
            <input type="submit" value="Submit Form" />
            <button type="button">Cancel</button>
          </div>
        </form>
      </section>
    `,
    expectations: {
      count: 1,
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
  },
  {
    id: "c0d9e8f7-a6b5-4c4d-3e2f-1a0b9c8d7e6f",
    title: "Find element containing text with regex word boundary",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "intermediate",
    description:
      "Use getByText with RegExp word boundaries (\\b) to match whole words only. This prevents matching 'Download' when searching for 'load' and is useful for precise text targeting.",
    html: `
      <section class="file-manager">
        <header class="panel-header">
          <h3>File Actions</h3>
        </header>
        <div class="action-buttons">
          <button type="button">Download File</button>
          <button type="button">Upload File</button>
          <button type="button">Load File</button>
          <button type="button">Preload Cache</button>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Load File",
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText, studyMaterials.general.javaScriptRegex],
  },
  {
    id: "d1e0f9a8-b7c6-4d5e-4f3a-2b1c0d9e8f7a",
    title: "Find element by exact text with whitespace normalization",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "beginner",
    description:
      "getByText with exact: true still normalizes whitespace - multiple spaces become one, line breaks become spaces, and leading/trailing whitespace is trimmed. This makes matching resilient to formatting changes.",
    html: `
      <section class="message-list">
        <div class="message">
          <span class="sender">   Hello   World   </span>
        </div>
        <div class="message">
          <span class="sender">Hello World!</span>
        </div>
        <div class="message">
          <span class="sender">Hello
          World</span>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
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
    id: "e2f1a0b9-c8d7-4e6f-5a4b-3c2d1e0f9a8b",
    title: "Find multiple elements by text pattern",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "intermediate",
    description:
      "Use getByText with RegExp to match multiple elements that share a text pattern. This is useful for finding all items of a certain type, like all 'Step' labels in a wizard.",
    html: `
      <section class="wizard-steps">
        <header class="wizard-header">
          <h3>Setup Wizard</h3>
        </header>
        <ol class="steps-list">
          <li class="step completed">Step 1: Account Info</li>
          <li class="step active">Step 2: Preferences</li>
          <li class="step pending">Step 3: Review</li>
          <li class="step pending">Summary</li>
        </ol>
      </section>
    `,
    expectations: {
      count: 3,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText, studyMaterials.general.regexInLocators],
  },
  {
    id: "f3a2b1c0-d9e8-4f7a-6b5c-4d3e2f1a0b9c",
    title: "Find nested text element",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "beginner",
    description:
      "getByText matches the element that contains the text, including when text spans across nested elements. Use partial matching to find elements where text content includes child elements.",
    html: `
      <section class="product-card">
        <h3>Premium Package</h3>
        <p class="price">
          <span class="currency">$</span>
          <span class="amount">99</span>
          <span class="period">/month</span>
        </p>
        <p class="description">Best value for teams</p>
      </section>
    `,
    expectations: {
      count: 1,
      text: "$ 99 /month",
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
  },
  {
    id: "a4b3c2d1-e0f9-4a8b-7c6d-5e4f3a2b1c0d",
    title: "Find element by text with regex anchors",
    topicId: "d5c21800-ac27-42cd-82aa-bf680c1bcaa9",
    difficulty: "intermediate",
    description:
      "Use getByText with RegExp anchors (^ for start, $ for end) to match text that starts or ends with specific content. The 'm' (multiline) flag is not typically needed since text is normalized.",
    html: `
      <section class="status-panel">
        <header class="panel-header">
          <h3>System Status</h3>
        </header>
        <ul class="status-list">
          <li class="status-item">API Status: Online</li>
          <li class="status-item">Status: Maintenance</li>
          <li class="status-item">Database Status: Offline</li>
        </ul>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Status: Maintenance",
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "regex",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText, studyMaterials.general.regexInLocators],
  },

  // ============================================
  // Filter Tasks
  // ============================================
  {
    id: "b5c4d3e2-f1a0-4b9c-8d7e-6f5a4b3c2d1e",
    title: "Filter by hasText with regex",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description:
      "Use filter({ hasText: /regex/ }) when you need pattern matching instead of substring matching. The RegExp allows for case-insensitive or more complex text patterns within filtered elements.",
    html: `
      <section class="user-list">
        <header class="panel-header">
          <h3>Team Members</h3>
        </header>
        <div class="user-cards">
          <article class="user-card">
            <h4>Alice Johnson</h4>
            <p>Role: admin</p>
          </article>
          <article class="user-card">
            <h4>Bob Smith</h4>
            <p>Role: ADMIN</p>
          </article>
          <article class="user-card">
            <h4>Charlie Brown</h4>
            <p>Role: user</p>
          </article>
        </div>
      </section>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "filter",
      options: {
        hasText: "/admin/i",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter, studyMaterials.general.regexInLocators],
  },
  {
    id: "c6d5e4f3-a2b1-4c0d-9e8f-7a6b5c4d3e2f",
    title: "Filter by hasNotText with regex",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description:
      "Use filter({ hasNotText: /regex/ }) to exclude elements matching a text pattern. This is useful when you want to filter out elements containing variations of a word or phrase.",
    html: `
      <section class="task-board">
        <header class="panel-header">
          <h3>Tasks</h3>
        </header>
        <div class="task-columns">
          <article class="task-card">
            <h4>Design Review</h4>
            <span class="status">Status: completed</span>
          </article>
          <article class="task-card">
            <h4>Code Review</h4>
            <span class="status">Status: COMPLETED</span>
          </article>
          <article class="task-card">
            <h4>Testing</h4>
            <span class="status">Status: in-progress</span>
          </article>
          <article class="task-card">
            <h4>Deployment</h4>
            <span class="status">Status: pending</span>
          </article>
        </div>
      </section>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "filter",
      options: {
        hasNotText: "/completed/i",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter, studyMaterials.general.regexInLocators],
  },
  {
    id: "d7e6f5a4-b3c2-4d1e-0f9a-8b7c6d5e4f3a",
    title: "Chain multiple filters",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "advanced",
    description:
      "Chain multiple filter() calls to progressively narrow down your selection. Each filter further refines the results, allowing for complex selection criteria.",
    html: `
      <section class="inventory">
        <header class="panel-header">
          <h3>Inventory</h3>
        </header>
        <div class="item-grid">
          <article class="item-card">
            <h4>Laptop Pro</h4>
            <p>Category: Electronics</p>
            <span class="stock">In Stock</span>
            <span class="price">$1200</span>
          </article>
          <article class="item-card">
            <h4>Wireless Mouse</h4>
            <p>Category: Electronics</p>
            <span class="stock">Out of Stock</span>
            <span class="price">$50</span>
          </article>
          <article class="item-card">
            <h4>Office Chair</h4>
            <p>Category: Furniture</p>
            <span class="stock">In Stock</span>
            <span class="price">$300</span>
          </article>
          <article class="item-card">
            <h4>Monitor Stand</h4>
            <p>Category: Electronics</p>
            <span class="stock">In Stock</span>
            <span class="price">$80</span>
          </article>
        </div>
      </section>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "filter",
      options: {
        hasText: "Electronics",
        hasNotText: "Out of Stock",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
  {
    id: "e8f7a6b5-c4d3-4e2f-1a0b-9c8d7e6f5a4b",
    title: "Filter hidden elements with visible: false",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description:
      "Use filter({ visible: false }) to select only hidden elements. This is useful for testing UI states like collapsed panels or validating that certain elements are properly hidden.",
    html: `
      <section class="notifications">
        <header class="panel-header">
          <h3>Notifications</h3>
        </header>
        <div class="notification-stack">
          <div class="notification" style="display: none;">
            <p>Hidden notification 1</p>
          </div>
          <div class="notification">
            <p>Visible notification</p>
          </div>
          <div class="notification" style="display: none;">
            <p>Hidden notification 2</p>
          </div>
        </div>
      </section>
    `,
    expectations: {
      count: 2,
      hidden: true,
    },
    usageSpec: {
      method: "filter",
      options: {
        visible: false,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
  {
    id: "f9a8b7c6-d5e4-4f3a-2b1c-0d9e8f7a6b5c",
    title: "Filter with has and hasNot combined",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "advanced",
    description:
      "Combine has and hasNot options to find elements that contain one nested element but not another. This is powerful for complex component structures with conditional child elements.",
    html: `
      <section class="product-catalog">
        <header class="panel-header">
          <h3>Products</h3>
        </header>
        <div class="product-grid">
          <article class="product-card">
            <h4>Basic Plan</h4>
            <p>Essential features</p>
            <button class="btn-buy">Buy Now</button>
          </article>
          <article class="product-card">
            <h4>Pro Plan</h4>
            <p>Advanced features</p>
            <span class="badge badge-popular">Popular</span>
            <button class="btn-buy">Buy Now</button>
          </article>
          <article class="product-card">
            <h4>Enterprise Plan</h4>
            <p>Full suite</p>
            <span class="badge badge-popular">Popular</span>
            <span class="badge badge-sold-out">Sold Out</span>
            <button class="btn-buy" disabled>Unavailable</button>
          </article>
        </div>
      </section>
    `,
    expectations: {
      count: 1,
      text: "Pro Plan Advanced features Popular Buy Now",
      visible: true,
    },
    usageSpec: {
      method: "filter",
      options: {
        has: "locator",
        hasNot: "locator",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
  {
    id: "a0b9c8d7-e6f5-4a4b-3c2d-1e0f9a8b7c6d",
    title: "Filter table rows with has locator",
    topicId: "1f0c2d3e-4b5a-4f6c-8d7e-9a0b1c2d3e4f",
    difficulty: "intermediate",
    description:
      "Use filter({ has }) with a locator to find container elements based on their descendants. This is commonly used for table rows, list items, or cards that contain specific interactive elements.",
    html: `
      <section class="data-table">
        <header class="panel-header">
          <h3>User Management</h3>
        </header>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="user-row">
              <td>Alice</td>
              <td>alice@example.com</td>
              <td><button class="btn-edit">Edit</button></td>
            </tr>
            <tr class="user-row">
              <td>Bob</td>
              <td>bob@example.com</td>
              <td><span class="no-actions">No actions</span></td>
            </tr>
            <tr class="user-row">
              <td>Charlie</td>
              <td>charlie@example.com</td>
              <td><button class="btn-edit">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </section>
    `,
    expectations: {
      count: 2,
    },
    usageSpec: {
      method: "filter",
      options: {
        has: "locator",
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.filter],
  },
];
