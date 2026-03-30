const GITHUB_API = 'https://api.github.com';
const USER_AGENT = 'reg-compat-worker/1.0';

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': USER_AGENT,
  };
}

/** Encode a UTF-8 string to base64. */
function utf8ToBase64(str: string): string {
  return btoa(Array.from(new TextEncoder().encode(str), b => String.fromCharCode(b)).join(''));
}

/** Decode base64 to a UTF-8 string. */
function base64ToUtf8(b64: string): string {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
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

  // Content is base64 encoded, may contain newlines — decode as UTF-8
  const decoded = base64ToUtf8(data.content.replace(/\n/g, ''));

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
  const body: Record<string, string> = {
    message,
    content: utf8ToBase64(content),
  };
  // Only include sha when updating an existing file — omit for new file creation
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(body),
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

/** Commit a file where content is already base64-encoded (for binary files like images). */
export async function commitBinaryFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  base64Content: string,
  sha: string,
  message: string,
): Promise<string> {
  const body: Record<string, string> = { message, content: base64Content };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(body),
  });

  if (res.status === 409) throw new Error('conflict');
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub commitBinaryFile ${res.status}: ${text}`);
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
  inputs?: Record<string, string>,
): Promise<void> {
  const body: Record<string, unknown> = { ref };
  if (inputs && Object.keys(inputs).length > 0) body.inputs = inputs;

  const res = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify(body),
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
