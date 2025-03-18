
import MainLayout from '@/layouts/MainLayout';
import NewsDashboard from '@/components/news/NewsDashboard';

const News = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-16">
        <h1 className="text-3xl font-bold mb-6">Financial News Dashboard</h1>
        <NewsDashboard />
      </div>
    </MainLayout>
  );
};

export default News;
