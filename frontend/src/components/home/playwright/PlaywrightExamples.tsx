import { Box, Chip, Stack, Typography } from "@mui/material";

type ExampleCardProps = {
  title: string;
  badge: string;
  code: string;
};

const examples: ExampleCardProps[] = [
  {
    title: "Multiple matches",
    badge: "stability",
    code: `// DOM
<button>Save</button>
<button>Save</button>
<button>Save</button>

// fragile
page.locator('button').nth(1)

// intent-driven
page.getByRole('button', { name: 'Save' }).first()`,
  },
  {
    title: "Nested text",
    badge: "getByText",
    code: `// DOM
<p class="mut"><strong>Welcome</strong> to our <em>platform</em></p>

// works with normalization
page.getByText('Welcome to our platform')

// or use regex for robustness
page.getByText(/^Welcome to our platform$/)`,
  },
];

function ExampleCard({ title, badge, code }: ExampleCardProps) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        <Chip label={badge} size="small" />
      </Stack>
      <Box
        component="pre"
        sx={{
          margin: 0,
          padding: 2,
          borderRadius: 2,
          backgroundColor: "rgba(10, 14, 20, 0.75)",
          border: "1px solid",
          borderColor: "divider",
          color: "#cfe0ff",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
          fontSize: 12,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}
      >
        {code}
      </Box>
    </Box>
  );
}

export function PlaywrightExamples() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        gap: 2,
      }}
    >
      {examples.map((example) => (
        <ExampleCard key={example.title} {...example} />
      ))}
    </Box>
  );
}
