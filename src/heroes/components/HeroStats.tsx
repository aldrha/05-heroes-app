import { Badge } from '@/components/ui/badge';
import { Heart, Trophy, Users, Zap } from 'lucide-react';
import { use } from 'react';
import { FavoriteHeroContext } from '../context/FavoriteHeroContext';
import { useHeroSummary } from '../hooks/useHeroSummary';
import { HeroStatCard } from './HeroStatCard';

export const HeroStats = () => {
  const { data: summary } = useHeroSummary();
  const { favoritesCount } = use(FavoriteHeroContext);

  if (!summary) {
    return <h3 className="text-2xl">Loading...</h3>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStatCard title="Total de caracteres" icon={<Users className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      <HeroStatCard title="Favoritos" icon={<Heart className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-2xl font-bold text-red-600">{favoritesCount}</div>
        {/* (favoritesCount / summary?.totalHeroes) * 100 */}
        <p className="text-xs text-muted-foreground">{((favoritesCount * 100) / summary?.totalHeroes).toFixed(2)}% of total</p>
      </HeroStatCard>

      <HeroStatCard title="Fuerte" icon={<Zap className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Strength: {summary?.strongestHero.strength}/10</p>
      </HeroStatCard>

      <HeroStatCard title="Inteligente" icon={<Trophy className="h-4 w-4 text-muted-foreground" />}>
        <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">Intelligence: {summary?.smartestHero.intelligence}/10</p>
      </HeroStatCard>
    </div>
  );
};
