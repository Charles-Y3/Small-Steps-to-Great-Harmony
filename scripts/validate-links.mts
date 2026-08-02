// Reads every `url` in data/apps.ts and confirms it resolves. Warn-mode by
// default (a flaky network shouldn't fail a build); pass --strict to fail
// on any non-2xx response — run that manually before a release, and
// always after renaming a Vercel project.
//
// `repo` is not checked — the portal no longer links to GitHub sources.
import { APPS } from '../src/data/apps';

const strict = process.argv.includes('--strict');

async function check(label: string, url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (!res.ok) return `${label}: ${url} -> HTTP ${res.status}`;
    return null;
  } catch (e) {
    return `${label}: ${url} -> ${(e as Error).message}`;
  }
}

const problems: string[] = [];
for (const app of APPS) {
  if (app.status !== 'live') continue;
  const problem = await check(`apps/${app.id}/url`, app.url);
  if (problem) problems.push(problem);
}

if (problems.length) {
  const message = `validate-links: ${problems.length} problem(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`;
  if (strict) {
    console.error(message);
    process.exit(1);
  } else {
    console.warn(message);
    console.warn('(warn-mode — pass --strict to fail the build on this)');
  }
} else {
  console.log(`validate-links: OK (${APPS.length} apps checked)`);
}
