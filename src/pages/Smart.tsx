import CategoryPage from '../components/CategoryPage';
import { WATCH_COLLECTION } from '../types';

const Smart = () => {
  const smartWatches = WATCH_COLLECTION.filter(w => w.category === 'Smart');

  return (
    <CategoryPage
      title="Smart Watches"
      categoryBanner="/images/generated/smart_hero_banner_1771144581723.png"
      watches={smartWatches}
    />
  );
};

export default Smart;