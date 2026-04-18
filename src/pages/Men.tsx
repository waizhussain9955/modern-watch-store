import CategoryPage from '../components/CategoryPage';
import { WATCH_COLLECTION } from '../types';

const Men = () => {
  const menWatches = WATCH_COLLECTION.filter(w => w.gender === 'Men');

  return (
    <CategoryPage
      title="Men's Watches"
      categoryBanner="/images/generated/men_banner.png"
      watches={menWatches}
    />
  );
};

export default Men;