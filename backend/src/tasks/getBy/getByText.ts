import { studyMaterials } from "../studyMaterials/data";
import { Task } from "../types";

export const getByTextTasks: Task[] = [
  {
    module: "GetBy",
    id: 1,
    title: "Find element by partial text match",
    html: `
      <div class="container">
        <p>Welcome to the application</p>
      </div>
    `,
    expectations: {
      count: 1,
      text: "Welcome to the application",
      visible: true,
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
    level: "beginner",
    description: "We use getByText to find elements by partial text match.",
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
      },
    },
  },
  // {
  //   module: "GetBy",
  //   id: 3,
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
  // {
  //   module: "GetBy",
  //   id: 4,
  //   title: "Use exact match to find specific element",
  //   html: `
  //     <ul class="menu">
  //       <li>Hello</li>
  //       <li>Hello World</li>
  //       <li>Hello Universe</li>
  //     </ul>
  //   `,
  //   expectations: {
  //     count: 1,
  //     text: "Hello",
  //     visible: true,
  //   },
  //   context: {
  //     goal: "single",
  //     allowNth: false,
  //     preferRole: false,
  //   },
  //   heuristics: ["getByText('Hello', { exact: true }) matches only the first li"],
  // },
  // {
  //   module: "GetBy",
  //   id: 5,
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
  //   id: 6,
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
  //   id: 9,
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
  //   id: 10,
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
  //   id: 11,
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
  //   id: 12,
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
  //   id: 13,
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
  //   id: 14,
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
  //   id: 15,
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
  //   id: 16,
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
  //   id: 17,
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
  //   id: 18,
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
  //   id: 19,
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
  //   id: 20,
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
  //   id: 21,
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
  //   id: 22,
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
  //   id: 23,
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
  //   id: 24,
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
  //   id: 25,
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
  //   id: 26,
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
  //   id: 27,
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
  //   id: 28,
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

