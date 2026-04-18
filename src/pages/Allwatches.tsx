import CategoryPage from '../components/CategoryPage';
import { WATCH_COLLECTION } from '../types';

const Allwatches = () => {
  return (
    <CategoryPage
      title="Global Watch Collection"
      description="Explore our curated collection of over 50+ luxury timepieces from the world's most prestigious horological houses."
      categoryBanner="/images/generated/all_watches_hero.png"
      watches={WATCH_COLLECTION}
    />
  );
};

export default Allwatches;