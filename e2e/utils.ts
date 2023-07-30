import detect from 'detect-port';
import { execSync } from 'child_process';

export async function setupE2eTests() {
    await startSupabase();
    reseedDb();
}

async function startSupabase() {
    const port = await detect(64321);

    if(port !== 64321) {
        return;
    }

    console.warn('Supabase not running, starting it now...');
    execSync('npx supabase start');
}

function reseedDb() {
    execSync(
        "PGPASSWORD=postgres psql -U postgres -h localhost -p 6432 -f supabase/clear-db-data.sql",
        { stdio: 'ignore' }
    )
}