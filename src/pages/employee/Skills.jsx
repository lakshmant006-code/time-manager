import { useState } from 'react';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../../components/CrmShell';
import { Badge, Button, Input, Select } from '../../design-system';
import { MOCK_SKILLS } from '../../mocks/data';

const LEVEL_TONE = { Expert: 'success', Certified: 'success', Intermediate: 'neutral', Beginner: 'neutral' };

export function Skills() {
  const [skills, setSkills] = useState(MOCK_SKILLS);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Beginner');
  useDashboardEntranceAnimation();

  const addSkill = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSkills((s) => [...s, { id: Date.now(), name: name.trim(), level }]);
    setName('');
    setLevel('Beginner');
  };

  return (
    <CrmShell role="employee">
      <TopBarStrip role="employee" />
      <PageHeader title="Skills" subtitle="Track the skills and certifications on your profile" />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title="Your skills">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {skills.map((s) => (
              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-subtle)', padding: '12px 16px', borderRadius: 8 }}>
                <span style={{ fontWeight: 500 }}>{s.name}</span>
                <Badge tone={LEVEL_TONE[s.level] || 'neutral'}>{s.level}</Badge>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>Add a skill</h3>
          <form onSubmit={addSkill} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 220px' }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Skill</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Revit MEP" />
            </div>
            <div style={{ flex: '1 1 160px' }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Level</label>
              <Select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
                <option>Certified</option>
              </Select>
            </div>
            <Button type="submit">Add Skill</Button>
          </form>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
