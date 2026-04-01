import AdminListEditor from '../../components/admin/AdminListEditor';

export default function AdminAbout() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">About Page Content</h1>
        <p className="text-zinc-400">Manage the content displayed on the About page.</p>
      </div>

      <AdminListEditor
        title="Core Values"
        collectionName="about_values"
        fields={[
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'icon', label: 'Icon Name (e.g. Zap, Shield)', type: 'text' },
        ]}
      />

      <AdminListEditor
        title="Team Members"
        collectionName="team_members"
        fields={[
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'title', label: 'Job Title', type: 'text' },
          { name: 'image', label: 'Image URL', type: 'image' },
          { name: 'desc', label: 'Description', type: 'textarea' },
        ]}
      />
    </div>
  );
}
