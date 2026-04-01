import AdminListEditor from '../../components/admin/AdminListEditor';

export default function AdminCareers() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Careers Page Content</h1>
        <p className="text-zinc-400">Manage the content displayed on the Careers page.</p>
      </div>

      <AdminListEditor
        title="Job Listings"
        collectionName="careers_jobs"
        fields={[
          { name: 'title', label: 'Job Title', type: 'text' },
          { name: 'type', label: 'Job Type (e.g. Full-time)', type: 'text' },
          { name: 'location', label: 'Location', type: 'text' },
          { name: 'salary', label: 'Salary', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ]}
      />

      <AdminListEditor
        title="Benefits"
        collectionName="careers_benefits"
        fields={[
          { name: 'title', label: 'Benefit Title', type: 'text' },
          { name: 'icon', label: 'Icon Name (e.g. Zap, Star)', type: 'text' },
        ]}
      />
    </div>
  );
}
