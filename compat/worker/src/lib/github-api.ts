const GITHUB_API = 'https://api.github.com';
const USER_AGENT = 'reg-compat-worker/1.0';

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': USER_AGENT,
  };
}

export interface FileContent {
  content: string; // decoded file content
  sha: string; // current SHA for optimistic locking
}

export interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  created_at: string;
  html_url: string;
}

export async function readFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
): Promise<FileContent> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, {
    headers: headers(token),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub readFile ${res.status}: ${text}`);
  }

  const data = await res.json() as { content: string; sha: string; encoding: string };

  // Content is base64 encoded, may contain newlines
  const decoded = atob(data.content.replace(/\n/g, ''));

  return { content: decoded, sha: data.sha };
}

export async function commitFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  content: string,
  sha: string,
  message: string,
): Promise<string> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify({
      message,
      content: btoa(content),
      sha,
    }),
  });

  if (res.status === 409) {
    throw new Error('conflict');
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub commitFile ${res.status}: ${text}`);
  }

  const data = await res.json() as { content: { sha: string } };
  return data.content.sha;
}

export async function dispatchWorkflow(
  token: string,
  owner: string,
  repo: string,
  workflowId: string,
  ref = 'main',
): Promise<void> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify({ ref }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub dispatchWorkflow ${res.status}: ${text}`);
  }
}

export async function listWorkflowRuns(
  token: string,
  owner: string,
  repo: string,
  limit = 10,
): Promise<WorkflowRun[]> {
  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/actions/runs?per_page=${limit}`,
    { headers: headers(token) },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub listWorkflowRuns ${res.status}: ${text}`);
  }

  const data = await res.json() as {
    workflow_runs: Array<{
      id: number;
      name: string;
      status: string;
      conclusion: string | null;
      created_at: string;
      html_url: string;
    }>;
  };

  return data.workflow_runs.map((r) => ({
    id: r.id,
    name: r.name,
    status: r.status,
    conclusion: r.conclusion,
    created_at: r.created_at,
    html_url: r.html_url,
  }));
}
