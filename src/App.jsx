import { useEffect, useState } from 'react';

const employees = [
  { id: 'hemangi', name: 'Hemangi Singh', firstName: 'Hemangi', lastName: 'Singh', designation: 'Software Developer at Vivansh Vasishta Group Of Companies', department: 'Technology & Engineering', employeeId: 'VIV-SD-1042', location: 'Mathura, India', phone: '+91 90000 00000', phoneLink: '+919000000000', email: 'hemangi.singh@example.com', photo: '/assets/hemangi-singh.jpeg' },
  { id: 'lakshya', name: 'Lakshya Prabha', firstName: 'Lakshya', lastName: 'Prabha', designation: 'Technical Manager at Vivansh Vasishta Group Of Companies', department: 'Technology & Engineering', employeeId: 'VIV-TM-1051', location: 'Mathura, India', phone: '+91 90000 00000', phoneLink: '+919000000000', email: 'lakshya.prabha@example.com', photo: '/assets/lakshya-prabha.jpeg' },
  { id: 'madhusmita', name: 'Madhusmita Mohanty', firstName: 'Madhusmita', lastName: 'Mohanty', designation: 'Regional Sales Manager at Vivansh Vasishta Group Of Companies', department: 'Sales & Business Development', employeeId: 'VIV-RSM-1064', location: 'Mathura, India', phone: '+91 90000 00000', phoneLink: '+919000000000', email: 'madhusmita.mohanty@example.com', photo: '/assets/madhusmita-mohanty.jpeg' },
  { id: 'rutu', name: 'Rutu Verma', firstName: 'Rutu', lastName: 'Verma', designation: 'HR', department: 'Human Resources', employeeId: 'VIV-HR-1072', location: 'Mathura, India', phone: '+91 90000 00000', phoneLink: '+919000000000', email: 'rutu.verma@example.com', photo: '/assets/rutu-verma.jpeg' },
];

