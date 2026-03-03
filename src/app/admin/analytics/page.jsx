'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const ISO2_NUM = {
  IN: '356', US: '840', GB: '826', DE: '276', FR: '250', CN: '156', BR: '76', CA: '124',
  AU: '36', JP: '392', RU: '643', ZA: '710', MX: '484', AR: '32', NG: '566', EG: '818',
  ID: '360', PK: '586', BD: '50', PH: '608', VN: '704', TR: '792', IR: '364', SA: '682',
  AE: '784', KR: '410', TH: '764', MY: '458', SG: '702', IT: '380', ES: '724', PL: '616',
  NL: '528', SE: '752', NO: '578', DK: '208', FI: '246', CH: '756', AT: '40', BE: '56',
  PT: '620', GR: '300', CZ: '203', HU: '348', RO: '642', UA: '804', IL: '376', OM: '512',
  KW: '414', QA: '634', IQ: '368', JO: '400', LB: '422', MA: '504', TN: '788', DZ: '12',
  LY: '434', SD: '729', ET: '231', KE: '404', TZ: '834', GH: '288', SN: '686', CM: '120',
  ZM: '894', ZW: '716', NZ: '554', CL: '152', CO: '170', PE: '604', VE: '862', EC: '218',
};

export default function AnalyticsDashboard() {
  const [countryMap, setCountryMap] = useState({});
  const [stats, setStats] = useState({ unique: 0, views: 0, countries: 0 });
  const [top, setTop] = useState([]);
  const [tip, setTip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, 'visitors'), orderBy('timestamp', 'desc')));
        const docs = snap.docs.map(d => d.data());
        const byC = {};
        docs.forEach(d => {
          const k = d.countryCode || 'XX';
          if (!byC[k]) byC[k] = { name: d.country || 'Unknown', code: k, v: 0, pv: 0 };
          byC[k].v += 1;
          byC[k].pv += d.pageviews || 1;
        });
        setCountryMap(byC);
        setStats({ unique: docs.length, views: docs.reduce((s, d) => s + (d.pageviews || 1), 0), countries: Object.keys(byC).length });
        setTop(Object.values(byC).sort((a, b) => b.v - a.v).slice(0, 10));
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const maxV = Math.max(...Object.values(countryMap).map(c => c.v), 1);

  const getFill = (geoId) => {
    const iso2 = Object.entries(ISO2_NUM).find(([, n]) => Number(n) === Number(geoId))?.[0];
    if (!iso2 || !countryMap[iso2]) return '#0d1e38';
    const t = countryMap[iso2].v / maxV;
    return `rgb(${Math.round(10 + t * 20)},${Math.round(30 + t * 100)},${Math.round(90 + t * 165)})`;
  };

  return (
    <div className="min-h-screen bg-[#020c1b] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-[2px] h-7 bg-orange-500" />
          <div>
            <h1 className="text-xl font-bold uppercase tracking-widest">Geo Analytics</h1>
            <p className="text-slate-500 text-xs">Unique visitors by geography</p>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-64 gap-3 text-slate-500">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[['Unique Visitors', stats.unique, 'text-blue-400'], ['Total Page Views', stats.views, 'text-cyan-400'], ['Countries', stats.countries, 'text-indigo-400']].map(([l, v, c], i) => (
                <div key={i} className="bg-[#0a1628] border border-slate-800 rounded-xl p-5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{l}</p>
                  <p className={`text-4xl font-bold ${c}`}>{Number(v).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#0a1628] border border-slate-800 rounded-xl p-5 mb-6">
              <h2 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Visitor World Map</h2>
              <div className="relative">
                <ComposableMap projectionConfig={{ scale: 145 }} style={{ width: '100%', height: '420px' }}>
                  <ZoomableGroup>
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) => geographies.map(geo => {
                        const iso2 = Object.entries(ISO2_NUM).find(([, n]) => Number(n) === Number(geo.id))?.[0];
                        const data = iso2 ? countryMap[iso2] : null;
                        return (
                          <Geography key={geo.rsmKey} geography={geo}
                            fill={getFill(geo.id)} stroke="#0d1f3c" strokeWidth={0.5}
                            style={{ default: { outline: 'none' }, hover: { outline: 'none', fill: '#3b82f6', cursor: 'pointer' }, pressed: { outline: 'none' } }}
                            onMouseMove={e => setTip({ show: true, text: data ? `${data.name}: ${data.v} visitor${data.v !== 1 ? 's' : ''}` : (geo.properties?.name || 'No data'), x: e.clientX, y: e.clientY })}
                            onMouseLeave={() => setTip(t => ({ ...t, show: false }))}
                          />
                        );
                      })}
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>
                {tip.show && (
                  <div className="fixed z-50 bg-[#0a1628] border border-slate-700 text-white text-xs px-3 py-2 rounded-lg pointer-events-none shadow-xl"
                    style={{ top: tip.y - 40, left: tip.x + 12 }}>
                    {tip.text}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <span className="text-[10px] text-slate-600">Fewer</span>
                <div className="h-2 w-28 rounded-full" style={{ background: 'linear-gradient(to right,#0d1e38,#1e78ff)' }} />
                <span className="text-[10px] text-slate-600">More</span>
              </div>
            </div>
            <div className="bg-[#0a1628] border border-slate-800 rounded-xl p-5">
              <h2 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Top Countries</h2>
              {top.length === 0 ? (
                <p className="text-slate-600 text-sm text-center py-8">No data yet. Appears after first real visit on Vercel.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] text-slate-600 uppercase tracking-widest border-b border-slate-800">
                      {['#', 'Country', 'Unique Visitors', 'Page Views', 'Share'].map((h, i) => (
                        <th key={i} className={`pb-3 font-medium ${i > 1 ? 'text-right' : 'text-left'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {top.map((c, i) => (
                      <tr key={c.code} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                        <td className="py-3 text-slate-600 text-xs">{i + 1}</td>
                        <td className="py-3 font-medium">{c.name}</td>
                        <td className="py-3 text-right text-blue-400 font-semibold">{c.v.toLocaleString()}</td>
                        <td className="py-3 text-right text-slate-400">{c.pv.toLocaleString()}</td>
                        <td className="py-3 text-right text-slate-500 text-xs">{((c.v / stats.unique) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
