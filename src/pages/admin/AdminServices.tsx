import AdminListEditor from '../../components/admin/AdminListEditor';

export default function AdminServices() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Services Page Content</h1>
        <p className="text-zinc-400">Manage the content displayed on the Services page.</p>
      </div>

      <AdminListEditor
        title="All Services"
        collectionName="services_list"
        fields={[
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'icon', label: 'Icon Name (e.g. Users, Target)', type: 'text' },
          { name: 'features', label: 'Features (comma separated)', type: 'textarea' },
          { name: 'color', label: 'Color Classes', type: 'text' },
        ]}
      />

      <AdminListEditor
        title="Pricing Plans"
        collectionName="pricing_plans"
        fields={[
          { name: 'name', label: 'Plan Name', type: 'text' },
          { name: 'price', label: 'Price (e.g. ৳15,000)', type: 'text' },
          { name: 'period', label: 'Period (e.g. /month)', type: 'text' },
          { name: 'desc', label: 'Description', type: 'textarea' },
          { name: 'color', label: 'Gradient Color', type: 'text' },
          { name: 'borderColor', label: 'Border Color', type: 'text' },
          { name: 'textColor', label: 'Text Color', type: 'text' },
          { name: 'popular', label: 'Is Popular? (true/false)', type: 'text' },
        ]}
      />
    </div>
  );
}
