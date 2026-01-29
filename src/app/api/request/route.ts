import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface RequestData {
  id: string;
  serviceType: string;
  description: string;
  contact: string;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'requests.json');

async function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {
    // Directory exists
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

async function getRequests(): Promise<RequestData[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

async function saveRequests(requests: RequestData[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceType, description, contact } = body;

    // Validate required fields
    if (!serviceType || !description || !contact) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate service type
    const validServices = ['quick-reply', 'thread', 'research', 'code-review', 'custom'];
    if (!validServices.includes(serviceType)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      );
    }

    // Create request entry
    const newRequest: RequestData = {
      id: `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      serviceType,
      description: description.slice(0, 2000), // Limit description length
      contact: contact.slice(0, 200), // Limit contact length
      createdAt: new Date().toISOString(),
    };

    // Save to file
    const requests = await getRequests();
    requests.push(newRequest);
    await saveRequests(requests);

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error) {
    console.error('Error saving request:', error);
    return NextResponse.json(
      { error: 'Failed to save request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const requests = await getRequests();
    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