function Icon({ children, className = '' }) { return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>; }
function ShareIcon() { return <Icon><path d="M18 8a3 3 0 1 0-2.82-4A3 3 0 0 0 15 5l-6.11 3.06a3 3 0 1 0 0 7.88L15 19a3 3 0 1 0 .89-1.79l-6.11-3.05a3 3 0 0 0 0-4.32L15.9 6.8A3 3 0 0 0 18 8Z" /></Icon>; }
function CopyIcon() { return <Icon><path d="M8 8.5V5.8A1.8 1.8 0 0 1 9.8 4h8.4A1.8 1.8 0 0 1 20 5.8v8.4a1.8 1.8 0 0 1-1.8 1.8h-2.7M5.8 8h8.4A1.8 1.8 0 0 1 16 9.8v8.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.2V9.8A1.8 1.8 0 0 1 5.8 8Z" /></Icon>; }
function PhoneIcon() { return <Icon><path d="M21 16.92v2.57a1.5 1.5 0 0 1-1.64 1.5 17.83 17.83 0 0 1-7.77-2.77 17.55 17.55 0 0 1-5.4-5.4A17.83 17.83 0 0 1 3.42 5.02 1.5 1.5 0 0 1 4.91 3.4h2.57a1.5 1.5 0 0 1 1.5 1.29c.1.78.29 1.54.55 2.28a1.5 1.5 0 0 1-.34 1.58l-1.08 1.08a12 12 0 0 0 4.16 4.16l1.08-1.08a1.5 1.5 0 0 1 1.58-.34c.74.26 1.5.45 2.28.55A1.5 1.5 0 0 1 21 14.42v2.5Z" /></Icon>; }
function EmailIcon() { return <Icon><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2 0v.38l7 4.67 7-4.67V5.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5Zm14 13.5a.5.5 0 0 0 .5-.5V8.28l-6.95 4.63a1 1 0 0 1-1.1 0L4.5 8.28V18.5a.5.5 0 0 0 .5.5h14Z" /></Icon>; }
function WhatsAppIcon() { return <Icon><path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.48 0 .13 5.35.13 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.46-8.42ZM12.05 21.8a9.83 9.83 0 0 1-5.02-1.37l-.36-.21-3.73.98.99-3.64-.24-.37A9.8 9.8 0 0 1 2.2 11.92c0-5.43 4.42-9.85 9.85-9.85 2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 0 1 2.9 6.97c0 5.43-4.42 9.85-9.86 9.85Zm5.4-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.64.07-1.74-.87-2.89-1.56-4.04-3.54-.3-.5.3-.46.86-1.53.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.5-.5-.67-.5h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.08.15.2 2.1 3.2 5.07 4.49.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z" /></Icon>; }

function ContactAction({ href, label, title, tone, children }) {
  return <a className="contact-action" href={href} target={href.startsWith('https') ? '_blank' : undefined} rel={href.startsWith('https') ? 'noreferrer' : undefined} aria-label={label}>
    <span className={`action-icon ${tone}`}>{children}</span><span><small>{title}</small><strong>{label}</strong></span>
  </a>;
}

export default function App() {
  const [selectedId, setSelectedId] = useState('rutu');
  const [toast, setToast] = useState('');
  const employee = employees.find(({ id }) => id === selectedId) ?? employees[0];
  useEffect(() => { document.title = `${employee.name} | VIVCOS`; }, [employee.name]);
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const copyCardLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); }
    catch { const area = document.createElement('textarea'); area.value = window.location.href; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); }
    notify('Card link copied to your clipboard');
  };
  const shareCard = async () => {
    if (!navigator.share) return copyCardLink();
    try { await navigator.share({ title: `${employee.name} | VIVCOS`, text: `Connect with ${employee.name} at VIVCOS.`, url: window.location.href }); }
    catch (error) { if (error.name !== 'AbortError') copyCardLink(); }
  };
  return <main className="page-shell"><section className="team-selector" aria-label="Choose an employee visiting card"><span>VIVCOS TEAM</span><div>{employees.map((person) => <button key={person.id} type="button" className={person.id === employee.id ? 'active' : ''} onClick={() => setSelectedId(person.id)}>{person.firstName}</button>)}</div></section><section className="card" aria-labelledby="employee-name">
    <div className="card-glow glow-one" /><div className="card-glow glow-two" />
    <header className="topbar"><a className="brand" href="https://www.vivcos.com/" target="_blank" rel="noreferrer" aria-label="Visit VIVCOS website"><img className="brand-logo" src="/assets/vivcos-logo.jpeg" alt="VIVCOS logo" /><span>VIVCOS</span></a><button className="icon-button" onClick={shareCard} type="button" aria-label="Share this visiting card" title="Share visiting card"><ShareIcon /></button></header>
    <div className="profile-section"><div className="portrait-wrap"><img src={employee.photo} alt={`Portrait of ${employee.name}`} /><span className="availability"><span /> Available</span></div><div className="profile-copy"><p className="eyebrow">DIGITAL VISITING CARD</p><h1 id="employee-name">{employee.firstName}<br />{employee.lastName}</h1><p className="role">{employee.designation}</p><p className="department">{employee.department}</p></div></div>
    <div className="employee-meta" aria-label="Employee details"><span><strong>Employee ID</strong><code>{employee.employeeId}</code></span><span className="meta-divider" aria-hidden="true" /><span><strong>Based in</strong><em>{employee.location}</em></span></div>
    <section className="connect-section" aria-labelledby="connect-heading"><div className="section-label"><span className="section-dot" /><h2 id="connect-heading">Connect with me</h2></div><div className="contact-actions"><ContactAction href={`tel:${employee.phoneLink}`} title="Call" label={employee.phone} tone="phone-icon"><PhoneIcon /></ContactAction><ContactAction href={`https://wa.me/${employee.phoneLink}?text=Hi%20${encodeURIComponent(employee.firstName)}%2C%20I%20found%20your%20VIVCOS%20digital%20card.`} title="WhatsApp" label="Start a conversation" tone="whatsapp-icon"><WhatsAppIcon /></ContactAction><ContactAction href={`mailto:${employee.email}`} title="Email" label={employee.email} tone="email-icon"><EmailIcon /></ContactAction></div></section>
    <section className="about" aria-labelledby="about-heading"><span className="line" /><p className="eyebrow">ABOUT VIVCOS</p><h2 id="about-heading">Mindset. Money. Meaning.</h2><p>VIVCOS is a future-facing group building meaningful businesses across wealth, technology, media and lifestyle.</p><a className="website-link" href="https://www.vivcos.com/" target="_blank" rel="noreferrer">www.vivcos.com <Icon><path d="M14 4h6v6M20 4l-9.5 9.5M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5" /></Icon></a></section>
    <footer><p>Tap a contact option to connect</p><button className="copy-button" onClick={copyCardLink} type="button"><CopyIcon /><span>Copy card link</span></button></footer>
  </section><div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div></main>;
}
