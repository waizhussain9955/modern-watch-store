import CategoryPage from '../components/CategoryPage';
import { WATCH_COLLECTION } from '../types';

const Women = () => {
  const womenWatches = WATCH_COLLECTION.filter(w => w.gender === 'Women');

  return (
    <CategoryPage
      title="Women's Watches"
      categoryBanner="/images/generated/women_banner.png"
      watches={womenWatches}
    />
  );
};

export default Women;