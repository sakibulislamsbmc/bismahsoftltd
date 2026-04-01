import AdminListEditor from '../../components/admin/AdminListEditor';

export default function AdminHomepage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Homepage Content</h1>
        <p className="text-zinc-400">Manage the content displayed on the homepage.</p>
      </div>

      <AdminListEditor
        title="Services Overview"
        collectionName="homepage_services"
        fields={[
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'icon', label: 'Icon Name (e.g. Users, Target)', type: 'text' },
          { name: 'color', label: 'Color Class (e.g. text-blue-400)', type: 'text' },
        ]}
      />

      <AdminListEditor
        title="Methodology Steps"
        collectionName="homepage_methodology"
        fields={[
          { name: 'id', label: 'Step Number (e.g. 01)', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'icon', label: 'Icon Name (e.g. Eye, Layers)', type: 'text' },
        ]}
      />
    </div>
  );
}
