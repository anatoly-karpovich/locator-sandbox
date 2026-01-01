import { studyMaterials } from "../studyMaterials/data";
import { Task } from "../types";

export const getByTextTasks: Task[] = [
  {
    id: "a5d6f5de-385f-4b50-abca-52370d3fb58a",
    title: "Find element by partial text match",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
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
      },
    },
  },

  // {
  //   module: "GetBy",
  //   id: '2c07a1f2-33c1-4d9f-8059-6567cbe3657b',
  //   title: "Match text in a button",
  //   html: `
  //     <div class="actions">
  //       <button>Click me to continue</button>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Click me to continue",
  //     visible: true,

  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Click me') matches the button"],
  // },

  // // ============================================
  // // EXACT MATCHING
  // // ============================================
  {
    // module: "GetBy",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    id: "6cf7c8b5-0d3e-4238-9db6-ec981976acba",
    title: "Find element by exact text match",
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
  // {
  //   module: "GetBy",
  //   id: '1afc9b1c-4962-413b-a544-d8ce4ee01bf8',
  //   title: "Exact match is case-sensitive",
  //   html: `
  //     <div class="labels">
  //       <span>SUBMIT</span>
  //       <span>Submit</span>
  //       <span>submit</span>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Submit",
  //     visible: true,
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Submit', { exact: true }) matches only 'Submit' (middle span)"],
  // },
  // {
  //   module: "GetBy",
  //   id: 'e748617c-069c-4ec1-aed1-3bb0b0675ef2',
  //   title: "Exact match with full string required",
  //   html: `
  //     <nav>
  //       <a href="/home">Home</a>
  //       <a href="/homepage">Homepage</a>
  //     </nav>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Home",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Home', { exact: true }) matches only first link, not 'Homepage'"],
  // },

  // // ============================================
  // // REGEX MATCHING
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: '95a0765f-4156-483f-8ef2-85054f0e529a',
  //   title: "Use regex to match pattern, match elements with numbers in text",
  //   html: `
  //     <div class="notifications">
  //       <div>You have 5 new messages</div>
  //       <div>You have 12 new messages</div>
  //       <div>No new messages</div>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 2,
  //   },
  //   context: {
  //     goal: "collection",
  //     allowNth: true,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/\\d+ new messages/) matches elements with numbers"],
  // },
  // {
  //   module: "GetBy",
  //   id: '8dfc3b96-0f68-4183-af6a-43ee998f6f20',
  //   title: "Regex with start anchor for exact beginning, match element with text starting with 'Warning'",
  //   html: `
  //     <div class="alerts">
  //       <p>Warning: Low battery</p>
  //       <p>System Warning detected</p>
  //       <p>Critical Warning!</p>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Warning: Low battery",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/^Warning/) matches only text starting with 'Warning'"],
  // },
  // {
  //   module: "GetBy",
  //   id: '8ddc5619-a6e8-49b8-abad-69cd9647ef8b',
  //   title: "Regex with end anchor",
  //   html: `
  //     <ul class="statuses">
  //       <li>Task completed</li>
  //       <li>Download completed</li>
  //       <li>Completed tasks: 5</li>
  //     </ul>
  //   `,
  //   expectations: {
  //     count: 2,
  //   },
  //   context: {
  //     goal: "collection",
  //     allowNth: true,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/completed$/) matches text ending with 'completed'"],
  // },
  // {
  //   module: "GetBy",
  //   id: 'fec815c9-4958-4768-bfdf-ec5442509baf',
  //   title: "Regex with case-insensitive flag",
  //   html: `
  //     <div class="headings">
  //       <h2>IMPORTANT NOTICE</h2>
  //       <h2>Important Update</h2>
  //       <h2>Regular Content</h2>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 2,
  //   },
  //   context: {
  //     goal: "collection",
  //     allowNth: true,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/^important/i) matches both with case-insensitive flag"],
  // },
  // {
  //   module: "GetBy",
  //   id: 'b1ad265a-86ba-474c-a604-167d6ddc8545',
  //   title: "Regex for exact full match",
  //   html: `
  //     <div class="buttons">
  //       <button>OK</button>
  //       <button>OK, proceed</button>
  //       <button>Click OK</button>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "OK",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/^OK$/) matches only the exact 'OK' button"],
  // },

  // // ============================================
  // // WHITESPACE HANDLING
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: 'd62c4f90-1063-474c-bcc3-674b98cf1b32',
  //   title: "Whitespace is trimmed in matching",
  //   html: `
  //     <div class="cards">
  //       <div class="card">   Trimmed Text   </div>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Trimmed Text",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Trimmed Text', { exact: true }) works despite surrounding spaces"],
  // },
  // {
  //   module: "GetBy",
  //   id: '06cf69af-6f18-4c20-9d43-33bd49751b0d',
  //   title: "Normalized whitespace matching",
  //   html: `
  //     <div class="content">
  //       <p>Multiple    spaces    between    words</p>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Multiple spaces between words') normalizes internal whitespace"],
  // },

  // // ============================================
  // // NESTED ELEMENTS
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: '3a8904e5-3b19-4d18-92f8-5d3bb023f8f3',
  //   title: "Find parent with nested text content",
  //   html: `
  //     <div class="card">
  //       <span class="icon">★</span>
  //       <span class="label">Featured Item</span>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Featured Item",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Featured Item') finds the label span"],
  // },
  // {
  //   module: "GetBy",
  //   id: 'a2fb05da-93f3-4283-9961-3364059e8f96',
  //   title: "Text split across nested elements",
  //   html: `
  //     <p class="message">
  //       <strong>Welcome</strong> to our <em>platform</em>
  //     </p>
  //   `,
  //   expectations: {
  //     count: 1,
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Welcome to our platform') matches the parent p element"],
  // },

  // // ============================================
  // // MULTIPLE MATCHES SCENARIOS
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: '2111d49d-3a72-4575-83ec-55985c610ed8',
  //   title: "Find all items in a list",
  //   html: `
  //     <ul class="todo-list">
  //       <li>Buy groceries</li>
  //       <li>Buy birthday gift</li>
  //       <li>Buy plane tickets</li>
  //     </ul>
  //   `,
  //   expectations: {
  //     count: 3,
  //   },
  //   context: {
  //     goal: "collection",
  //     allowNth: true,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Buy') matches all three list items"],
  // },
  // {
  //   module: "GetBy",
  //   id: '271d43e8-61ad-414c-b5db-d207d4f234b9',
  //   title: "Use nth to select from multiple matches",
  //   html: `
  //     <div class="steps">
  //       <div class="step">Step 1: Introduction</div>
  //       <div class="step">Step 2: Configuration</div>
  //       <div class="step">Step 3: Deployment</div>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Step 2: Configuration",
  //   },
  //   context: {
  //     goal: "nth",
  //     allowNth: true,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Step').nth(1) selects the second step"],
  // },
  // {
  //   module: "GetBy",
  //   id: '05969c33-968e-43fb-8244-5864dcd4f98f',
  //   title: "First match selection",
  //   html: `
  //     <div class="items">
  //       <span class="item">Apple</span>
  //       <span class="item">Banana</span>
  //       <span class="item">Cherry</span>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Apple",
  //   },
  //   context: {
  //     goal: "nth",
  //     allowNth: true,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/^[A-Z]/).first() gets the first matching element"],
  // },

  // // ============================================
  // // SPECIAL CHARACTERS
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: '36a43f83-2e60-4340-8e76-65920c3c989e',
  //   title: "Match text with special characters",
  //   html: `
  //     <div class="prices">
  //       <span class="price">$99.99</span>
  //       <span class="price">€49.99</span>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "$99.99",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('$99.99') matches text with dollar sign"],
  // },
  // {
  //   module: "GetBy",
  //   id: '477c3e2a-9e87-4339-a6ab-79d1db5daa8b',
  //   title: "Regex with escaped special characters",
  //   html: `
  //     <div class="expressions">
  //       <code>(a + b) * c</code>
  //       <code>a + b + c</code>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "(a + b) * c",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText(/\\(a \\+ b\\)/) requires escaping regex special chars"],
  // },
  // {
  //   module: "GetBy",
  //   id: 'e4f5f616-000a-43de-9df8-de429f902df2',
  //   title: "Match text with quotes",
  //   html: `
  //     <div class="quotes">
  //       <p>"To be or not to be"</p>
  //       <p>She said 'Hello'</p>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: '"To be or not to be"',
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('\"To be') matches text containing quotes"],
  // },

  // // ============================================
  // // VISIBILITY AND STATE
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: 'e8dc3442-6ef2-4031-a3f7-e856c9b764f5',
  //   title: "Find visible text element",
  //   html: `
  //     <div class="panel">
  //       <p class="visible-text">This text is visible</p>
  //       <p class="hidden-text" style="display: none;">This text is hidden</p>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "This text is visible",
  //     visible: true,
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('visible') finds only visible elements by default"],
  // },
  // {
  //   module: "GetBy",
  //   id: '4b5556f9-1874-42ad-a74f-74887d874ccd',
  //   title: "Locate text in disabled element",
  //   html: `
  //     <div class="form-group">
  //       <button disabled>Cannot Click</button>
  //       <button>Can Click</button>
  //     </div>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Cannot Click",
  //     enabled: false,
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Cannot Click') finds the disabled button"],
  // },

  // // ============================================
  // // SEMANTIC ELEMENTS
  // // ============================================
  // {
  //   module: "GetBy",
  //   id: '3a003bda-720d-4eb9-ad2b-657603881a9e',
  //   title: "Find text in heading",
  //   html: `
  //     <article>
  //       <h1>Main Article Title</h1>
  //       <p>Article content goes here with Main references.</p>
  //     </article>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Main Article Title",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Main Article Title', { exact: true }) finds the heading"],
  // },
  // {
  //   module: "GetBy",
  //   id: '89fe868d-f1a3-4d10-ac85-ec4c36313c01',
  //   title: "Find text in link",
  //   html: `
  //     <nav class="footer-nav">
  //       <a href="/terms">Terms of Service</a>
  //       <a href="/privacy">Privacy Policy</a>
  //       <a href="/contact">Contact Us</a>
  //     </nav>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Privacy Policy",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Privacy Policy') locates the specific link"],
  // },
  // {
  //   module: "GetBy",
  //   id: 'f731f6b9-5e17-4d6c-91ca-ac77014872b1',
  //   title: "Find text in table cell",
  //   html: `
  //     <table class="data-table">
  //       <tr>
  //         <td>Product A</td>
  //         <td>$100</td>
  //       </tr>
  //       <tr>
  //         <td>Product B</td>
  //         <td>$200</td>
  //       </tr>
  //     </table>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Product A",
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Product A') finds the table cell"],
  // },
];
