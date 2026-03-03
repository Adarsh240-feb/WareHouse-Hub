import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { createHash } from 'crypto';

export function extractGeoFromRequest(request) {
  const headers = request.headers;
  const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
  const country = headers.get('x-vercel-ip-country') || 'Unknown';
  const countryCode = headers.get('x-vercel-ip-country-code') || headers.get('x-vercel-ip-country') || 'XX';
  const city = headers.get('x-vercel-ip-city') || 'Unknown';
  const region = headers.get('x-vercel-ip-country-region') || '';
  return { ip, country, countryCode, city, region };
}

function hashIp(ip) {
  return createHash('sha256').update(ip + process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID).digest('hex').slice(0, 16);
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export async function trackVisitor(geoData) {
  const { ip, country, countryCode, city, region } = geoData;
  const hashedIp = hashIp(ip);
  const today = todayString();
  const docId = `${hashedIp}_${today}`;
  const ref = doc(collection(db, 'visitors'), docId);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    await setDoc(ref, { pageviews: (existing.data().pageviews || 1) + 1 }, { merge: true });
    return { status: 'existing', docId };
  }
  await setDoc(ref, {
    hashedIp,
    country,
    countryCode: countryCode.toUpperCase(),
    city,
    region,
    date: today,
    pageviews: 1,
    timestamp: serverTimestamp(),
  });
  return { status: 'new', docId };
}
